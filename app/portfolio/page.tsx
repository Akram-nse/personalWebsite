import type { Metadata } from "next";
import { portfolioPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio — Akram Nsengiyumva",
  description: "A compact view of selected work.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-32 pt-32">
        <h1
          className="text-4xl tracking-tight text-foreground md:text-5xl"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 500,
          }}
        >
          {portfolioPage.title}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] font-medium leading-[1.8] text-foreground/55">
          {portfolioPage.subtitle}
        </p>

        <div className="mt-16 space-y-14">
          {portfolioPage.projects.map((project) => (
            <article
              key={project.id}
              id={project.id}
              className="scroll-mt-24 border-t border-border/60 pt-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <div className="flex items-baseline gap-2">
                  <h2
                    className="text-2xl tracking-tight text-foreground md:text-[28px]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontWeight: 500,
                    }}
                  >
                    {project.name}
                  </h2>
                  {project.current && (
                    <span
                      className="inline-flex translate-y-[2px] items-center gap-1.5 rounded-full border border-emerald-600/25 bg-emerald-500/10 px-2 py-[2px] text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-700"
                      aria-label="Currently active project"
                    >
                      <span className="relative inline-flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      Current
                    </span>
                  )}
                  {project.link && (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={project.link.label}
                      title={project.link.label}
                      className="inline-flex h-7 w-7 translate-y-[2px] items-center justify-center rounded-full text-foreground/45 transition-colors hover:bg-foreground/5 hover:text-foreground"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M8 7h9v9" />
                      </svg>
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.12em] text-foreground/45">
                  <span>{project.type}</span>
                  <span className="text-foreground/25">/</span>
                  <span>{project.year}</span>
                </div>
              </div>

              <p className="mt-4 text-[15px] font-medium leading-[1.8] text-foreground/70 md:text-base">
                {project.summary}
              </p>

              <dl className="mt-5 grid gap-x-8 gap-y-3 text-[14px] font-medium leading-[1.7] text-foreground/60 md:grid-cols-[auto_1fr]">
                <dt className="text-foreground/40">Role</dt>
                <dd>{project.role}</dd>
                <dt className="text-foreground/40">Impact</dt>
                <dd>{project.impact}</dd>
              </dl>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/70 px-2.5 py-[3px] text-[11px] font-medium tracking-[0.04em] text-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
