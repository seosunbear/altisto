/* ──────────────────────────────────────────────────────────
   이름 표시 — 둥근 한글(Jua)로 크게, 라틴으로 작게.

   자리가 화면 폭에 따라 다르다. 넓은 화면에서는 오른쪽 프로필 쪽지
   머리에, 좁은 화면에서는 보드보다 위 맨 꼭대기에 선다. 그래서 자리
   두 곳이 이 컴포넌트 하나를 불러 쓰고, 보이는 쪽만 CSS 로 고른다.

   읽어 줄 제목은 page.tsx 의 sr-only h1 이 따로 있으므로, 여기는
   보조기술에서 숨긴다. 두 벌이 다 읽히면 이름이 두 번 들린다.
   ────────────────────────────────────────────────────────── */

export default function MerryName({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      {/* 두 줄이 한 덩어리로 떠오른다 */}
      <p
        className="merry-up font-[family-name:var(--font-round)] text-[44px] leading-none text-[var(--k-ink)] sm:text-[56px]"
        style={{ animationDelay: '0.2s' }}
      >
        메리
      </p>
      {/* Jua 는 글자 아래로 여백이 남는 서체라, leading-none 만으로는
          붙지 않는다. 음수 마진으로 한 번 더 끌어올린다. */}
      <p
        className="merry-up -mt-1 font-[family-name:var(--font-display)] text-[14px] font-medium lowercase leading-none text-[var(--k-pink-d)]"
        style={{ letterSpacing: '0.3em', animationDelay: '0.28s' }}
      >
        meri
      </p>
    </div>
  );
}
