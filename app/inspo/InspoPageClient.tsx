"use client";

import { useState } from "react";
import Image from "next/image";
import { inspoPage, type InspoEntry } from "@/content/site";

type InspoView = "people" | "media";

export default function InspoPageClient() {
  const [view, setView] = useState<InspoView>("people");

  const current = view === "people" ? inspoPage.people : inspoPage.media;

  return (
    <section className="mx-auto max-w-2xl px-6 pb-32 pt-32">
      <h1
        className="text-4xl tracking-tight text-foreground md:text-5xl"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontWeight: 500,
        }}
      >
        {inspoPage.title}
      </h1>

      <div
        role="tablist"
        aria-label="Inspo categories"
        className="mt-8 flex items-center gap-6 border-b border-border/50"
      >
        <TabButton
          active={view === "people"}
          onClick={() => setView("people")}
          controls="inspo-panel"
        >
          People
        </TabButton>
        <TabButton
          active={view === "media"}
          onClick={() => setView("media")}
          controls="inspo-panel"
        >
          Media
        </TabButton>
      </div>

      <p
        key={view}
        className="mt-6 text-[15px] font-medium leading-[1.7] text-foreground/55"
      >
        {current.subtitle}
      </p>

      <div id="inspo-panel" role="tabpanel" className="mt-12 space-y-8">
        {current.entries.map((entry) => (
          <InspoRow key={entry.name} entry={entry} />
        ))}
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
  controls,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  controls: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      onClick={onClick}
      className={`relative -mb-px pb-3 text-[13px] font-medium uppercase tracking-[0.18em] transition-colors ${
        active
          ? "text-foreground"
          : "text-foreground/40 hover:text-foreground/70"
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-foreground transition-opacity ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}

function InspoRow({ entry }: { entry: InspoEntry }) {
  // The image is pulled out into the left margin on desktop so the name/note
  // column lines up with the page's left edge (the "Inspo" title). The
  // negative left margin equals the image width + gap so the text column
  // starts at x = 0 of the article box.
  return (
    <article className="flex items-start gap-5 border-t border-border/50 pt-7 first:border-t-0 first:pt-0 md:gap-6">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-foreground/[0.04] ring-1 ring-inset ring-border/60 md:-ml-[8.5rem] md:h-28 md:w-28">
        <Image
          src={entry.image}
          alt={entry.alt ?? entry.name}
          fill
          sizes="(min-width: 768px) 112px, 96px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h2
          className="text-xl text-foreground md:text-2xl"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 500,
          }}
        >
          {entry.name}
        </h2>
        <p className="mt-2 text-[14px] font-medium leading-[1.75] text-foreground/60 md:text-[15px]">
          {entry.note}
        </p>
        {entry.tags && entry.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/70 px-2.5 py-[3px] text-[11px] font-medium tracking-[0.04em] text-foreground/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
