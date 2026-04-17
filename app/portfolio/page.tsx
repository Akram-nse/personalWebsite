import type { Metadata } from "next";
import { portfolioPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio — Akram Nsengiyumva",
  description:
    "A compact view of selected work — for anyone hiring or evaluating.",
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
              key={project.name}
              className="border-t border-border/60 pt-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h2
                  className="text-2xl tracking-tight text-foreground md:text-[28px]"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontWeight: 500,
                  }}
                >
                  {project.name}
                </h2>
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

              {project.link && (
                <div className="mt-5">
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium italic text-foreground/80 underline decoration-foreground/25 underline-offset-[5px] transition-colors hover:text-foreground hover:decoration-foreground/60"
                  >
                    {project.link.label}
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
