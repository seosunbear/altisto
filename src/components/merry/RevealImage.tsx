'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

/* ──────────────────────────────────────────────────────────
   다 받아진 뒤에만 보이는 이미지.

   캐릭터 일러스트가 위에서부터 한 줄씩 그려지거나, 등장 애니메이션이
   빈 상자 위에서 먼저 끝나 버리는 걸 막는다. 처음에는 투명하게 두고,
   로딩이 끝나면 data-loaded 를 붙여 그때 등장 애니메이션을 돌린다.

   next/image 의 onLoad 는 img.decode() 가 끝난 뒤에 불린다. 그리고
   하이드레이션 전에 이미 받아진(캐시된) 이미지도 ref 에서 complete 를
   확인해 불러 준다. 그래서 이 시점이 '한 번에 온전히 그릴 수 있는
   순간'이고, 캐시 여부와 상관없이 반드시 한 번 온다.

   fade — 틀 안에 든 이미지(레트로 창 속 얼굴)처럼 위로 떠오르면
   어색한 자리에서는 투명도만 푼다.
   ────────────────────────────────────────────────────────── */

export default function RevealImage({
  alt,
  className,
  fade = false,
  onLoad,
  ...props
}: ImageProps & { fade?: boolean }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      /* alt 를 스프레드 안에 두면 jsx-a11y 가 못 본다. 꺼내서 명시한다 */
      alt={alt}
      className={`${fade ? 'merry-reveal-fade' : 'merry-reveal'} ${className ?? ''}`}
      data-loaded={loaded ? '' : undefined}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
