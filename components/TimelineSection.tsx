"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ImageSlideshow from "./ImageSlideshow";
import ConnectLinks from "./ConnectLinks";
import RichText from "./RichText";
import type { TimelineEntry } from "@/content/site";

interface TimelineSectionProps {
  entry: TimelineEntry;
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
        className="text-[1.875rem] tracking-tight text-foreground md:text-4xl lg:text-[2.625rem]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 500 }}
      >
        {entry.title}
      </h3>
      <p className="mt-6 max-w-[52ch] text-base font-medium leading-[1.8] text-foreground/65 md:text-lg">
        <RichText text={entry.body} links={entry.bodyLinks} />
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
        className="mx-auto flex min-h-screen max-w-4xl scroll-mt-24 flex-col justify-center px-6 py-20 md:min-h-[55vh] md:py-28"
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
      className="mx-auto grid min-h-[55vh] max-w-6xl scroll-mt-24 items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-20 md:py-28 lg:max-w-7xl lg:gap-24"
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
