import { contactInfo } from "@/content/site";

interface ConnectLinksProps {
  /** Tailwind class controlling horizontal alignment of the pill row. */
  justifyClassName?: string;
  /** Extra classes to apply on the wrapper (e.g. margin-top overrides). */
  className?: string;
}

/**
 * Shared contact pill row — X, LinkedIn, Email — used on the timeline
 * Connect section and the About page so both stay visually in sync.
 */
export default function ConnectLinks({
  justifyClassName = "justify-center",
  className = "mt-8",
}: ConnectLinksProps) {
  const iconPillClass =
    "inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.03] text-foreground/80 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.06] hover:text-foreground";

  return (
    <div
      className={`flex flex-wrap items-center ${justifyClassName} gap-3 ${className}`}
    >
      <a
        href={contactInfo.x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter) profile"
        className={iconPillClass}
      >
        <svg
          viewBox="0 0 1200 1227"
          aria-hidden="true"
          className="h-4 w-4 fill-current"
        >
          <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894L144.011 79.694h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" />
        </svg>
      </a>
      <a
        href={contactInfo.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className={iconPillClass}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-[18px] w-[18px] fill-current"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a
        href={`mailto:${contactInfo.email}`}
        aria-label={`Email ${contactInfo.email}`}
        className={iconPillClass}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-[18px] w-[18px] stroke-current"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </a>
    </div>
  );
}
