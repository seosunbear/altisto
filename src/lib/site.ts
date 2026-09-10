/* 사이트 절대 주소 — 메타데이터·구조화 데이터·사이트맵·robots 가 같은 값을 본다.

   www 를 쓰는 이유: Vercel 도메인 설정에서 altisto.me 가 www.altisto.me 로
   리다이렉트된다. 실제로 200 을 내는 쪽이 www 라서, canonical 도 www 여야
   한다. canonical 이 리다이렉트되는 주소를 가리키면 검색엔진이 두 주소를
   하나로 합치지 못해 색인이 늦어진다.
   Vercel 에서 주 도메인을 altisto.me 로 뒤집으면 여기 한 줄만 바꾸면 된다. */
export const SITE_URL = 'https://www.altisto.me';

/* 구조화 데이터 노드 @id — 페이지마다 같은 조직/서비스를 가리키게 해서
   검색엔진과 답변 엔진이 하나의 엔티티로 묶도록 한다. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;
export const ARTI_ID = `${SITE_URL}/services#arti`;
export const OURSCHOOL_ID = `${SITE_URL}/services#ourschool`;
export const LEAFCHAT_ID = `${SITE_URL}/services#leafchat`;

/* 마스코트 메리 — 캐릭터 이름으로 들어온 질의가 회사까지 이어지도록
   전 페이지 그래프에 넣고 조직에 affiliation 으로 건다. */
export const MERI_ID = `${SITE_URL}/merry#meri`;
export const MERI_IMAGE_ID = `${SITE_URL}/merry#image`;

/* 회사 공식 인스타그램. Organization.sameAs 와 푸터 링크로 사이트와 잇는다.
   이게 끊겨 있으면 답변 엔진이 이 계정을 이름이 비슷한 '알티스트'에
   붙여 버린다(실제로 Gemini 가 그렇게 소개했다). 계정 소개란에도
   www.altisto.me 를 걸어 양쪽에서 서로 가리키게 해야 한다. */
export const ORG_INSTAGRAM = 'https://www.instagram.com/altisto.official/';

/* 마스코트를 올리는 인스타그램. 구조화 데이터의 sameAs 로 걸어서
   '사이트의 메리'와 '인스타의 메리'가 같은 엔티티임을 못 박는다.

   회사 공식 계정이 아니다(캐릭터를 올리는 개인 계정). 그래서 메리 노드에만
   걸고 Organization.sameAs 에는 걸지 않는다. 조직에 걸면 검색엔진이 회사와
   개인 계정을 같은 엔티티로 합쳐 버린다. */
export const MERI_INSTAGRAM = 'https://www.instagram.com/rumel.key/';
