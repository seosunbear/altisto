import MerryName from './MerryName';
import type { ProfileRow } from './data';

/* ──────────────────────────────────────────────────────────
   프로필 쪽지 — 보드 옆에 붙이는 모눈종이 카드.

   스크랩북 보드에는 설정값이 들어갈 자리가 없어서, 같은 종이
   언어(모눈·점선·마스킹 테이프)로 한 장을 따로 둔다.
   이름은 넓은 화면에서만 카드 머리에 얹는다. 좁은 화면에서는 보드보다
   위, 페이지 맨 꼭대기에 선다(page.tsx).
   카드는 왼쪽 보드와 같은 높이로 늘어나고, 행은 그 안에서 고르게
   벌어진다(flex-1 + justify-between). 그래서 두 칸의 바닥이 맞는다.
   넓은 화면에서는 보드 오른쪽 절반, 좁은 화면에서는 보드 아래.
   ────────────────────────────────────────────────────────── */

/* 이름 칸 — 'メリ MERI' 처럼 앞 단어가 그 언어 표기다. 큰 이름과 같은 자간
   (--font-round-name-tracking, 일본어만 값이 있다)을 앞 단어 글자 사이에 준다.
   마지막 글자 뒤에는 2/3 만 준다. リ 오른쪽 여백(0.29em)과 띄어쓰기를 합친
   'MERI' 까지 잉크 간격이 0.64em 인데, 전부 주면 0.30em 로 붙어 보이고
   2/3 면 0.42em — 한글판 '메리 MERI' 와 비슷해진다.
   변수가 normal(한·영)이면 calc 가 무효가 되어 그냥 기본 자간이다. */
function NameValue({ value }: { value: string }) {
  const [head, ...tail] = value.split(' ');
  const chars = Array.from(head);
  return (
    <>
      <span className="[letter-spacing:var(--font-round-name-tracking)]">{chars.slice(0, -1).join('')}</span>
      <span className="[letter-spacing:calc(var(--font-round-name-tracking)*2/3)]">{chars.at(-1)}</span>
      {tail.length ? ` ${tail.join(' ')}` : ''}
    </>
  );
}

export default function MerryProfileNote({
  name,
  nameSub,
  profile,
}: {
  name: string;
  nameSub: string;
  profile: ProfileRow[];
}) {
  return (
    /* 좁은 화면에서는 보드와 같은 상자를 쓴다. 보드는 뿌리에 px-6 을 두고
       그 안쪽에 모눈 판을 깔므로, 여기도 같은 최대 폭과 같은 좌우 여백을
       줘야 두 카드의 테두리가 나란히 선다. 넓은 화면에서는 제 칸을 채운다. */
    <div className="mx-auto flex w-full max-w-[620px] flex-col px-6 lg:max-w-none lg:px-0">
      {/* 이름 — 카드 위. 좁은 화면에서는 page.tsx 가 맨 꼭대기에 따로 세운다 */}
      <MerryName name={name} sub={nameSub} className="hidden lg:block" />

      {/* 좁은 화면에서는 보드 아래에 붙으므로 위쪽을 띄운다. 보드의 리본
          배너가 판 밖으로 흘러내려 있어서, 그리드 gap 만으로는 테이프와
          겹친다. 넓은 화면의 mt-7 은 이름과 카드 사이 간격이다. */}
      <div className="merry-up relative mt-10 flex-1 lg:mt-7" style={{ animationDelay: '0.35s' }}>
        {/* 마스킹 테이프 두 조각 */}
        {/* 작은 폰에서는 카드가 좁아 테이프 두 조각이 가운데서 맞붙는다.
            폭도 같이 줄여 사이를 띄운다. */}
        <span aria-hidden className="absolute -top-2.5 left-6 h-5 w-14 -rotate-6 bg-[var(--k-cream)]/70 sm:-top-3 sm:left-8 sm:h-6 sm:w-20" />
        <span aria-hidden className="absolute -top-2.5 right-6 h-5 w-14 rotate-6 bg-[var(--k-sky)]/60 sm:-top-3 sm:right-8 sm:h-6 sm:w-20" />

        <div className="merry-grid-m flex h-full flex-col rounded-2xl border-2 border-dashed border-[var(--k-edge)] bg-white/80 px-[clamp(1.25rem,7.5vw,2.25rem)] py-8 lg:px-10 lg:py-16">
          {/* Jua 는 한 굵기뿐이라 font-semibold 를 주면 브라우저가 굵기를
              흉내 내 획이 뭉갠다. 굵기를 지정하지 않고 자간만 벌린다. */}
          <p
            className="merry-up font-[family-name:var(--font-round)] [font-weight:var(--font-round-weight)] text-[clamp(0.8rem,3.2vw,0.9375rem)] uppercase leading-none text-[var(--k-pink-d)]"
            style={{ letterSpacing: '0.24em', animationDelay: '0.5s' }}
          >
            Profile
          </p>

          {/* 카드가 보드 높이만큼 늘어나므로 행은 justify-between 으로 고르게
              벌어진다. 보드가 커지면 이 간격도 같이 벌어지니, 위아래 패딩
              (lg:py-16)으로 남는 높이를 흡수해 행 사이를 조인다. */}
          <dl className="mt-6 flex flex-1 flex-col justify-between gap-1">
            {profile.map((row, i) => (
              /* 행은 위에서부터 0.07s 씩 밀려 붙는다 */
              <div
                key={row.label}
                className="merry-up flex items-baseline gap-4 py-3.5"
                style={{ animationDelay: `${0.58 + i * 0.07}s` }}
              >
                <dt
                  className="font-[family-name:var(--font-display)] text-[clamp(0.6rem,2.4vw,0.6875rem)] font-semibold uppercase leading-none text-[var(--k-ink)]/55"
                  style={{ letterSpacing: '0.12em' }}
                >
                  {row.label}
                </dt>
                {/* 라벨과 값을 잇는 점선. 1px 짜리 연분홍 점선은 모눈 바탕에
                    묻혀 보이지 않아서, 점을 굵히고 색을 한 단계 진하게 잡는다. */}
                <span
                  aria-hidden
                  className="h-0 flex-1 translate-y-[-3px] border-b-[3px] border-dotted border-[var(--k-pink)]"
                />
                {/* 값도 둥근 서체(Jua). 한 굵기뿐이라 font-bold 는 주지 않는다 */}
                <dd className="font-[family-name:var(--font-round)] [font-weight:var(--font-round-weight)] text-[clamp(0.95rem,4vw,1.1875rem)] leading-none text-[var(--k-ink)]">
                  {row.label === 'NAME' ? <NameValue value={row.value} /> : row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
