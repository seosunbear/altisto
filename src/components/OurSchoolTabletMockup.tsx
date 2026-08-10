'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function sleep(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms));
}

/* 우리학교 태블릿(≥750px) 화면 — BSSJ-HS-dev 와이드 레이아웃:
   하단 네브 대신 왼쪽 사이드 레일(sidenavout), 커뮤니티 진입 시 세로 알약으로 morph.
   색 토큰은 폰 목업과 동일 (--point #5b6cff, 탭 활성 #555, 배경 #f4f4f5) */

const POINT = '#5b6cff';
const ET = '#7db1ff';
const ET_SOFT = 'rgba(125,177,255,0.1)';
const TAB_ON = '#555555';
const TAB_OFF = 'rgb(142,142,147)';

type Phase = 'home' | 'feed' | 'study' | 'community' | 'my';

const TIMETABLE = [
  { period: 1, subject: '문학' },
  { period: 2, subject: '수학Ⅱ' },
  { period: 3, subject: '영어Ⅱ' },
  { period: 4, subject: '물리학Ⅰ' },
  { period: 5, subject: '체육' },
];

const LUNCH  = ['차수수밥', '제육볶음', '맑은미역국', '상추겉절이', '수박'];
const DINNER = ['카레라이스', '치킨너겟', '어묵국', '단무지무침', '요구르트'];

const QUICK_TABS = [
  { key: 'id',    label: '학생증',   icon: 'id' },
  { key: 'meal',  label: '식단표',   icon: 'meal' },
  { key: 'time',  label: '시간표',   icon: 'time' },
  { key: 'leave', label: '조퇴·외출', icon: 'leave' },
  { key: 'merit', label: '상벌점',   icon: 'star' },
  { key: 'seats', label: '자리배치', icon: 'shuffle' },
] as const;

const BOARDS = [
  { id: 1, name: '공지사항',   latest: '여름방학 방과후 신청 안내',   isNew: true },
  { id: 2, name: '자유게시판', latest: '체육대회 반티 정한 반 있음?', isNew: true },
  { id: 3, name: '급식평가',   latest: '오늘 제육 역대급이었다 인정?', isNew: false },
  { id: 4, name: '분실물센터', latest: '3층 복도에서 에어팟 주우신 분', isNew: false },
];

const HOME_POSTS = [
  { id: 1, board: '자유게시판', title: '축제 무대 라인업 미리 아는 사람 ㄷㄷ', nickname: '익명', comments: 5, time: '5분 전' },
  { id: 2, board: '급식평가', title: '석식 카레 나오는 날은 무조건 남는다', nickname: '카레단', comments: 4, time: '23분 전' },
];

const EVENT_BANNERS = [
  { id: 1, title: '이벤트 광고 배너', subtitle: '여기에 광고를 넣으세요', bg: 'linear-gradient(120deg, #6a8dff, #9d7bff)' },
  { id: 2, title: '두 번째 슬라이드', subtitle: 'BANNERS 배열을 수정해 교체', bg: 'linear-gradient(120deg, #ff8a5b, #ff5b7f)' },
];

/* 피드 — 실제 CAT_META 색 */
const FEED_CATS = [
  { key: '전체',     color: '#6b6b73', soft: '#fff' },
  { key: '공지사항', color: '#10b981', soft: 'rgba(16,185,129,0.13)' },
  { key: '시험범위', color: '#5656e3', soft: 'rgba(86,86,227,0.13)' },
  { key: '수행평가', color: '#f59e0b', soft: 'rgba(245,158,11,0.15)' },
] as const;

const FEED_POSTS = [
  { id: 1, cat: '공지사항', title: '여름방학 방과후학교 수강 신청 안내', content: '7월 18일(금)까지 담임 선생님께 신청서를 제출해 주세요. 기간 이후에는 신청이 어렵습니다.', isNew: true },
  { id: 2, cat: '시험범위', title: '2학기 기말고사 수학Ⅱ 시험범위', content: '교과서 p.132~188 (미분법 전체), 프린트 3회분 포함입니다.', isNew: true },
  { id: 3, cat: '수행평가', title: '영어Ⅱ 말하기 수행평가 일정 안내', content: '다음 주 화요일부터 번호순으로 진행합니다. 주제는 자유입니다.', isNew: false },
  { id: 4, cat: '공지사항', title: '도서관 여름 특별 개방 안내', content: '방학 중에도 평일 9시~17시 개방합니다.', isNew: false },
];

/* 공부방 — 실제 SUBJECT_COLORS */
const STUDY_SUBJECTS = [
  { name: '수학Ⅱ', time: '1시간 12분', bg: 'rgba(138,156,255,0.14)', fg: '#5b6cff' },
  { name: '영어Ⅱ', time: '48분',      bg: 'rgba(0,196,115,0.14)',   fg: '#00a866' },
];

const STUDY_RANKING = [
  { rank: 1, name: '김하늘', time: '2시간 10분', active: true,  color: '#f59e0b' },
  { rank: 2, name: '이준서', time: '1시간 55분', active: false, color: '#9ca3af' },
  { rank: 3, name: '박서연', time: '1시간 21분', active: true,  color: '#d97706' },
  { rank: 4, name: '최민준', time: '58분',       active: false, color: '#9ca3af' },
];

/* 커뮤니티 */
const CAFE_BOARDS = [
  { id: 1, name: '자유게시판', desc: '자유롭게 이야기해요',        isNew: true },
  { id: 2, name: '급식평가',   desc: '오늘 급식 어땠나요?',        isNew: true },
  { id: 3, name: '스터디모집', desc: '함께 공부할 친구를 찾아요',  isNew: false },
  { id: 4, name: '분실물센터', desc: '잃어버린 물건을 찾아요',     isNew: false },
];

const HOT_POSTS = [
  { id: 1, title: '축제 무대 라인업 미리 아는 사람 ㄷㄷ', content: '작년보다 훨씬 커졌다는 소문이...', board: '자유게시판', likes: 12, comments: 5 },
  { id: 2, title: '석식 카레 나오는 날은 무조건 남는다', content: '오늘도 어김없이 석식 존버 성공', board: '급식평가', likes: 8, comments: 4 },
];

/* 마이 */
const MY_ACTIVITY = ['내가 쓴 글', '댓글 단 글', '좋아요한 글'];
const MY_ACCOUNT: { label: string; value?: string }[] = [
  { label: '닉네임 변경', value: '하늘이' },
  { label: '학년·반·번호 변경', value: '2학년 3반 26번' },
  { label: '학교 변경', value: '한별고등학교' },
];

function QuickIcon({ type, color }: { type: string; color: string }) {
  const common = { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  switch (type) {
    case 'id':
      return <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5.5 17c.5-1.8 1.4-2.5 2.5-2.5s2 .7 2.5 2.5"/><line x1="14" y1="9" x2="19" y2="9"/><line x1="14" y1="13" x2="19" y2="13"/></svg>;
    case 'meal':
      return <svg {...common}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>;
    case 'time':
      return <svg {...common}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
    case 'leave':
      return <svg {...common}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
    case 'shuffle':
      return <svg {...common}><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>;
    default:
      return <svg {...common}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  }
}

function RailIcon({ type, color, size = 21 }: { type: string; color: string; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  switch (type) {
    case 'home':
      return <svg {...common}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case 'feed':
      return <svg {...common}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/></svg>;
    case 'community':
      return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case 'study':
      return <svg {...common}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
    case 'back':
      return <svg {...common}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
    case 'dm':
      return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M6.2 18.7a6.5 6.5 0 0 1 11.6 0"/></svg>;
  }
}

function Chevron({ color = '#c4c4c9', size = 9 }: { color?: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
}

function DishRows({ dishes }: { dishes: string[] }) {
  return (
    <div className="space-y-1">
      {dishes.map((dish, i) => (
        <div key={i} className="flex items-baseline justify-end gap-1">
          <span className="text-[10px] text-[#8a8a8a]">{i + 1}.</span>
          <span className="text-[11px] font-medium text-[#18181b] truncate">{dish}</span>
        </div>
      ))}
    </div>
  );
}

export default function OurSchoolTabletMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const [phase,       setPhase]       = useState<Phase>('home');
  const [mealFlipped, setMealFlipped] = useState(false);
  const [bannerIdx,   setBannerIdx]   = useState(0);
  const [bellBadge,   setBellBadge]   = useState(false);
  const [feedCat,     setFeedCat]     = useState('전체');
  const [studySec,    setStudySec]    = useState(42 * 60 + 7);

  useEffect(() => {
    if (!isInView) return;
    const t = setInterval(() => setStudySec(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [isInView]);

  /* 페이지 전환 시나리오: 홈 → 피드 → 공부방 → 커뮤니티(레일 알약) → 마이 */
  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setPhase('home'); setMealFlipped(false); setBannerIdx(0);
        setBellBadge(false); setFeedCat('전체');
        await sleep(1400); if (cancelled) return;
        setMealFlipped(true); setBellBadge(true);
        await sleep(1400); if (cancelled) return;
        setBannerIdx(1);
        await sleep(1400); if (cancelled) return;

        setPhase('feed');
        await sleep(1500); if (cancelled) return;
        setFeedCat('시험범위');
        await sleep(1500); if (cancelled) return;

        setPhase('study');
        await sleep(3000); if (cancelled) return;

        setPhase('community');                 /* 사이드 레일 → 세로 알약 morph */
        await sleep(3200); if (cancelled) return;

        setPhase('my');
        await sleep(2800);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [isInView]);

  const studyTime = `${Math.floor(studySec / 60)}분 ${studySec % 60}초`;
  const filteredFeed = feedCat === '전체' ? FEED_POSTS : FEED_POSTS.filter(p => p.cat === feedCat);

  const card = 'rounded-[14px] border border-[#f0f0f2] bg-white';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full overflow-hidden bg-[#f4f4f5]"
      style={{ height: 402 }}
    >

      {/* ── 사이드 레일 (sidenavout / 커뮤니티 모드: 세로 알약) ── */}
      <div className="flex w-[74px] flex-shrink-0 items-center justify-center">
        <AnimatePresence mode="wait">
          {phase !== 'community' ? (
            <motion.div
              key="rail-main"
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.22 }}
              className="flex h-full w-full flex-col items-center justify-center rounded-r-[10px] border-r bg-white"
              style={{ borderColor: 'rgba(15,15,15,0.1)' }}
            >
              <div className="flex h-[78%] flex-col items-center justify-between py-2">
                {([
                  { key: 'home',      label: '홈',      icon: 'home' },
                  { key: 'feed',      label: '피드',    icon: 'feed' },
                  { key: 'community', label: '커뮤니티', icon: 'community' },
                  { key: 'study',     label: '공부방',  icon: 'study' },
                  { key: 'my',        label: '마이',    icon: 'my' },
                ] as const).map(({ key, label, icon }) => {
                  const active = phase === key;
                  return (
                    <div key={key} className="flex flex-col items-center gap-[3px]">
                      <motion.span animate={active ? { scale: 1.08, y: -1 } : { scale: 1, y: 0 }} transition={{ duration: 0.18 }}>
                        <RailIcon type={icon} color={active ? TAB_ON : TAB_OFF} />
                      </motion.span>
                      <span className="text-[9px] font-medium" style={{ color: active ? TAB_ON : TAB_OFF }}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="rail-comm"
              initial={{ opacity: 0, scale: 0.88, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9, x: -10 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className="ml-2 flex flex-col items-center gap-3 rounded-full border border-white/50 px-2 py-3"
              style={{ background: 'rgba(255,255,255,0.86)', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}
            >
              {([
                { key: 'back',      label: '',        icon: 'back' },
                { key: 'community', label: '커뮤니티', icon: 'community' },
                { key: 'browse',    label: '찾기',    icon: 'search' },
                { key: 'dm',        label: '채팅',    icon: 'dm' },
                { key: 'my',        label: '마이',    icon: 'my' },
              ] as const).map(({ key, label, icon }, i) => {
                const active = key === 'community';
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 7, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.36, delay: 0.04 + i * 0.045, ease: [0.34, 1.3, 0.64, 1] }}
                    className="flex flex-col items-center gap-[3px]"
                  >
                    {key === 'back' ? (
                      <span className="grid h-[30px] w-[30px] place-items-center rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                        <RailIcon type="back" color={TAB_ON} size={16} />
                      </span>
                    ) : (
                      <>
                        <RailIcon type={icon} color={active ? TAB_ON : TAB_OFF} size={18} />
                        <span className="text-[8px] font-medium" style={{ color: active ? TAB_ON : TAB_OFF }}>{label}</span>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 컨텐츠 ── */}
      <div className="relative min-w-0 flex-1">

        {/* 1. 홈 */}
        <AnimatePresence mode="wait">
          {phase === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 px-5 pt-2.5"
            >
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#191f28]">한별고등학교</span>
                <div className="flex items-center gap-3.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#191f28" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <div className="relative">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191f28" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                    <AnimatePresence>
                      {bellBadge && (
                        <motion.div
                          initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                          className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#ff4848]"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-[#e4e4e7]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="min-w-0 flex-[1.15]">
                  <div className="mb-2.5 flex gap-2">
                    <div className="min-h-[136px] w-0 flex-1 rounded-[13px] bg-white p-3">
                      <p className="mb-2 text-[11.5px] font-bold text-black leading-snug">오늘의 시간표<br/>🕒📖</p>
                      <div className="space-y-1">
                        {TIMETABLE.map(row => (
                          <div key={row.period} className="flex items-baseline justify-end gap-1">
                            <span className="text-[10px] text-[#8a8a8a]">{row.period}.</span>
                            <span className="text-[11px] font-medium text-[#18181b]">{row.subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative min-h-[136px] w-0 flex-1" style={{ perspective: 500 }}>
                      <motion.div
                        className="absolute inset-0 rounded-[13px] bg-white p-3"
                        style={{ backfaceVisibility: 'hidden' }}
                        animate={{ rotateY: mealFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                      >
                        <p className="text-[11.5px] font-bold text-black">오늘의 중식🍚</p>
                        <p className="mb-1.5 mt-0.5 text-[8px] text-[#6b7280]">클릭하시면 바뀝니다!</p>
                        <DishRows dishes={LUNCH} />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 rounded-[13px] bg-white p-3"
                        style={{ backfaceVisibility: 'hidden' }}
                        initial={{ rotateY: -180 }}
                        animate={{ rotateY: mealFlipped ? 0 : -180 }}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                      >
                        <p className="text-[11.5px] font-bold text-black">오늘의 석식🍚</p>
                        <p className="mb-1.5 mt-0.5 text-[8px] text-[#6b7280]">클릭하시면 바뀝니다!</p>
                        <DishRows dishes={DINNER} />
                      </motion.div>
                    </div>
                  </div>

                  <div className="mb-2.5 flex gap-1.5">
                    {QUICK_TABS.map(tab => (
                      <div key={tab.key} className="flex aspect-square flex-1 flex-col items-center justify-center gap-1 rounded-[13px]" style={{ background: 'rgba(230,230,230,0.55)' }}>
                        <QuickIcon type={tab.icon} color={POINT} />
                        <span className="text-[8px] font-semibold text-black whitespace-nowrap">{tab.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="relative overflow-hidden rounded-[14px]">
                    <motion.div
                      className="flex"
                      animate={{ x: `-${bannerIdx * 100}%` }}
                      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                    >
                      {EVENT_BANNERS.map(b => (
                        <div key={b.id} className="flex w-full flex-shrink-0 flex-col items-center justify-center py-4" style={{ background: b.bg }}>
                          <span className="text-[11px] font-extrabold text-white">{b.title}</span>
                          <span className="text-[9px] text-white/80">{b.subtitle}</span>
                        </div>
                      ))}
                    </motion.div>
                    <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1">
                      {EVENT_BANNERS.map((b, i) => (
                        <span key={b.id} className="h-1 w-1 rounded-full" style={{ background: i === bannerIdx ? '#fff' : 'rgba(255,255,255,0.45)' }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="text-[12px] font-semibold text-[#18181b]">즐겨찾는 게시판</p>
                    <span className="text-[9.5px] text-[#9b9ba3]">더 보기 ›</span>
                  </div>
                  <div className={`${card} mb-2.5 px-3.5`}>
                    {BOARDS.map(board => (
                      <div key={board.id} className="flex items-center gap-2 border-b border-[#f4f4f6] py-[9px] last:border-0">
                        <span className="text-[11px] font-semibold text-[#18181b] flex-shrink-0">{board.name}</span>
                        {board.isNew && (
                          <span className="grid h-3.5 w-3.5 flex-shrink-0 place-items-center rounded-full bg-[#ff4848] text-[7.5px] font-extrabold text-white">N</span>
                        )}
                        <span className="flex-1 truncate text-right text-[10px] text-[#6b6b73]">{board.latest}</span>
                        <Chevron />
                      </div>
                    ))}
                  </div>

                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="text-[12px] font-semibold text-[#18181b]">커뮤니티 최신글</p>
                    <span className="text-[9.5px] text-[#9b9ba3]">더 보기 ›</span>
                  </div>
                  <div className="flex gap-2">
                    {HOME_POSTS.map(post => (
                      <div key={post.id} className={`${card} w-0 flex-1 p-2.5`}>
                        <span className="inline-block rounded-md px-1 py-0.5 text-[8px] font-bold" style={{ background: ET_SOFT, color: ET }}>{post.board}</span>
                        <p className="mt-1 text-[10px] font-semibold leading-snug text-[#18181b] line-clamp-2">{post.title}</p>
                        <div className="mt-1 flex gap-1.5 text-[8px] text-[#9b9ba3]">
                          <span>{post.nickname}</span>
                          <span style={{ color: ET }}>댓글 {post.comments}</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. 피드 */}
        <AnimatePresence mode="wait">
          {phase === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-white px-5 pt-3"
            >
              <div className="mb-2.5 flex items-start justify-between">
                <div>
                  <h2 className="text-[16px] font-extrabold tracking-tight text-[#18181b]">피드</h2>
                  <p className="mt-0.5 text-[9px] text-[#9b9ba3]">학교의 공지사항을 모아볼 수 있어요</p>
                </div>
                <div className="grid h-7 w-7 place-items-center rounded-full border border-[#ececef]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b6b73" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
              </div>

              <div className="mb-3 flex gap-1.5">
                {FEED_CATS.map(cat => {
                  const on = feedCat === cat.key;
                  return (
                    <motion.span
                      key={cat.key}
                      animate={on ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-full border px-3 py-1 text-[9px] font-bold"
                      style={on && cat.key !== '전체'
                        ? { background: cat.soft, color: cat.color, borderColor: 'transparent' }
                        : on
                          ? { background: '#f0f0f2', color: '#18181b', borderColor: 'transparent' }
                          : { background: '#fff', color: '#6b6b73', borderColor: '#ececef' }}
                    >
                      {cat.key}
                    </motion.span>
                  );
                })}
              </div>

              <motion.div layout className="grid grid-cols-2 gap-2.5">
                <AnimatePresence mode="popLayout">
                  {filteredFeed.map((post, i) => (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                      className="rounded-2xl border border-[#f0f0f2] bg-white p-3.5"
                    >
                      {post.isNew && (
                        <span className="mb-1.5 inline-block rounded-full bg-[#ff4848] px-1.5 py-0.5 text-[7px] font-extrabold tracking-wide text-white">NEW</span>
                      )}
                      <h3 className="text-[11.5px] font-bold leading-snug text-[#18181b]">{post.title}</h3>
                      <p className="mt-1 text-[10px] leading-relaxed text-[#6b6b73] line-clamp-2">{post.content}</p>
                      <button className="mt-1 text-[8.5px] text-[#9b9ba3]">더보기 ▼</button>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. 공부방 — 실제 와이드처럼 좌(타이머·과목) / 우(랭킹) 2단 */}
        <AnimatePresence mode="wait">
          {phase === 'study' && (
            <motion.div
              key="study"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-white px-6 pt-4"
            >
              <div className="flex gap-8">
                <div className="min-w-0 flex-1">
                  <div className="flex items-end justify-between">
                    <div className="pt-1">
                      <p className="text-[11px] font-semibold text-[#00c473]">수학Ⅱ 공부 중</p>
                      <p className="mt-0.5 text-[28px] font-extrabold tabular-nums tracking-[-1px] text-[#191f28]">{studyTime}</p>
                      <div className="mt-2 flex gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#f2f4f6] px-2.5 py-1">
                          <span className="text-[8.5px] text-[#8b95a1]">이번 주</span>
                          <b className="text-[8.5px] text-[#191f28]">12시간 40분</b>
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#f2f4f6] px-2.5 py-1">
                          <span className="text-[8.5px] text-[#8b95a1]">상태</span>
                          <b className="text-[8.5px] text-[#191f28]">공부 중</b>
                        </span>
                      </div>
                      <div className="mt-3 grid h-10 w-10 place-items-center rounded-full bg-[#bcbcbc]">
                        <span className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
                      </div>
                    </div>

                    <div className="relative pr-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/studygirl.webp"
                        alt=""
                        width={110}
                        height={68}
                        className="pointer-events-none -scale-x-100 object-contain"
                        style={{ width: 110, height: 68 }}
                      />
                      <motion.span
                        initial={{ opacity: 0, y: 4, scale: 0.96, rotate: -15 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: -15 }}
                        transition={{ duration: 0.35, delay: 0.4 }}
                        className="absolute max-w-[110px] whitespace-nowrap rounded-[11px] border border-[#b0b8c1] bg-white px-2.5 py-1 text-center text-[9px] font-bold leading-tight text-[#191f28]"
                        style={{ bottom: 62, right: 68 }}
                      >
                        수학Ⅱ 같이 해요!
                        <span className="absolute -bottom-[5px] right-3 h-[9px] w-[9px] rotate-45 border-b border-r border-[#b0b8c1] bg-white" />
                      </motion.span>
                    </div>
                  </div>

                  <div className="mx-auto my-3 h-px w-full bg-[#f2f4f6]" />

                  <div className="flex gap-2">
                    {STUDY_SUBJECTS.map(s => (
                      <div key={s.name} className="flex flex-1 items-center justify-between rounded-lg px-3 py-2.5" style={{ background: s.bg }}>
                        <span className="text-[10px] font-bold" style={{ color: s.fg }}>{s.name}</span>
                        <span className="text-[10px] font-semibold" style={{ color: s.fg }}>{s.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 랭킹 (study-main-right) */}
                <div className="w-[240px] flex-shrink-0">
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="text-[12px] font-extrabold text-[#191f28]">랭킹</p>
                    <div className="flex overflow-hidden rounded-lg bg-[#f2f4f6] p-0.5 text-[9px] font-semibold">
                      <span className="rounded-md bg-white px-2 py-0.5 text-[#191f28] shadow-sm">오늘</span>
                      <span className="px-2 py-0.5 text-[#8b95a1]">이번 주</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#f2f4f6] bg-white px-3">
                    {STUDY_RANKING.map((u, i) => (
                      <motion.div
                        key={u.rank}
                        initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
                        className="flex items-center gap-2.5 border-b border-[#f2f4f6] py-[9px] last:border-0"
                      >
                        <span className="w-4 text-center text-[11px] font-extrabold" style={{ color: u.color }}>{u.rank}</span>
                        <div className="relative">
                          <div className="grid h-6 w-6 place-items-center rounded-full bg-[#f2f4f6]">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8b95a1" strokeWidth="1.8" strokeLinecap="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                          </div>
                          {u.active && (
                            <motion.span
                              animate={{ opacity: [1, 0.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-white bg-[#00c473]"
                            />
                          )}
                        </div>
                        <span className="flex-1 text-[10.5px] font-semibold text-[#191f28]">{u.name}</span>
                        <span className="text-[9.5px] tabular-nums text-[#8b95a1]">{u.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. 커뮤니티 — 좌(게시판) / 우(인기글) */}
        <AnimatePresence mode="wait">
          {phase === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-white px-5 pt-3"
            >
              <p className="pb-1 text-[14px] font-extrabold text-[#18181b]">게시판</p>
              <div className="flex gap-6">
                <div className="min-w-0 flex-[1.2]">
                  <p className="pb-1 pt-1 text-[9px] font-bold text-[#9b9ba3]">학교 게시판</p>
                  {CAFE_BOARDS.map((board, i) => (
                    <motion.div
                      key={board.id}
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: i * 0.08 }}
                      className="flex items-center gap-2.5 border-b border-[#f0f0f2] py-[11px]"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1 text-[11.5px] font-bold text-[#18181b]">
                          {board.name}
                          {board.isNew && (
                            <motion.span
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.3 + i * 0.08 }}
                              className="grid h-3.5 w-3.5 place-items-center rounded-full text-[7.5px] font-extrabold text-white"
                              style={{ background: ET }}
                            >N</motion.span>
                          )}
                        </p>
                        <p className="mt-0.5 text-[9.5px] text-[#9b9ba3]">{board.desc}</p>
                      </div>
                      <Chevron color="#cdced3" />
                    </motion.div>
                  ))}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between pb-1 pt-1">
                    <p className="text-[11px] font-extrabold text-[#18181b]">🔥 이번 주 인기글</p>
                    <span className="text-[9px] text-[#9b9ba3]">전체보기</span>
                  </div>
                  <div className="space-y-2">
                    {HOT_POSTS.map((post, i) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 + i * 0.1 }}
                        className={`${card} p-3`}
                        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
                      >
                        <p className="text-[10.5px] font-bold leading-snug text-[#18181b] line-clamp-2">{post.title}</p>
                        <p className="mt-0.5 text-[9px] text-[#9b9ba3] truncate">{post.content}</p>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span className="rounded-md px-1 py-0.5 text-[8px] font-bold" style={{ background: ET_SOFT, color: ET }}>{post.board}</span>
                          <span className="flex items-center gap-0.5 text-[8.5px] text-[#f04452]">
                            <svg width="8" height="8" viewBox="0 0 512 512" fill="currentColor"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-0.5 text-[8.5px] text-[#9b9ba3]">
                            <svg width="8" height="8" viewBox="0 0 512 512" fill="currentColor"><path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"/></svg>
                            {post.comments}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. 마이 — 좌(프로필·내 활동) / 우(계정 설정) */}
        <AnimatePresence mode="wait">
          {phase === 'my' && (
            <motion.div
              key="my"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-[#f2f4f6] px-5 pt-4"
            >
              <div className="flex gap-3">
                <div className="min-w-0 flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 rounded-[20px] bg-white p-4"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                  >
                    <div className="relative">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-[#f2f4f6]">
                        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full border-2 border-white bg-[#3182f6]">
                        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                        </svg>
                      </span>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold tracking-tight text-[#191f28]">김하늘</p>
                      <p className="mt-0.5 text-[10px] font-medium text-[#8b95a1]">2학년 3반 · 하늘이</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <p className="mx-1 mb-1.5 mt-3 text-[9.5px] font-semibold text-[#8b95a1]">내 활동</p>
                    <div className="rounded-[20px] bg-white px-4 py-0.5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                      {MY_ACTIVITY.map((label, i) => (
                        <div key={label} className="flex items-center justify-between py-[11px]"
                          style={{ borderBottom: i < MY_ACTIVITY.length - 1 ? '1px solid #f2f4f6' : 'none' }}>
                          <span className="text-[11px] font-medium text-[#191f28]">{label}</span>
                          <Chevron color="#c4c9d0" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="min-w-0 flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    <p className="mx-1 mb-1.5 text-[9.5px] font-semibold text-[#8b95a1]">계정 설정</p>
                    <div className="rounded-[20px] bg-white px-4 py-0.5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                      {MY_ACCOUNT.map((row, i) => (
                        <div key={row.label} className="flex items-center justify-between py-[11px]"
                          style={{ borderBottom: i < MY_ACCOUNT.length - 1 ? '1px solid #f2f4f6' : 'none' }}>
                          <span className="text-[11px] font-medium text-[#191f28]">{row.label}</span>
                          <span className="flex items-center gap-1.5">
                            {row.value && <span className="text-[9.5px] text-[#8b95a1]">{row.value}</span>}
                            <Chevron color="#c4c9d0" />
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="mx-1 mb-1.5 mt-3 text-[9.5px] font-semibold text-[#8b95a1]">계정</p>
                    <div className="rounded-[20px] bg-white px-4 py-0.5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                      <div className="flex items-center justify-between border-b border-[#f2f4f6] py-[11px]">
                        <span className="text-[11px] font-medium text-[#191f28]">로그아웃</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#c4c9d0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                      </div>
                      <div className="flex items-center justify-between py-[11px]">
                        <span className="text-[11px] font-medium text-[#f04452]">계정 삭제</span>
                        <Chevron color="#c4c9d0" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
