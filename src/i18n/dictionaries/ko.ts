/* ──────────────────────────────────────────────────────────
   한국어 문구 — 이 파일의 모양이 곧 사전의 타입이다.
   en.ts · ja.ts 는 같은 모양을 채워야 빌드가 통과한다.

   줄바꿈은 '\n' 으로 적는다. 화면에서는 <Lines> 가 <br /> 로 바꾼다.
   ────────────────────────────────────────────────────────── */

export const ko = {
  /* ━━━━━━━━ 사이트 공통 메타데이터 ━━━━━━━━ */
  meta: {
    /* 브랜드명 + '공식 웹사이트'를 명시해 검색 결과에서 정체가 바로 드러나도록 */
    siteTitle: '알티스토 | Altisto 공식 웹사이트',
    titleTemplate: '%s | 알티스토',
    /* '소프트웨어 및 플랫폼 개발사'라는 카테고리 정의를 문장 맨 앞에 배치 */
    description:
      "소프트웨어 및 플랫폼 개발사 알티스토(Altisto) 공식 홈페이지입니다. 아티스트와 클라이언트를 잇는 크리에이터 외주·커미션 협업 플랫폼 '알티(Arti)', 스쿨 라이프 슈퍼앱 '우리학교(OurSchool)', 연령별 채팅·커뮤니티 '리프챗(LeafChat)'을 직접 개발하고 운영합니다.",
    /* 한/영 양방향 검색('알티스토' ↔ 'Altisto')과, 프로덕트 이름을 모르는
       사람이 던지는 서술형 질의("예술 외주 플랫폼 만드는 회사")를 함께 덮는다. */
    keywords: [
      'Altisto', '알티스토', 'altisto', '알티스토 회사',
      '소프트웨어 개발사', '플랫폼 개발사', '소프트웨어 회사', 'IT 스타트업',
      '알티', 'Arti', 'Alti', '크리에이터 외주 플랫폼', '예술 외주 플랫폼',
      '아티스트 외주', '커미션 플랫폼', '일러스트 외주', '디자인 외주', '영상 외주',
      '외주 플랫폼', '크리에이터 협업 플랫폼', '크리에이터',
      '우리학교', 'OurSchool', '스쿨 라이프 앱', '학생 앱', '시간표 급식 앱',
      '리프챗', 'LeafChat', '연령별 커뮤니티', '채팅 커뮤니티 앱', '콘텐츠',
    ],
    siteName: '알티스토',
    ogDescription:
      "소프트웨어 및 플랫폼 개발사 알티스토(Altisto)입니다. 크리에이터 외주 협업 플랫폼 '알티', 스쿨 라이프 앱 '우리학교', 연령별 커뮤니티 '리프챗'을 만듭니다.",
    ogImageAlt: '알티스토 — 콘텐츠 그 이상의 가치',
    twitterDescription: '소프트웨어 및 플랫폼 개발사 알티스토(Altisto) 공식 홈페이지',
  },

  /* ━━━━━━━━ 구조화 데이터(JSON-LD) 문구 ━━━━━━━━
     같은 @id 에 언어마다 다른 문장을 싣는다. 동명 회사 이름(ALTist·RTst·
     RTST LABEL)은 disambiguatingDescription 에만 쓰고 alternateName 에는
     절대 넣지 않는다(엔티티가 합쳐진다). */
  schema: {
    orgName: '알티스토',
    orgAlternateName: ['Altisto', '알티스토 (Altisto)'],
    orgDescription:
      "알티스토(Altisto)는 아티스트와 클라이언트를 잇는 크리에이터 외주·커미션 협업 플랫폼 '알티(Arti)', 스쿨 라이프 슈퍼앱 '우리학교(OurSchool)', 연령별 채팅·커뮤니티 '리프챗(LeafChat)'을 직접 개발·운영하는 소프트웨어 및 플랫폼 개발사입니다.",
    disambiguatingDescription:
      '대체식품 기업 알티스트(ALTist, altist.com), 임베디드 시스템 소프트웨어 기업 알티스트(RTst, rtst.co.kr), 음반 레이블 RTST LABEL과는 이름만 비슷한 별개 회사. 영상 제작 스튜디오도 아니며, 소비자용 웹·앱 플랫폼을 직접 개발·운영하는 소프트웨어 개발사(2023년 설립, altisto.me)',
    slogan: '콘텐츠 그 이상의 가치를, 알티스토',
    knowsAbout: [
      '소프트웨어 개발', '플랫폼 개발', '웹 서비스 개발', '모바일 앱 개발',
      '크리에이터 외주 플랫폼', '아티스트 커미션 중개', '일러스트·디자인·영상 외주',
      '크리에이터 협업', '스쿨 라이프 앱', '연령별 커뮤니티 서비스', '콘텐츠 서비스',
    ],
    areaServed: '대한민국',
    arti: {
      name: '알티',
      /* 로마자 표기가 Arti/Alti 두 갈래로 검색된다. 둘 다 같은 엔티티로 묶는다 */
      alternateName: ['Arti', 'Alti', '알티(Arti)'],
      subCategory: '크리에이터 외주·커미션 마켓플레이스',
      description:
        '아티스트와 클라이언트를 연결하는 크리에이터 외주·커미션 협업 플랫폼. 일러스트·디자인·영상 등 창작 외주를 의뢰하고 수주한다.',
      audience: ['아티스트', '크리에이터', '일러스트레이터', '디자이너', '영상 제작자', '외주 의뢰 클라이언트'],
    },
    ourschool: {
      name: '우리학교',
      alternateName: ['OurSchool', 'Our School', '우리학교 앱'],
      description: '시간표·급식·학생증·조퇴외출을 하나로 모은 학생용 스쿨 라이프 슈퍼앱',
    },
    leafchat: {
      name: '리프챗',
      alternateName: 'LeafChat',
      description: '연령대별로 나뉘어 안전하게 소통하는 채팅 & 커뮤니티 서비스',
    },
    meri: {
      name: '메리',
      alternateName: ['Meri', '메리 (Meri)', '알티스토 메리', 'Altisto Meri', '마스코트 메리', '알티 메리'],
      description:
        '알티스토의 브랜드 마스코트 캐릭터. 은발에 분홍빛 눈을 했고, 알티스토와 크리에이터 플랫폼 알티에서 방문자를 맞이하는 인사 담당이다. 키 163cm, MBTI ENFJ, 생일 2월 21일(물고기자리).',
      imageCaption: '알티스토 마스코트 메리(Meri)',
    },
    websiteName: '알티스토',
    websiteAlternateName: 'Altisto',
    websiteDescription: '알티스토 공식 웹사이트',
  },

  /* ━━━━━━━━ 내비게이션 ━━━━━━━━ */
  nav: {
    services: '서비스',
    merry: '마스코트',
    career: '채용',
    contact: '문의',
    openMenu: '메뉴 열기',
    closeMenu: '메뉴 닫기',
    language: '언어',
  },

  /* ━━━━━━━━ 푸터 ━━━━━━━━ */
  footer: {
    tagline: '콘텐츠 그 이상의 가치를 만듭니다',
    servicesHeading: '서비스',
    companyHeading: '회사',
    contactHeading: '연락처',
    arti: '알티',
    ourschool: '우리학교',
    leafchat: '리프챗',
    contact: '문의하기',
    career: '채용',
    responseTime: '영업일 기준 24시간 이내 응답',
    ceo: '대표이사 서현웅',
    bizNo: '사업자등록번호: 준비 중',
  },

  /* 빵부스러기 첫 칸 */
  homeCrumb: '홈',

  /* ━━━━━━━━ 홈 ━━━━━━━━ */
  home: {
    meta: {
      description:
        "알티스토(Altisto)는 아티스트와 클라이언트를 잇는 크리에이터 외주·커미션 협업 플랫폼 '알티(Arti)', 스쿨 라이프 슈퍼앱 '우리학교', 연령별 채팅·커뮤니티 '리프챗'을 직접 개발·운영하는 소프트웨어 및 플랫폼 개발사입니다.",
      schemaDescription:
        "아티스트와 클라이언트를 잇는 크리에이터 외주 협업 플랫폼 '알티', 스쿨 라이프 앱 '우리학교', 연령별 커뮤니티 '리프챗'을 만드는 소프트웨어 및 플랫폼 개발사 알티스토입니다.",
    },
    h1: '알티스토(Altisto) — 콘텐츠 그 이상의 가치를 만듭니다',
    /* 히어로 롤링 문구 두 줄 — 윗줄이 크고 아랫줄이 작다 */
    hero: ['콘텐츠 그 이상의', '가치를 만듭니다'] as [string, string],
    /* 형광펜(marks) 색은 등장 순서대로 파랑 · 보라 · 주황 · 하늘이다.
       언어마다 같은 순서(숫자 → 콘텐츠 → 목표 → 미션)로 맞춘다. */
    motto: {
      label: 'MISSION',
      lines: [
        { text: '세계 82억 명,', marks: ['82억'] },
        { text: '모든 관객을' },
        { text: '사로잡아라' },
        { text: '저희만의', gap: true },
        { text: '다양한 콘텐츠로', marks: ['콘텐츠'] },
        { text: '관객을 사로잡는것' },
        { text: '그것이 저희의', gap: true },
        { text: '목표이자 주어진 미션입니다', marks: ['목표', '미션'] },
      ] as MottoLine[],
    },
    growth: {
      heading: '사용자라는 관객을 위해\n끊임없이 변화하는 사람들',
      sub: '화려한 숫자는 없지만 매일 어제보다 한 걸음 더 나아갑니다',
      stats: ['누적 서비스 가입자 수', '누적 조회 수', '운영 서비스 수'],
    },
    history: {
      subtitle: '우리가 걸어온 길',
      /* 연혁 순서·연도·상태는 MilestonesTimeline 이 들고 있고, 여기는 문구만 */
      events: ['PYD 영상 팀 설립', 'ColorfulStory 출범', 'Altisto 설립', '알티 베타 출시', '리프챗 정식 론칭'],
      tags: ['시작', '개편', '현재', '예정', '예정'],
    },
    security: {
      heading: '내 정보는 항상 안전하게',
      sub: '알티스토는 항상 높은 수준의 보안을 만들어가고 있어요',
      imageAlt: 'Altisto securities',
    },
  },

  /* ━━━━━━━━ 서비스 ━━━━━━━━ */
  services: {
    meta: {
      title: '서비스',
      description:
        '알티스토가 만드는 서비스 — 아티스트와 클라이언트를 잇는 크리에이터 외주·커미션 협업 플랫폼 알티(Arti), 시간표·급식·학생증을 모은 스쿨 라이프 슈퍼앱 우리학교(OurSchool), 연령별 채팅 & 커뮤니티 리프챗(LeafChat).',
      keywords: [
        '알티', 'Arti', '크리에이터 외주 플랫폼', '예술 외주 플랫폼', '커미션 플랫폼',
        '일러스트 외주', '디자인 외주', '영상 외주', '아티스트 외주',
        '우리학교', 'OurSchool', '스쿨 라이프 앱', '리프챗', 'LeafChat', '연령별 커뮤니티',
      ],
      ogTitle: '서비스 | 알티스토',
      ogDescription: '크리에이터 외주 협업 플랫폼 알티, 스쿨 라이프 슈퍼앱 우리학교, 연령별 커뮤니티 리프챗.',
      schemaName: '서비스 | 알티스토',
      schemaDescription:
        '아티스트와 클라이언트를 잇는 크리에이터 외주·커미션 협업 플랫폼 알티(Arti), 스쿨 라이프 슈퍼앱 우리학교(OurSchool), 연령별 채팅 & 커뮤니티 리프챗(LeafChat).',
    },
    title: '서비스',
    intro: '사람들이 조금이라도 웃을 수 있도록,\n알티스토는 세 개의 서비스를 직접 만들고 운영합니다.',
    arti: {
      name: '알티 · Arti',
      category: '크리에이터 협업 외주 플랫폼',
      heading: '아티스트와 클라이언트를 위한\n협업 플랫폼',
      body: '알티는 아티스트가 팀을 꾸리고 함께 작업하는 협업 플랫폼이에요\n하나 홍보할게 있다면 개인간 거래는 수수료가 없어요!',
      cta: '알티 바로가기',
    },
    ourschool: {
      name: '우리학교 · OurSchool',
      category: '스쿨 라이프 슈퍼앱',
      heading: '시간표부터 급식, 학생증까지\n학교 생활을 한 앱에',
      body: '우리학교는 시간표·급식·학생증·조퇴외출을\n하나로 모은 스쿨 라이프 앱이에요\n게시판과 커뮤니티에서 우리 학교 친구들과 소통해요!',
      cta: '우리학교 바로가기',
    },
    leafchat: {
      name: '리프챗 · LeafChat',
      category: '연령별 채팅 & 커뮤니티',
      heading: '연령별로 안전하게\n친구를 만드는 커뮤니티',
      body: '리프챗은 연령별로 안전하게 친구를\n만들 수 있도록 만들어진 커뮤니티에요\n인증 및 유해차단 서비스로 안전하게 대화 가능해요!',
      cta: '리프챗 바로가기',
    },
  },

  /* ━━━━━━━━ 문의 ━━━━━━━━ */
  contact: {
    meta: {
      title: '문의',
      description:
        '알티스토에 협업·제휴·채용 등 무엇이든 문의하세요. 이메일 connect@altisto.me 또는 문의 폼으로 연락할 수 있습니다.',
      keywords: ['알티스토 문의', 'Altisto 연락처', '알티스토 이메일', '외주 문의', '제휴 문의'],
      ogTitle: '문의 | 알티스토',
      ogDescription: '협업·제휴·채용 문의는 connect@altisto.me 또는 문의 폼으로 보내주세요.',
      schemaName: '문의 | 알티스토',
      schemaDescription: '알티스토에 협업·제휴·채용을 문의하는 방법. 이메일 connect@altisto.me.',
    },
    title: '문의',
    intro: '프로젝트 견적, 플랫폼 입점, 파트너십 제안 등\n어떤 내용이든 편하게 연락주세요.',
    formHeading: '문의하기',
    formIntro: '유형을 선택하고 내용을 남겨주시면 담당자가 직접 확인 후 회신드립니다.',
    /* '영업일 기준 <strong>24시간</strong> 이내 답변' */
    response: { before: '영업일 기준 ', strong: '24시간', after: ' 이내 답변' },
    form: {
      legend: '어떤 문의이신가요?',
      categories: {
        service: { label: '서비스 도입', desc: '우리학교 도입 문의' },
        invest: { label: '투자', desc: '투자 제안' },
        etc: { label: '기타 문의', desc: '채용·언론·그 외 모든 문의' },
      },
      name: '이름',
      namePlaceholder: '홍길동',
      company: '회사 / 소속',
      optional: '(선택)',
      companyPlaceholder: '알티스토',
      email: '회신받을 이메일',
      message: '문의 내용',
      messagePlaceholder: '문의하실 내용을 자유롭게 작성해 주세요.',
      submit: '문의 보내기',
      mailHint: '버튼을 누르면 메일 앱이 열립니다.',
      mailDirect: '직접 보내시려면',
      /* 메일 앱에 채워지는 제목·본문. {category} {name} 을 바꿔 끼운다 */
      mail: {
        subject: '[{category}] {name}님의 문의',
        category: '문의 유형',
        name: '이름',
        company: '회사/소속',
        email: '회신 이메일',
        divider: '── 문의 내용 ──',
      },
    },
  },

  /* ━━━━━━━━ 채용 ━━━━━━━━ */
  career: {
    meta: {
      title: '채용',
      description:
        '콘텐츠 그 이상의 가치를 만드는 여정, 이 즐거운 도전에 함께할 동료를 찾습니다. 알티스토의 열린 포지션을 확인해 보세요.',
      keywords: ['알티스토 채용', 'Altisto 채용', '스타트업 채용', '개발자 채용', '디자이너 채용', '소프트웨어 회사 채용'],
      ogTitle: '채용 | 알티스토',
      ogDescription: '알티스토와 함께할 동료를 찾습니다. 열린 포지션을 확인해 보세요.',
      schemaName: '채용 | 알티스토',
      schemaDescription: '소프트웨어 및 플랫폼 개발사 알티스토의 열린 포지션 안내.',
    },
    title: '채용',
    intro: '인터넷을 넘어 삶을 바꾸는,\n여정을 함께할 아티스트를 찾습니다.',
    board: {
      searchPlaceholder: '직무 또는 직군을 검색해 보세요',
      allTeams: '모든 직군',
      allTypes: '고용형태',
      reset: '초기화',
      /* '{n}개의 포지션이 열려있어요' — 숫자 앞뒤 문구 */
      countBefore: '',
      countAfter: { one: '개의 포지션이 열려있어요', other: '개의 포지션이 열려있어요' },
      noJobs: '현재 모집 중인 포지션이 없어요',
      noMatch: '조건에 맞는 포지션이 없어요',
    },
  },

  /* ━━━━━━━━ 마스코트 메리 ━━━━━━━━ */
  merry: {
    meta: {
      /* 레이아웃 템플릿이 '%s | 알티스토'를 붙이므로 absolute 로 쓴다 */
      title: '메리 (Meri) | 알티스토 마스코트',
      description:
        '알티스토(Altisto)의 브랜드 마스코트 캐릭터 메리(Meri)를 소개합니다. 은발에 분홍빛 눈, 키 163cm, MBTI ENFJ, 생일 2월 21일. 크리에이터 외주 협업 플랫폼 알티에서 여러분을 맞이하는 인사 담당이에요.',
      /* 캐릭터 이름만 알고 찾아오는 사람이 회사까지 닿게 하는 질의어들 */
      keywords: [
        '메리', 'Meri', '메리 캐릭터', '알티스토 메리', '알티 메리', 'Altisto Meri',
        '알티스토 마스코트', '알티 마스코트', '마스코트 캐릭터', '브랜드 마스코트',
        '은발 캐릭터', 'ENFJ 캐릭터', '메리 프로필', '메리 설정',
        '알티스토', 'Altisto', '알티', 'Arti',
      ],
      ogDescription: '안녕! 나는 알티스토의 마스코트 메리야. 키 163cm, MBTI ENFJ, 생일은 2월 21일이야.',
      ogImageAlt: '알티스토 마스코트 메리(Meri) — 은발에 분홍빛 눈을 한 캐릭터',
      twitterDescription: '알티스토의 브랜드 마스코트 메리를 소개합니다.',
      schemaDescription:
        '알티스토의 브랜드 마스코트 캐릭터 메리(Meri) 소개. 은발에 분홍빛 눈, 키 163cm, MBTI ENFJ, 생일 2월 21일.',
      crumb: '메리',
    },
    h1: '메리 (Meri) — 알티스토 마스코트',
    /* 이름 표시 — 큰 이름 한 줄, 그 아래 작은 다른 표기 한 줄 */
    name: '메리',
    nameSub: 'meri',
    /* PROFILE 패널 값. 라벨(NAME·AGE…)은 언어와 상관없이 라틴 대문자다 */
    profile: {
      name: '메리 MERI',
      age: '16살',
      height: '163 CM',
      weight: '비공개',
      mbti: 'ENFJ',
      birthday: 'February 21',
    },
    illustrationAlt: '분홍빛 눈에 은발을 한 알티스토 마스코트 메리가 한 손을 들어 인사하는 전신 일러스트',
    invite: '메리가 기다리는 곳으로 놀러 올래?',
    toArti: '알티 보러 가기',
    toServices: '알티스토 서비스',
  },
};

export type MottoLine = { text: string; marks?: string[]; gap?: boolean };
export type Dictionary = typeof ko;
