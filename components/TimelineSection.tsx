"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ImageSlideshow from "./ImageSlideshow";
import type { TimelineEntry } from "@/content/site";
import { contactInfo } from "@/content/site";

interface TimelineSectionProps {
  entry: TimelineEntry;
}

function ConnectLinks() {
  const buttonClass =
    "inline-flex h-11 items-center justify-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-5 text-[13px] font-medium text-foreground/80 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.06] hover:text-foreground";

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <a
        href={contactInfo.x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter) profile"
        className={`${buttonClass} min-w-11 px-0`}
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
        className={buttonClass}
      >
        LinkedIn
      </a>
      <a
        href={`mailto:${contactInfo.email}`}
        className={buttonClass}
      >
        Email
      </a>
    </div>
  );
}

export default function TimelineSection({ entry }: TimelineSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const imageOnLeft = entry.side === "left";
  const isConnect = entry.id === "connect";

  const textBlock = (
    <div
      className={`flex flex-col justify-center ${isConnect ? "items-center text-center" : ""}`}
    >
      <h3
        className="text-3xl tracking-tight text-foreground md:text-[2.25rem]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
      >
        {entry.title}
      </h3>
      <p className="mt-5 max-w-prose text-[15px] font-medium leading-[1.75] text-foreground/65 md:text-base">
        {entry.body}
      </p>
      {isConnect ? <ConnectLinks /> : null}
    </div>
  );

  const imageBlock =
    entry.images.length > 0 ? (
      <ImageSlideshow images={entry.images} />
    ) : null;

  if (isConnect) {
    return (
      <motion.div
        ref={ref}
        id={entry.id}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mx-auto min-h-[55vh] max-w-3xl scroll-mt-24 px-6 py-20 md:py-28"
      >
        {textBlock}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      id={entry.id}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="mx-auto grid min-h-[55vh] max-w-5xl scroll-mt-24 items-center gap-8 px-6 py-20 md:grid-cols-2 md:gap-16 md:py-28"
    >
      {imageOnLeft ? (
        <>
          <div className="order-2 md:order-1">{imageBlock}</div>
          <div className="order-1 md:order-2">{textBlock}</div>
        </>
      ) : (
        <>
          <div>{textBlock}</div>
          <div>{imageBlock}</div>
        </>
      )}
    </motion.div>
  );
}
