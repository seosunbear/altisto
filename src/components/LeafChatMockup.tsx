'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function sleep(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms));
}

/* ── 데이터 ── */
const CHAT_ROOMS = [
  { id: 1, name: '20대 서울 모임', last: '오늘 뭐해요?',     time: '방금', unread: 3, color: '#60a5fa', initial: '서' },
  { id: 2, name: '취미 공유방',    last: '기타 배우는 사람?', time: '2분',  unread: 1, color: '#f59e0b', initial: '취' },
  { id: 3, name: '지은',           last: '반가워요 ㅎㅎ',      time: '5분',  unread: 0, color: '#a78bfa', initial: '지' },
];

const CHAT_MESSAGES = [
  { id: 1, isMe: false, text: '안녕! 처음 왔어요' },
  { id: 2, isMe: true,  text: '반가워요! 저도 얼마 안 됐어요 ㅎㅎ' },
  { id: 3, isMe: false, text: '같이 취미 얘기해요' },
  { id: 4, isMe: true,  text: '좋아요!' },
] as const;

type PostData = { id: number; user: string; initial: string; color: string; time: string; text: string; likes: number; comments: number };

const FEED_POSTS: PostData[] = [
  { id: 1, user: '민준', initial: '민', color: '#8b5cf6', time: '5분 전',  text: '오늘 첫 기타 레슨! 손가락 아프지만 재밌어요', likes: 24, comments: 5 },
  { id: 2, user: '서연', initial: '서', color: '#f59e0b', time: '12분 전', text: '홍대 새 카페 분위기 진짜 좋아요',              likes: 18, comments: 8 },
];

const NEW_POST: PostData = {
  id: 3, user: '지은', initial: '지', color: '#16a34a', time: '방금',
  text: '리프챗에서 첫날에 새 친구 3명 사귀었어요', likes: 0, comments: 0,
};

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

/* ── 아바타 ── */
function Avatar({ initial, color, size = 8 }: { initial: string; color: string; size?: number }) {
  return (
    <div
      className={`rounded-full grid place-items-center flex-shrink-0`}
      style={{ width: size * 4, height: size * 4, backgroundColor: color + '22' }}
    >
      <span className="font-semibold leading-none" style={{ fontSize: size * 1.5, color }}>
        {initial}
      </span>
    </div>
  );
}

/* ── 피드 포스트 ── */
function FeedPost({ post, liked, isNew }: { post: PostData; liked: boolean; isNew?: boolean }) {
  return (
    <div className="py-3.5 border-b border-[#f3f4f6] last:border-0">
      <div className="flex items-center gap-2.5 mb-2.5">
        <Avatar initial={post.initial} color={post.color} size={7} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-semibold text-[#111]">{post.user}</span>
            {isNew && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-[8px] font-bold text-[#16a34a] tracking-wide"
              >NEW</motion.span>
            )}
          </div>
          <span className="text-[10px] text-[#9ca3af]">{post.time}</span>
        </div>
      </div>

      {/* 이미지 블록 */}
      <div className="h-[72px] rounded-lg bg-white border border-[#e5e7eb] mb-2.5 flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>

      <p className="text-[11px] text-[#374151] leading-relaxed mb-2.5">{post.text}</p>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <motion.svg
            width="12" height="12" viewBox="0 0 24 24"
            fill={liked ? '#ef4444' : 'none'}
            stroke={liked ? '#ef4444' : '#d1d5db'}
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            animate={liked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </motion.svg>
          <motion.span key={post.likes + (liked ? 1 : 0)} initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[10px] text-[#9ca3af]">
            {post.likes + (liked ? 1 : 0)}
          </motion.span>
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span className="text-[10px] text-[#9ca3af]">{post.comments}</span>
        </span>
      </div>
    </div>
  );
}

/* ── 메인 ── */
export default function LeafChatMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const [activeTab,        setActiveTab]        = useState<'feed' | 'chat'>('feed');
  const [feedVisible,      setFeedVisible]      = useState(false);
  const [uploadProgress,   setUploadProgress]   = useState(0);
  const [showProgress,     setShowProgress]     = useState(false);
  const [newPostVisible,   setNewPostVisible]   = useState(false);
  const [likedPosts,       setLikedPosts]       = useState<Set<number>>(new Set());
  const [chatRoomsVisible, setChatRoomsVisible] = useState(false);
  const [inChatRoom,       setInChatRoom]       = useState(false);
  const [visibleMsgs,      setVisibleMsgs]      = useState<number[]>([]);
  const [typing,           setTyping]           = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        setActiveTab('feed'); setFeedVisible(false); setUploadProgress(0);
        setShowProgress(false); setNewPostVisible(false); setLikedPosts(new Set());
        setChatRoomsVisible(false); setInChatRoom(false); setVisibleMsgs([]); setTyping(false);
        await sleep(500); if (cancelled) return;

        setFeedVisible(true);
        await sleep(1800); if (cancelled) return;

        setShowProgress(true);
        for (let p = 0; p <= 100; p += 8) {
          if (cancelled) return;
          setUploadProgress(Math.min(p, 100));
          await sleep(50);
        }
        await sleep(400); if (cancelled) return;

        setNewPostVisible(true);
        await sleep(1400); if (cancelled) return;

        setLikedPosts(new Set([3]));
        await sleep(450); if (cancelled) return;
        setLikedPosts(new Set([3, 1]));
        await sleep(380); if (cancelled) return;
        setLikedPosts(new Set([3, 1, 2]));
        await sleep(1200); if (cancelled) return;

        setActiveTab('chat');
        await sleep(500); if (cancelled) return;

        setChatRoomsVisible(true);
        await sleep(2200); if (cancelled) return;

        setInChatRoom(true); setVisibleMsgs([]);
        await sleep(350); if (cancelled) return;

        for (const msg of CHAT_MESSAGES) {
          if (cancelled) return;
          if (!msg.isMe) {
            setTyping(true);
            await sleep(800); if (cancelled) return;
            setTyping(false); await sleep(80);
          }
          setVisibleMsgs(prev => [...prev, msg.id]);
          await sleep(msg.isMe ? 380 : 500);
        }
        await sleep(2000); if (cancelled) return;

        setInChatRoom(false);
        await sleep(400); if (cancelled) return;
        setChatRoomsVisible(false);
        await sleep(500);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-white overflow-hidden"
    >

      {/* ── 헤더 ── */}
      <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#f3f4f6]">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[#111]">리프챗</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <AnimatePresence>
              {newPostVisible && (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-[#ef4444] rounded-full"
                />
              )}
            </AnimatePresence>
          </div>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
      </div>

      {/* ── 업로드 프로그레스 ── */}
      <div className="h-[2px] bg-[#f3f4f6]">
        <AnimatePresence>
          {showProgress && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.8 } }}
            >
              <motion.div
                className="h-full bg-[#16a34a]"
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.07 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 컨텐츠 ── */}
      <div className="relative overflow-hidden" style={{ minHeight: 440 }}>

        {/* 피드 */}
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 overflow-y-auto px-5 pb-2"
            >
              <AnimatePresence>
                {newPostVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: -32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FeedPost post={NEW_POST} liked={likedPosts.has(NEW_POST.id)} isNew />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {feedVisible && FEED_POSTS.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.32, delay: i * 0.12 }}
                  >
                    <FeedPost post={post} liked={likedPosts.has(post.id)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 채팅 목록 */}
        <AnimatePresence mode="wait">
          {activeTab === 'chat' && !inChatRoom && (
            <motion.div
              key="chat-list"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 px-5 pt-1"
            >
              <AnimatePresence>
                {chatRoomsVisible && CHAT_ROOMS.map((room, i) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, delay: i * 0.09 }}
                    className="flex items-center gap-3 py-3.5 border-b border-[#f3f4f6] last:border-0"
                  >
                    <Avatar initial={room.initial} color={room.color} size={8} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[12px] font-semibold text-[#111] truncate">{room.name}</span>
                        <span className="text-[10px] text-[#9ca3af] ml-2 flex-shrink-0">{room.time}</span>
                      </div>
                      <p className="text-[11px] text-[#6b7280] truncate">{room.last}</p>
                    </div>
                    {room.unread > 0 && (
                      <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="h-4.5 min-w-[18px] px-1 bg-[#16a34a] rounded-full flex items-center justify-center"
                        style={{ height: 18 }}
                      >
                        <span className="text-[9px] text-white font-semibold">{room.unread}</span>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 채팅방 */}
        <AnimatePresence mode="wait">
          {activeTab === 'chat' && inChatRoom && (
            <motion.div
              key="chat-room"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex flex-col"
            >
              <div className="flex items-center gap-2.5 px-5 py-3 border-b border-[#f3f4f6] flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                <div className="relative">
                  <Avatar initial="지" color="#a78bfa" size={7} />
                  <motion.span
                    className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#22c55e] border-2 border-white"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#111] leading-none">지은</p>
                  <p className="text-[9px] text-[#22c55e] mt-0.5">활동 중</p>
                </div>
              </div>

              <div className="flex-1 overflow-hidden px-5 py-4 space-y-2">
                <AnimatePresence mode="sync">
                  {CHAT_MESSAGES.map(msg =>
                    visibleMsgs.includes(msg.id) ? (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className={`flex ${msg.isMe ? 'justify-end' : 'items-end gap-2'}`}
                      >
                        {!msg.isMe && <Avatar initial="지" color="#a78bfa" size={6} />}
                        <div className={`rounded-2xl px-3.5 py-2 max-w-[76%] text-[11px] ${
                          msg.isMe
                            ? 'bg-[#16a34a] text-white rounded-br-sm'
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
                      <Avatar initial="지" color="#a78bfa" size={6} />
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
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round">
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
        {([
          { tab: 'feed' as const, label: '피드', icon: (active: boolean) => (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? '#16a34a' : '#d1d5db'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          )},
          { tab: 'chat' as const, label: '채팅', icon: (active: boolean) => (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? '#16a34a' : '#d1d5db'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          )},
          { tab: 'friends' as const, label: '친구', icon: (active: boolean) => (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? '#16a34a' : '#d1d5db'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          )},
          { tab: 'profile' as const, label: '프로필', icon: (active: boolean) => (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? '#16a34a' : '#d1d5db'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          )},
        ]).map(({ tab, label, icon }) => {
          const active = activeTab === tab;
          return (
            <button key={tab} className="relative flex-1 py-3 flex flex-col items-center gap-1">
              {icon(active)}
              <span className="text-[10px] font-medium" style={{ color: active ? '#16a34a' : '#d1d5db' }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

    </motion.div>
  );
}
