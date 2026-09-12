/* ──────────────────────────────────────────────────────────
   이름 표시 — 둥근 한글(Jua)로 크게, 라틴으로 작게.

   글자 크기는 전부 clamp 다. 작은 폰에서 고정 px 로 두면 이름이 상자를
   밀어내고 값이 줄바꿈된다. 화면이 좁아지면 같이 줄고, 일정 폭부터는
   더 커지지 않는다.

   자리가 화면 폭에 따라 다르다. 넓은 화면에서는 오른쪽 프로필 쪽지
   머리에, 좁은 화면에서는 보드보다 위 맨 꼭대기에 선다. 그래서 자리
   두 곳이 이 컴포넌트 하나를 불러 쓰고, 보이는 쪽만 CSS 로 고른다.

   읽어 줄 제목은 page.tsx 의 sr-only h1 이 따로 있으므로, 여기는
   보조기술에서 숨긴다. 두 벌이 다 읽히면 이름이 두 번 들린다.
   ────────────────────────────────────────────────────────── */

export default function MerryName({
  name,
  sub,
  className,
}: {
  /** 큰 이름 — 그 페이지 언어의 표기 */
  name: string;
  /** 아래 작은 다른 표기 */
  sub: string;
  className?: string;
}) {
  return (
    <div aria-hidden className={className}>
      {/* 두 줄이 한 덩어리로 떠오른다.
          자간은 언어별 변수 — 일본어 가나는 전각이라 글자 사이가 벌어진다(globals.css) */}
      <p
        className="merry-up font-[family-name:var(--font-round)] [font-weight:var(--font-round-weight)] [letter-spacing:var(--font-round-name-tracking)] text-[clamp(2rem,9vw,3.5rem)] leading-none text-[var(--k-ink)]"
        style={{ animationDelay: '0.2s' }}
      >
        {name}
      </p>
      {/* Jua 는 글자 아래로 여백이 남는 서체라, leading-none 만으로는
          붙지 않는다. 음수 마진으로 한 번 더 끌어올린다. */}
      <p
        className="merry-up -mt-1 font-[family-name:var(--font-display)] text-[clamp(0.7rem,3vw,0.875rem)] font-medium lowercase leading-none text-[var(--k-pink-d)]"
        style={{ letterSpacing: '0.3em', animationDelay: '0.28s' }}
      >
        {sub}
      </p>
    </div>
  );
}
