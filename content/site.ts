export const siteConfig = {
  name: "Akram Nsengiyumva",
  title: "Akram Nsengiyumva",
  description: "Take a simple idea, take it very seriously.",
};

export const hero = {
  name: "Akram Nsengiyumva",
  tagline: "Engineer | Founder",
  quote: "Take a simple idea, take it very seriously.",
  attribution: "C. Munger",
  scrollCta: "Scroll",
};

export const timelineIntro = {
  title: "The Timeline",
  bodyBefore: "My work best makes sense in the context of my story. For just my ",
  bodyMiddle: " or ",
  bodyAfter: ", use the menu above. However, the timeline below includes all my projects and more.",
};

/**
 * Declarative inline link used by `RichText`: the first occurrence of
 * `text` inside a body/caption is turned into a link pointing at `href`.
 * Absolute URLs open in a new tab by default.
 */
export interface TextLink {
  text: string;
  href: string;
  external?: boolean;
}

export interface TimelineImage {
  src: string;
  /** Shown below the slide; omit or use empty string for no visible caption. */
  caption: string;
  /** Inline links to weave into the caption. */
  captionLinks?: TextLink[];
  /** Image `alt` text; falls back to `caption` when set, or a generic label when both are empty. */
  alt?: string;
  /** Passed to Next/Image `className` for `object-*` (default full-bleed cover). */
  objectClassName?: string;
  /** Slide frame background (e.g. `bg-white` for graphics that should read edge-to-edge). */
  frameClassName?: string;
  /** Override the auto-advance duration (ms) for this slide; defaults to the slideshow default. */
  durationMs?: number;
}

export interface TimelineEntry {
  id: string;
  title: string;
  body: string;
  /** Inline links to weave into the body. */
  bodyLinks?: TextLink[];
  images: TimelineImage[];
  side: "left" | "right";
}

export const timelineSections: TimelineEntry[] = [
  {
    id: "2005",
    title: "2005",
    body: "I was born in Botswana to refugees of the Rwandan genocide. Once on death row for belonging to the wrong tribe, my father was given a chance at a new life. From a truck driver to owning a fleet of trucks to building one of the biggest travelling agencies in the country, he instilled the importance of hard work in me.",
    images: [
      {
        src: "/timeline/2005-pops-and-i.png",
        caption: "pops and I",
      },
      {
        src: "/timeline/2005-truck-trips.png",
        caption: "He'd take me on some of his trips",
      },
      {
        src: "/timeline/2005-quote.png",
        caption: "",
        alt: "Quote about fathers and sons",
        objectClassName: "object-contain",
        frameClassName: "bg-[#FDFCF8]",
        durationMs: 6000,
      },
    ],
    side: "right",
  },
  {
    id: "early-signs",
    title: "Early Signs",
    body: 'In middle school, a classmate got the card-playing game "Yu-Gi-Oh!" and it took recess by storm. Everyone wanted a deck, but Botswana didn\'t have the stores. I downloaded hundreds of cards from the directory, went to an internet cafe to print and paste the images onto old decks of cards, and sold them at school. I eventually started selling posters too.',
    images: [
      {
        src: "/timeline/early-signs-first-poster.png",
        caption: "First poster in my bare room",
      },
      {
        src: "/timeline/early-signs-sales-whatsapp.jpg",
        caption: "Early sales skills",
        objectClassName: "object-contain",
        frameClassName: "bg-background",
      },
    ],
    side: "left",
  },
  {
    id: "learn-to-code",
    title: "Learning to Code",
    body: "At 15, during Covid, I couldn't afford a computer that could run the games my friends played, so I decided to learn how to make my own, along with my own music and my own art. To learn, I audited college classes on Coursera. This is when I fell in love with Software Engineering.",
    images: [
      {
        src: "/timeline/learn-to-code-first-game.jpg",
        caption: "Blurry art of my first game",
      },
      {
        src: "/timeline/learn-to-code-drawing-tablet.jpg",
        caption: "Saved up for a drawing tablet",
        objectClassName: "object-contain",
        frameClassName: "bg-background",
      },
      {
        src: "/timeline/learn-to-code-midi-keyboard.jpg",
        caption: "And then a midi keyboard",
      },
    ],
    side: "right",
  },
  {
    id: "prodigy-to-dropout",
    title: '\u201CProdigy\u201D to dropout',
    body: "I had always done well in school, skipped a grade, ranked at the top of my class, and received Botswana\u2019s \u2018Top Achievers\u2019 Scholarship, the most prestigious award given to students that guarantees any amount of education funding from the government. However, I hated the path I was set on. I would end up at just another African college and later at a job with no great impact. So I dropped out.",
    images: [
      {
        src: "/timeline/prodigy-schedule.jpg",
        caption: "Schedule over school break",
        objectClassName: "object-contain",
        frameClassName: "bg-background",
      },
      {
        src: "/timeline/prodigy-quote.png",
        caption: "Did not take this advice.",
        alt: "Paul Graham quote: don\u2019t start a startup in high school",
        objectClassName: "object-contain",
        frameClassName: "bg-[#FDFCF8]",
        durationMs: 6000,
      },
    ],
    side: "left",
  },
  {
    id: "first-business",
    title: "First Business",
    body: "Botswana was slow to adapt to new technologies/platforms. I noticed this gap and began a marketing agency at 16 that commissioned websites and ran digital ads. At 17, I signed Ethiopian Airlines Botswana as a client, an achievement I\u2019m deeply proud of, but I knew there was something more.",
    bodyLinks: [{ text: "marketing agency", href: "/portfolio#yv-social" }],
    images: [
      {
        src: "/timeline/first-business-ad-rates.png",
        caption: "Took advantage of the low ad rates",
        objectClassName: "object-contain",
        frameClassName: "bg-background",
      },
      {
        src: "/timeline/first-business-following-before.jpg",
        caption: "Following before taking over the account",
        objectClassName: "object-contain",
        frameClassName: "bg-background",
      },
      {
        src: "/timeline/first-business-following-after.jpg",
        caption: "Following after",
        objectClassName: "object-contain",
        frameClassName: "bg-background",
      },
    ],
    side: "right",
  },
  {
    id: "the-us",
    title: "The U.S.",
    body: "My geography limited me, and the only way to get into the U.S. at my age was through college. I prepared my application and built a mobile app to prove my competence in CS. I was rejected by all the IVYs for not completing my last year, but was accepted to UMiami, and one acceptance was all I needed.",
    bodyLinks: [{ text: "mobile app", href: "/portfolio#athens" }],
    images: [
      {
        src: "/timeline/the-us-athens-build.png",
        caption: "Building a duolingo style philosophy learning app",
        captionLinks: [
          { text: "philosophy learning app", href: "/portfolio#athens" },
        ],
        objectClassName: "object-contain",
        frameClassName: "bg-background",
      },
      {
        src: "/timeline/the-us-all-nighter.jpg",
        caption: "Pulled all nighters to build it",
        objectClassName: "object-contain",
        frameClassName: "bg-background",
      },
      {
        src: "/timeline/the-us-umiami-accepted.png",
        caption: "Accepted into the University of Miami",
        objectClassName: "object-contain",
        frameClassName: "bg-background",
      },
    ],
    side: "left",
  },
  {
    id: "frustration",
    title: "Frustration",
    body: "Once in the US, I started networking and building. I won a hackathon my freshman year and built websites for clubs at the school, but I still felt constrained by classes. I can't drop out without being kicked out, so I began building a project that could warrant an O-1 visa. I stayed on campus for Fall, spring, summer, and winter breaks, but the startup eventually fell flat after co-founder issues.",
    bodyLinks: [
      { text: "won a hackathon", href: "/portfolio#common-helper" },
    ],
    images: [
      {
        src: "/timeline/frustration-snaplock-mac-appstore.png",
        caption: "The productivity app I launched in 2025 (side project)",
        captionLinks: [
          { text: "productivity app", href: "/portfolio#snaplock" },
        ],
        alt: "SnapLock app listing on the Mac App Store",
        objectClassName: "object-contain",
        frameClassName: "bg-background",
      },
      {
        src: "/timeline/frustration-hack-timelapse.mp4",
        caption: "Working through the night at a Hackathon",
        captionLinks: [{ text: "Hackathon", href: "/portfolio#common-helper" }],
        alt: "Timelapse of me working through the night at a hackathon",
        objectClassName: "object-contain",
        frameClassName: "bg-background",
        durationMs: 8000,
      },
    ],
    side: "right",
  },
  {
    id: "now-my-apple",
    title: "Now",
    body: "Technology has done so much for me, and yet it is still so feared among the general public. My goal is to build a startup that meets people where they are and diffuses the latest in tech to the rest of the population. In the same spirit that Apple made computers approachable, I want to make things like Openclaw/agent harnesses accessible to non-technical users. I'm starting with agents for family homes, and I'm willing to go house by house to make this real.",
    bodyLinks: [
      { text: "agents for family homes", href: "/portfolio#vector" },
    ],
    images: [
      {
        src: "/timeline/now-following-latest-software.png",
        caption: "Following the latest software developments",
      },
      {
        src: "/timeline/now-steve-jobs-quote.png",
        caption: "",
        alt: "Steve Jobs quote: The people who are crazy enough to think they can change the world are the ones who do.",
        objectClassName: "object-contain",
        frameClassName: "bg-background",
        durationMs: 6000,
      },
    ],
    side: "left",
  },
  {
    id: "connect",
    title: "Connect",
    body: "I'd love for you to be a part of this story, and I would just as much love to be a cameo in yours.",
    images: [],
    side: "right",
  },
];

export const contactInfo = {
  email: "akram@yvsocial.com",
  linkedin: "https://www.linkedin.com/in/akram-nsengiyumva-23520a213/",
  github: "https://github.com/akram-nsengiyumva",
  x: "https://x.com/akramNse",
};

export const aboutPage = {
  title: "About",
  body: `I'm Akram Nsengiyumva — a builder studying Computer Engineering at the University of Miami on the Botswana Top Achievers' Scholarship.

I started a marketing agency at 16 and signed Ethiopian Airlines as a client the following year. I've also shipped a philosophy learning app, a productivity app, and an AI mental health app.

I'm drawn to useful technology — especially when it hasn't yet reached the people who'd benefit most, the way Apple once made computers approachable. I'm starting with AI agents for family homes, and I'm willing to go house by house to make this real.`,
  bodyLinks: [
    { text: "marketing agency", href: "/portfolio#yv-social" },
    { text: "philosophy learning app", href: "/portfolio#athens" },
    { text: "productivity app", href: "/portfolio#snaplock" },
    { text: "AI agents for family homes", href: "/portfolio#vector" },
  ] as TextLink[],
};

export interface InspoEntry {
  name: string;
  note: string;
  /** Square-ish image shown to the left of the entry. Lives under /public. */
  image: string;
  /** Optional alt text. Falls back to the entry name. */
  alt?: string;
  /** Small pill-style tags shown under the note (e.g. "Podcast", "Philosophy"). */
  tags?: string[];
}

export const inspoPage = {
  title: "Inspo",
  people: {
    subtitle:
      "I hope for my life to be a love letter to those who have impacted it most. Aside from family and friends, below are the most impactful of those people.",
    entries: [
      {
        name: "Napoleon",
        note: "A reminder that action — swift, decisive, and at scale — is the only thing that moves the world.",
        image: "/inspo/napoleon.png",
        alt: "Napoleon Crossing the Alps by Jacques-Louis David",
      },
      {
        name: "Steve Jobs",
        note: "The intersection of technology and liberal arts. Products as expressions of taste.",
        image: "/inspo/steve-jobs.png",
        alt: "Portrait of Steve Jobs",
      },
      {
        name: "Michael Jordan",
        note: "The champion's mentality — the obsessive will to win, and to hold everyone around you to that same standard.",
        image: "/inspo/michael-jordan.png",
        alt: "Michael Jordan in a Chicago Bulls jersey",
      },
      {
        name: "Chris Bumstead",
        note: "Proof that there can be real depth and craft in a pursuit most would dismiss as vain.",
        image: "/inspo/chris-bumstead.png",
        alt: "Chris Bumstead holding the Mr. Olympia medal",
      },
    ] as InspoEntry[],
  },
  media: {
    subtitle: "Podcasts and books have shaped me just as much.",
    entries: [
      {
        name: "Founders Podcast",
        note: "My introduction to the biographies of the greats I now aspire to emulate.",
        image: "/inspo/founders-podcast.png",
        alt: "Founders podcast logo",
        tags: ["Podcast", "Biographies"],
      },
      {
        name: "Philosophize This!",
        note: "Expanded my worldview and was my first real introduction to philosophy.",
        image: "/inspo/philosophize-this.png",
        alt: "Philosophize This! podcast artwork",
        tags: ["Podcast", "Philosophy"],
      },
      {
        name: "Red Rising",
        note: "My favorite science fiction novel — it keeps me building toward a future that feels pulled out of sci-fi.",
        image: "/inspo/red-rising.png",
        alt: "Red Rising book cover",
        tags: ["Book", "Science Fiction"],
      },
      {
        name: "Paul Graham's Essays",
        note: "The gold standard for startup writing. Essays as a form of thinking.",
        image: "/inspo/paul-graham-essays.png",
        alt: "Hackers & Painters by Paul Graham",
        tags: ["Essays", "Startups"],
      },
    ] as InspoEntry[],
  },
};

export const navLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Inspo", href: "/inspo" },
];

export interface PortfolioProject {
  /** Anchor slug — used by inline links across the site (e.g. /portfolio#snaplock). */
  id: string;
  name: string;
  type: string;
  year: string;
  summary: string;
  role: string;
  impact: string;
  stack: string[];
  link?: { label: string; href: string };
  /** Mark the project as active/ongoing — shown with a subtle "Current" badge. */
  current?: boolean;
}

export const portfolioPage = {
  title: "Portfolio",
  subtitle: "A compact view of selected work.",
  projects: [
    {
      id: "vector",
      name: "Vector",
      type: "Startup",
      year: "2026 \u2014 present",
      current: true,
      summary:
        "An AI agent harness for family homes \u2014 making the latest in AI usable for non-technical households, house by house.",
      role: "Founder and developer.",
      impact:
        "Diffusing the latest developments in AI to people outside of tech, starting with the home.",
      stack: ["Openclaw", "Python", "Sales"],
    },
    {
      id: "snaplock",
      name: "SnapLock: App Blocker",
      type: "App",
      year: "2025",
      summary:
        "Blocks distracting apps on your phone and keeps them locked until you scan a specific barcode in the real world.",
      role: "Designer, engineer, and marketer.",
      impact:
        "Removed the need to buy the $60 physical Brick by accomplishing the same mechanic in software form.",
      stack: ["Swift", "iOS", "TikTok marketing"],
      link: {
        label: "View on the App Store",
        href: "https://apps.apple.com/us/app/snaplock-app-blocker/id6751025392",
      },
    },
    {
      id: "yv-social",
      name: "YV Social",
      type: "Marketing agency",
      year: "2022 \u2013 2023",
      summary:
        "Marketing agency signing local Botswana businesses with no online presence \u2014 with notable alumni such as Ethiopian Airlines Botswana. Built their sites and ran their Meta ads.",
      role: "Founder. Sales, client relationships, ads, and web development.",
      impact:
        "Generated real revenue and grew the Ethiopian Airlines Botswana Facebook page from 0 to 2M+ followers.",
      stack: ["Sales", "Meta Ads", "Web development"],
    },
    {
      id: "common-helper",
      name: "Common Helper",
      type: "Hackathon \u2014 winner",
      year: "2025",
      summary:
        "An AI-powered tool that translates international transcripts into U.S. academic equivalents \u2014 for pennies instead of the hundreds of dollars traditional services charge.",
      role: "Led project management and built full-stack.",
      impact:
        "Won the Education category at the University of Miami AI Horizons Hackathon. Proved that access problems are often pricing problems in disguise.",
      stack: ["Python", "LLM APIs", "React"],
      link: {
        label: "View the project on Devpost",
        href: "https://devpost.com/software/common-helper",
      },
    },
    {
      id: "athens",
      name: "Athens: Learn Philosophy",
      type: "iOS app",
      year: "2023",
      summary:
        "A Duolingo-style philosophy learning app. I\u2019d study complex philosophical topics and distill them into bite-sized lessons.",
      role: "Built end-to-end: concept, UX, code, lesson curation, and submission.",
      impact:
        "Shipped to the App Store under deadline pressure. Later taken down after the Apple Developer membership lapsed.",
      stack: ["Swift", "SwiftUI", "Flutter"],
    },
  ] as PortfolioProject[],
};
