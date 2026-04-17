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

export interface TimelineImage {
  src: string;
  caption: string;
}

export interface TimelineEntry {
  id: string;
  title: string;
  body: string;
  images: TimelineImage[];
  side: "left" | "right";
}

export const timelineSections: TimelineEntry[] = [
  {
    id: "2005",
    title: "2005",
    body: "I was born in Botswana to refugees of the Rwandan genocide. Once on death row for belonging to the wrong tribe, my father was given a chance at a new life. From a truck driver to owning a fleet of trucks to building one of the biggest travelling agencies in the country, he instilled the importance of hard work in me.",
    images: [
      { src: "/timeline/placeholder.svg", caption: "Early years in Botswana" },
    ],
    side: "right",
  },
  {
    id: "early-signs",
    title: "Early Signs",
    body: 'In middle school, a classmate got the card-playing game "Yu-Gi-Oh!" and it took recess by storm. Everyone wanted a deck, but Botswana didn\'t have the stores. I downloaded hundreds of cards from the directory, went to an internet cafe to print and paste the images onto old decks of cards, and sold them at school. I eventually started selling posters too.',
    images: [
      { src: "/timeline/placeholder.svg", caption: "Early entrepreneurial projects" },
    ],
    side: "left",
  },
  {
    id: "learn-to-code",
    title: "Learning to Code",
    body: "At 15, during Covid, I couldn't afford a computer that could run the games my friends played, so I decided to learn how to make my own. Along with my own music and my own art. This is when I fell in love with Software Engineering.",
    images: [
      { src: "/timeline/placeholder.svg", caption: "First lines of code" },
    ],
    side: "right",
  },
  {
    id: "prodigy-to-dropout",
    title: '\u201CProdigy\u201D to dropout',
    body: "I had always done well in school, skipped a grade, ranked at the top of my class, and received Botswana\u2019s \u2018Top Achievers\u2019 Scholarship, the most prestigious award given to students that guarantees any amount of education funding from the government. However, I hated the path I was set on. I would end up at just another African college and later at a job with no great impact. So I dropped out",
    images: [
      { src: "/timeline/placeholder.svg", caption: "A turning point" },
    ],
    side: "left",
  },
  {
    id: "first-business",
    title: "First Business",
    body: "Botswana was slow to adapt to new technologies/platforms. I noticed this gap and began a marketing agency at 16 that commissioned websites and ran digital ads. At 17, I signed Ethiopian Airlines Botswana as a client, and an achievement I\u2019m deeply proud of, but I knew there was something more.",
    images: [
      { src: "/timeline/placeholder.svg", caption: "YV Social — first real clients" },
    ],
    side: "right",
  },
  {
    id: "the-us",
    title: "The U.S.",
    body: "My geography limited me, and the only way to get into the U.S. at my age was through college. I prepared my application and built a mobile app to prove my competence in CS. I was rejected by all the IVYs for not completing my last year, but was accepted to UMiami, and one acceptance was all I needed.",
    images: [
      { src: "/timeline/placeholder.svg", caption: "Arriving in the U.S." },
    ],
    side: "left",
  },
  {
    id: "frustration",
    title: "Frustration",
    body: "Once in the US, I started networking and building. I won a hackathon my freshman year, built websites for clubs at the school, but I still felt constrained by classes. I can't drop out without being kicked out, so I began building a project that could warrant an O-1 visa. I stayed on campus for Fall, spring, summer, and winter breaks, but the startup eventually fell flat after co-founder issues.",
    images: [
      { src: "/timeline/placeholder.svg", caption: "The gap that won't close on its own" },
    ],
    side: "right",
  },
  {
    id: "now-my-apple",
    title: "Now",
    body: "Technology has done so much for me, and yet it is still so feared among the general public. My goal is to build a startup that meets people where they are and diffuses the latest in tech to the rest of the population. In the same spirit that Apple made computers approachable, I want to make things like Openclaw/agent harnesses accessible to non-technical users. I'm starting with agents for family homes, and I'm willing to go house by house to make this real.",
    images: [
      { src: "/timeline/placeholder.svg", caption: "What I'm building toward" },
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
  body: `I'm Akram Nsengiyumva — a builder studying Computer Engineering at the University of Miami on the Botswana Top Achievers Scholarship.

I'm drawn to useful technology, especially at the point where new capabilities have not yet reached ordinary people. Important technologies rarely spread on their own. They need builders who can translate, simplify, and operationalize them for real use.

Before college, I started a marketing agency at 16, signed Ethiopian Airlines Botswana at 17, and built and shipped a philosophy learning app in 3 weeks to prove technical ability during my college application process.

Now I'm focused on building products that close the gap between what technology can do and what people actually get to use.`,
};

export interface InspoEntry {
  name: string;
  note: string;
}

export const inspoPage = {
  title: "Inspo",
  subtitle: "People and ideas that shaped how I think.",
  entries: [
    {
      name: "Charlie Munger",
      note: "Mental models, inversion, and the discipline of taking simple ideas seriously.",
    },
    {
      name: "Paul Graham",
      note: "The idea that the best founders are relentlessly resourceful — and that essays are a form of thinking.",
    },
    {
      name: "Steve Jobs",
      note: "The intersection of technology and liberal arts. Products as expressions of taste.",
    },
    {
      name: "Patrick Collison",
      note: "Building infrastructure that enables other builders. Speed as a competitive advantage.",
    },
    {
      name: "Jensen Huang",
      note: "Decades of conviction on a single thesis. The willingness to endure pain for something that matters.",
    },
  ] as InspoEntry[],
};

export const navLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Inspo", href: "/inspo" },
];

export interface PortfolioProject {
  name: string;
  type: string;
  year: string;
  summary: string;
  role: string;
  impact: string;
  stack: string[];
  link?: { label: string; href: string };
}

export const portfolioPage = {
  title: "Portfolio",
  subtitle:
    "Selected work. A compact view for anyone hiring or evaluating — the fuller story lives in the timeline on the home page.",
  projects: [
    {
      name: "Snap Lock",
      type: "Product concept / app",
      year: "2025",
      summary:
        "A focus tool designed to reduce distraction without requiring users to buy a separate physical device — built from the frustration of how costly and clunky existing solutions are.",
      role: "Founder, designer, and sole builder.",
      impact:
        "Reframed the problem: distraction is a system problem, not a hardware one. Prototype validated the thesis with early users.",
      stack: ["Swift", "iOS", "Product design"],
    },
    {
      name: "Athens",
      type: "iOS app",
      year: "2023",
      summary:
        "A Duolingo-style philosophy learning app. Built and shipped to the App Store in three weeks as technical proof during the college application process.",
      role: "Built end-to-end: concept, UX, code, content, submission.",
      impact:
        "Shipped under deadline pressure. Later taken down after the Apple Developer membership lapsed.",
      stack: ["Swift", "SwiftUI", "iOS"],
    },
    {
      name: "AI Horizons Hackathon App",
      type: "Hackathon — winner",
      year: "2024",
      summary:
        "An AI-powered tool that translates international transcripts into U.S. academic equivalents — for pennies instead of the hundreds of dollars traditional services charge.",
      role: "Built the AI pipeline and UI with a small team.",
      impact:
        "Won the University of Miami AI Horizons Hackathon. Proved that access problems are often pricing problems in disguise.",
      stack: ["Python", "LLM APIs", "React"],
    },
    {
      name: "YV Social",
      type: "Marketing agency",
      year: "2021 – 2023",
      summary:
        "Founded at 16. Signed local Botswana businesses with no online presence, built their sites, and ran their Facebook ads. At 17, signed Ethiopian Airlines Botswana as a client.",
      role: "Founder. Sales, client relationships, ads, and web delivery.",
      impact:
        "Generated real revenue and signed a national carrier as a client before graduating high school.",
      stack: ["Web", "Meta Ads", "Client delivery"],
    },
    {
      name: "University of Miami Motorsports",
      type: "Web / digital systems",
      year: "2024 – present",
      summary:
        "Maintain and extend the University of Miami Motorsports website and digital presence.",
      role: "Web lead. Ships features, fixes, and content updates.",
      impact:
        "Keeps a real student-led engineering program online and credible.",
      stack: ["Web", "CMS"],
    },
  ] as PortfolioProject[],
};
