import type { Metadata } from "next";
import { aboutPage } from "@/content/site";

export const metadata: Metadata = {
  title: "About — Akram Nsengiyumva",
  description: "A brief note on who I am and what I'm building.",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-2xl px-6 pb-32 pt-32">
        <h1
          className="text-4xl tracking-tight text-foreground md:text-5xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
        >
          {aboutPage.title}
        </h1>

        <div className="mt-10 space-y-6">
          {aboutPage.body.split("\n\n").map((p, i) => (
            <p
              key={i}
              className="text-[15px] font-medium leading-[1.8] text-foreground/65 md:text-base"
            >
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
