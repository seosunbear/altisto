import type { Dictionary } from './ko';

/* 영어 문구 — 모양은 ko.ts 를 따른다.
   회사 소개는 한국어판과 같이 '소프트웨어 및 플랫폼 개발사'가 먼저 오게 쓴다.
   대표 이름은 본인이 쓰는 로마자 표기를 모르므로 한글 그대로 둔다. */
export const en: Dictionary = {
  meta: {
    siteTitle: 'Altisto | Official Website',
    titleTemplate: '%s | Altisto',
    description:
      'Official website of Altisto, a software and platform developer based in South Korea. We build and run our own products: Arti, a creator outsourcing and commission platform that connects artists with clients; OurSchool, a school-life super app; and LeafChat, an age-based chat and community service.',
    keywords: [
      'Altisto', 'altisto', 'Altisto company',
      'software developer', 'platform developer', 'software company', 'Korean tech startup',
      'Arti', 'Alti', 'creator outsourcing platform', 'art commission platform',
      'artist commissions', 'illustration commissions', 'design outsourcing', 'video editing outsourcing',
      'creator collaboration platform',
      'OurSchool', 'school life app', 'student app', 'timetable and school meal app',
      'LeafChat', 'age-based community', 'chat community app',
    ],
    siteName: 'Altisto',
    ogDescription:
      'Altisto is a software and platform developer. We make Arti, a creator outsourcing platform; OurSchool, a school-life app; and LeafChat, an age-based community.',
    ogImageAlt: 'Altisto — Value beyond content',
    twitterDescription: 'Official website of Altisto, a software and platform developer',
  },

  schema: {
    orgName: 'Altisto',
    orgAlternateName: ['알티스토', 'Altisto (알티스토)'],
    orgDescription:
      'Altisto is a software and platform developer that builds and operates its own products: Arti, a creator outsourcing and commission collaboration platform connecting artists with clients; OurSchool, a school-life super app; and LeafChat, an age-based chat and community service.',
    disambiguatingDescription:
      'A separate company from ALTist (alternative-food company, altist.com), RTst (embedded system software company, rtst.co.kr) and the record label RTST LABEL; only the names are similar. Not a video production studio either: a software developer (founded 2023, altisto.me) that builds and operates consumer web and app platforms.',
    slogan: 'Value beyond content, Altisto',
    knowsAbout: [
      'Software development', 'Platform development', 'Web service development', 'Mobile app development',
      'Creator outsourcing platforms', 'Artist commission brokerage', 'Illustration, design and video outsourcing',
      'Creator collaboration', 'School-life apps', 'Age-based community services', 'Content services',
    ],
    areaServed: 'South Korea',
    arti: {
      name: 'Arti',
      alternateName: ['알티', 'Alti', 'Arti (알티)'],
      subCategory: 'Creator outsourcing and commission marketplace',
      description:
        'A creator outsourcing and commission collaboration platform that connects artists with clients. Clients commission creative work such as illustration, design and video, and artists take it on.',
      audience: ['Artists', 'Creators', 'Illustrators', 'Designers', 'Video creators', 'Clients commissioning creative work'],
    },
    ourschool: {
      name: 'OurSchool',
      alternateName: ['우리학교', 'Our School'],
      description:
        'A school-life super app for students that brings timetables, school meals, student ID and early-leave requests together in one place',
    },
    leafchat: {
      name: 'LeafChat',
      alternateName: '리프챗',
      description: 'A chat and community service where people connect safely within their own age group',
    },
    meri: {
      name: 'Meri',
      alternateName: ['메리', 'Meri (메리)', 'Altisto Meri', 'Meri mascot', 'Arti Meri'],
      description:
        "Altisto's brand mascot character. She has silver hair and pink eyes, and greets visitors on Altisto's site and on the creator platform Arti. Height 163 cm, MBTI ENFJ, birthday February 21 (Pisces).",
      imageCaption: "Meri, Altisto's mascot",
    },
    websiteName: 'Altisto',
    websiteAlternateName: '알티스토',
    websiteDescription: 'Official website of Altisto',
  },

  nav: {
    services: 'Services',
    merry: 'Mascot',
    career: 'Careers',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },

  footer: {
    tagline: 'Creating value beyond content',
    servicesHeading: 'Services',
    companyHeading: 'Company',
    contactHeading: 'Contact',
    arti: 'Arti',
    ourschool: 'OurSchool',
    leafchat: 'LeafChat',
    contact: 'Contact us',
    career: 'Careers',
    responseTime: 'Replies within 24 hours on business days',
    ceo: 'CEO 서현웅',
    bizNo: 'Business registration no.: pending',
  },

  homeCrumb: 'Home',

  home: {
    meta: {
      description:
        'Altisto is a software and platform developer that builds and runs Arti, a creator outsourcing and commission platform connecting artists with clients; OurSchool, a school-life super app; and LeafChat, an age-based chat and community service.',
      schemaDescription:
        'Altisto is a software and platform developer making Arti, a creator outsourcing platform that connects artists with clients; OurSchool, a school-life app; and LeafChat, an age-based community.',
    },
    h1: 'Altisto — Creating value beyond content',
    hero: ['Beyond content,', 'we create value'],
    motto: {
      label: 'MISSION',
      lines: [
        { text: '8.2 billion people.', marks: ['8.2 billion'] },
        { text: 'Captivate' },
        { text: 'every audience.' },
        { text: 'Winning audiences', gap: true },
        { text: 'with diverse content', marks: ['content'] },
        { text: 'all our own —' },
        { text: 'that is our goal', gap: true, marks: ['goal'] },
        { text: 'and our mission.', marks: ['mission'] },
      ],
    },
    growth: {
      heading: 'For the audience we call users,\nwe never stop evolving',
      sub: 'No flashy numbers — just one step further than yesterday, every day.',
      stats: ['Total sign-ups', 'Total views', 'Services operated'],
    },
    history: {
      subtitle: 'The road so far',
      events: ['PYD video team founded', 'ColorfulStory launched', 'Altisto founded', 'Arti beta launch', 'LeafChat official launch'],
      tags: ['Start', 'Rebrand', 'Now', 'Upcoming', 'Upcoming'],
    },
    security: {
      heading: 'Your data, always safe',
      sub: 'Altisto keeps raising the bar on security, every day.',
      imageAlt: 'Altisto security',
    },
  },

  services: {
    meta: {
      title: 'Services',
      description:
        'Services built by Altisto: Arti, a creator outsourcing and commission platform connecting artists with clients; OurSchool, a school-life super app for timetables, school meals and student ID; and LeafChat, an age-based chat and community.',
      keywords: [
        'Arti', 'creator outsourcing platform', 'art commission platform', 'commission platform',
        'illustration commissions', 'design outsourcing', 'video editing outsourcing', 'hire artists',
        'OurSchool', 'school life app', 'LeafChat', 'age-based community',
      ],
      ogTitle: 'Services | Altisto',
      ogDescription: 'Arti, a creator outsourcing platform; OurSchool, a school-life super app; LeafChat, an age-based community.',
      schemaName: 'Services | Altisto',
      schemaDescription:
        'Arti, a creator outsourcing and commission platform connecting artists with clients; OurSchool, a school-life super app; and LeafChat, an age-based chat and community.',
    },
    title: 'Services',
    intro: 'So that people can smile, even a little more,\nAltisto builds and runs three services of its own.',
    arti: {
      name: 'Arti',
      category: 'Creator collaboration & outsourcing platform',
      heading: 'A collaboration platform\nfor artists and clients',
      body: 'Arti is a collaboration platform where artists form teams and create together.\nOne more thing: deals between individuals are commission-free!',
      cta: 'Visit Arti',
    },
    ourschool: {
      name: 'OurSchool',
      category: 'School-life super app',
      heading: 'Timetables, school meals, student ID —\nschool life in one app',
      body: 'OurSchool brings timetables, school meals, student ID\nand early-leave passes together in one app.\nChat with classmates on the boards and in the community!',
      cta: 'Visit OurSchool',
    },
    leafchat: {
      name: 'LeafChat',
      category: 'Age-based chat & community',
      heading: 'A community for making\nfriends safely, by age group',
      body: 'LeafChat is a community built so you can make friends\nsafely within your own age group.\nVerification and harmful-content blocking keep every chat safe!',
      cta: 'Visit LeafChat',
    },
  },

  contact: {
    meta: {
      title: 'Contact',
      description:
        'Contact Altisto about collaborations, partnerships, careers or anything else. Email connect@altisto.me or use the inquiry form.',
      keywords: ['Altisto contact', 'Altisto email', 'outsourcing inquiry', 'partnership inquiry'],
      ogTitle: 'Contact | Altisto',
      ogDescription: 'For collaborations, partnerships or careers, email connect@altisto.me or use the inquiry form.',
      schemaName: 'Contact | Altisto',
      schemaDescription: 'How to contact Altisto about collaborations, partnerships and careers. Email: connect@altisto.me.',
    },
    title: 'Contact',
    intro: 'Project quotes, joining the platform, partnership proposals —\nwhatever it is, feel free to reach out.',
    formHeading: 'Send an inquiry',
    formIntro: 'Pick a category and leave a message. A team member will read it and get back to you.',
    response: { before: 'Replies within ', strong: '24 hours', after: ' on business days' },
    form: {
      legend: 'What is your inquiry about?',
      categories: {
        service: { label: 'Adopt a service', desc: 'Bring OurSchool to your school' },
        invest: { label: 'Investment', desc: 'Investment proposals' },
        etc: { label: 'Other', desc: 'Careers, press and everything else' },
      },
      name: 'Name',
      namePlaceholder: 'Jane Doe',
      company: 'Company / Organization',
      optional: '(optional)',
      companyPlaceholder: 'Altisto',
      email: 'Reply-to email',
      message: 'Message',
      messagePlaceholder: 'Tell us anything you would like to ask.',
      submit: 'Send inquiry',
      mailHint: 'The button opens your email app.',
      mailDirect: 'To write to us directly:',
      mail: {
        subject: '[{category}] Inquiry from {name}',
        category: 'Category',
        name: 'Name',
        company: 'Company',
        email: 'Reply-to',
        divider: '── Message ──',
      },
    },
  },

  career: {
    meta: {
      title: 'Careers',
      description:
        'Creating value beyond content is a journey, and we are looking for teammates to take on this fun challenge with us. See the open positions at Altisto.',
      keywords: ['Altisto careers', 'Altisto jobs', 'startup jobs', 'developer jobs', 'designer jobs', 'software company jobs'],
      ogTitle: 'Careers | Altisto',
      ogDescription: 'We are looking for people to join Altisto. See our open positions.',
      schemaName: 'Careers | Altisto',
      schemaDescription: 'Open positions at Altisto, a software and platform developer.',
    },
    title: 'Careers',
    intro: 'Changing lives beyond the internet —\nwe are looking for artists to join the journey.',
    board: {
      searchPlaceholder: 'Search by role or team',
      allTeams: 'All teams',
      allTypes: 'Employment type',
      reset: 'Reset',
      countBefore: '',
      countAfter: { one: ' open position', other: ' open positions' },
      noJobs: 'No open positions right now',
      noMatch: 'No positions match your filters',
    },
  },

  merry: {
    meta: {
      title: "Meri | Altisto's Mascot",
      description:
        "Meet Meri, the brand mascot of Altisto. Silver hair, pink eyes, 163 cm tall, MBTI ENFJ, birthday February 21. She's the one who greets you on Arti, Altisto's creator outsourcing platform.",
      keywords: [
        'Meri', 'Meri character', 'Altisto Meri', 'Arti Meri',
        'Altisto mascot', 'Arti mascot', 'mascot character', 'brand mascot',
        'silver-haired character', 'ENFJ character', 'Meri profile',
        'Altisto', 'Arti',
      ],
      ogDescription: "Hi! I'm Meri, Altisto's mascot. 163 cm, ENFJ, and my birthday is February 21.",
      ogImageAlt: "Meri, Altisto's mascot — a character with silver hair and pink eyes",
      twitterDescription: "Meet Meri, Altisto's brand mascot.",
      schemaDescription:
        "Meri, the brand mascot character of Altisto. Silver hair, pink eyes, 163 cm, MBTI ENFJ, birthday February 21.",
      crumb: 'Meri',
    },
    h1: "Meri — Altisto's mascot",
    name: 'Meri',
    nameSub: '메리',
    profile: {
      name: 'MERI 메리',
      age: '16',
      height: '163 CM',
      weight: 'Secret',
      mbti: 'ENFJ',
      birthday: 'February 21',
    },
    illustrationAlt:
      "Full-body illustration of Meri, Altisto's mascot, with silver hair and pink eyes, raising one hand to wave",
    invite: "Want to come hang out where Meri's waiting?",
    toArti: 'Go to Arti',
    toServices: 'Altisto services',
  },
};
