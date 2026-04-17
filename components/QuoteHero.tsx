"use client";

import { motion } from "framer-motion";

interface QuoteHeroProps {
  name: string;
  tagline: string;
  quote: string;
  attribution: string;
  scrollCta: string;
}

export default function QuoteHero({
  name,
  tagline,
  quote,
  attribution,
  scrollCta,
}: QuoteHeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="text-center text-5xl tracking-tight text-foreground md:text-6xl lg:text-7xl"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500, letterSpacing: "-0.015em" }}
      >
        {name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mt-3 text-center text-[12px] font-medium tracking-[0.14em] text-foreground/45 md:text-[13px]"
      >
        {tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mt-12 max-w-md text-center"
      >
        <p
          className="text-lg italic leading-[1.6] text-foreground/70 md:text-xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400 }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <p className="mt-4 text-[13px] font-medium tracking-[0.08em] text-foreground/45">
          &mdash; {attribution}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-12 flex flex-col items-center gap-1.5"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/40">
          {scrollCta}
        </span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-foreground/30"
        >
          &#8964;
        </motion.span>
      </motion.div>
    </section>
  );
}
