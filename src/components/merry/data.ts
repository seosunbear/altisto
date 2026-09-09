/* 메리 페이지에 들어가는 값 — 보드와 프로필 쪽지가 같은 값을 본다.
   설정이 바뀌면 여기만 고친다. */

export const FULL_BODY = '/merry-full.webp';
export const PORTRAIT = '/merry-portrait.webp';

/** PROFILE 패널 — 라벨은 라틴 대문자, 값은 한글 */
export const PROFILE: { label: string; value: string }[] = [
  { label: 'NAME', value: '메리 MERI' },
  { label: 'AGE', value: '16살' },
  { label: 'HEIGHT', value: '163 CM' },
  { label: 'WEIGHT', value: '비공개' },
  { label: 'MBTI', value: 'ENFJ' },
  { label: 'BIRTHDAY', value: 'February 21' },
];
