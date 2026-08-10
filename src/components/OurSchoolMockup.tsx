'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function sleep(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms));
}

/* ── BSSJ-HS-dev 실제 CSS 토큰 ──
   --point: #5b6cff / 탭 활성 #555, 비활성 rgb(142,142,147)
   홈 배경 #f4f4f5 / 카드 border #f0f0f2 / N배지(홈) #ff4848
   커뮤니티 --et-primary #7db1ff / 마이 배경 #f2f4f6, 카메라 배지 #3182f6 */
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
];

const LUNCH  = ['차수수밥', '제육볶음', '맑은미역국', '수박'];
const DINNER = ['카레라이스', '치킨너겟', '어묵국', '요구르트'];

/* 홈 바로가기 — 학생증 + 실제 maintabs(식단표·시간표·조퇴외출·상벌점·자리배치) */
const QUICK_TABS = [
  { key: 'id',    label: '학생증',   icon: 'id' },
  { key: 'meal',  label: '식단표',   icon: 'meal' },
  { key: 'time',  label: '시간표',   icon: 'time' },
  { key: 'leave', label: '조퇴·외출', icon: 'leave' },
  { key: 'merit', label: '상벌점',   icon: 'star' },
  { key: 'seats', label: '자리배치', icon: 'shuffle' },
] as const;

type BoardData = { id: number; name: string; latest: string; isNew: boolean };

const HOME_BOARDS: BoardData[] = [
  { id: 1, name: '공지사항',   latest: '여름방학 방과후 신청 안내',   isNew: true },
  { id: 2, name: '자유게시판', latest: '체육대회 반티 정한 반 있음?', isNew: false },
];

const NEW_HOME_BOARD: BoardData = {
  id: 3, name: '급식평가', latest: '오늘 제육 역대급이었다 인정?', isNew: true,
};

/* 홈 이벤트 배너 (HomeEventBanner BANNERS와 동일) */
const EVENT_BANNERS = [
  { id: 1, title: '이벤트 광고 배너', subtitle: '여기에 광고를 넣으세요', bg: 'linear-gradient(120deg, #6a8dff, #9d7bff)' },
  { id: 2, title: '두 번째 슬라이드', subtitle: 'BANNERS 배열을 수정해 교체', bg: 'linear-gradient(120deg, #ff8a5b, #ff5b7f)' },
];

/* 홈 커뮤니티 최신글 (HomeCommunity hc-card) */
const HOME_POSTS = [
  { id: 1, board: '자유게시판', title: '축제 무대 라인업 미리 아는 사람 ㄷㄷ', nickname: '익명', comments: 5, time: '5분 전' },
  { id: 2, board: '급식평가', title: '석식 카레 나오는 날은 무조건 남는다', nickname: '카레단', comments: 4, time: '23분 전' },
];

/* 피드(feed/page.tsx) — 카테고리 칩 색상은 실제 CAT_META 값 */
const FEED_CATS = [
  { key: '전체',     color: '#6b6b73', soft: '#fff' },
  { key: '공지사항', color: '#10b981', soft: 'rgba(16,185,129,0.13)' },
  { key: '시험범위', color: '#5656e3', soft: 'rgba(86,86,227,0.13)' },
  { key: '수행평가', color: '#f59e0b', soft: 'rgba(245,158,11,0.15)' },
] as const;

type FeedPost = { id: number; cat: string; title: string; content: string; isNew: boolean };

const FEED_POSTS: FeedPost[] = [
  { id: 1, cat: '공지사항', title: '여름방학 방과후학교 수강 신청 안내', content: '7월 18일(금)까지 담임 선생님께 신청서를 제출해 주세요. 기간 이후에는 신청이 어렵습니다.', isNew: true },
  { id: 2, cat: '시험범위', title: '2학기 기말고사 수학Ⅱ 시험범위', content: '교과서 p.132~188 (미분법 전체), 프린트 3회분 포함입니다.', isNew: true },
  { id: 3, cat: '수행평가', title: '영어Ⅱ 말하기 수행평가 일정 안내', content: '다음 주 화요일부터 번호순으로 진행합니다. 주제는 자유입니다.', isNew: false },
];

/* 공부방(study/page.tsx) — 과목 색 팔레트는 실제 SUBJECT_COLORS 값 */
const STUDY_SUBJECTS = [
  { name: '수학Ⅱ', time: '1시간 12분', bg: 'rgba(138,156,255,0.14)', fg: '#5b6cff' },
  { name: '영어Ⅱ', time: '48분',      bg: 'rgba(0,196,115,0.14)',   fg: '#00a866' },
];

const STUDY_RANKING = [
  { rank: 1, name: '김하늘', time: '2시간 10분', active: true,  color: '#f59e0b' },
  { rank: 2, name: '이준서', time: '1시간 55분', active: false, color: '#9ca3af' },
  { rank: 3, name: '박서연', time: '1시간 21분', active: true,  color: '#d97706' },
];

/* 커뮤니티(cafe/page.tsx) — 게시판 목록 + 인기글 */
const CAFE_BOARDS = [
  { id: 1, name: '자유게시판', desc: '자유롭게 이야기해요',        isNew: true },
  { id: 2, name: '급식평가',   desc: '오늘 급식 어땠나요?',        isNew: true },
  { id: 3, name: '스터디모집', desc: '함께 공부할 친구를 찾아요',  isNew: false },
];

const HOT_POSTS = [
  { id: 1, title: '축제 무대 라인업 미리 아는 사람 ㄷㄷ', content: '작년보다 훨씬 커졌다는 소문이...', board: '자유게시판', likes: 12, comments: 5 },
  { id: 2, title: '석식 카레 나오는 날은 무조건 남는다', content: '오늘도 어김없이 석식 존버 성공', board: '급식평가', likes: 8, comments: 4 },
];

/* 마이(setting/page.tsx) — 실제 페이지 구성 그대로 */
const MY_ACTIVITY = ['내가 쓴 글', '댓글 단 글', '좋아요한 글'];
const MY_TOOLS = ['내 통계', '통합 검색', '알림 설정'];
const MY_ACCOUNT: { label: string; value?: string }[] = [
  { label: '닉네임 변경', value: '하늘이' },
  { label: '학년·반·번호 변경', value: '2학년 3반 26번' },
  { label: '비밀번호 변경' },
  { label: '학교 변경', value: '한별고등학교' },
];

/* 마이 시간표 그리드 — study SUBJECT_COLORS 팔레트 재사용 */
const TT_DAYS = ['월', '화', '수', '목', '금'];
const TT_GRID: { s: string; c: number }[][] = [
  [{ s: '문학', c: 0 }, { s: '수학Ⅱ', c: 1 }, { s: '영어Ⅱ', c: 2 }, { s: '체육', c: 5 }],
  [{ s: '수학Ⅱ', c: 1 }, { s: '물리Ⅰ', c: 3 }, { s: '문학', c: 0 }, { s: '한국사', c: 4 }],
  [{ s: '영어Ⅱ', c: 2 }, { s: '문학', c: 0 }, { s: '수학Ⅱ', c: 1 }, { s: '물리Ⅰ', c: 3 }],
  [{ s: '한국사', c: 4 }, { s: '체육', c: 5 }, { s: '영어Ⅱ', c: 2 }, { s: '수학Ⅱ', c: 1 }],
  [{ s: '물리Ⅰ', c: 3 }, { s: '영어Ⅱ', c: 2 }, { s: '한국사', c: 4 }, { s: '문학', c: 0 }],
];
const TT_COLORS = [
  { bg: 'rgba(138,156,255,0.14)', fg: '#5b6cff' },
  { bg: 'rgba(0,196,115,0.14)',   fg: '#00a866' },
  { bg: 'rgba(255,159,67,0.16)',  fg: '#e07b1a' },
  { bg: 'rgba(240,68,82,0.13)',   fg: '#e23b48' },
  { bg: 'rgba(165,94,234,0.15)',  fg: '#8b46d6' },
  { bg: 'rgba(38,198,218,0.16)',  fg: '#0f9bb0' },
];

/* ── 아이콘 ── */
function QuickIcon({ type, color }: { type: string; color: string }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
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

/* 하단 네브 아이콘 (heroicons 26px 스케일) */
function NavIcon({ type, color, size = 19 }: { type: string; color: string; size?: number }) {
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

/* 급식·시간표 리스트 — dish-list-box: 오른쪽 정렬, 번호 #8a8a8a */
function DishRows({ dishes }: { dishes: string[] }) {
  return (
    <div className="space-y-1">
      {dishes.map((dish, i) => (
        <div key={i} className="flex items-baseline justify-end gap-1">
          <span className="text-[9px] text-[#8a8a8a]">{i + 1}.</span>
          <span className="text-[10px] font-medium text-[#18181b] truncate">{dish}</span>
        </div>
      ))}
    </div>
  );
}

/* 홈 게시판 행 (HomeBoards: 이름 + N(#ff4848) + 최신글 우측 + 셰브런) */
function BoardRow({ board, isNew }: { board: BoardData; isNew?: boolean }) {
  return (
    <div className="flex items-center gap-2 py-2.5 border-b border-[#f4f4f6] last:border-0">
      <span className="text-[10.5px] font-semibold text-[#18181b] flex-shrink-0">{board.name}</span>
      {board.isNew && (
        <motion.span
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          className="grid h-3.5 w-3.5 flex-shrink-0 place-items-center rounded-full bg-[#ff4848] text-[7px] font-extrabold text-white"
        >N</motion.span>
      )}
      {isNew && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-[8px] font-bold tracking-wide flex-shrink-0" style={{ color: POINT }}
        >NEW</motion.span>
      )}
      <span className="flex-1 truncate text-right text-[9.5px] text-[#6b6b73]">{board.latest}</span>
      <Chevron color="#c4c4c9" size={8} />
    </div>
  );
}

/* 홈 섹션 라벨 (home-title 16px 600 + 더 보기 12px #9b9ba3) */
function SectionHead({ title }: { title: string }) {
  return (
    <div className="mb-1.5 flex items-center justify-between">
      <p className="text-[11px] font-semibold text-[#18181b]">{title}</p>
      <span className="text-[8.5px] text-[#9b9ba3]">더 보기 ›</span>
    </div>
  );
}

/* ── 메인 ── */
export default function OurSchoolMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const [phase,        setPhase]        = useState<Phase>('home');
  const [homeVisible,  setHomeVisible]  = useState(false);
  const [mealFlipped,  setMealFlipped]  = useState(false);
  const [tabsVisible,  setTabsVisible]  = useState(false);
  const [boardsVisible, setBoardsVisible] = useState(false);
  const [newBoardVisible, setNewBoardVisible] = useState(false);
  const [bannerIdx,    setBannerIdx]    = useState(0);
  const [bellBadge,    setBellBadge]    = useState(false);
  const [idOpen,       setIdOpen]       = useState(false);
  const [idFlipped,    setIdFlipped]    = useState(false);
  const [idPressed,    setIdPressed]    = useState(false);
  const [feedVisible,  setFeedVisible]  = useState(false);
  const [feedCat,      setFeedCat]      = useState('전체');
  const [studyVisible, setStudyVisible] = useState(false);
  const [commVisible,  setCommVisible]  = useState(false);
  const [myVisible,    setMyVisible]    = useState(false);
  const [myScroll,     setMyScroll]     = useState(0);
  const [darkMode,     setDarkMode]     = useState(false);
  const [now,          setNow]          = useState<Date | null>(null);
  const [studySec,     setStudySec]     = useState(42 * 60 + 7);

  /* 실시간 시계(학생증) + 공부 타이머 틱 */
  useEffect(() => {
    if (!isInView) return;
    setNow(new Date());
    const t = setInterval(() => {
      setNow(new Date());
      setStudySec(s => s + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        /* ── 리셋 ── */
        setPhase('home'); setHomeVisible(false); setMealFlipped(false);
        setTabsVisible(false); setBoardsVisible(false); setNewBoardVisible(false);
        setBannerIdx(0); setBellBadge(false);
        setIdOpen(false); setIdFlipped(false); setIdPressed(false);
        setFeedVisible(false); setFeedCat('전체'); setStudyVisible(false);
        setCommVisible(false); setMyVisible(false); setMyScroll(0); setDarkMode(false);
        await sleep(450); if (cancelled) return;

        /* ── 1. 홈 ── */
        setHomeVisible(true);
        await sleep(550); if (cancelled) return;
        setTabsVisible(true);
        await sleep(450); if (cancelled) return;
        setBoardsVisible(true);
        await sleep(1000); if (cancelled) return;

        setMealFlipped(true);                         /* 급식 중식→석식 플립 */
        await sleep(1100); if (cancelled) return;

        setNewBoardVisible(true); setBellBadge(true); /* 새 글 + 알림 배지 */
        await sleep(900); if (cancelled) return;
        setBannerIdx(1);                              /* 배너 자동 슬라이드 */
        await sleep(900); if (cancelled) return;

        setIdPressed(true);                           /* 학생증 모달 */
        await sleep(320); if (cancelled) return;
        setIdPressed(false); setIdOpen(true);
        await sleep(1400); if (cancelled) return;
        setIdFlipped(true);
        await sleep(1400); if (cancelled) return;
        setIdOpen(false);
        await sleep(550); if (cancelled) return;

        /* ── 2. 피드 ── */
        setPhase('feed');
        await sleep(400); if (cancelled) return;
        setFeedVisible(true);
        await sleep(1400); if (cancelled) return;
        setFeedCat('시험범위');                        /* 카테고리 칩 필터 */
        await sleep(1400); if (cancelled) return;

        /* ── 3. 공부방 ── */
        setPhase('study');
        await sleep(400); if (cancelled) return;
        setStudyVisible(true);
        await sleep(3000); if (cancelled) return;

        /* ── 4. 커뮤니티 — 하단 네브가 알약 네브로 전환 ── */
        setPhase('community');
        await sleep(450); if (cancelled) return;
        setCommVisible(true);
        await sleep(3000); if (cancelled) return;

        /* ── 5. 마이 — 뒤로가기로 알약 네브 해제 후 이동 ── */
        setPhase('my');
        await sleep(400); if (cancelled) return;
        setMyVisible(true);
        await sleep(1400); if (cancelled) return;
        setMyScroll(1);                               /* 스크롤: 시간표·화면 섹션 */
        await sleep(1100); if (cancelled) return;
        setDarkMode(true);                            /* 다크 모드 토글 */
        await sleep(1400); if (cancelled) return;
        setDarkMode(false);
        await sleep(700); if (cancelled) return;
        setMyScroll(2);                               /* 스크롤: 계정 설정~계정 */
        await sleep(1700);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [isInView]);

  const two = (n: number) => String(n).padStart(2, '0');
  const clock = now ? `${two(now.getHours())}:${two(now.getMinutes())}:${two(now.getSeconds())}` : '--:--:--';
  const studyTime = `${Math.floor(studySec / 60)}분 ${studySec % 60}초`;

  const filteredFeed = feedCat === '전체' ? FEED_POSTS : FEED_POSTS.filter(p => p.cat === feedCat);

  /* 마이페이지 다크 모드 색 */
  const myBg   = darkMode ? '#15171c' : '#f2f4f6';
  const myCard = darkMode ? '#1f232b' : '#ffffff';
  const myBorder = darkMode ? '#2a2f38' : 'transparent';
  const myText = darkMode ? '#f1f2f4' : '#191f28';
  const mySub  = darkMode ? '#9aa0a8' : '#8b95a1';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-white overflow-hidden"
    >

      {/* ── 컨텐츠 (헤더는 실제 앱처럼 페이지별로 렌더) ── */}
      {/* 리프챗 목업과 전체 폰 높이 동일: 리프챗은 헤더(≈45px)+프로그레스(2px)가
          440px 콘텐츠 밖에 있고, 여기는 페이지별 헤더가 콘텐츠 안에 있어 그만큼 더한다 */}
      <div className="relative overflow-hidden" style={{ minHeight: 487 }}>

        {/* 1. 홈 (HomeMain / 배경 #f4f4f5) */}
        <AnimatePresence mode="wait">
          {phase === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 overflow-hidden bg-[#f4f4f5]"
            >
              {/* nav-home: 배경 동일(#f4f4f5), 테두리 없음 */}
              <div className="flex items-center justify-between px-4 py-2.5">
                <span className="text-[12px] font-bold text-[#191f28]">한별고등학교</span>
                <div className="flex items-center gap-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#191f28" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <div className="relative">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#191f28" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
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
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-[#e4e4e7]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="px-3.5 pt-1">
                {/* 시간표+급식: 회색 배경 위 흰 카드 두 장 (compact-meal .etc-container:
                    radius 0.8rem, padding 10px, 테두리 없음, 49%+49%) */}
                <AnimatePresence>
                  {homeVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="mb-2.5 flex gap-1.5"
                    >
                      <div className="min-h-[112px] w-0 flex-1 rounded-[13px] bg-white p-2.5">
                        <p className="mb-2 text-[10.5px] font-bold text-black leading-snug">오늘의 시간표<br/>🕒📖</p>
                        <div className="space-y-1">
                          {TIMETABLE.map(row => (
                            <div key={row.period} className="flex items-baseline justify-end gap-1">
                              <span className="text-[9px] text-[#8a8a8a]">{row.period}.</span>
                              <span className="text-[10px] font-medium text-[#18181b]">{row.subject}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 급식 플립 카드 (meal-container perspective 500 / 제목 + subtitle 9px) */}
                      <div className="relative min-h-[112px] w-0 flex-1" style={{ perspective: 500 }}>
                        <motion.div
                          className="absolute inset-0 rounded-[13px] bg-white p-2.5"
                          style={{ backfaceVisibility: 'hidden' }}
                          animate={{ rotateY: mealFlipped ? 180 : 0 }}
                          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        >
                          <p className="text-[10.5px] font-bold text-black">오늘의 중식🍚</p>
                          <p className="mb-1.5 mt-0.5 text-[7px] text-[#6b7280]">클릭하시면 바뀝니다!</p>
                          <DishRows dishes={LUNCH} />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 rounded-[13px] bg-white p-2.5"
                          style={{ backfaceVisibility: 'hidden' }}
                          initial={{ rotateY: -180 }}
                          animate={{ rotateY: mealFlipped ? 0 : -180 }}
                          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        >
                          <p className="text-[10.5px] font-bold text-black">오늘의 석식🍚</p>
                          <p className="mb-1.5 mt-0.5 text-[7px] text-[#6b7280]">클릭하시면 바뀝니다!</p>
                          <DishRows dishes={DINNER} />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 바로가기 (.box: 회색 타일 + --point 아이콘 + 검정 라벨) */}
                <div className="mb-2.5 flex gap-1.5">
                  <AnimatePresence>
                    {tabsVisible && QUICK_TABS.map((tab, i) => (
                      <motion.div
                        key={tab.key}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.28, delay: i * 0.06 }}
                        className="flex-1"
                      >
                        <motion.div
                          animate={tab.key === 'id' && idPressed ? { scale: 0.88 } : { scale: 1 }}
                          transition={{ duration: 0.18 }}
                          className="flex aspect-square flex-col items-center justify-center gap-1 rounded-[13px]"
                          style={{ background: 'rgba(230,230,230,0.55)' }}
                        >
                          <QuickIcon type={tab.icon} color={POINT} />
                          <span className="text-[7px] font-semibold text-black whitespace-nowrap">{tab.label}</span>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* 이벤트 배너 슬라이드 (HomeEventBanner) */}
                <AnimatePresence>
                  {boardsVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.32 }}
                      className="relative mb-2.5 overflow-hidden rounded-[14px]"
                    >
                      <motion.div
                        className="flex"
                        animate={{ x: `-${bannerIdx * 100}%` }}
                        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                      >
                        {EVENT_BANNERS.map(b => (
                          <div key={b.id} className="flex w-full flex-shrink-0 flex-col items-center justify-center py-3" style={{ background: b.bg }}>
                            <span className="text-[10px] font-extrabold text-white">{b.title}</span>
                            <span className="text-[8px] text-white/80">{b.subtitle}</span>
                          </div>
                        ))}
                      </motion.div>
                      <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-1">
                        {EVENT_BANNERS.map((b, i) => (
                          <span key={b.id} className="h-1 w-1 rounded-full" style={{ background: i === bannerIdx ? '#fff' : 'rgba(255,255,255,0.45)' }} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 즐겨찾는 게시판 (HomeBoards: radius 14 / border #f0f0f2) */}
                <AnimatePresence>
                  {boardsVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                    >
                      <SectionHead title="즐겨찾는 게시판" />
                      <div className="rounded-[14px] border border-[#f0f0f2] bg-white px-3">
                        <AnimatePresence>
                          {newBoardVisible && (
                            <motion.div
                              initial={{ opacity: 0, y: -24, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: 'auto' }}
                              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <BoardRow board={NEW_HOME_BOARD} isNew />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {HOME_BOARDS.map((board, i) => (
                          <motion.div
                            key={board.id}
                            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                          >
                            <BoardRow board={board} />
                          </motion.div>
                        ))}
                      </div>

                      {/* 커뮤니티 최신글 (HomeCommunity hc-card / et-chip #7db1ff) */}
                      <div className="mt-2.5">
                        <SectionHead title="커뮤니티 최신글" />
                        <div className="flex gap-2">
                          {HOME_POSTS.map(post => (
                            <div key={post.id} className="w-[150px] flex-shrink-0 rounded-[14px] border border-[#f0f0f2] bg-white p-2.5">
                              <span className="inline-block rounded-md px-1 py-0.5 text-[7.5px] font-bold" style={{ background: ET_SOFT, color: ET }}>{post.board}</span>
                              <p className="mt-1 text-[9.5px] font-semibold leading-snug text-[#18181b] line-clamp-2">{post.title}</p>
                              <div className="mt-1 flex gap-1.5 text-[7.5px] text-[#9b9ba3]">
                                <span>{post.nickname}</span>
                                <span style={{ color: ET }}>댓글 {post.comments}</span>
                                <span>{post.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. 피드 (feed/page.tsx: fd-header 22px + 칩바 + fd-card) */}
        <AnimatePresence mode="wait">
          {phase === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 overflow-hidden bg-white px-4 pt-3.5"
            >
              {/* fd-header */}
              <div className="mb-2.5 flex items-start justify-between">
                <div>
                  <h2 className="text-[15px] font-extrabold tracking-tight text-[#18181b]">피드</h2>
                  <p className="mt-0.5 text-[8.5px] text-[#9b9ba3]">학교의 공지사항을 모아볼 수 있어요</p>
                </div>
                <div className="grid h-7 w-7 place-items-center rounded-full border border-[#ececef]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b6b73" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
              </div>

              {/* 카테고리 칩 (fd-chip: 13px 700, border #ececef, 회색 텍스트) */}
              <div className="mb-3 flex gap-1.5">
                {FEED_CATS.map(cat => {
                  const on = feedCat === cat.key;
                  return (
                    <motion.span
                      key={cat.key}
                      animate={on ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-full border px-2.5 py-1 text-[8.5px] font-bold"
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

              {/* fd-card: radius 16 / border #f0f0f2 / NEW 빨간 알약 배지 */}
              <AnimatePresence mode="popLayout">
                {feedVisible && filteredFeed.map((post, i) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, delay: feedVisible ? i * 0.1 : 0 }}
                    className="mb-2.5 rounded-2xl border border-[#f0f0f2] bg-white p-3"
                  >
                    {post.isNew && (
                      <span className="mb-1.5 inline-block rounded-full bg-[#ff4848] px-1.5 py-0.5 text-[6.5px] font-extrabold tracking-wide text-white">NEW</span>
                    )}
                    <h3 className="text-[11px] font-bold leading-snug text-[#18181b]">{post.title}</h3>
                    <p className="mt-1 text-[9.5px] leading-relaxed text-[#6b6b73] line-clamp-2">{post.content}</p>
                    <button className="mt-1 text-[8px] text-[#9b9ba3]">더보기 ▼</button>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. 공부방 (study/page.tsx — 색은 style.css 토큰 그대로) */}
        <AnimatePresence mode="wait">
          {phase === 'study' && (
            <motion.div
              key="study"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 overflow-hidden bg-white px-4 pt-3.5"
            >
              <AnimatePresence>
                {studyVisible && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="mb-1 flex items-end justify-between"
                    >
                      <div className="pt-1">
                        <p className="text-[10px] font-semibold text-[#00c473]">수학Ⅱ 공부 중</p>
                        <p className="mt-0.5 text-[24px] font-extrabold tabular-nums tracking-[-1px] text-[#191f28]">{studyTime}</p>
                        <div className="mt-2 flex gap-1.5">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#f2f4f6] px-2 py-1">
                            <span className="text-[7.5px] text-[#8b95a1]">이번 주</span>
                            <b className="text-[7.5px] text-[#191f28]">12시간 40분</b>
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#f2f4f6] px-2 py-1">
                            <span className="text-[7.5px] text-[#8b95a1]">상태</span>
                            <b className="text-[7.5px] text-[#191f28]">공부 중</b>
                          </span>
                        </div>
                        {/* 원형 재생 버튼 (study-btn big, 인라인 background #bcbcbc) */}
                        <div className="mt-2.5 grid h-9 w-9 place-items-center rounded-full bg-[#bcbcbc]">
                          <span className="ml-0.5 block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
                        </div>
                      </div>

                      <div className="relative pr-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/studygirl.webp"
                          alt=""
                          width={85}
                          height={52}
                          className="pointer-events-none -scale-x-100 object-contain"
                          style={{ width: 85, height: 52 }}
                        />
                        <motion.span
                          key="bubble"
                          initial={{ opacity: 0, y: 4, scale: 0.96, rotate: -15 }}
                          animate={{ opacity: 1, y: 0, scale: 1, rotate: -15 }}
                          transition={{ duration: 0.35, delay: 0.4 }}
                          className="absolute max-w-[90px] whitespace-nowrap rounded-[11px] border border-[#b0b8c1] bg-white px-2 py-1 text-center text-[8px] font-bold leading-tight text-[#191f28]"
                          style={{ bottom: 48, right: 54 }}
                        >
                          수학Ⅱ 같이 해요!
                          <span className="absolute -bottom-[5px] right-2.5 h-[9px] w-[9px] rotate-45 border-b border-r border-[#b0b8c1] bg-white" />
                        </motion.span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="mx-auto mb-2.5 h-px w-[92%] bg-[#f2f4f6]"
                    />

                    {/* 오늘 과목별 */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: 0.12 }}
                      className="mb-2.5 flex gap-2"
                    >
                      {STUDY_SUBJECTS.map(s => (
                        <div key={s.name} className="flex flex-1 items-center justify-between rounded-lg px-2.5 py-2" style={{ background: s.bg }}>
                          <span className="text-[9px] font-bold" style={{ color: s.fg }}>{s.name}</span>
                          <span className="text-[9px] font-semibold" style={{ color: s.fg }}>{s.time}</span>
                        </div>
                      ))}
                    </motion.div>

                    {/* 랭킹 */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: 0.24 }}
                    >
                      <div className="mb-1.5 flex items-center justify-between">
                        <p className="text-[11px] font-extrabold text-[#191f28]">랭킹</p>
                        <div className="flex overflow-hidden rounded-lg bg-[#f2f4f6] p-0.5 text-[8px] font-semibold">
                          <span className="rounded-md bg-white px-2 py-0.5 text-[#191f28] shadow-sm">오늘</span>
                          <span className="px-2 py-0.5 text-[#8b95a1]">이번 주</span>
                        </div>
                      </div>
                      <div className="rounded-xl border border-[#f2f4f6] bg-white px-3">
                        {STUDY_RANKING.map((u, i) => (
                          <motion.div
                            key={u.rank}
                            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                            className="flex items-center gap-2.5 border-b border-[#f2f4f6] py-2.5 last:border-0"
                          >
                            <span className="w-3.5 text-center text-[10px] font-extrabold" style={{ color: u.color }}>{u.rank}</span>
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
                            <span className="flex-1 text-[10px] font-semibold text-[#191f28]">{u.name}</span>
                            <span className="text-[9px] tabular-nums text-[#8b95a1]">{u.time}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. 커뮤니티 (cafe/page.tsx: et-page-title / 카드 아님, 플레인 리스트 / N배지 et-primary) */}
        <AnimatePresence mode="wait">
          {phase === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 overflow-hidden bg-white pt-3"
            >
              <AnimatePresence>
                {commVisible && (
                  <>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 pb-1 text-[13.5px] font-extrabold text-[#18181b]"
                    >게시판</motion.p>

                    {/* et-section-label + et-board-row (플레인 리스트, 행 구분선만) */}
                    <motion.div
                      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.32 }}
                      className="mb-2"
                    >
                      <p className="px-4 pb-1 pt-1 text-[8.5px] font-bold text-[#9b9ba3]">학교 게시판</p>
                      {CAFE_BOARDS.map((board, i) => (
                        <motion.div
                          key={board.id}
                          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.28, delay: i * 0.09 }}
                          className="flex items-center gap-2.5 border-b border-[#f0f0f2] px-4 py-2.5"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="flex items-center gap-1 text-[10.5px] font-bold text-[#18181b]">
                              {board.name}
                              {board.isNew && (
                                <motion.span
                                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                                  transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.3 + i * 0.09 }}
                                  className="grid h-3.5 w-3.5 place-items-center rounded-full text-[7px] font-extrabold text-white"
                                  style={{ background: ET }}
                                >N</motion.span>
                              )}
                            </p>
                            <p className="mt-0.5 text-[9px] text-[#9b9ba3]">{board.desc}</p>
                          </div>
                          <Chevron color="#cdced3" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* 🔥 이번 주 인기글 (et-hot-card 200px 가로 스크롤) */}
                    <motion.div
                      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.32, delay: 0.25 }}
                    >
                      <div className="flex items-center justify-between px-4 pb-1 pt-1.5">
                        <p className="text-[10px] font-extrabold text-[#18181b]">🔥 이번 주 인기글</p>
                        <span className="text-[8.5px] text-[#9b9ba3]">전체보기</span>
                      </div>
                      <div className="flex gap-2 px-4">
                        {HOT_POSTS.map((post, i) => (
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.35 + i * 0.12 }}
                            className="w-[150px] flex-shrink-0 rounded-[14px] border border-[#f0f0f2] bg-white p-2.5"
                            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}
                          >
                            <p className="text-[9.5px] font-bold leading-snug text-[#18181b] line-clamp-2">{post.title}</p>
                            <p className="mt-0.5 text-[8.5px] text-[#9b9ba3] truncate">{post.content}</p>
                            <div className="mt-1.5 flex items-center gap-1.5">
                              <span className="rounded-md px-1 py-0.5 text-[7.5px] font-bold" style={{ background: ET_SOFT, color: ET }}>{post.board}</span>
                              <span className="flex items-center gap-0.5 text-[8px] text-[#f04452]">
                                <svg width="8" height="8" viewBox="0 0 512 512" fill="currentColor"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                                {post.likes}
                              </span>
                              <span className="flex items-center gap-0.5 text-[8px] text-[#9b9ba3]">
                                <svg width="8" height="8" viewBox="0 0 512 512" fill="currentColor"><path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"/></svg>
                                {post.comments}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. 마이 (setting/page.tsx 전체 구성, 학생증 배너 제외) */}
        <AnimatePresence mode="wait">
          {phase === 'my' && (
            <motion.div
              key="my"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 overflow-hidden px-3.5 pt-3.5"
              style={{ background: myBg, transition: 'background 0.45s' }}
            >
              <AnimatePresence>
                {myVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* 실제 페이지는 길어서 자동 스크롤로 훑어 내려간다 */}
                    <motion.div
                      animate={{ y: myScroll === 0 ? 0 : myScroll === 1 ? -300 : -560 }}
                      transition={{ duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
                    >
                      {/* my-profile-card */}
                      <div
                        className="flex items-center gap-3 rounded-[20px] border p-3.5"
                        style={{ background: myCard, borderColor: myBorder, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'background 0.45s, border-color 0.45s' }}
                      >
                        <div className="relative">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#f2f4f6]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-[#3182f6]" style={{ border: `2px solid ${myCard}` }}>
                            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                            </svg>
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] font-bold tracking-tight" style={{ color: myText, transition: 'color 0.45s' }}>김하늘</p>
                          <p className="mt-0.5 text-[9.5px] font-medium" style={{ color: mySub }}>2학년 3반 · 하늘이</p>
                        </div>
                      </div>

                      {/* 내 활동 */}
                      <p className="mx-1 mb-1.5 mt-3 text-[9px] font-semibold" style={{ color: mySub }}>내 활동</p>
                      <div className="rounded-[20px] border px-3.5 py-0.5" style={{ background: myCard, borderColor: myBorder, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'background 0.45s, border-color 0.45s' }}>
                        {MY_ACTIVITY.map((label, i) => (
                          <div key={label} className="flex items-center justify-between py-2.5"
                            style={{ borderBottom: i < MY_ACTIVITY.length - 1 ? `1px solid ${darkMode ? '#2a2f38' : '#f2f4f6'}` : 'none' }}>
                            <span className="text-[10.5px] font-medium" style={{ color: myText, transition: 'color 0.45s' }}>{label}</span>
                            <Chevron color={darkMode ? '#4b5563' : '#c4c9d0'} />
                          </div>
                        ))}
                      </div>

                      {/* 통계 · 검색 · 알림 (라벨 없이 카드만, 실제와 동일) */}
                      <div className="mt-2.5 rounded-[20px] border px-3.5 py-0.5" style={{ background: myCard, borderColor: myBorder, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'background 0.45s, border-color 0.45s' }}>
                        {MY_TOOLS.map((label, i) => (
                          <div key={label} className="flex items-center justify-between py-2.5"
                            style={{ borderBottom: i < MY_TOOLS.length - 1 ? `1px solid ${darkMode ? '#2a2f38' : '#f2f4f6'}` : 'none' }}>
                            <span className="text-[10.5px] font-medium" style={{ color: myText, transition: 'color 0.45s' }}>{label}</span>
                            <Chevron color={darkMode ? '#4b5563' : '#c4c9d0'} />
                          </div>
                        ))}
                      </div>

                      {/* 시간표 (Settimetable tt-frame: 흰 라운드 20 + 초기화 버튼 + 요일 그리드) */}
                      <div className="mt-2.5 rounded-[20px] border p-3" style={{ background: myCard, borderColor: myBorder, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'background 0.45s, border-color 0.45s' }}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[11px] font-bold" style={{ color: myText, transition: 'color 0.45s' }}>시간표</span>
                          <span className="rounded-md px-1.5 py-0.5 text-[7.5px] font-semibold" style={{ background: darkMode ? '#2a2f38' : '#f2f4f6', color: mySub }}>초기화</span>
                        </div>
                        <div className="flex gap-1">
                          {/* 교시 열 */}
                          <div className="flex w-3 flex-col gap-[3px] pt-[15px]">
                            {[1, 2, 3, 4].map(p => (
                              <div key={p} className="grid h-5 place-items-center text-[6.5px]" style={{ color: mySub }}>{p}</div>
                            ))}
                          </div>
                          {TT_DAYS.map((day, di) => (
                            <div key={day} className="flex flex-1 flex-col gap-[3px]">
                              <div className="grid h-3 place-items-center text-[6.5px] font-semibold" style={{ color: mySub }}>{day}</div>
                              {TT_GRID[di].map((cell, ci) => (
                                <div key={ci} className="grid h-5 place-items-center rounded-md text-[6px] font-bold"
                                  style={{ background: TT_COLORS[cell.c].bg, color: TT_COLORS[cell.c].fg }}>
                                  {cell.s}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 화면 — my-switch (50x30, on: --point) */}
                      <p className="mx-1 mb-1.5 mt-3 text-[9px] font-semibold" style={{ color: mySub }}>화면</p>
                      <div className="rounded-[20px] border px-3.5" style={{ background: myCard, borderColor: myBorder, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'background 0.45s, border-color 0.45s' }}>
                        <div className="flex items-center justify-between py-2.5">
                          <span className="text-[10.5px] font-medium" style={{ color: myText, transition: 'color 0.45s' }}>다크 모드</span>
                          <div
                            className="relative h-[19px] w-8 rounded-full"
                            style={{ background: darkMode ? POINT : '#d1d6db', transition: 'background 0.18s' }}
                          >
                            <motion.span
                              className="absolute top-[2px] h-[15px] w-[15px] rounded-full bg-white"
                              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                              animate={{ left: darkMode ? 15 : 2 }}
                              transition={{ duration: 0.18 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* 계정 설정 (my-row-value + chevron) */}
                      <p className="mx-1 mb-1.5 mt-3 text-[9px] font-semibold" style={{ color: mySub }}>계정 설정</p>
                      <div className="rounded-[20px] border px-3.5 py-0.5" style={{ background: myCard, borderColor: myBorder, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'background 0.45s, border-color 0.45s' }}>
                        {MY_ACCOUNT.map((row, i) => (
                          <div key={row.label} className="flex items-center justify-between py-2.5"
                            style={{ borderBottom: i < MY_ACCOUNT.length - 1 ? `1px solid ${darkMode ? '#2a2f38' : '#f2f4f6'}` : 'none' }}>
                            <span className="text-[10.5px] font-medium" style={{ color: myText, transition: 'color 0.45s' }}>{row.label}</span>
                            <span className="flex items-center gap-1.5">
                              {row.value && <span className="text-[9px]" style={{ color: mySub }}>{row.value}</span>}
                              <Chevron color={darkMode ? '#4b5563' : '#c4c9d0'} />
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* 고객센터 */}
                      <p className="mx-1 mb-1.5 mt-3 text-[9px] font-semibold" style={{ color: mySub }}>고객센터</p>
                      <div className="rounded-[20px] border px-3.5 py-0.5" style={{ background: myCard, borderColor: myBorder, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'background 0.45s, border-color 0.45s' }}>
                        {['문의하기', '자주 묻는 질문'].map((label, i) => (
                          <div key={label} className="flex items-center justify-between py-2.5"
                            style={{ borderBottom: i < 1 ? `1px solid ${darkMode ? '#2a2f38' : '#f2f4f6'}` : 'none' }}>
                            <span className="text-[10.5px] font-medium" style={{ color: myText, transition: 'color 0.45s' }}>{label}</span>
                            <Chevron color={darkMode ? '#4b5563' : '#c4c9d0'} />
                          </div>
                        ))}
                      </div>

                      {/* 정보 */}
                      <p className="mx-1 mb-1.5 mt-3 text-[9px] font-semibold" style={{ color: mySub }}>정보</p>
                      <div className="rounded-[20px] border px-3.5 py-0.5" style={{ background: myCard, borderColor: myBorder, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'background 0.45s, border-color 0.45s' }}>
                        <div className="flex items-center justify-between py-2.5">
                          <span className="text-[10.5px] font-medium" style={{ color: myText, transition: 'color 0.45s' }}>앱 정보</span>
                          <Chevron color={darkMode ? '#4b5563' : '#c4c9d0'} />
                        </div>
                      </div>

                      {/* 계정 (로그아웃 / 계정 삭제 danger #f04452) */}
                      <p className="mx-1 mb-1.5 mt-3 text-[9px] font-semibold" style={{ color: mySub }}>계정</p>
                      <div className="rounded-[20px] border px-3.5 py-0.5" style={{ background: myCard, borderColor: myBorder, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'background 0.45s, border-color 0.45s' }}>
                        <div className="flex items-center justify-between py-2.5" style={{ borderBottom: `1px solid ${darkMode ? '#2a2f38' : '#f2f4f6'}` }}>
                          <span className="text-[10.5px] font-medium" style={{ color: myText, transition: 'color 0.45s' }}>로그아웃</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={darkMode ? '#4b5563' : '#c4c9d0'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                          </svg>
                        </div>
                        <div className="flex items-center justify-between py-2.5">
                          <span className="text-[10.5px] font-medium text-[#f04452]">계정 삭제</span>
                          <Chevron color={darkMode ? '#4b5563' : '#c4c9d0'} />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 학생증 모달 ── */}
        <AnimatePresence>
          {idOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 px-6"
            >
              <motion.div
                initial={{ y: 40, scale: 0.92 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full"
                style={{ perspective: 800 }}
              >
                <motion.div
                  className="overflow-hidden rounded-2xl bg-white shadow-xl"
                  style={{ backfaceVisibility: 'hidden' }}
                  animate={{ rotateY: idFlipped ? 180 : 0 }}
                  transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className="px-4 py-3" style={{ background: `linear-gradient(135deg, ${POINT}, #3b48a6)` }}>
                    <p className="text-[7px] font-semibold tracking-widest text-white/75">STUDENT ID CARD</p>
                    <p className="text-[13px] font-extrabold text-white">한별고등학교</p>
                  </div>
                  <div className="flex items-center gap-3 p-4">
                    <div className="grid h-16 place-items-center rounded-lg" style={{ width: 52, backgroundColor: 'rgba(91,108,255,0.1)' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={POINT} strokeWidth="1.8" strokeLinecap="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[15px] font-extrabold text-[#191f28]">김하늘</p>
                      <p className="text-[10px] text-[#8b95a1]">2학년 3반 · 20326</p>
                      <span className="mt-1 inline-block rounded-md px-1.5 py-0.5 text-[8px] font-bold" style={{ background: 'rgba(0,196,115,0.1)', color: '#00c473' }}>재학 중</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#f2f4f6] px-4 py-2.5">
                    <p className="text-[9px] text-[#8b95a1]">인증코드 <span className="font-extrabold text-[#191f28]">H7K-2P4</span></p>
                    <p className="text-[10px] font-bold tabular-nums" style={{ color: POINT }}>{clock}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-2xl bg-white shadow-xl"
                  style={{ backfaceVisibility: 'hidden' }}
                  initial={{ rotateY: -180 }}
                  animate={{ rotateY: idFlipped ? 0 : -180 }}
                  transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className="mt-4 h-7 bg-[#1a1a1a]" />
                  <div className="flex h-[calc(100%-44px)] flex-col p-4">
                    <div className="flex h-6 items-center rounded bg-[#f2f4f6] px-2">
                      <span className="text-[8px] italic text-[#8b95a1]">김하늘</span>
                    </div>
                    <div className="mt-auto flex h-9 items-end gap-[1.5px]">
                      {[2,1,3,1,2,2,1,3,2,1,1,3,2,1,2,3,1,2,1,3,2,2,1,3,1,2,3,1,2,1].map((w, i) => (
                        <div key={i} className="h-full bg-[#1a1a1a]" style={{ width: w }} />
                      ))}
                    </div>
                    <p className="mt-1.5 text-center text-[7px] text-[#8b95a1]">20326 · 본 카드는 재학생 확인용입니다</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 하단 네브 (globals.css .navout)
           기본: 흰 배경 + 위 모서리 26px 라운드 + border rgba(15,15,15,0.08), 활성 #555
           커뮤니티: 좌우 30px 띄운 반투명 알약(999px) + 그림자, 뒤로 칸은 원형 회색 배경 ── */}
      <div className="relative" style={{ background: phase === 'my' && darkMode ? '#15171c' : phase === 'home' ? '#f4f4f5' : '#fff', transition: 'background 0.45s' }}>
        <AnimatePresence mode="wait">
          {phase !== 'community' ? (
            <motion.div
              key="nav-main"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.22 }}
              className="flex rounded-t-[20px] px-4 pb-2 pt-2.5"
              style={{
                background: phase === 'my' && darkMode ? '#1f232b' : '#fff',
                borderTop: '1px solid rgba(15,15,15,0.08)',
                transition: 'background 0.45s',
              }}
            >
              {([
                { key: 'home',      label: '홈',      icon: 'home' },
                { key: 'feed',      label: '피드',    icon: 'feed' },
                { key: 'community', label: '커뮤니티', icon: 'community' },
                { key: 'study',     label: '공부방',  icon: 'study' },
                { key: 'my',        label: '마이',    icon: 'my' },
              ] as const).map(({ key, label, icon }) => {
                const active = phase === key;
                const on = phase === 'my' && darkMode ? '#e5e7eb' : TAB_ON;
                const off = phase === 'my' && darkMode ? '#6b7178' : TAB_OFF;
                return (
                  <button key={key} className="relative flex-1 py-1 flex flex-col items-center gap-[3px]">
                    <motion.span animate={active ? { scale: 1.08, y: -1 } : { scale: 1, y: 0 }} transition={{ duration: 0.18 }}>
                      <NavIcon type={icon} color={active ? on : off} />
                    </motion.span>
                    <span className="text-[8.5px] font-medium whitespace-nowrap" style={{ color: active ? on : off }}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="nav-comm"
              initial={{ opacity: 0, scale: 0.88, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className="mx-6 mb-2.5 mt-1 flex items-center rounded-full border border-white/50 px-3 py-1"
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
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, y: 7, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.36, delay: 0.04 + i * 0.045, ease: [0.34, 1.3, 0.64, 1] }}
                    className="relative flex-1 flex flex-col items-center justify-center gap-[3px] py-1"
                  >
                    {key === 'back' ? (
                      <span className="grid h-[26px] w-[26px] place-items-center rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                        <NavIcon type="back" color={TAB_ON} size={15} />
                      </span>
                    ) : (
                      <>
                        <NavIcon type={icon} color={active ? TAB_ON : TAB_OFF} size={17} />
                        <span className="text-[8px] font-medium whitespace-nowrap" style={{ color: active ? TAB_ON : TAB_OFF }}>
                          {label}
                        </span>
                      </>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
