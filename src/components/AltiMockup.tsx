'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function sleep(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms));
}

/* ── 데이터 ── */
type ProjectGroup = { id: number; name: string; initial: string; color: string; tag: string };
const PROJECT_GROUPS: ProjectGroup[] = [
  { id: 1, name: '김영상', initial: '김', color: '#1d4ed8', tag: '영상편집' },
  { id: 2, name: '박디자인', initial: '박', color: '#7c3aed', tag: '디자인'  },
];

type Artwork = { id: number; color: string; h: number };
const ARTWORKS: Artwork[] = [
  { id: 1, color: '#1d4ed8', h: 92 },
  { id: 2, color: '#7c3aed', h: 64 },
  { id: 3, color: '#ec4899', h: 62 },
  { id: 4, color: '#0891b2', h: 90 },
  { id: 5, color: '#d97706', h: 76 },
  { id: 6, color: '#16a34a', h: 68 },
];
const LEFT_ART  = [ARTWORKS[0], ARTWORKS[2], ARTWORKS[4]];
const RIGHT_ART = [ARTWORKS[1], ARTWORKS[3], ARTWORKS[5]];

const CHAT: { id: number; isMe: boolean; text: string }[] = [
  { id: 1, isMe: false, text: '안녕하세요! 쇼츠 편집 의뢰 보고 연락드려요 😊' },
  { id: 2, isMe: true,  text: '반갑습니다! 레퍼런스 영상 있으시면 공유해 주세요' },
  { id: 3, isMe: false, text: '네, 지금 바로 보내드릴게요. 1분 내외 감성 편집이에요' },
  { id: 4, isMe: true,  text: '확인했어요! 3일 안에 시안 드릴게요 🎬' },
];

/* ── 작은 아바타 ── */
function Avatar({ initial, color, size = 8 }: { initial: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full grid place-items-center flex-shrink-0"
      style={{ width: size * 4, height: size * 4, backgroundColor: color + '22' }}
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
      className="h-1 w-1 rounded-full bg-[#d1d5db] block"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 0.9, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

type Tab = 'project' | 'match' | 'chat';

export default function AltiMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const [tab,           setTab]           = useState<Tab>('project');
  const [projVisible,   setProjVisible]   = useState(false);
  const [showMatch,     setShowMatch]     = useState(false);
  const [artworksShown, setArtworksShown] = useState<number[]>([]);
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
        setTab('project'); setProjVisible(false); setShowMatch(false);
        setArtworksShown([]); setChatVisible(false);
        setVisibleMsgs([]); setTyping(false); setBadge(false);
        await sleep(400); if (cancelled) return;

        /* ── 1. 의뢰 탭 ── */
        setProjVisible(true);
        await sleep(2800); if (cancelled) return;

        /* ── 2. 작품 탭 → 핀터레스트 그리드 순차 등장 ── */
        setTab('match');
        setShowMatch(true);
        await sleep(200); if (cancelled) return;

        for (const art of ARTWORKS) {
          if (cancelled) return;
          setArtworksShown(prev => [...prev, art.id]);
          await sleep(280);
        }
        setBadge(true);
        await sleep(2000); if (cancelled) return;

        /* ── 3. 채팅 탭 ── */
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

  const NAV: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
    {
      id: 'project',
      label: '의뢰',
      icon: (a) => (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke={a ? '#1d4ed8' : '#d1d5db'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
    },
    {
      id: 'match',
      label: '작품',
      icon: (a) => (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke={a ? '#1d4ed8' : '#d1d5db'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      ),
    },
    {
      id: 'chat',
      label: '채팅',
      icon: (a) => (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke={a ? '#1d4ed8' : '#d1d5db'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      className="w-full rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden"
    >

      {/* ── 헤더 ── */}
      <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#f3f4f6]">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-[#1d4ed8] grid place-items-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/>
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-[#111]">알티</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <AnimatePresence>
              {badge && (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-[#1d4ed8] rounded-full"
                />
              )}
            </AnimatePresence>
          </div>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
      </div>

      {/* ── 콘텐츠 ── */}
      <div className="relative overflow-hidden" style={{ minHeight: 300 }}>

        {/* 의뢰 탭 — 사람마다 2×2 포토 그리드 */}
        <AnimatePresence mode="wait">
          {tab === 'project' && (
            <motion.div
              key="project"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 px-5 pt-3 pb-2"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ca3af] mb-3">
                진행 중인 의뢰
              </p>
              <div className="flex gap-3">
                <AnimatePresence>
                  {projVisible && PROJECT_GROUPS.map((g, gi) => (
                    <motion.div
                      key={g.id}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.32, delay: gi * 0.16, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-1 min-w-0"
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <Avatar initial={g.initial} color={g.color} size={5} />
                        <div className="min-w-0">
                          <p className="text-[9px] font-semibold text-[#111] truncate">{g.name}</p>
                          <p className="text-[7px] text-[#9ca3af]">{g.tag}</p>
                        </div>
                      </div>
                      <div
                        className="grid grid-cols-2 gap-[2px] rounded-xl overflow-hidden"
                        style={{ backgroundColor: g.color + '18' }}
                      >
                        {[0, 1, 2, 3].map((ci) => (
                          <motion.div
                            key={ci}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: gi * 0.16 + ci * 0.08, duration: 0.28 }}
                            className="aspect-video"
                            style={{ backgroundColor: `${g.color}${['22', '1a', '1a', '22'][ci]}` }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 작품 탭 — 핀터레스트 메이슨리 그리드 */}
        <AnimatePresence mode="wait">
          {tab === 'match' && (
            <motion.div
              key="match"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 px-5 pt-3 pb-2"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9ca3af] mb-2">
                작품
              </p>

              {/* 2열 메이슨리 */}
              <div className="flex gap-2">
                {/* 왼쪽 열 */}
                <div className="flex-1 flex flex-col gap-2">
                  {LEFT_ART.map((art) => (
                    <AnimatePresence key={art.id}>
                      {artworksShown.includes(art.id) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full rounded-xl flex-shrink-0"
                          style={{ height: art.h, backgroundColor: art.color + '20' }}
                        />
                      )}
                    </AnimatePresence>
                  ))}
                </div>

                {/* 오른쪽 열 */}
                <div className="flex-1 flex flex-col gap-2">
                  {RIGHT_ART.map((art) => (
                    <AnimatePresence key={art.id}>
                      {artworksShown.includes(art.id) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full rounded-xl flex-shrink-0"
                          style={{ height: art.h, backgroundColor: art.color + '20' }}
                        />
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 채팅 탭 */}
        <AnimatePresence mode="wait">
          {tab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="flex items-center gap-2.5 px-5 py-3 border-b border-[#f3f4f6] flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                <div className="relative">
                  <Avatar initial="김" color="#1d4ed8" size={7} />
                  <motion.span
                    className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#22c55e] border-2 border-white"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#111] leading-none">김영상</p>
                  <p className="text-[9px] text-[#22c55e] mt-0.5">활동 중</p>
                </div>
              </div>

              <div className="flex-1 overflow-hidden px-5 py-4 space-y-2">
                <AnimatePresence mode="sync">
                  {CHAT.map(msg =>
                    visibleMsgs.includes(msg.id) ? (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className={`flex ${msg.isMe ? 'justify-end' : 'items-end gap-2'}`}
                      >
                        {!msg.isMe && <Avatar initial="김" color="#1d4ed8" size={6} />}
                        <div className={`rounded-2xl px-3.5 py-2 max-w-[78%] text-[11px] leading-relaxed ${
                          msg.isMe
                            ? 'bg-[#1d4ed8] text-white rounded-br-sm'
                            : 'bg-[#f3f4f6] text-[#111] rounded-bl-sm'
                        }`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ) : null
                  )}
                  {typing && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-end gap-2"
                    >
                      <Avatar initial="김" color="#1d4ed8" size={6} />
                      <div className="rounded-2xl rounded-bl-sm bg-[#f3f4f6] px-3.5 py-3 flex gap-1.5 items-center">
                        <Dot delay={0} /><Dot delay={0.2} /><Dot delay={0.4} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="px-5 pb-4 flex-shrink-0">
                <div className="flex items-center gap-2 rounded-xl border border-[#f3f4f6] bg-[#fafafa] px-3.5 py-2.5">
                  <span className="flex-1 text-[10px] text-[#d1d5db]">메시지 보내기...</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 하단 네비 ── */}
      <div className="flex border-t border-[#f3f4f6]">
        {NAV.map(({ id, label, icon }) => {
          const active = tab === id;
          return (
            <button key={id} className="relative flex-1 py-3 flex flex-col items-center gap-1">
              {active && (
                <motion.div
                  layoutId="alti-nav-dot"
                  className="absolute top-0 inset-x-0 h-[2px] bg-[#1d4ed8]"
                />
              )}
              {icon(active)}
              <span className="text-[10px] font-medium" style={{ color: active ? '#1d4ed8' : '#d1d5db' }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

    </motion.div>
  );
}
