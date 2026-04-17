import type { Metadata } from "next";
import { inspoPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Inspo — Akram Nsengiyumva",
  description: "People and ideas that shaped how I think.",
};

export default function InspoPage() {
  return (
    <>
      <section className="mx-auto max-w-2xl px-6 pb-32 pt-32">
        <h1
          className="text-4xl tracking-tight text-foreground md:text-5xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
        >
          {inspoPage.title}
        </h1>
        <p className="mt-4 text-[15px] font-medium text-foreground/55">
          {inspoPage.subtitle}
        </p>

        <div className="mt-14 space-y-10">
          {inspoPage.entries.map((entry) => (
            <div key={entry.name} className="border-t border-border/50 pt-7">
              <h2
                className="text-xl text-foreground md:text-2xl"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
              >
                {entry.name}
              </h2>
              <p className="mt-3 text-[14px] font-medium leading-[1.8] text-foreground/60 md:text-[15px]">
                {entry.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
