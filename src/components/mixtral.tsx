'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StarTrail from '@/components/StarTrail';
import CharRoll from '@/components/CharRoll';

gsap.registerPlugin(ScrollTrigger);

/* 오른쪽 기둥에 걸리는 회사 모토 — 한 줄씩 위에서 내려온다.
   앞선 카피의 '관객' 은유를 그대로 이어 간다.
   mark에 적은 낱말은 모토가 다 내려온 뒤 형광펜으로 하나씩 강조된다 —
   문장에서 실제로 힘이 실리는 네 낱말만 고른다 */
const MOTTO = [
  { text: 'MISSION',        kind: 'label' },

  { text: '세계 82억 명,',       kind: 'lead', mark: ['82억'] },
  { text: '모든 관객을',         kind: 'lead' },
  { text: '사로잡아라',          kind: 'lead' },

  { text: '저희만의',    kind: 'lead', gap: true },
  { text: '다양한 콘텐츠로',   kind: 'lead', mark: ['콘텐츠'] },
  { text: '관객을 사로잡는것',      kind: 'lead'},
  { text: '그것이 저희의',         kind: 'lead', gap: true },
  { text: '목표이자 주어진 미션입니다',    kind: 'lead', mark: ['목표', '미션'] },
] as const;

const MOTTO_CLASS: Record<(typeof MOTTO)[number]['kind'], string> = {
  label: 'mb-3 text-[18px] font-extrabold tracking-[0.1em] text-white',
  /* 줄 수가 늘어난 만큼 한 단계 줄인다 — 28vw 기둥 안에서 줄바꿈이 나지 않아야 한다.
     모바일에선 화면 폭을 다 쓰므로 vw 기준을 따로 준다 */
  lead:
    'text-[clamp(1rem,2vw,1.6rem)] font-bold leading-[1.2] tracking-[0.1em] text-white' +
    ' lg:text-[clamp(0.1rem,1.2vw,1.6rem)]',
};

/* 형광펜 색은 낱말마다 다르다 — 페이지에 이미 떠다니는 StarTrail 별들의
   색을 그대로 가져온다. 새 색을 들이지 않아 장식과 톤이 맞는다.
   클래스 문자열을 통째로 적어 둬야 Tailwind가 스캔해서 생성한다 */
const MARK_COLOR: Record<string, string> = {
  '82억': 'bg-[#93c5fd]',   // 별 파랑
  '콘텐츠': 'bg-[#c4b5fd]',  // 별 라벤더
  '목표': 'bg-[#fed7aa]',   // 별 주황
  '미션': 'bg-[#a5f3fc]',   // 별 청록
};

/* 형광펜 상자의 양옆 여백 — 고정이 아니라 칠해질 때 0에서 여기까지 벌어진다.
   가만히 있을 때부터 여백이 있으면 '미션입니다'가 '미션 입니다'처럼 띄어쓴 걸로
   보인다. 그래서 평소엔 글자를 붙여 두고, 형광펜이 지나가는 동안 낱말이 스스로
   자리를 벌리게 한다 — 양옆 글자는 덮이는 대신 그만큼 밀려난다.

   좌우 값이 다른 이유: 줄에 걸린 tracking-[0.1em]이 마지막 글자 뒤에도 붙어서
   오른쪽이 0.1em 더 벌어져 보인다. 그만큼 빼야 좌우가 같아 보인다 */
const MARK_PAD_OPEN = { paddingLeft: '0.3em', paddingRight: '0.2em' };
const MARK_PAD_SHUT = { paddingLeft: '0em', paddingRight: '0em' };

/* 한 줄을 형광펜 낱말 기준으로 쪼갠다.

   형광펜이 밝은 파스텔이라 그 위의 글자는 검어야 읽힌다. 그런데 글자를 처음부터
   검게 두면 형광펜이 칠해지기 전 — 모토가 내려오는 동안 — 낱말이 검은 배경에
   묻혀 안 보인다. 그래서 낱말을 두 겹으로 깐다:

     아래층  평소의 흰 글자 (형광펜이 오기 전까지 이게 보인다)
     위층    형광펜 + 검은 글자. 처음엔 너비 0이라 없는 것과 같고,
             GSAP이 너비를 100%까지 열면 왼쪽부터 아래층을 덮어 간다

   scaleX 대신 너비를 여는 이유: scaleX는 안쪽 글자까지 같이 눌러서 칠해지는
   동안 글자가 납작하게 찌그러진다. overflow-hidden + 너비면 글자는 그대로 두고
   잘리기만 한다. 위층 글자는 absolute라 아래층과 정확히 같은 자리에 겹친다. */
function renderLine(text: string, marks?: readonly string[]) {
  if (!marks?.length) return text;

  const parts = text.split(new RegExp(`(${marks.join('|')})`, 'g'));

  return parts.map((part, i) =>
    marks.includes(part) ? (
      <span key={i} data-mark className="relative inline-block">
        {part}
        <span
          data-hl
          aria-hidden
          className={`
            pointer-events-none
            absolute
            inset-0
            w-0
            overflow-hidden
            rounded-[3px]
            ${MARK_COLOR[part]}
          `}
        >
          {/* 아래층과 같은 패딩을 받아야 두 겹의 글자가 겹쳐 보인다 —
              그래서 패딩 트윈이 이 칸과 바깥 칸을 함께 잡는다 */}
          <span className="absolute left-0 top-0 whitespace-pre text-[#101014]">
            {part}
          </span>
        </span>
      </span>
    ) : (
      part
    ),
  );
}

/* 레이아웃이 갈리는 지점 — 아래 lg: 클래스와 matchMedia 질의가 항상 같은 값이어야 한다 */
const DESKTOP = '(min-width: 1024px)';
const MOBILE = '(max-width: 1023px)';

export default function MistralGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mottoRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const text = textRef.current;

    if (!section || !panel) return;

    /* 두 레이아웃은 칸이 움직이는 방향만 다르고 연출 순서는 같다.
       공통 조각은 여기 모아 두고, 칸 배치만 각 분기에서 따로 짠다 */
    const common = (tl: gsap.core.Timeline, mottoAt: number) => {

      /* 영상 칸은 처음엔 비어 있는 검은 칸 — 내용은 칸이 벌어지면서 서서히 올라온다 */
      gsap.set([videoRef.current, contentRef.current], { opacity: 0 });
      gsap.set(contentRef.current, { y: 28 });

      /* 전환용 별 오버레이는 평소엔 없다 */
      gsap.set(sweepRef.current, { opacity: 0 });

      gsap.set(text, { y: 0 });

      /* 칸이 벌어지는 동안 영상이 서서히 떠오른다.
         그 위에 얹히는 로고는 자리가 레이아웃마다 달라 각 분기에서 따로 다룬다 */
      tl.to(videoRef.current, { opacity: 1, ease: 'none', duration: 0.2 }, 0.03);

      /* 그 중간에 별이 화면 전체를 한 번 훑고 지나간다 — 칸이 재배치되는 순간을 덮는 전환.
         이 플래시만 스크럽에서 떼어낸다: opacity를 스크롤 위치에 그대로 묶으면
         빠르게 지나갈 때 한두 프레임만 보이고 끝난다.
         구간에 들어오면 스크롤 속도와 무관하게 1.5초 길이로 스스로 재생한다 */
      const sweep = sweepRef.current;

      const flash = gsap.timeline({ paused: true })
        .fromTo(sweep, { xPercent: 16 }, { xPercent: -16, duration: 1.5, ease: 'none' }, 0)
        .fromTo(sweep, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power1.out' }, 0)
        .to(sweep, { opacity: 0, duration: 0.75, ease: 'power1.in' }, 0.75);

      /* 되감아 올라올 때도 다시 재생한다. 재생 중이면 겹쳐 쏘지 않는다 */
      tl.call(() => { if (!flash.isActive()) flash.restart(); }, undefined, 0.3);

      /* ── 마지막: 모토가 한 줄씩 위에서 내려온다 ─────────────────────
         시작 시점(mottoAt)은 레이아웃마다 다르다 — PC는 칸이 아직 재배치되는
         중에 이미 첫 줄이 뜨고(0.14), 모바일은 로고가 비워진 뒤에 시작한다(0.34).
         마지막 줄이 자리를 잡으면 곧 pin이 풀려 페이지가 계속 내려간다 */
      const mottoLines = mottoRef.current
        ? gsap.utils.toArray<HTMLElement>(mottoRef.current.children)
        : [];

      /* 9줄 × 0.03 = 0.24 → 마지막 줄은 mottoAt+0.24에 시작해 +0.1에 끝난다.
         이 끝나는 시점이 곧 타임라인 전체 길이이자 스크롤 구간 전체라,
         mottoAt이 앞당겨질수록 모토가 pin 안에서 차지하는 비중이 커진다 */
      tl.from(mottoLines, {
        y: -40,
        opacity: 0,
        ease: 'power2.out',
        duration: 0.1,
        stagger: 0.03,
      }, mottoAt);

      /* 마지막 줄이 자리를 잡자마자(mottoAt+0.34) 형광펜이 82억 → 콘텐츠 →
         목표 → 미션 순으로 한 낱말씩 왼쪽에서 오른쪽으로 칠해진다.
         네 개 × stagger 0.06 + duration 0.08 = 0.26 → mottoAt+0.60에 끝난다.
         이게 곧 타임라인 전체 길이라, 아래 두 분기의 end 값도 그만큼 늘려
         스크롤 속도를 그대로 유지한다 */
      const words = mottoRef.current
        ? gsap.utils.toArray<HTMLElement>(mottoRef.current.querySelectorAll('[data-mark]'))
        : [];

      /* 한 낱말이 세 가지를 동시에 한다 — 상자가 열리고, 자리를 벌리고, 떠오른다.
         stagger 대신 낱말마다 직접 도는 이유: 패딩 트윈이 [바깥 칸 + 안쪽 글자]
         두 요소를 짝지어 잡아야 하는데, stagger를 쓰면 그 둘이 서로 다른 시점에
         움직여 두 겹의 글자가 어긋난다 */
      words.forEach((word, i) => {
        const box = word.querySelector<HTMLElement>('[data-hl]');
        const inner = box?.firstElementChild as HTMLElement | null;
        const at = mottoAt + 0.34 + i * 0.06;

        /* 상자가 왼쪽부터 열린다. 0%→100%로 둬야 매 프레임 브라우저가 그때그때의
           낱말 폭에 맞춰 다시 잰다 — px으로 잡으면 아래 패딩이 벌어지는 만큼
           상자가 못 따라와 오른쪽 끝이 덜 칠해진 채로 남는다 */
        tl.fromTo(box,
          { width: '0%' },
          { width: '100%', ease: 'power2.out', duration: 0.08 },
          at);

        /* 붙어 있던 낱말이 형광펜에 밀려 양옆으로 자리를 벌린다 */
        tl.fromTo([word, inner],
          MARK_PAD_SHUT,
          { ...MARK_PAD_OPEN, ease: 'power2.out', duration: 0.08 },
          at);

        /* 그 사이 살짝 떠올랐다 내려앉는다 — 칠하기(0.08)와 같은 창 안에서
           끝내야 타임라인 길이가 안 바뀐다: 0.035 올라가고 0.045 내려온다.
           내려올 때를 더 길게 잡아 톡 튀고 천천히 앉는 리듬을 만든다 */
        tl.to(word, { y: -5, ease: 'power2.out', duration: 0.035 }, at);
        tl.to(word, { y: 0, ease: 'power2.inOut', duration: 0.045 }, at + 0.035);
      });
    };

    const mm = gsap.matchMedia();

    /* =====================================================
       PC — 2×2 칸에서 좌상단만 대각선으로 커진다
       ===================================================== */

    mm.add(DESKTOP, () => {

      gsap.set(panel, { width: '30%', height: '68%' });

      const cells = [introRef.current, paletteRef.current];

      /* pin은 반드시 하나의 ScrollTrigger에서만 — 같은 trigger에 pin을 여러 번
         걸면 pin-spacer가 중첩되면서 섹션이 화면 밖으로 밀려난다 */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          /* 2300 → 2700: 형광펜 구간(0.39→0.65)이 붙으면서 타임라인이
             0.55에서 0.65로 길어진 만큼만 늘린다 — 스크롤 속도는 그대로 */
          end: '+=2700',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* ── 1단 (0 → 0.30) 좌상단이 대각선으로 커진다 ───────────────────
         나머지 칸은 크기를 유지한 채 경계선과 같은 속도로만 밀려난다.
           헤드라인: 세로 경계선이 30%→72%, 자기 폭 70% → xPercent 60
           아래 두 칸: 가로 경계선이 68%→90%, 자기 높이 32% → yPercent 68.75 */
      tl.to(panel,               { width: '72%', height: '90%', ease: 'none', duration: 0.3 }, 0);
      tl.to(headlineRef.current, { xPercent: 60, ease: 'none', duration: 0.3 }, 0);
      tl.to(cells,               { yPercent: 68.75, ease: 'none', duration: 0.3 }, 0);

      /* 모토 기둥도 같은 경계선에 실려 간다 — 헤드라인 칸 안에 있던 시절과 같은
         움직임이다. 30%에서 출발해 42vw를 가면 72%, 자기 폭(28vw)의 150% */
      tl.to(mottoRef.current,    { xPercent: 150, ease: 'none', duration: 0.3 }, 0);

      /* 왼쪽 세로 경계선에는 처음부터 끝까지 붙어 있다 — 칸(headlineRef)의
         border-l이 곧 그 선이고 칸이 선을 물고 30%→72%로 밀려가므로, 글자에
         가로 트윈을 걸지 않으면 선과의 거리(p-14)가 저절로 유지된 채 실려 간다.
         x를 얹는 순간 선에서 떨어져 나가 혼자 앞서 간다.

         세로는 두 성분을 더해서 만든다 — 한 트윈을 끊어 이으면 그 지점에서
         속도가 튀어 꺾여 보이기 때문이다(선을 따라갈 땐 73vh/단위인데
         놓는 순간 406vh/단위로 5.5배가 즉시 튄다).
           y        : 아래 가로 경계선을 1단 내내 그대로 따라간다.
                      선과 같은 길이(0.3)·같은 이징(none)이라 속도가 정확히 맞는다.
           yPercent : 0.044(스크롤 8%)부터 그 위에 얹히는 낙하.
                      power1.in이라 시작 속도가 0 — 놓는 순간 글자의 실제 속도는
                      아직 선의 속도 그대로다. 거기서 거리 ∝ 시간²로 붙으므로
                      중력에 놓인 것처럼 매끄럽게 가속으로 넘어간다.
         두 성분은 GSAP이 같은 transform에 합쳐 준다. 선 밑으로 잠기는 부분은
         clip 칸이 잘라 먹어, 0.16 부근에서 선에 삼켜지듯 사라진다 */
      tl.to(text, { y: '22vh', ease: 'none', duration: 0.3 }, 0);
      tl.to(text, { yPercent: 190, ease: 'power1.in', duration: 0.35 }, 0.044);

      /* 헤드라인을 담은 칸은 영상 패널과 같은 높이를 따라간다 — 이게 곧 보이는
         가로 경계선이다. overflow-hidden이 걸려 있어 글자는 딱 그 선에서 잘린다.
         이 트윈이 없으면 68% 아래로 흘러간 글자가 오른쪽 빈 구역에 그대로 보인다 */
      tl.to(clipRef.current,     { height: '90%', ease: 'none', duration: 0.3 }, 0);
      tl.to(clipRef.current,     { height: '100%', ease: 'none', duration: 0.25 }, 0.3);

      /* ── 2단 (0.30 → 0.55) 위 두 칸이 아래로 늘어난다 ────────────────
         가로 경계선이 90%→100%로 마저 내려가면서 아래 두 칸을 밀어낸다.
         헤드라인 칸은 이미 h-full이라 따로 늘릴 게 없다.
         끝나면 왼쪽 72% 영상 / 오른쪽 28% 모토, 두 개의 전체 높이 기둥 */
      tl.to(panel, { height: '100%', ease: 'none', duration: 0.25 }, 0.3);
      tl.to(cells, { yPercent: 100, ease: 'none', duration: 0.25 }, 0.3);

      /* 유성우 칸이 왼쪽으로 빠지는 건 세로 이동과 분리한다 — 2단 길이에 묶으면
         좁은 구간에 한 화면 폭을 다 움직여야 해서 급하게 튀어 나간다.
         1단 중반부터 2단 끝까지 걸쳐 천천히 흘려보낸다 */
      tl.to(paletteRef.current, { xPercent: -100, ease: 'none', duration: 0.37 }, 0.18);

      /* 로고는 왼쪽 기둥 가운데 — 오른쪽 기둥의 모토와 자리가 겹치지 않는다 */
      tl.to(contentRef.current, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.16 }, 0.13);

      common(tl, 0.1);
    });


    /* =====================================================
       모바일 — 가로 띠 세 겹, 영상 칸이 아래로만 자란다
       (영상 32% / 헤드라인 32~68% / 아래 두 칸 68~100%)
       ===================================================== */

    mm.add(MOBILE, () => {

      gsap.set(panel, { width: '100%', height: '32%' });

      const cells = [introRef.current, paletteRef.current];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          /* 손가락 이동량이 커서 PC보다 짧게 잡는다.
             1700 → 2350: 모토가 다 내려온 뒤(0.68) 형광펜 구간이 0.94까지
             이어지는 만큼 늘린 값 — PC와 같은 비율이다 */
          end: '+=2350',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* 가로로 움직이는 칸이 없어 헤드라인은 처음부터 곧게 가라앉는다 */
      tl.to(text, { y: '130vh', ease: 'none', duration: 0.65 }, 0);

      /* 폭은 이미 화면 전체라 높이만 자란다. 구간은 PC와 같은 0.3 / 0.25 */
      tl.to(panel, { height: '78%', ease: 'none', duration: 0.3 }, 0);
      tl.to(panel, { height: '100%', ease: 'none', duration: 0.25 }, 0.3);

      /* 아래 두 칸은 영상 칸의 아래 모서리가 자기 자리(68%)에 닿는 순간부터 밀린다.
         1단에서 모서리가 32%→78%이므로 68%에 닿는 시점 = 0.3 × (68-32)/(78-32) = 0.234.
         거기서 1단 끝까지 10vh(칸 높이 32vh → yPercent 31.25),
         2단에서 나머지 22vh(→ 100)를 밀어 모서리와 계속 붙어 간다 */
      tl.to(cells, { yPercent: 31.25, ease: 'none', duration: 0.066 }, 0.234);
      tl.to(cells, { yPercent: 100, ease: 'none', duration: 0.25 }, 0.3);

      /* 로고는 영상 위 가운데 — 마지막엔 모토가 같은 자리를 쓰므로,
         모토가 내려오기 직전에 비운다 */
      tl.to(contentRef.current, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.16 }, 0.13);
      tl.to(contentRef.current, { opacity: 0, ease: 'none', duration: 0.07 }, 0.30);

      /* 유성우 칸은 폭이 38%뿐이라 PC와 같은 길이로 끌면 늘어져 보인다.
         별 플래시(0.3)가 지나가기 전에 빠져나가도록 짧게 */
      tl.to(paletteRef.current, { xPercent: -100, ease: 'power1.in', duration: 0.13 }, 0.18);

      common(tl, 0.34);
    });

    return () => mm.revert();
  }, []);

  /* iOS Safari 인라인 재생 보장 — 재생 시작 시점에 muted/playsinline이 확정돼
     있지 않으면 인라인을 거부하고 네이티브 전체화면 플레이어로 넘어간다.
     SSR 속성만 믿지 말고 마운트 직후 프로퍼티를 직접 못 박은 뒤 play()를 부른다 */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', 'true');

    // 자동재생이 차단되면(저전력 모드 등) 첫 사용자 입력에서 한 번 더 시도
    const retry = () => { v.play().catch(() => {}); };

    v.play().catch(() => {
      window.addEventListener('touchstart', retry, { once: true, passive: true });
      window.addEventListener('click', retry, { once: true });
    });

    return () => {
      window.removeEventListener('touchstart', retry);
      window.removeEventListener('click', retry);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] overflow-hidden bg-[#101014] lg:h-screen"
    >
      {/* 네 칸을 절대배치로 둔다 — 그리드 트랙을 애니메이션하면 컬럼 폭이
          행끼리 묶여 좌상단만 키울 수 없다. 영상 패널은 맨 아래에 따로 있다.
          칸의 처음 자리는 클래스로만 잡는다 — 인라인 style로 두면 브레이크포인트마다
          다른 값을 줄 수 없다. GSAP이 마운트 직후 같은 값으로 다시 못 박는다 */}

      <div className="absolute inset-0 overflow-hidden">

        {/* =====================================================
            헤드라인 — PC는 오른쪽 위 칸, 모바일은 영상 아래 띠
            ===================================================== */}

        <div
          ref={headlineRef}
          className="
            absolute
            left-0
            top-0
            z-0
            h-full
            w-full
            overflow-hidden
            border-white/10
            bg-[#101014]
            lg:left-[30%]
            lg:w-[70%]
            lg:border-l
          "
        >
          {/* 가라앉는 글자를 잘라내는 칸. 높이가 곧 보이는 가로 경계선이라
              PC에서는 68% → 90% → 100%로 패널과 같이 자란다(위 타임라인).
              고정 높이로 두면 68% 아래 오른쪽 빈 구역에 글자가 그대로 비친다.
              모바일은 영상 띠(32%) 아래가 헤드라인 자리이고, 그 아래는 아래 두 칸과
              전체 폭 영상이 덮어 주므로 자라지 않아도 된다.

              안쪽 상자의 높이는 화면 기준(68vh / 36svh)으로 못 박는다 — 부모가
              자랄 때 items-end가 따라 내려가면 글자가 같이 밀린다 */}
 
          <div
            ref={clipRef}
            className="absolute inset-x-0 top-[32%] h-[36%] overflow-hidden lg:top-0 lg:h-[68%]"
          >
          <div
            ref={textRef}
            className="absolute inset-x-0 top-0 flex h-[36svh] items-end p-6 lg:h-[68vh] lg:p-14"
          >
            <div
              className="
                max-w-3xl
                text-[clamp(1.9rem,8vw,3.4rem)]
                font-bold
                leading-[0.95]
                tracking-[-0.06em]
                text-white
                lg:text-[clamp(3rem,5vw,7rem)]
              "
            >
              {/* 글자 하나하나는 왼쪽에서 오른쪽으로 굴러 나가고, 그 순서는 줄의
                  오른쪽 끝에서 시작해 왼쪽으로 번진다 — mistral.ai 히어로 제목의
                  등장 연출을 루프로 고친 것이다.
                  아랫줄은 0.24초 늦게 출발해 윗줄부터 차례로 들어오게 한다 */}


<CharRoll
  text="콘텐츠 그 이상의"
  intro={0}
  loopDelay={0}
  className="block"
/>

<CharRoll
  text="가치를 만듭니다"
  intro={0.5}
  loopDelay={0.5}
  className="
    mt-2
    block
    text-[clamp(1.9rem,8vw,3.4rem)]
    tracking-[-0.03em]
    lg:text-[clamp(3rem,3vw,7rem)]
  "
/>


            </div>
          </div>
          </div>
        </div>


        {/* =====================================================
            아래 왼쪽 — 짧은 소개
            ===================================================== */}

        <div
          ref={introRef}
          className="
            target-panel
            absolute
            left-0
            top-[68%]
            z-10
            h-[32%]
            w-[62%]
            overflow-hidden
            border-r
            border-t
            border-white/10
            bg-[#4338ca]
            lg:w-[30%]
          "
        >
          <div
            className="
              absolute
              inset-0
              flex
              items-end
              p-5
              lg:p-10
            "
          >
            <div className="max-w-xl">

              <h3
                className="
                  text-[clamp(1.5rem,3vw,3rem)]
                  font-medium
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-white
                  lg:text-[clamp(1.3rem,2.3vw,3rem)]
                "
              >
                Content <br />
                beyond <br />
                expectations.
              </h3>

            </div>
          </div>
        </div>


        {/* =====================================================
            아래 오른쪽 — 유성우
            ===================================================== */}

        <div
          ref={paletteRef}
          className="
            absolute
            left-[62%]
            top-[68%]
            z-20
            h-[32%]
            w-[38%]
            overflow-hidden
            border-t
            border-white/10
            bg-[#101018]
            lg:left-[30%]
            lg:w-[70%]
          "
        >

          {/* 서비스 페이지 히어로와 같은 유성우 장식 — 처음부터 보인다 */}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <StarTrail idPrefix="grid" />
          </div>

        </div>


      </div>


      {/* =====================================================
          영상 패널 — 스크롤에 따라 이것만 전체 화면으로 커진다.
          그리드 트랙을 애니메이션하면 컬럼 폭을 공유하는 아래 칸까지
          같이 늘어나므로, 이 패널만 오버레이로 띄워 크기를 준다.
          PC는 좌상단 30×68, 모바일은 화면 폭을 다 쓰는 32% 띠
          ===================================================== */}

      <div
        ref={panelRef}
        className="
          absolute
          left-0
          top-0
          z-30
          h-[32%]
          w-full
          overflow-hidden
          bg-[#101014]
          lg:bg-[#1B1B39]
          lg:h-[68%]
          lg:w-[30%]
        "
      >
        {/* 배경 영상 — 패널을 꽉 채우고 object-cover로 잘라낸다.
            화면 크기로 고정해두면 패널이 커지는 동안 영상 중심이 패널 중심과
            어긋나므로(패널은 결국 90% 높이라 세로로 45px 밀린다),
            패널에 맞춰 늘리고 비율은 cover가 지킨다.
            pointer-events-none — 탭이 닿아 네이티브 플레이어가 뜨지 않게 */}

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/main.webp"
          disablePictureInPicture
          className="
            pointer-events-none
            absolute
            inset-0
            h-full
            w-full
            object-cover
            opacity-0
          "
        >
          <source src="/hero.mp4" type="video/mp4" />
          <source src="/hero.webm" type="video/webm" />
        </video>

        {/* 글자 대비용 — 모바일은 이 영상 위에 모토까지 얹히므로 화면 가운데까지 덮는다 */}

        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            inset-0
          "
        />

        <div
          ref={contentRef}
          className="
            absolute
            inset-0
            flex
            items-center
            pl-8
            lg:pl-20
          "
        >
          <p
            className="
              text-[clamp(1.75rem,3.5vw,4rem)]
              font-bold
              leading-[0.95]
              tracking-[-0.04em]
              text-white
            "
          >
            Altisto
          </p>
        </div>

      </div>


      {/* 모토 — PC는 세로 경계선(30% → 72%)에 실려 오른쪽으로 이동하는 28vw 기둥,
          모바일은 전체 화면 영상 위 가운데에 고정.
          영상 패널(z-30) 다음에 두어야 모바일에서 영상 위로 올라온다 */}

      <div
        ref={mottoRef}
        className="
          absolute
          inset-y-0
          left-0
          z-30
          flex
          w-full
          flex-col
          justify-center
          gap-1
          px-6
          lg:left-[30%]
          lg:w-[28vw]
          lg:px-10
        "
      >
        {MOTTO.map((line) => (
          <p
            key={line.text}
            className={`${MOTTO_CLASS[line.kind]}${'gap' in line ? ' mt-6' : ''}`}
          >
            {renderLine(line.text, 'mark' in line ? line.mark : undefined)}
          </p>
        ))}
      </div>


      {/* 전환용 별 오버레이 — 칸 재배치 구간에 화면 전체를 한 번 훑는다.
          그리드(z-0~30) 위, SCROLL 표시(z-50) 아래 */}

      <div
        ref={sweepRef}
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          z-40
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* 경로만 화면 크기로 넓힌다 — CSS scale을 쓰면 별 모양까지 커진다 */}
        <StarTrail idPrefix="sweep" width={1700} height={1100} />
      </div>


      {/* 스크롤 표시 — 왼쪽 아래는 파란 칸 글자 자리라 오른쪽에 둔다 */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-6
          right-6
          z-50
          text-[10px]
          tracking-[0.25em]
          text-white/30
        "
      >
        SCROLL
      </div>

    </section>
  );
}
