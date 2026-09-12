import { ORG_ID, SITE_ID, SITE_URL } from '@/lib/site';
import { localePath, SCHEMA_LANG, type Locale } from '@/i18n/config';

/* ──────────────────────────────────────────────────────────
   페이지 단위 구조화 데이터.

   레이아웃의 Organization/WebSite 그래프가 '회사가 무엇인가'를 말한다면,
   여기서는 '이 페이지가 무엇인가'를 말한다. WebPage 를 사이트·조직에
   @id 로 이어 붙이고, 페이지가 다루는 프로덕트를 mentions 로 건다.
   답변 엔진이 문서 하나를 집었을 때 회사까지 따라오게 하기 위한 연결이다.

   화면에는 아무것도 그리지 않는다 — script 태그 하나가 전부다.
   ────────────────────────────────────────────────────────── */

type Crumb = { name: string; path: string };

export default function PageSchema({
  locale,
  path,
  name,
  description,
  crumbs = [],
  mentions = [],
  mainEntity,
}: {
  locale: Locale;
  /** 언어 접두사를 뺀 사이트 루트 기준 경로. 예: '/services' */
  path: string;
  name: string;
  description: string;
  crumbs?: Crumb[];
  /** 이 페이지가 다루는 노드의 @id 목록 */
  mentions?: string[];
  /** 이 페이지의 주인공 노드 @id. 캐릭터 소개처럼 문서 하나가
      엔티티 하나를 통째로 다룰 때만 쓴다. */
  mainEntity?: string;
}) {
  const url = `${SITE_URL}${localePath(locale, path)}`;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: SCHEMA_LANG[locale],
      isPartOf: { '@id': SITE_ID },
      about: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      ...(mainEntity ? { mainEntity: { '@id': mainEntity } } : {}),
      ...(mentions.length ? { mentions: mentions.map((id) => ({ '@id': id })) } : {}),
      ...(crumbs.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    },
  ];

  if (crumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: `${SITE_URL}${localePath(locale, c.path)}`,
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      /* XSS 방지를 위해 '<' 를 이스케이프 (Next.js JSON-LD 가이드 권장) */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
          /</g,
          '\\u003c',
        ),
      }}
    />
  );
}
