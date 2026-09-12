import RevealImage from './RevealImage';
import { FULL_BODY, PORTRAIT } from './data';
import { Cassette, Confetti, Notes, RetroWindow, RibbonBanner, StarBadge, Streamers } from './stickers';

/* ──────────────────────────────────────────────────────────
   메리 스크랩북 보드.

   모눈종이 판에 옅은 큰 이름을 깔고 전신 일러스트를 세운 뒤,
   둘레에 스티커(배지 · 음표 · 카세트 · 레트로 창)와 색종이 · 컬링
   리본을 붙인다.

   들어올 때는 판 → 이름 → 캐릭터 → 스티커 순으로 차례로 붙는다.
   순서는 animationDelay 로만 잡는다(0.05s 단위). 스크랩북에 하나씩
   붙이는 느낌이라, 전부 한꺼번에 뜨면 밋밋하다.

   넓은 화면에서는 페이지 폭의 큰 쪽(최대 620px), 좁은 화면에서는
   전체 폭을 쓴다. 대사는 오른쪽 프로필 쪽지가 받는다.
   보드의 높이는 모눈 판 그대로다 — 리본 배너는 절대 위치라 높이를
   더하지 않는다. 오른쪽 쪽지가 이 높이에 맞춰 늘어난다.
   그래서 안쪽 치수는 뷰포트(vw)가 아니라 cqw — 보드 자신의 폭 —
   기준이다. 폭이 절반으로 줄어도 조판이 그대로 따라 줄어든다.
   본문 글자만 px 로 두어 어느 폭에서도 읽히는 크기를 유지한다.
   ────────────────────────────────────────────────────────── */

export default function MerryBoard({ illustrationAlt }: { illustrationAlt: string }) {
  return (
    <div /* 스티커가 판 밖으로 삐져나오게 붙으므로 좌우에 여백을 둔다.
         바닥은 자르지 않는다 — 리본 배너가 판 아래로 흘러내려야 한다.
         색종이와 컬링 리본은 각자 제 안에서 잘리므로 여기서 감쌀 필요가 없다. */
      className="merry-card relative mx-auto w-full max-w-[620px] px-6">
      {/* 모눈종이 판 */}
      <div className="merry-grid-m merry-pop relative rounded-[1.6cqw] border-2 border-[var(--k-edge)] bg-[var(--k-board)] px-[4cqw] pb-[1cqw] pt-[5cqw]">
        {/* 옅은 큰 이름 */}
        <p
          aria-hidden
          className="merry-fade text-center font-[family-name:var(--font-display)] text-[32cqw] font-semibold leading-[0.82] text-[var(--k-edge)]/60"
          style={{ letterSpacing: '0.01em' }}
        >
          MERI
        </p>

        {/* 색종이 — 판 위, 캐릭터 아래 */}
        <Confetti />

        <div className="relative mx-auto -mt-[9cqw] w-[76%]">
          {/* 다 받아진 뒤에만 떠오른다 — 반쯤 그려진 채로 보이지 않게 */}
          <RevealImage
            src={FULL_BODY}
            alt={illustrationAlt}
            width={1024}
            height={1536}
            priority
            sizes="(min-width: 1024px) 40vw, 80vw"
            className="h-auto w-full select-none"
          />
        </div>

        <StarBadge
          className="merry-pop-tilt absolute -left-[2cqw] top-[3%] w-[21cqw]"
          style={{ ['--k-tilt' as string]: '-8deg', animationDelay: '0.35s' }}
        />
        <Notes
          className="merry-pop absolute right-[5cqw] top-[24%] w-[8cqw]"
          style={{ animationDelay: '0.4s' }}
        />
        <Cassette
          className="merry-pop-tilt absolute -left-[3cqw] bottom-[22%] w-[34cqw]"
          style={{ ['--k-tilt' as string]: '-6deg', animationDelay: '0.45s' }}
        />
        <RetroWindow
          title="hello.exe"
          className="merry-pop-tilt absolute -right-[2cqw] bottom-[28%] w-[32cqw]"
          style={{ ['--k-tilt' as string]: '3deg', animationDelay: '0.5s' }}
        >
          <RevealImage
            fade
            src={PORTRAIT}
            alt=""
            aria-hidden
            width={900}
            height={900}
            sizes="(min-width: 1024px) 16vw, 32vw"
            /* 창이 자기 폭을 기준자로 쓰므로 높이는 비율로 잡는다 */
            className="aspect-[5/4] w-full select-none object-cover"
            style={{ objectPosition: '52% 30%' }}
          />
        </RetroWindow>
      </div>

      {/* 리본 배너 — 흐름에서 빼서 판 바닥에 걸쳐 놓는다.
          흐름에 두면 보드가 이 배너 높이만큼 길어져, 오른쪽 프로필
          쪽지가 판 바닥을 지나쳐 내려간다(높이가 어긋난다).
          절대 위치라 아래로 흘러내려도 보드 높이는 그대로다. */}
      <RibbonBanner
        id="board"
        text="Nice to meet you"
        from="var(--k-lilac)"
        to="var(--k-pink)"
        className="merry-pop-tilt absolute -bottom-[6cqw] left-[3cqw] w-[60%]"
        style={{ ['--k-tilt' as string]: '-6deg', animationDelay: '0.55s' }}
      />

      {/* 컬링 리본 — 판 가장자리, 맨 위 */}
      <Streamers />
    </div>
  );
}
