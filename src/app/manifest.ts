import type { MetadataRoute } from 'next';

/* 웹 앱 매니페스트 — 브라우저·검색엔진이 읽는 사이트 신원 정보.
   화면에는 영향이 없다. 이름과 설명을 구조화 데이터와 같은 문장으로
   맞춰서, 어디서 읽어도 '알티스토 = 소프트웨어 및 플랫폼 개발사'가
   같은 말로 읽히게 한다. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '알티스토 (Altisto)',
    short_name: '알티스토',
    description:
      '크리에이터 외주 협업 플랫폼 알티, 스쿨 라이프 앱 우리학교, 연령별 커뮤니티 리프챗을 만드는 소프트웨어 및 플랫폼 개발사 알티스토의 공식 웹사이트.',
    start_url: '/',
    display: 'browser',
    lang: 'ko-KR',
    background_color: '#ffffff',
    theme_color: '#0d1117',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  };
}
