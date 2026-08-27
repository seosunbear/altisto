/* 서비스 페이지 히어로의 유성우 장식 — 홈 그리드·전환 오버레이에서도 쓴다.
   SMIL(animateMotion) 만으로 움직여 JS가 필요 없고, 서버 컴포넌트로 남는다.
   한 페이지에 둘 이상 놓을 수 있으므로 경로 id는 idPrefix로 갈라 준다 */

/* 별이 지나는 다섯 갈래 — 기준 좌표계는 600 x 480 */
const LANES = [
  'M 640,60  C 500,42  360,88  220,62  C 110,44  40,58  -20,54',
  'M 640,145 C 500,127 360,173 220,147 C 110,129 40,143 -20,139',
  'M 640,240 C 500,220 360,268 220,242 C 110,224 40,238 -20,234',
  'M 640,330 C 500,312 360,356 220,330 C 110,312 40,326 -20,322',
  'M 640,415 C 500,397 360,441 220,415 C 110,397 40,411 -20,407',
] as const;

/* 별 하나하나의 크기·색·타이밍. fill은 colors prop으로 갈아끼울 수 있다 */
const STARS = [
  { d: 'M0,-18 L4.5,-4.5 L18,0 L4.5,4.5 L0,18 L-4.5,4.5 L-18,0 L-4.5,-4.5 Z', fill: '#93c5fd', lane: 1, dur: '5s', begin: '0s', peak: 1 },
  { d: 'M0,-13 L3.2,-3.2 L13,0 L3.2,3.2 L0,13 L-3.2,3.2 L-13,0 L-3.2,-3.2 Z', fill: '#c4b5fd', lane: 2, dur: '4.6s', begin: '1.0s', peak: 0.85 },
  { d: 'M0,-10 L2.5,-2.5 L10,0 L2.5,2.5 L0,10 L-2.5,2.5 L-10,0 L-2.5,-2.5 Z', fill: '#f9a8d4', lane: 3, dur: '4.1s', begin: '2.1s', peak: 0.75 },
  { d: 'M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7 Z', fill: '#a5f3fc', lane: 4, dur: '3.6s', begin: '0.5s', peak: 0.70 },
  { d: 'M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z', fill: '#fde68a', lane: 5, dur: '3.2s', begin: '1.6s', peak: 0.65 },
  { d: 'M0,-8 L2,-2 L8,0 L2,2 L0,8 L-2,2 L-8,0 L-2,-2 Z', fill: '#a7f3d0', lane: 2, dur: '3.9s', begin: '2.8s', peak: 0.7 },
  { d: 'M0,-11 L2.8,-2.8 L11,0 L2.8,2.8 L0,11 L-2.8,2.8 L-11,0 L-2.8,-2.8 Z', fill: '#ddd6fe', lane: 4, dur: '4.4s', begin: '2.2s', peak: 0.8 },
  { d: 'M0,-6 L1.5,-1.5 L6,0 L1.5,1.5 L0,6 L-1.5,1.5 L-6,0 L-1.5,-1.5 Z', fill: '#fed7aa', lane: 1, dur: '3.4s', begin: '2.6s', peak: 0.7 },
  { d: 'M0,-9 L2.2,-2.2 L9,0 L2.2,2.2 L0,9 L-2.2,2.2 L-9,0 L-2.2,-2.2 Z', fill: '#bfdbfe', lane: 5, dur: '4.8s', begin: '0.9s', peak: 0.75 },
  { d: 'M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z', fill: '#fbcfe8', lane: 3, dur: '3s', begin: '3.4s', peak: 0.6 },
] as const;

const BASE_W = 600;
const BASE_H = 480;

/* 경로 좌표만 늘린다. SVG 자체를 scale하면 별 모양까지 같이 커지므로,
   viewBox를 넓히고 경로를 그 안에 다시 그려 별은 원래 크기로 남긴다 */
function spread(d: string, sx: number, sy: number) {
  return d.replace(
    /(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g,
    (_, x, y) => `${(Number(x) * sx).toFixed(1)},${(Number(y) * sy).toFixed(1)}`,
  );
}

interface StarTrailProps {
  idPrefix?: string;
  /** 별이 흩어지는 범위. 별 크기는 그대로고 경로만 넓어진다 */
  width?: number;
  height?: number;
  /** 별 색을 덮어쓴다 — 밝은 배경 위에 올릴 때 쓴다.
      문자열 하나면 열 개 전부 같은 색, 배열이면 앞에서부터 하나씩 */
  colors?: string | readonly string[];
}

export default function StarTrail({
  idPrefix = 'cp',
  width = BASE_W,
  height = BASE_H,
  colors,
}: StarTrailProps) {
  const sx = width / BASE_W;
  const sy = height / BASE_H;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      <defs>
        {LANES.map((d, i) => (
          <path key={i} id={`${idPrefix}-cp${i + 1}`} d={spread(d, sx, sy)} />
        ))}
      </defs>

      {STARS.map((star, i) => (
        <path key={i} d={star.d} fill={typeof colors === 'string' ? colors : colors?.[i] ?? star.fill}>
          <animateMotion dur={star.dur} begin={star.begin} repeatCount="indefinite" rotate="auto">
            <mpath href={`#${idPrefix}-cp${star.lane}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values={`0;${star.peak};${star.peak};0`}
            keyTimes="0;0.07;0.88;1"
            dur={star.dur}
            begin={star.begin}
            repeatCount="indefinite"
          />
        </path>
      ))}
    </svg>
  );
}
