/* ──────────────────────────────────────────────────────────
   IndexNow 제출 — 사이트맵의 모든 주소를 검색엔진에 바로 알린다.

   IndexNow 는 계정 없이 쓰는 색인 요청 규약이다. 한 번 보내면
   빙·네이버·얀덱스·세즈남이 같이 받는다. 빙 색인은 ChatGPT 검색이
   참고하는 소스라, 'GPT 에 물어봤을 때 나오게' 하는 데 가장 직접적인
   경로다. 구글은 IndexNow 를 받지 않는다(서치콘솔로 따로 제출).

   소유 확인은 public/<키>.txt 로 한다. 검색엔진이 그 파일을 실제
   사이트에서 읽어 가므로, 반드시 배포한 뒤에 돌려야 한다.

   사용법:  npm run indexnow
   ────────────────────────────────────────────────────────── */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/* src/lib/site.ts 의 SITE_URL 과 같은 값이어야 한다 */
const SITE = process.env.SITE_URL ?? 'https://www.altisto.me';
const host = new URL(SITE).host;

/* public/ 에서 32자리 16진수 이름의 키 파일을 찾는다 */
const keyFile = readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error('public/ 에 IndexNow 키 파일이 없습니다.');
  process.exit(1);
}
const key = readFileSync(join('public', keyFile), 'utf8').trim();
const keyLocation = `${SITE}/${keyFile}`;

/* 1) 키 파일이 실제 사이트에 올라가 있는지 먼저 본다 */
const live = await fetch(keyLocation).then((r) => (r.ok ? r.text() : '')).catch(() => '');
if (live.trim() !== key) {
  console.error(`키 파일이 아직 배포되지 않았습니다: ${keyLocation}`);
  console.error('커밋·푸시로 배포한 뒤 다시 실행하세요.');
  process.exit(1);
}

/* 2) 사이트맵에서 주소를 모은다 */
const xml = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text());
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim())
  .filter((u) => new URL(u).host === host);

if (!urlList.length) {
  console.error('사이트맵에서 주소를 찾지 못했습니다.');
  process.exit(1);
}

/* 3) 제출 — 200/202 면 접수된 것 */
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

console.log(`IndexNow 응답: ${res.status} ${res.statusText}`);
console.log(`제출한 주소 ${urlList.length}개`);
urlList.forEach((u) => console.log(' ·', u));
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
