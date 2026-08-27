/* 픽셀아트 별 — 우하단 띠를 채우는 장식.
   상태도 이벤트도 없는 순수 도형이라 서버 컴포넌트로 둔다.

   96 x 24 격자를 SVG 정수 좌표에 그대로 찍고 shapeRendering="crispEdges"로
   보간을 끈다. 확대돼도 픽셀 경계가 뭉개지지 않는다.
   난수는 쓰지 않는다 — 인덱스로만 계산해야 서버·클라이언트 렌더가 일치한다. */

const W = 96;
const H = 24;

const COUNT = 130;

/* R2 저불일치 수열 — 격자무늬도 뭉침도 없이 고르게 흩뿌린다.
   난수를 floor하면 자리가 겹치고 빈 구역이 생기는데 이 수열은 그러지 않는다 */
const A1 = 0.7548776662466927;
const A2 = 0.5698402909980532;

const TINTS = ['#ffffff', '#c7d2fe', '#93c5fd', '#ddd6fe'];

const STARS = Array.from({ length: COUNT }, (_, i) => {
  const x = Math.floor(((0.5 + A1 * (i + 1)) % 1) * W);
  const y = Math.floor(((0.5 + A2 * (i + 1)) % 1) * H);

  /* 대부분은 흐린 점, 일부는 또렷한 점, 아주 일부만 십자로 반짝인다 */
  const tier = i % 17 === 3 ? 2 : i % 5 === 0 ? 1 : 0;

  return {
    x,
    y,
    tier,
    c: TINTS[i % TINTS.length],
    o: tier === 2 ? 1 : tier === 1 ? 0.62 + ((i * 13) % 25) / 100 : 0.18 + ((i * 7) % 26) / 100,
    /* 음수 지연 — 첫 프레임부터 제각기 다른 위상으로 이미 반짝이고 있다 */
    delay: -((i * 37) % 61) / 10,
    dur: 3.2 + ((i * 23) % 34) / 10,
  };
});

export default function PixelStars() {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      className="absolute inset-0 h-full w-full"
    >
      {STARS.map((s, i) => {
        const style = {
          '--px-o': s.o,
          animationDelay: `${s.delay}s`,
          animationDuration: `${s.dur}s`,
        } as React.CSSProperties;

        /* 십자 반짝임 — 가운데 한 칸에 위아래좌우로 팔 하나씩 */
        if (s.tier === 2) {
          return (
            <g key={i} className="px-star" style={style} fill={s.c}>
              <rect x={s.x} y={s.y} width="1" height="1" />
              <rect x={s.x} y={s.y - 1} width="1" height="1" opacity="0.45" />
              <rect x={s.x} y={s.y + 1} width="1" height="1" opacity="0.45" />
              <rect x={s.x - 1} y={s.y} width="1" height="1" opacity="0.45" />
              <rect x={s.x + 1} y={s.y} width="1" height="1" opacity="0.45" />
            </g>
          );
        }

        return (
          <rect
            key={i}
            className="px-star"
            style={style}
            x={s.x}
            y={s.y}
            width="1"
            height="1"
            fill={s.c}
          />
        );
      })}
    </svg>
  );
}
