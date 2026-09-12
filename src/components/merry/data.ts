/* 메리 페이지에 들어가는 값 — 보드와 프로필 쪽지가 같은 값을 본다.
   설정값 문구는 언어별 사전(i18n/dictionaries 의 merry.profile)에 있다. */

export const FULL_BODY = '/merry-full.webp';
export const PORTRAIT = '/merry-portrait.webp';

export type ProfileRow = { label: string; value: string };

/** PROFILE 패널 — 라벨은 언어와 상관없이 라틴 대문자, 값은 언어별 사전(merry.profile) */
export const profileRows = (v: {
  name: string;
  age: string;
  height: string;
  weight: string;
  mbti: string;
  birthday: string;
}): ProfileRow[] => [
  { label: 'NAME', value: v.name },
  { label: 'AGE', value: v.age },
  { label: 'HEIGHT', value: v.height },
  { label: 'WEIGHT', value: v.weight },
  { label: 'MBTI', value: v.mbti },
  { label: 'BIRTHDAY', value: v.birthday },
];
