import type { Dictionary } from './ko';

/* 일본어 문구 — 모양은 ko.ts 를 따른다.

   회사명은 가타카나로 쓰지 않고 'Altisto' 로만 쓴다. 가타카나로 옮기면
   アルティスト 가 되는데, 이름이 비슷한 알티스트(ALTist)도 똑같이
   アルティスト 라서 일본어 안에서는 두 회사가 글자로 갈리지 않는다.
   alternateName·키워드에도 넣지 않는다. */
export const ja: Dictionary = {
  meta: {
    siteTitle: 'Altisto | 公式ウェブサイト',
    titleTemplate: '%s | Altisto',
    description:
      'ソフトウェア・プラットフォーム開発会社Altistoの公式ウェブサイトです。アーティストとクライアントをつなぐクリエイター外注・コミッション協業プラットフォーム「Arti」、スクールライフ・スーパーアプリ「OurSchool」、年齢別チャット・コミュニティ「LeafChat」を自社で開発・運営しています。',
    keywords: [
      'Altisto', 'altisto', 'Altisto 会社',
      'ソフトウェア開発会社', 'プラットフォーム開発', 'ソフトウェア会社', '韓国 スタートアップ',
      'Arti', 'Alti', 'クリエイター 外注 プラットフォーム', 'コミッション プラットフォーム',
      'イラスト 依頼', 'デザイン 外注', '動画編集 外注', 'クリエイター 協業',
      'OurSchool', 'スクールライフ アプリ', '学生 アプリ', '時間割 給食 アプリ',
      'LeafChat', '年齢別 コミュニティ', 'チャット コミュニティ アプリ',
    ],
    siteName: 'Altisto',
    ogDescription:
      'ソフトウェア・プラットフォーム開発会社Altistoです。クリエイター外注プラットフォーム「Arti」、スクールライフアプリ「OurSchool」、年齢別コミュニティ「LeafChat」をつくっています。',
    ogImageAlt: 'Altisto — コンテンツを超える価値',
    twitterDescription: 'ソフトウェア・プラットフォーム開発会社Altistoの公式ウェブサイト',
  },

  schema: {
    orgName: 'Altisto',
    orgAlternateName: ['알티스토', 'Altisto (알티스토)'],
    orgDescription:
      'Altistoは、アーティストとクライアントをつなぐクリエイター外注・コミッション協業プラットフォーム「Arti」、スクールライフ・スーパーアプリ「OurSchool」、年齢別チャット・コミュニティ「LeafChat」を自社で開発・運営するソフトウェア・プラットフォーム開発会社です。',
    disambiguatingDescription:
      '代替食品企業のALTist（altist.com）、組込みシステムソフトウェア企業のRTst（rtst.co.kr）、音楽レーベルのRTST LABELとは名前が似ているだけの別会社。映像制作スタジオでもなく、消費者向けのウェブ・アプリプラットフォームを自社で開発・運営するソフトウェア開発会社（2023年設立、altisto.me）。',
    slogan: 'コンテンツを超える価値を、Altisto',
    knowsAbout: [
      'ソフトウェア開発', 'プラットフォーム開発', 'ウェブサービス開発', 'モバイルアプリ開発',
      'クリエイター外注プラットフォーム', 'アーティストへのコミッション仲介', 'イラスト・デザイン・映像の外注',
      'クリエイター協業', 'スクールライフアプリ', '年齢別コミュニティサービス', 'コンテンツサービス',
    ],
    areaServed: '韓国',
    arti: {
      name: 'Arti',
      alternateName: ['알티', 'Alti', 'Arti（알티）'],
      subCategory: 'クリエイター外注・コミッションマーケットプレイス',
      description:
        'アーティストとクライアントをつなぐクリエイター外注・コミッション協業プラットフォーム。イラスト・デザイン・映像などの創作の外注を依頼・受注できる。',
      audience: ['アーティスト', 'クリエイター', 'イラストレーター', 'デザイナー', '映像クリエイター', '外注を依頼するクライアント'],
    },
    ourschool: {
      name: 'OurSchool',
      alternateName: ['우리학교', 'Our School'],
      description: '時間割・給食・学生証・早退外出の申請をひとつにまとめた学生向けスクールライフ・スーパーアプリ',
    },
    leafchat: {
      name: 'LeafChat',
      alternateName: '리프챗',
      description: '年齢層ごとに分かれて安心して交流できるチャット＆コミュニティサービス',
    },
    meri: {
      name: 'メリ',
      alternateName: ['Meri', '메리', 'メリ（Meri）', 'Altisto Meri', 'マスコットのメリ'],
      description:
        'Altistoのブランドマスコットキャラクター。銀髪にピンクの瞳で、AltistoのサイトとクリエイタープラットフォームArtiで訪れた人を迎える案内役。身長163cm、MBTIはENFJ、誕生日は2月21日（うお座）。',
      imageCaption: 'Altistoのマスコット、メリ（Meri）',
    },
    websiteName: 'Altisto',
    websiteAlternateName: '알티스토',
    websiteDescription: 'Altisto公式ウェブサイト',
  },

  nav: {
    services: 'サービス',
    merry: 'マスコット',
    career: '採用',
    contact: 'お問い合わせ',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
    language: '言語',
  },

  footer: {
    tagline: 'コンテンツを超える価値をつくる',
    servicesHeading: 'サービス',
    companyHeading: '会社',
    contactHeading: '連絡先',
    arti: 'Arti',
    ourschool: 'OurSchool',
    leafchat: 'LeafChat',
    contact: 'お問い合わせ',
    career: '採用',
    responseTime: '営業日24時間以内にご返信',
    ceo: '代表 서현웅',
    bizNo: '事業者登録番号：準備中',
  },

  homeCrumb: 'ホーム',

  home: {
    meta: {
      description:
        'Altistoは、アーティストとクライアントをつなぐクリエイター外注・コミッション協業プラットフォーム「Arti」、スクールライフ・スーパーアプリ「OurSchool」、年齢別チャット・コミュニティ「LeafChat」を自社で開発・運営するソフトウェア・プラットフォーム開発会社です。',
      schemaDescription:
        'クリエイター外注プラットフォーム「Arti」、スクールライフアプリ「OurSchool」、年齢別コミュニティ「LeafChat」をつくるソフトウェア・プラットフォーム開発会社Altistoです。',
    },
    h1: 'Altisto — コンテンツを超える価値をつくる',
    hero: ['コンテンツを超える', '価値をつくる'],
    motto: {
      label: 'MISSION',
      lines: [
        { text: '世界82億人、', marks: ['82億'] },
        { text: 'すべての観客を' },
        { text: '魅了せよ' },
        { text: '私たちならではの', gap: true },
        { text: '多彩なコンテンツで', marks: ['コンテンツ'] },
        { text: '観客を魅了すること' },
        { text: 'それが私たちの目標であり、', gap: true, marks: ['目標'] },
        { text: '与えられたミッションです', marks: ['ミッション'] },
      ],
    },
    growth: {
      heading: 'ユーザーという観客のために\n変わり続ける人たち',
      sub: '派手な数字はありませんが、毎日、昨日より一歩ずつ前へ進んでいます',
      stats: ['累計サービス登録者数', '累計閲覧数', '運営サービス数'],
    },
    history: {
      subtitle: '私たちの歩み',
      events: ['PYD映像チーム結成', 'ColorfulStory始動', 'Altisto設立', 'Arti ベータ版リリース', 'LeafChat 正式ローンチ'],
      tags: ['はじまり', '再編', '現在', '予定', '予定'],
    },
    security: {
      heading: 'あなたの情報を、いつも安全に',
      sub: 'Altistoは、常に高い水準のセキュリティづくりに取り組んでいます',
      imageAlt: 'Altistoのセキュリティ',
    },
  },

  services: {
    meta: {
      title: 'サービス',
      description:
        'Altistoがつくるサービス — アーティストとクライアントをつなぐクリエイター外注・コミッション協業プラットフォーム「Arti」、時間割・給食・学生証をまとめたスクールライフ・スーパーアプリ「OurSchool」、年齢別チャット＆コミュニティ「LeafChat」。',
      keywords: [
        'Arti', 'クリエイター 外注 プラットフォーム', 'コミッション プラットフォーム',
        'イラスト 依頼', 'デザイン 外注', '動画編集 外注', 'アーティスト 外注',
        'OurSchool', 'スクールライフ アプリ', 'LeafChat', '年齢別 コミュニティ',
      ],
      ogTitle: 'サービス | Altisto',
      ogDescription: 'クリエイター外注プラットフォーム「Arti」、スクールライフ・スーパーアプリ「OurSchool」、年齢別コミュニティ「LeafChat」。',
      schemaName: 'サービス | Altisto',
      schemaDescription:
        'アーティストとクライアントをつなぐクリエイター外注・コミッション協業プラットフォーム「Arti」、スクールライフ・スーパーアプリ「OurSchool」、年齢別チャット＆コミュニティ「LeafChat」。',
    },
    title: 'サービス',
    intro: '人々が少しでも笑顔になれるように、\nAltistoは3つのサービスを自ら開発・運営しています。',
    arti: {
      name: 'Arti',
      category: 'クリエイター協業・外注プラットフォーム',
      heading: 'アーティストとクライアントの\nための協業プラットフォーム',
      body: 'Artiは、アーティストがチームを組んで\n一緒に制作できるコラボレーションプラットフォームです。\nひとつお知らせすると、個人間の取引は手数料無料です！',
      cta: 'Artiを見る',
    },
    ourschool: {
      name: 'OurSchool',
      category: 'スクールライフ・スーパーアプリ',
      heading: '時間割から給食、学生証まで\n学校生活をひとつのアプリに',
      body: 'OurSchoolは、時間割・給食・学生証・早退外出の申請を\nひとつにまとめたスクールライフアプリです。\n掲示板やコミュニティで同じ学校の友だちと交流できます！',
      cta: 'OurSchoolを見る',
    },
    leafchat: {
      name: 'LeafChat',
      category: '年齢別チャット＆コミュニティ',
      heading: '年齢別に、安心して\n友だちをつくれるコミュニティ',
      body: 'LeafChatは、年齢別に安心して友だちを\nつくれるように生まれたコミュニティです。\n本人認証と有害コンテンツのブロックで、安全に会話できます！',
      cta: 'LeafChatを見る',
    },
  },

  contact: {
    meta: {
      title: 'お問い合わせ',
      description:
        'Altistoへの協業・提携・採用などのお問い合わせはこちら。メール（connect@altisto.me）またはお問い合わせフォームからご連絡いただけます。',
      keywords: ['Altisto お問い合わせ', 'Altisto 連絡先', '外注 お問い合わせ', '提携 お問い合わせ'],
      ogTitle: 'お問い合わせ | Altisto',
      ogDescription: '協業・提携・採用のお問い合わせは、connect@altisto.me またはお問い合わせフォームへ。',
      schemaName: 'お問い合わせ | Altisto',
      schemaDescription: 'Altistoへの協業・提携・採用のお問い合わせ方法。メール：connect@altisto.me',
    },
    title: 'お問い合わせ',
    intro: 'プロジェクトのお見積もり、プラットフォームへの出店、パートナーシップのご提案など、\nどんな内容でもお気軽にご連絡ください。',
    formHeading: 'お問い合わせフォーム',
    formIntro: '種類を選んで内容をご記入いただければ、担当者が確認のうえご返信いたします。',
    response: { before: '営業日', strong: '24時間', after: '以内にご返信' },
    form: {
      legend: 'お問い合わせの種類',
      categories: {
        service: { label: 'サービス導入', desc: 'OurSchool導入のご相談' },
        invest: { label: '投資', desc: '投資のご提案' },
        etc: { label: 'その他', desc: '採用・取材・その他のご相談' },
      },
      name: 'お名前',
      namePlaceholder: '山田 太郎',
      company: '会社名・所属',
      optional: '（任意）',
      companyPlaceholder: 'Altisto',
      email: '返信先メールアドレス',
      message: 'お問い合わせ内容',
      messagePlaceholder: 'お問い合わせ内容をご自由にご記入ください。',
      submit: '送信する',
      mailHint: 'ボタンを押すとメールアプリが開きます。',
      mailDirect: '直接送る場合は',
      mail: {
        subject: '[{category}] {name}様からのお問い合わせ',
        category: 'お問い合わせの種類',
        name: 'お名前',
        company: '会社名・所属',
        email: '返信先',
        divider: '── お問い合わせ内容 ──',
      },
    },
  },

  career: {
    meta: {
      title: '採用情報',
      description:
        'コンテンツを超える価値をつくる旅。この楽しい挑戦をともにする仲間を探しています。Altistoの募集ポジションをご覧ください。',
      keywords: ['Altisto 採用', 'Altisto 求人', 'スタートアップ 採用', 'エンジニア 採用', 'デザイナー 採用', 'ソフトウェア会社 採用'],
      ogTitle: '採用情報 | Altisto',
      ogDescription: 'Altistoで一緒に働く仲間を探しています。募集ポジションをご覧ください。',
      schemaName: '採用情報 | Altisto',
      schemaDescription: 'ソフトウェア・プラットフォーム開発会社Altistoの募集ポジション。',
    },
    title: '採用情報',
    intro: 'インターネットを越えて暮らしを変える、\nその旅をともにするアーティストを探しています。',
    board: {
      searchPlaceholder: '職種・チームで検索',
      allTeams: 'すべての職種',
      allTypes: '雇用形態',
      reset: 'リセット',
      countBefore: '',
      countAfter: { one: '件のポジションを募集中です', other: '件のポジションを募集中です' },
      noJobs: '現在募集中のポジションはありません',
      noMatch: '条件に合うポジションはありません',
    },
  },

  merry: {
    meta: {
      title: 'メリ（Meri）| Altistoのマスコット',
      description:
        'Altistoのブランドマスコットキャラクター、メリ（Meri）を紹介します。銀髪にピンクの瞳、身長163cm、MBTIはENFJ、誕生日は2月21日。クリエイター外注プラットフォーム「Arti」でみなさんを迎える案内役です。',
      keywords: [
        'メリ', 'Meri', 'メリ キャラクター', 'Altisto メリ', 'Arti メリ',
        'Altisto マスコット', 'Arti マスコット', 'マスコットキャラクター', 'ブランドマスコット',
        '銀髪 キャラクター', 'ENFJ キャラクター', 'メリ プロフィール',
        'Altisto', 'Arti',
      ],
      ogDescription: 'やっほー！Altistoのマスコット、メリだよ。身長163cm、ENFJ、誕生日は2月21日！',
      ogImageAlt: 'Altistoのマスコット、メリ（Meri）— 銀髪にピンクの瞳のキャラクター',
      twitterDescription: 'Altistoのブランドマスコット、メリを紹介します。',
      schemaDescription:
        'Altistoのブランドマスコットキャラクター、メリ（Meri）の紹介。銀髪にピンクの瞳、身長163cm、MBTIはENFJ、誕生日は2月21日。',
      crumb: 'メリ',
    },
    h1: 'メリ（Meri）— Altistoのマスコット',
    name: 'メリ',
    nameSub: 'meri',
    profile: {
      name: 'メリ MERI',
      age: '16歳',
      height: '163 CM',
      weight: '非公開',
      mbti: 'ENFJ',
      birthday: '2月21日',
    },
    illustrationAlt: '銀髪にピンクの瞳をしたAltistoのマスコット・メリが、片手を挙げてあいさつする全身イラスト',
    invite: 'メリが待っているところへ、遊びに来ない？',
    toArti: 'Artiを見に行く',
    toServices: 'Altistoのサービス',
  },
};
