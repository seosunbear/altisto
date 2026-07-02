'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { LayoutGrid, Brush, UserRound, Palette, Clapperboard, Music, Code } from 'lucide-react';

function sleep(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms));
}

/* ── 실제 알티(rti-eight.vercel.app) 디자인 토큰 ── */
const POINT = '#b19cd9';
const BG    = '#181818';
const INPUT = '#202225';

/* ── 데이터 ── */
const CATEGORIES = ['전체', '일러스트', '버추얼', '디자인', '영상', '노래', '코딩'];

/* 홈 — 카테고리 아이콘 그리드 (실사이트: 정사각 버튼 + 아이콘/라벨) */
const HOME_CATEGORIES = [
  { label: '전체',     icon: LayoutGrid },
  { label: '일러스트', icon: Brush },
  { label: '버추얼',   icon: UserRound },
  { label: '디자인',   icon: Palette },
  { label: '영상',     icon: Clapperboard },
  { label: '노래',     icon: Music },
  { label: '코딩',     icon: Code },
];

/* 홈 — 크리에이터 카드 (실사이트: 아바타 + 썸네일 2장 + 태그) */
const HOME_CREATORS = [
  { id: 1, name: '김영상',   sub: '영상 · 쇼츠 편집', initial: '김', color: '#60a5fa', tags: ['영상편집', '쇼츠'] },
  { id: 2, name: '박디자인', sub: '로고 · 배너',      initial: '박', color: '#ec4899', tags: ['일러스트', '로고'] },
];

type Artwork = { id: number; color: string; h: number };
const ARTWORKS: Artwork[] = [
  { id: 1, color: '#b19cd9', h: 84 },
  { id: 2, color: '#60a5fa', h: 58 },
  { id: 3, color: '#ec4899', h: 56 },
  { id: 4, color: '#22d3ee', h: 82 },
  { id: 5, color: '#f59e0b', h: 70 },
  { id: 6, color: '#4ade80', h: 62 },
];
/* 16:9 가로 레이아웃 — 3열 메이슨리 */
const ART_COLS = [
  [ARTWORKS[0], ARTWORKS[5]],
  [ARTWORKS[1], ARTWORKS[3]],
  [ARTWORKS[4], ARTWORKS[2]],
];

type BoardPost = { id: number; title: string; tag: string; tagColor: string; price: string; time: string };
const BOARD_POSTS: BoardPost[] = [
  { id: 1, title: '쇼츠 영상 편집자 구합니다',     tag: '영상',     tagColor: '#60a5fa', price: '5만원~',  time: '방금' },
  { id: 2, title: '버튜버 방송용 일러스트 의뢰',   tag: '일러스트', tagColor: '#ec4899', price: '15만원~', time: '3분 전' },
  { id: 3, title: '채널 로고 · 배너 디자인',       tag: '디자인',   tagColor: '#f59e0b', price: '8만원~',  time: '10분 전' },
];

/* 채팅 — 디스코드 스타일 (채널 + 평면 메시지) */
const CHAT_CHANNELS = ['일반', '자료-공유', '일정'];

const CHAT: { id: number; isMe: boolean; user: string; color: string; time: string; text: string }[] = [
  { id: 1, isMe: false, user: '김영상', color: '#60a5fa', time: '오후 2:14', text: '안녕하세요! 쇼츠 편집 의뢰 보고 연락드려요 😊' },
  { id: 2, isMe: true,  user: '지훈',   color: '#b19cd9', time: '오후 2:15', text: '반갑습니다! 레퍼런스 영상 있으시면 공유해 주세요' },
  { id: 3, isMe: false, user: '김영상', color: '#60a5fa', time: '오후 2:15', text: '네, 지금 바로 보내드릴게요. 1분 내외 감성 편집이에요' },
  { id: 4, isMe: true,  user: '지훈',   color: '#b19cd9', time: '오후 2:16', text: '확인했어요! 3일 안에 시안 드릴게요 🎬' },
];

/* ── 작은 아바타 ── */
function Avatar({ initial, color, size = 8 }: { initial: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full grid place-items-center flex-shrink-0"
      style={{ width: size * 4, height: size * 4, backgroundColor: color + '26' }}
    >
      <span className="font-semibold leading-none" style={{ fontSize: size * 1.5, color }}>
        {initial}
      </span>
    </div>
  );
}

/* ── 타이핑 점 ── */
function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="h-1 w-1 rounded-full bg-[#666] block"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 0.9, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

type Tab = 'home' | 'works' | 'board' | 'chat';

export default function AltiMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const [tab,           setTab]           = useState<Tab>('home');
  const [homeVisible,   setHomeVisible]   = useState(false);
  const [worksVisible,  setWorksVisible]  = useState(false);
  const [artworksShown, setArtworksShown] = useState<number[]>([]);
  const [boardVisible,  setBoardVisible]  = useState(false);
  const [chatVisible,   setChatVisible]   = useState(false);
  const [visibleMsgs,   setVisibleMsgs]   = useState<number[]>([]);
  const [typing,        setTyping]        = useState(false);
  const [badge,         setBadge]         = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        /* ── 초기화 ── */
        setTab('home'); setHomeVisible(false); setWorksVisible(false); setArtworksShown([]);
        setBoardVisible(false); setChatVisible(false);
        setVisibleMsgs([]); setTyping(false); setBadge(false);
        await sleep(400); if (cancelled) return;

        /* ── 1. 홈 탭 — 이벤트 배너 + 바로가기 카드 ── */
        setHomeVisible(true);
        await sleep(2400); if (cancelled) return;

        /* ── 2. 작품 탭 — 카테고리 칩 + 메이슨리 그리드 ── */
        setTab('works');
        setWorksVisible(true);
        await sleep(300); if (cancelled) return;

        for (const art of ARTWORKS) {
          if (cancelled) return;
          setArtworksShown(prev => [...prev, art.id]);
          await sleep(260);
        }
        await sleep(1800); if (cancelled) return;

        /* ── 3. 의뢰 게시판 탭 ── */
        setTab('board');
        setBoardVisible(true);
        setBadge(true);
        await sleep(2600); if (cancelled) return;

        /* ── 4. 채팅 탭 ── */
        setTab('chat');
        setChatVisible(true);
        await sleep(300); if (cancelled) return;

        for (const msg of CHAT) {
          if (cancelled) return;
          if (!msg.isMe) {
            setTyping(true);
            await sleep(750); if (cancelled) return;
            setTyping(false);
            await sleep(80);
          }
          setVisibleMsgs(prev => [...prev, msg.id]);
          await sleep(msg.isMe ? 350 : 480);
        }
        await sleep(2200); if (cancelled) return;

        /* 루프 준비 */
        setChatVisible(false);
        await sleep(400);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [isInView]);

  /* ── 사이드바 네비 (실사이트: 홈·카테고리·작품·게시판·채팅) ── */
  const NAV: { id: Tab | 'home'; label: string; icon: (c: string) => React.ReactNode }[] = [
    {
      id: 'home',
      label: '홈',
      icon: (c) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>
        </svg>
      ),
    },
    {
      id: 'works',
      label: '작품',
      icon: (c) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      ),
    },
    {
      id: 'board',
      label: '게시판',
      icon: (c) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="18" rx="2"/>
          <line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>
        </svg>
      ),
    },
    {
      id: 'chat',
      label: '채팅',
      icon: (c) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full aspect-[16/11] rounded-2xl border border-[#2a2a2a] overflow-hidden flex flex-col"
      style={{ backgroundColor: BG }}
    >

      {/* ── 헤더: 로고 + 검색바 + 로그인 ── */}
      <div className="px-4 py-2.5 flex items-center gap-3 border-b border-white/[0.06] flex-shrink-0">
        <div className="flex items-baseline gap-1.5 flex-shrink-0">
          <span className="text-[13px] font-bold text-white">알티</span>
          <span className="text-[7px] font-semibold" style={{ color: POINT }}>beta</span>
        </div>

        <div className="mx-auto flex w-full max-w-[220px] items-center gap-2 rounded-full px-3 py-[5px]"
          style={{ backgroundColor: INPUT }}>
          <span className="flex-1 truncate text-[9px] text-[#666]">어떤 크리에이터를 찾으세요?</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.6" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <AnimatePresence>
              {badge && (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full"
                  style={{ backgroundColor: POINT }}
                />
              )}
            </AnimatePresence>
          </div>
          <span className="rounded px-1.5 py-0.5 text-[9px] font-semibold text-[#999]">로그인</span>
        </div>
      </div>

      {/* ── 바디: 아이콘 사이드바 + 컨텐츠 ── */}
      <div className="flex flex-1 min-h-0">

        {/* 사이드바 */}
        <div className="flex w-11 flex-shrink-0 flex-col items-center gap-1 border-r border-white/[0.06] py-2">
          {NAV.map(({ id, label, icon }) => {
            const active = tab === id;
            return (
              <button key={id} className="relative flex h-9 w-9 flex-col items-center justify-center gap-[2px] rounded-lg">
                {active && (
                  <motion.div
                    layoutId="alti-side-active"
                    className="absolute inset-0 rounded-lg bg-white/[0.07]"
                  />
                )}
                <span className="relative">{icon(active ? POINT : '#555')}</span>
                <span className="relative text-[6.5px] font-medium" style={{ color: active ? POINT : '#555' }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 컨텐츠 */}
        <div className="relative flex-1 min-h-0 overflow-hidden">

          {/* 홈 탭 — 이벤트 배너 + 바로가기 카드 */}
          <AnimatePresence mode="wait">
            {tab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 px-4 pt-3"
              >
                <AnimatePresence>
                  {homeVisible && (
                    <motion.div
                      key="home-content"
                      initial="hidden" animate="show" exit={{ opacity: 0 }}
                      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                    >
                      {/* 이벤트 배너 */}
                      <motion.div
                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="relative mb-2 h-[150px] overflow-hidden rounded-lg"
                      >
                        <img
                          src="/알티메리.png"
                          alt="알티 BETA 오픈 이벤트"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </motion.div>

                      {/* 카테고리 아이콘 그리드 */}
                      <motion.div
                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-2 grid grid-cols-7 gap-1.5"
                      >
                        {HOME_CATEGORIES.map(({ label, icon: Icon }, i) => (
                          <div key={label}
                            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg"
                            style={i === 0
                              ? { backgroundColor: POINT + '22' }
                              : { backgroundColor: 'rgba(255,255,255,0.04)' }}
                          >
                            <Icon size={11} strokeWidth={1.8} color={i === 0 ? POINT : '#888'} />
                            <span className="text-[6.5px] font-semibold leading-none"
                              style={{ color: i === 0 ? POINT : '#888' }}>
                              {label}
                            </span>
                          </div>
                        ))}
                      </motion.div>

                      {/* 정렬 바 */}
                      <motion.div
                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-2 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-[7.5px] font-medium text-[#999]">정렬</span>
                          <span className="flex items-center gap-1 rounded bg-white/[0.05] px-1.5 py-[3px] text-[7.5px] font-medium text-[#ccc]">
                            최신순
                            <svg width="5" height="5" viewBox="0 0 10 6" fill="none" stroke="#888" strokeWidth="1.5"><path d="M1 1l4 4 4-4"/></svg>
                          </span>
                        </div>
                        <span className="text-[7.5px] text-[#777]">2열 · 기본</span>
                      </motion.div>

                      {/* 크리에이터 카드 그리드 */}
                      <div className="grid grid-cols-2 gap-2">
                        {HOME_CREATORS.map((c) => (
                          <motion.div
                            key={c.id}
                            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-xl bg-white/[0.04] p-2.5"
                          >
                            <div className="mb-1.5 flex items-center gap-1.5">
                              <Avatar initial={c.initial} color={c.color} size={5} />
                              <div className="min-w-0">
                                <p className="truncate text-[8.5px] font-semibold leading-tight text-white">{c.name}</p>
                                <p className="truncate text-[7px] leading-tight text-[#777]">{c.sub}</p>
                              </div>
                            </div>
                            <div className="mb-1.5 grid grid-cols-2 gap-1">
                              <div className="h-9 rounded-md" style={{ backgroundColor: c.color + '26' }} />
                              <div className="h-9 rounded-md" style={{ backgroundColor: c.color + '1a' }} />
                            </div>
                            <div className="flex gap-1">
                              {c.tags.map(t => (
                                <span key={t} className="rounded-full bg-white/[0.06] px-1.5 py-[2px] text-[6.5px] text-[#999]">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 작품 탭 — 카테고리 칩 + 3열 메이슨리 */}
          <AnimatePresence mode="wait">
            {tab === 'works' && (
              <motion.div
                key="works"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 px-4 pt-3"
              >
                {/* 카테고리 칩 */}
                <div className="mb-3 flex gap-1.5 overflow-hidden">
                  <AnimatePresence>
                    {worksVisible && CATEGORIES.map((cat, i) => (
                      <motion.span
                        key={cat}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.05 }}
                        className="flex-shrink-0 rounded-full px-2 py-[3px] text-[8px] font-semibold"
                        style={i === 0
                          ? { backgroundColor: POINT, color: '#151515' }
                          : { backgroundColor: 'rgba(255,255,255,0.05)', color: '#999' }}
                      >
                        {cat}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>

                {/* 3열 메이슨리 */}
                <div className="flex gap-2">
                  {ART_COLS.map((col, ci) => (
                    <div key={ci} className="flex-1 flex flex-col gap-2">
                      {col.map((art) => (
                        <AnimatePresence key={art.id}>
                          {artworksShown.includes(art.id) && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.97 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                              className="w-full rounded-lg flex-shrink-0"
                              style={{ height: art.h, backgroundColor: art.color + '30' }}
                            />
                          )}
                        </AnimatePresence>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 의뢰 게시판 탭 */}
          <AnimatePresence mode="wait">
            {tab === 'board' && (
              <motion.div
                key="board"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 px-4 pt-3"
              >
                <div className="mb-1 flex items-baseline justify-between">
                  <p className="text-[10px] font-bold text-white">의뢰 게시판</p>
                  <span className="text-[8px] text-[#777]">모집 중인 작업</span>
                </div>

                <AnimatePresence>
                  {boardVisible && BOARD_POSTS.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-2.5 border-b border-white/[0.05] py-2.5 last:border-0"
                    >
                      <span className="flex-shrink-0 rounded px-1.5 py-0.5 text-[8px] font-semibold"
                        style={{ backgroundColor: post.tagColor + '22', color: post.tagColor }}>
                        {post.tag}
                      </span>
                      <p className="min-w-0 flex-1 truncate text-[10px] text-[#e9e9e9]">{post.title}</p>
                      <span className="flex-shrink-0 text-[9px] font-semibold" style={{ color: POINT }}>{post.price}</span>
                      <span className="flex-shrink-0 rounded-full bg-[#4ade80]/10 px-1.5 py-0.5 text-[8px] font-semibold text-[#4ade80]">
                        모집중
                      </span>
                      <span className="hidden sm:block flex-shrink-0 text-[8px] text-[#666]">{post.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 채팅 탭 — 디스코드 스타일 */}
          <AnimatePresence mode="wait">
            {tab === 'chat' && chatVisible && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex"
              >
                {/* 채널 목록 */}
                <div className="flex w-[92px] flex-shrink-0 flex-col gap-0.5 border-r border-white/[0.06] bg-[#141414] px-1.5 py-2">
                  <p className="px-1.5 pb-1 text-[7px] font-bold uppercase tracking-wider text-[#666]">
                    쇼츠 프로젝트
                  </p>
                  {CHAT_CHANNELS.map((ch, i) => (
                    <div key={ch}
                      className={`flex items-center gap-1 rounded px-1.5 py-1 text-[8.5px] font-medium ${
                        i === 0 ? 'bg-white/[0.06] text-[#e9e9e9]' : 'text-[#777]'
                      }`}>
                      <span className="text-[#666]">#</span>
                      <span className="truncate">{ch}</span>
                    </div>
                  ))}
                </div>

                {/* 메시지 영역 */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-shrink-0 items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
                    <span className="text-[10px] font-semibold text-[#666]">#</span>
                    <p className="text-[9.5px] font-semibold leading-none text-white">일반</p>
                    <svg className="ml-auto" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>

                  <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-2">
                    <AnimatePresence mode="sync">
                      {CHAT.map(msg =>
                        visibleMsgs.includes(msg.id) ? (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="flex items-start gap-2"
                          >
                            <Avatar initial={msg.user[0]} color={msg.color} size={5} />
                            <div className="min-w-0">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-[9px] font-semibold leading-none" style={{ color: msg.color }}>
                                  {msg.user}
                                </span>
                                <span className="text-[7px] text-[#666]">{msg.time}</span>
                              </div>
                              <p className="mt-0.5 text-[9.5px] leading-snug text-[#dcddde]">{msg.text}</p>
                            </div>
                          </motion.div>
                        ) : null
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 입력창 + 입력 중 표시 */}
                  <div className="flex-shrink-0 px-3 pb-2.5">
                    <div className="mb-1 flex h-3 items-center gap-1 pl-0.5">
                      <AnimatePresence>
                        {typing && (
                          <motion.div
                            key="typing"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex items-center gap-1"
                          >
                            <Dot delay={0} /><Dot delay={0.2} /><Dot delay={0.4} />
                            <span className="ml-0.5 text-[7px] text-[#999]">
                              <b className="font-semibold text-[#ccc]">김영상</b>님이 입력 중...
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5" style={{ backgroundColor: INPUT }}>
                      <span className="grid h-3.5 w-3.5 flex-shrink-0 place-items-center rounded-full bg-[#555] text-[9px] font-bold leading-none text-[#181818]">+</span>
                      <span className="flex-1 truncate text-[8.5px] text-[#555]">#일반에 메시지 보내기</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </motion.div>
  );
}
