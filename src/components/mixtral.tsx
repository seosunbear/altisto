'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StarTrail from '@/components/StarTrail';

gsap.registerPlugin(ScrollTrigger);

/* 오른쪽 기둥에 걸리는 회사 모토 — 한 줄씩 위에서 내려온다.
   앞선 카피의 '관객' 은유를 그대로 이어 간다 */
const MOTTO = [
  { text: 'MISSION',        kind: 'label' },

  { text: '세계 82억 명,',       kind: 'lead' },
  { text: '모든 관객을',         kind: 'lead' },
  { text: '사로잡아라',          kind: 'lead' },

  { text: '저희만의',    kind: 'lead', gap: true },
  { text: '다양한 콘텐츠로',   kind: 'lead' },
  { text: '관객을 사로잡는것',      kind: 'lead'},
  { text: '그것이 저희의',         kind: 'lead', gap: true },
  { text: '목표이자 주어진 미션입니다',    kind: 'lead' },
] as const;

const MOTTO_CLASS: Record<(typeof MOTTO)[number]['kind'], string> = {
  label: 'mb-3 text-[18px] font-extrabold tracking-[0.1em] text-white',
  /* 줄 수가 늘어난 만큼 한 단계 줄인다 — 28vw 기둥 안에서 줄바꿈이 나지 않아야 한다 */
  lead:  'text-[clamp(0.75rem,1vw,1.6rem)] font-bold leading-[1.2] tracking-[0.1em] text-white',
};

export default function MistralGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
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

    const ctx = gsap.context(() => {

      gsap.set(panel, {
        width: '30%',
        height: '68%',
      });

      gsap.set(text, {
        bottom: '0px',
      });

      /* 좌상단은 처음엔 비어 있는 검은 칸 — 내용은 칸이 벌어지면서 서서히 올라온다 */
      gsap.set([videoRef.current, contentRef.current], { opacity: 0 });
      gsap.set(contentRef.current, { y: 28 });

      /* 전환용 별 오버레이는 평소엔 없다 */
      gsap.set(sweepRef.current, { opacity: 0 });


      /* pin은 반드시 하나의 ScrollTrigger에서만 — 같은 trigger에 pin을 여러 번
         걸면 pin-spacer가 중첩되면서 섹션이 화면 밖으로 밀려난다 */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=3000',
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
      tl.to(introRef.current,    { yPercent: 68.75, ease: 'none', duration: 0.3 }, 0);
      tl.to(paletteRef.current,  { yPercent: 68.75, ease: 'none', duration: 0.3 }, 0);
      /* 헤드라인은 그대로 가라앉는다 — 거리·이징은 원래대로 두고 구간만 늘려
         속도를 낮췄다 (0.3 → 0.45, 단위당 3333px → 2222px) */
      tl.to(text,                { bottom: '-1000px', ease: 'none', duration: 0.45 }, 0);

      /* 칸이 벌어지는 동안 영상 → 글자 순으로 서서히 떠오른다 */
      tl.to(videoRef.current,    { opacity: 1, ease: 'none', duration: 0.2 }, 0.03);
      tl.to(contentRef.current,  { opacity: 1, y: 0, ease: 'power2.out', duration: 0.16 }, 0.13);

      /* 우하단이 왼쪽으로 빠지는 건 세로 이동과 분리한다 — 2단 길이에 묶으면
         좁은 구간에 한 화면 폭을 다 움직여야 해서 급하게 튀어 나간다.
         1단 중반부터 2단 끝까지 걸쳐 천천히 흘려보낸다 */
      tl.to(paletteRef.current,  { xPercent: -100, ease: 'none', duration: 0.37 }, 0.18);

      /* 우하단이 왼쪽을 지나는 중간에 별이 화면 전체를 한 번 훑고 지나간다 —
         칸이 재배치되는 순간을 덮는 전환.
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

      /* ── 2단 (0.30 → 0.55) 위 두 칸이 아래로 늘어난다 ────────────────
         가로 경계선이 90%→100%로 마저 내려가면서 아래 두 칸을 밀어낸다.
         헤드라인 칸은 이미 h-full이라 따로 늘릴 게 없다.
         끝나면 왼쪽 72% 영상 / 오른쪽 28% 모토, 두 개의 전체 높이 기둥 */
      tl.to(panel,               { height: '100%', ease: 'none', duration: 0.25 }, 0.3);
      tl.to(introRef.current,    { yPercent: 100, ease: 'none', duration: 0.25 }, 0.3);
      tl.to(paletteRef.current,  { yPercent: 100, ease: 'none', duration: 0.25 }, 0.3);

      /* ── 3단 (0 → 0.45) 모토가 한 줄씩 위에서 내려온다 ──────────────
         2단(아래로 내려가는 구간, 0.30~)보다 앞서 시작해서 칸이 움직이는 동안
         이미 뜨고 있게 한다. 마지막 줄이 자리를 잡으면 곧 pin이 풀린다 */
      const mottoLines = mottoRef.current
        ? gsap.utils.toArray<HTMLElement>(mottoRef.current.children)
        : [];

      /* stagger가 duration보다 커야 한 줄이 다 뜬 뒤 다음 줄이 시작한다.
         반대면 서너 줄이 늘 같이 페이드 중이라 순서가 안 읽힌다.
         줄 사이 간격을 줄여 전체가 훨씬 빨리 다 뜨게 한다.
         9줄 × 0.045 = 0.36 → 마지막 줄이 0.36에 시작해 0.42에 끝난다 */
      tl.from(mottoLines, {
        y: -40,
        opacity: 0,
        ease: 'power2.out',
        duration: 0.055,
        stagger: 0.04,
      }, 0);

    }, section);

    return () => ctx.revert();
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
      className="relative h-screen bg-[#101014]"
    >
      {/* 네 칸을 절대배치로 둔다 — 그리드 트랙을 애니메이션하면 컬럼 폭이
          행끼리 묶여 좌상단만 키울 수 없다. 좌상단 패널은 맨 아래에 따로 있다 */}

      <div className="absolute inset-0 overflow-hidden">

        {/* =====================================================
            RIGHT TOP — 헤드라인
            ===================================================== */}

        <div
          ref={headlineRef}
          className="
            absolute
            left-[30%]
            top-0
            z-0
            h-full
            w-[70%]
            overflow-hidden
            border-l
            border-white/10
            bg-[#101014]
          "
        >
          {/* 모토 — 마지막에 남는 오른쪽 28vw 안에 들어오도록 칸 왼쪽에 붙인다 */}

          <div
            ref={mottoRef}
            className="
              absolute
              inset-y-0
              left-0
              flex
              w-[28vw]
              min-w-[240px]
              flex-col
              justify-center
              gap-2
              px-8
              md:px-10
            "
          >
            {MOTTO.map((line) => (
              <p
                key={line.text}
                className={`${MOTTO_CLASS[line.kind]}${'gap' in line ? ' mt-6' : ''}`}
              >
                {line.text}
              </p>
            ))}
          </div>

          {/* 칸 자체는 아래 틈을 덮으려고 전체 높이를 갖지만,
              헤드라인의 처음 자리는 원래 칸 높이(68%) 안이다.
              여기에 overflow-hidden을 걸면 안 된다 — 이 선은 68%에 고정인데
              실제 보이는 경계선은 1단 동안 90%까지 내려가서, 그 사이 빈
              공간에서 글자가 잘려 사라진다. 아래로 흘러간 글자는 그 위에 놓인
              아래 두 칸(z-10 / z-20)과 칸 자체의 overflow-hidden이 가려 준다 */}

          <div className="absolute inset-x-0 top-0 h-[68%]">
          <div ref={textRef} className=" absolute inset-0 flex items-end p-8 md:p-14">
            <h2
              className="
                max-w-3xl
                text-[clamp(3rem,5vw,7rem)]
                font-bold
                leading-[0.95]
                tracking-[-0.06em]
                text-white

              "
            >
              콘텐츠 그 이상의
              <br />
              <span className="mt-2 block text-[clamp(3rem,3vw,7rem)] tracking-[-0.03em]">가치를 만듭니다</span>
            </h2>
          </div>
          </div>
        </div>
 

        {/* =====================================================
            LEFT BOTTOM — 짧은 소개
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
            w-[30%]
            overflow-hidden
            border-r
            border-t
            border-white/10
            bg-[#4338ca]
          "
        >
          <div
            className="
              absolute
              inset-0
              flex
              items-end
              p-8
              md:p-10
            "
          >
            <div className="max-w-xl">

              <h3
                className="
                  text-[clamp(1.5rem,3vw,2rem)]
                  font-medium
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-white
                "
              >
                Content<br />
                beyond<br />
                expectations.
              </h3>

            </div>
          </div>
        </div>


        {/* =====================================================
            RIGHT BOTTOM — 유성우
            ===================================================== */}

        <div
          ref={paletteRef}
          className="
            absolute
            top-[68%]
            z-20
            h-[32%]
            overflow-hidden
            border-t
            border-white/10
            bg-[#101014]
          "
          style={{ left: '30%', width: '70%' }}
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
          좌상단 패널 — 스크롤에 따라 이것만 전체 화면으로 커진다.
          그리드 트랙을 애니메이션하면 컬럼 폭을 공유하는 좌하단까지
          같이 늘어나므로, 이 패널만 오버레이로 띄워 크기를 준다
          ===================================================== */}

      <div
        ref={panelRef}
        className="
          absolute
          left-0
          top-0
          z-30
          overflow-hidden
          bg-[#101014]
        "
        style={{ width: '30%', height: '68%' }}
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

        {/* 글자 대비용 */}

        <div
          aria-hidden
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#101014]/80
            via-[#101014]/20
            to-transparent
          "
        />

        <div
          ref={contentRef}
          className="
            absolute
            inset-0
            flex
            items-center
            pl-10
            md:pl-20
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

    </section>
  );
}