"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

interface TimelineIntroProps {
  title: string;
  bodyBefore: string;
  bodyMiddle: string;
  bodyAfter: string;
}

const inlineLinkClass =
  "font-medium text-foreground/85 underline decoration-foreground/25 underline-offset-[5px] transition-colors hover:text-foreground hover:decoration-foreground/50";

export default function TimelineIntro({
  title,
  bodyBefore,
  bodyMiddle,
  bodyAfter,
}: TimelineIntroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="mx-auto max-w-4xl scroll-mt-24 px-6 py-20 text-center md:py-24"
    >
      <h2
        className="text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontWeight: 500,
        }}
      >
        {title}
      </h2>
      <p className="mt-8 text-base font-medium leading-[1.8] text-foreground/65 md:text-lg">
        {bodyBefore}
        <Link href="/portfolio" className={inlineLinkClass}>
          Portfolio
        </Link>
        {bodyMiddle}
        <Link href="/about" className={inlineLinkClass}>
          About
        </Link>
        {bodyAfter}
      </p>
    </motion.div>
  );
}
