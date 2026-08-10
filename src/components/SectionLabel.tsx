/**
 * 섹션 상단 장식용 영문 라벨.
 * data-nosnippet — 검색 스니펫에 "start."처럼 섞여 나오는 것을 차단한다.
 */
export default function SectionLabel({
  children,
  tone = 'on-dark',
  className = '',
}: {
  children: string;
  /** 라벨이 놓이는 배경 — 어두운 배경이면 흰 글자, 밝은 배경이면 검은 글자 */
  tone?: 'on-dark' | 'on-light';
  className?: string;
}) {
  return (
    <p
      aria-hidden="true"
      className={`text-[10px] font-bold uppercase tracking-[0.35em] ${
        tone === 'on-light' ? 'text-[#0d1117]/45' : 'text-white/40'
      } ${className}`}
    >
      <span data-nosnippet>{children}</span>
    </p>
  );
}
