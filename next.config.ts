import type { NextConfig } from "next";

/* public/ 정적 자산에는 Next가 캐시 헤더를 붙여주지 않는다.
   (_next/static만 자동으로 immutable 처리됨)
   파일명에 콘텐츠 해시가 없으므로 immutable 대신
   stale-while-revalidate를 써서 재방문 시 네트워크를 타지 않게 한다. */
const STATIC_ASSET_CACHE =
  "public, max-age=2592000, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    /* Next 16부터 quality 허용값을 명시해야 한다(기본 [75]).
       90 — 어두운 그라데이션 이미지가 75에서 밴딩이 생겨 추가 */
    qualities: [75, 90],
  },

  compiler: {
    /* 프로덕션 번들에서 console.* 제거 — error/warn은 남겨 장애 추적을 유지 */
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  async headers() {
    return [
      {
        source: "/:path*.(mp4|webm|webp|jpg|jpeg|png|svg|ico|woff2)",
        headers: [{ key: "Cache-Control", value: STATIC_ASSET_CACHE }],
      },
    ];
  },
};

export default nextConfig;
