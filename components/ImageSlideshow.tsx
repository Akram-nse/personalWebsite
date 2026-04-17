"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { TimelineImage } from "@/content/site";

interface ImageSlideshowProps {
  images: TimelineImage[];
}

export default function ImageSlideshow({ images }: ImageSlideshowProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [images.length, next]);

  if (images.length === 0) return null;

  const img = images[current];

  return (
    <div className="relative">
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-[#e8e2da]">
        <AnimatePresence mode="wait">
          <motion.div
            key={img.src + current}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute inset-0"
          >
            <Image
              src={img.src}
              alt={img.caption}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 px-2 py-1 text-xs text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground"
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 px-2 py-1 text-xs text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground"
              aria-label="Next image"
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      <p className="mt-3 text-[11px] font-medium italic tracking-wide text-foreground/50">
        {img.caption}
      </p>

      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] ${
                i === current
                  ? "w-6 bg-foreground/50"
                  : "w-2 bg-foreground/15"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
