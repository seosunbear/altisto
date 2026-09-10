/* 사이트 절대 주소 — 메타데이터·구조화 데이터·사이트맵이 같은 값을 본다.
   여러 파일에 흩어 두면 도메인이 바뀔 때 한 곳이 남아 어긋난다. */
export const SITE_URL = 'https://altisto.me';

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

/* 마스코트를 올리는 인스타그램. 구조화 데이터의 sameAs 로 걸어서
   '사이트의 메리'와 '인스타의 메리'가 같은 엔티티임을 못 박는다. */
export const MERI_INSTAGRAM = 'https://www.instagram.com/rumel.key/';
