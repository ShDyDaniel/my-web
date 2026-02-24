export type ServiceIconKey = "camera" | "film" | "wand" | "clock";
export type HomeSectionKey = "studio" | "work" | "process" | "contact";

export type NavigationItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  icon: ServiceIconKey;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type WorkItem = {
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  className: string;
  aspect: string;
};

export type MiniShowcaseItem = {
  image: string;
  title: string;
  subtitle: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type ContactMethod = {
  title: string;
  value: string;
  href: string;
  hint: string;
};

export type SiteContent = {
  layout: {
    sectionOrder: HomeSectionKey[];
  };
  brand: {
    mark: string;
    name: string;
    footerSubtitle: string;
  };
  navigation: NavigationItem[];
  labels: {
    heroSupportChip: string;
    premiumSetup: string;
    visualStorytelling: string;
    showreelDirection: string;
    readyForSocialAds: string;
    creativePolish: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    brandLine: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    mediaImage: string;
    mediaAlt: string;
    stats: StatItem[];
    helperText: string;
    mediaTitle: string;
    mediaKicker: string;
    floatingTop: string;
    floatingBottom: string;
  };
  marqueeItems: string[];
  miniShowcase: MiniShowcaseItem[];
  studio: {
    badge: string;
    title: string;
    description: string;
    features: string[];
    deliverablesTitle: string;
    workflowKicker: string;
    workflowTitle: string;
    workflowDescription: string;
  };
  work: {
    badge: string;
    title: string;
    description: string;
    ctaLabel: string;
    items: WorkItem[];
  };
  process: {
    badge: string;
    title: string;
    description: string;
    services: ServiceItem[];
    steps: ProcessStep[];
    note: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    emailButtonLabel: string;
    phoneButtonLabel: string;
    email: ContactMethod;
    phone: ContactMethod;
    availabilityTitle: string;
    availabilityDescription: string;
  };
};

export const DEFAULT_SITE_CONTENT: SiteContent = {
  layout: {
    sectionOrder: ["studio", "work", "process", "contact"],
  },
  brand: {
    mark: "DS",
    name: "Productions",
    footerSubtitle: "Video Production & Editing",
  },
  navigation: [
    { label: "ב123ת", href: "#hero" },
    { label: "הסטודיו", href: "#studio" },
    { label: "עבודות", href: "#work" },
    { label: "תהליך", href: "#process" },
    { label: "יצירת קשר", href: "#contact" },
  ],
  labels: {
    heroSupportChip: "סטודיו וידאו מודרני למותגים ולעסקים",
    premiumSetup: "Premium Setup",
    visualStorytelling: "Visual Storytelling",
    showreelDirection: "Showreel Direction",
    readyForSocialAds: "Ready for social & ads",
    creativePolish: "Creative polish",
  },
  hero: {
    badge: "סטודיו וידאו מודרני למותגים ולעסקים",
    titleLine1: "וידאו שנראה",
    titleLine2: "כמו מותג.",
    brandLine: "Ds.Productions",
    description:
      "צילום ועריכת וידאו ברמת גימור גבוהה: קמפיינים, תוכן לרשתות, סרטוני מוצר ופרומואים עם שפה ויזואלית מדויקת, תנועה חכמה ותחושת פרימיום.",
    primaryCta: "צפייה בעבודות",
    secondaryCta: "יצירת קשר",
    mediaImage: "/assets/videography.jpg",
    mediaAlt: "וידאו פרודקשן",
    stats: [
      { value: "4K", label: "איכות מסירה" },
      { value: "24-72h", label: "זמני תגובה מהירים" },
      { value: "RTL", label: "התאמה לקהל מקומי" },
    ],
    helperText: "עיצוב נקי, אנימציות מודרניות ותוצרים מוכנים לפרסום",
    mediaTitle: "צילום + עריכה + פיינישינג",
    mediaKicker: "Showreel Direction",
    floatingTop: "Ready for social & ads",
    floatingBottom: "Creative polish",
  },
  marqueeItems: [
    "סרטונים לרשתות חברתיות - Social Reels ",
    "עריכת סרטונים קצרים - Short Video Editing",
    "צבעים וקומפוזיציה  - Color & Finish ",
    "הצגת נתונים בצורה מקצועית - Motion Text",
    "אפקטים ויזואלים ותלת מימד - fx & 3d",
    "מסירה מהירה  - Fast Delivery ",
  ],
  miniShowcase: [
    {
      image: "/assets/project3.png",
      title: "עריכה דינמית",
      subtitle: "Motion / Rhythm / Cut",
    },
    {
      image: "/assets/project4.png",
      title: "לוק פרימיום",
      subtitle: "Color / Branding",
    },
  ],
  studio: {
    badge: "הסטודיו",
    title: "וידאו שנבנה סביב העסק, לא רק סביב אפקטים",
    description:
      "המטרה היא לייצר תוכן וידאו שנראה מעולה וגם עובד בפועל: מושך תשומת לב, מייצר עניין, ומעביר מסר ברור בשניות הראשונות. כל פרויקט מקבל טיפול עיצובי, קצב עריכה ושפה מותגית שמתאימים בדיוק לפלטפורמה ולקהל.",
    features: [
      "צילום, עריכה ופוסט במקום אחד",
      "התאמה מלאה ל־Instagram / TikTok / Ads",
      "סבבי תיקונים מסודרים",
      "מסירה בקבצים מוכנים לפרסום",
    ],
    deliverablesTitle: "מה מקבלים בכל פרויקט",
    workflowKicker: "Workflow Focus",
    workflowTitle: "תהליך מסודר, תוצאה חדה",
    workflowDescription:
      "עבודה ברורה מהבריף ועד מסירה, עם דגש על יעילות, תקשורת טובה ואיכות סופית גבוהה.",
  },
  work: {
    badge: "עבודות נבחרות",
    title: "תוצרים עם נוכחות, קצב ונראות מותגית",
    description:
      "דוגמאות לסגנונות עבודה שונים: פרויקטי מותג, תוכן קצר לרשתות, פרומואים והיילייטס. כל מסך כאן מדגים גישה ויזואלית חדה ומודרנית.",
    ctaLabel: "להתחיל פרויקט",
    items: [
      {
        title: "קמפיין מוצר",
        subtitle: "Brand Video / Social Cut",
        image: "/assets/project1.png",
        tag: "מותג",
        className: "md:col-span-2",
        aspect: "aspect-[16/9]",
      },
      {
        title: "תוכן לרשתות",
        subtitle: "Reels / Vertical Motion",
        image: "/assets/project2.1.png",
        tag: "סושיאל",
        className: "",
        aspect: "aspect-[4/5]",
      },
      {
        title: "פרומו דינמי",
        subtitle: "Teaser / Launch Edit",
        image: "/assets/project2.png",
        tag: "פרומו",
        className: "",
        aspect: "aspect-[4/5]",
      },
      {
        title: "הפקת וידאו",
        subtitle: "Production / Edit",
        image: "/assets/project3.png",
        tag: "צילום + עריכה",
        className: "",
        aspect: "aspect-[4/3]",
      },
      {
        title: "מסך פרזנטציה",
        subtitle: "Showreel / Highlights",
        image: "/assets/project4.png",
        tag: "היילייטס",
        className: "md:col-span-2",
        aspect: "aspect-[16/9]",
      },
    ],
  },
  process: {
    badge: "תהליך עבודה",
    title: "איך פרויקט מתקדם בפועל",
    description: "תהליך פשוט, מסודר ושקוף שמאפשר להתקדם מהר בלי לפספס איכות.",
    services: [
      {
        title: "צילום וידאו לקמפיינים",
        description:
          "הפקות וידאו למותגים, עסקים ורשתות חברתיות עם שפה חזותית נקייה, חדה ומדויקת.",
        icon: "camera",
      },
      {
        title: "עריכה דינמית לסושיאל",
        description:
          "Reels, TikTok וקטעי פרומו עם קצב נכון, הוקים חזקים וטיימינג שמחזיק צפייה.",
        icon: "film",
      },
      {
        title: "מיתוג ויזואלי לפרויקטים",
        description:
          "בניית לוק אחיד לפרויקט: צבעוניות, טקסטים, מעברים ותחושה שמתאימה לעסק שלך.",
        icon: "wand",
      },
      {
        title: "מסירה מהירה ומדויקת",
        description:
          "עבודה מסודרת עם סבבי תיקונים, תקשורת רציפה ותוצרים מוכנים לפרסום בכל פלטפורמה.",
        icon: "clock",
      },
    ],
    steps: [
      {
        title: "אפיון קריאייטיב",
        description:
          "מבינים מטרה, קהל יעד וסגנון כדי לתכנן צילום/עריכה שמשרתים תוצאה ולא רק אסתטיקה.",
      },
      {
        title: "צילום / איסוף חומרים",
        description:
          "צילום בפועל או עבודה עם חומרי גלם קיימים, כולל בחירת רגעים חזקים לפני תחילת העריכה.",
      },
      {
        title: "עריכה מתקדמת",
        description:
          "קצב, סאונד, טקסטים, צבע ומעברים. כל שכבה נכנסת כדי לייצר וידאו חד וברמת גימור גבוהה.",
      },
      {
        title: "פיינל דליברי",
        description:
          "קבצים מוכנים לפרסום בפורמטים הנכונים, עם התאמות לפיד/סטורי/מודעות לפי הצורך.",
      },
    ],
    note: "מתאים לעסקים שרוצים מראה מקצועי ומודרני בלי להיכנס לתהליך כבד ומסורבל.",
  },
  contact: {
    badge: "יצירת קשר",
    title: "יש לכן פרויקט וידאו חדש?",
    subtitle: "בואו נבנה לו נראות ברמה גבוהה.",
    description:
      "אפשר לשלוח בריף קצר, רעיון כללי או פשוט להגיד מה המטרה של הוידאו. משם נבנה כיוון קריאייטיבי ותהליך עבודה מסודר.",
    emailButtonLabel: "שליחת מייל",
    phoneButtonLabel: "051-522-7660",
    email: {
      title: "אימייל",
      value: "dyshalts@gmail.com",
      href: "mailto:dyshalts@gmail.com",
      hint: "מתאים לבריפים מסודרים והצעות מחיר",
    },
    phone: {
      title: "טלפון",
      value: "051-522-7660",
      href: "tel:0515227660",
      hint: "לתיאום מהיר ושאלות על פרויקט",
    },
    availabilityTitle: "זמינות לפרויקטים חדשים",
    availabilityDescription:
      "מומלץ לפנות מראש כדי לשריין חלון עבודה לצילום/עריכה.",
  },
};
