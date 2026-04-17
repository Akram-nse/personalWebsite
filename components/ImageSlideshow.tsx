"use client";

import { useState, useEffect, useCallback, useRef, useId } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TimelineImage } from "@/content/site";
import RichText from "./RichText";
import {
  registerSlideshow,
  subscribeActiveSlideshow,
  updateRatio,
} from "@/lib/activeSlideshow";

interface ImageSlideshowProps {
  images: TimelineImage[];
}

const DEFAULT_SLIDE_MS = 5000;
const ACTIVE_DOT_WIDTH = 40;
const CROSSFADE_S = 0.35;

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)$/i;
const isVideoSrc = (src: string) => VIDEO_EXT.test(src);

/**
 * Video slides need their own component so the ref is stable across renders
 * (an inline ref callback on the parent would churn a ref Map every render and
 * race with the play/pause effect). Playback is driven imperatively from
 * `isCurrent && isActive`; when we leave the slide we rewind so it restarts
 * clean on next visit.
 */
function VideoSlide({
  src,
  alt,
  isCurrent,
  isActive,
  objectClass,
}: {
  src: string;
  alt: string;
  isCurrent: boolean;
  isActive: boolean;
  objectClass: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (isCurrent && isActive) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      v.pause();
      if (!isCurrent) {
        try {
          v.currentTime = 0;
        } catch {}
      }
    }
  }, [isCurrent, isActive]);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={alt}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      className={`h-full w-full ${objectClass}`}
    />
  );
}

export default function ImageSlideshow({ images }: ImageSlideshowProps) {
  const instanceId = useId();
  const [current, setCurrent] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (i: number) =>
      setCurrent(((i % images.length) + images.length) % images.length),
    [images.length]
  );

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const unregister = registerSlideshow(instanceId);
    const unsubscribe = subscribeActiveSlideshow((id) =>
      setIsActive(id === instanceId)
    );
    return () => {
      unregister();
      unsubscribe();
      updateRatio(instanceId, 0);
    };
  }, [images.length, instanceId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || images.length <= 1) return;
    const thresholds = [0, 0.1, 0.25, 0.4, 0.5, 0.6, 0.75, 1];
    const observer = new IntersectionObserver(
      ([entry]) => updateRatio(instanceId, entry.intersectionRatio),
      { threshold: thresholds }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      updateRatio(instanceId, 0);
    };
  }, [images.length, instanceId]);

  const currentDurationMs =
    images[current]?.durationMs ?? DEFAULT_SLIDE_MS;

  useEffect(() => {
    if (images.length <= 1 || !isActive) return;
    const timeout = setTimeout(next, currentDurationMs);
    return () => clearTimeout(timeout);
  }, [images.length, next, current, isActive, currentDurationMs]);

  if (images.length === 0) return null;

  const currentImg = images[current];
  const caption = currentImg.caption.trim();
  const frameBg = currentImg.frameClassName ?? "bg-[#e8e2da]";
  const showFill = isActive && images.length > 1;

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden rounded-sm transition-colors duration-500 md:aspect-[5/3] ${frameBg}`}
      >
        {images.map((image, i) => {
          const slideCaption = image.caption.trim();
          const alt =
            image.alt ??
            (slideCaption.length > 0 ? image.caption : "Timeline photo");
          const isCurrent = i === current;
          const isVideo = isVideoSrc(image.src);
          const objectClass = image.objectClassName ?? "object-cover";
          return (
            <motion.div
              key={image.src}
              initial={false}
              animate={{ opacity: isCurrent ? 1 : 0 }}
              transition={{ duration: CROSSFADE_S, ease: "easeOut" }}
              className="absolute inset-0"
              style={{
                pointerEvents: isCurrent ? "auto" : "none",
                zIndex: isCurrent ? 1 : 0,
              }}
            >
              {isVideo ? (
                <VideoSlide
                  src={image.src}
                  alt={alt}
                  isCurrent={isCurrent}
                  isActive={isActive}
                  objectClass={objectClass}
                />
              ) : (
                <Image
                  src={image.src}
                  alt={alt}
                  fill
                  className={objectClass}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 52vw, 640px"
                />
              )}
            </motion.div>
          );
        })}

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/60 px-2 py-1 text-xs text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground"
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/60 px-2 py-1 text-xs text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground"
              aria-label="Next image"
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      {caption.length > 0 ? (
        <p className="mt-4 text-sm font-medium italic tracking-wide text-foreground/50 md:text-base">
          <RichText
            text={currentImg.caption}
            links={currentImg.captionLinks}
            linkClassName="not-italic text-foreground/75 underline decoration-foreground/25 underline-offset-[4px] transition-colors hover:text-foreground hover:decoration-foreground/60"
          />
        </p>
      ) : null}

      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {images.map((_, i) => {
            const isCurrent = i === current;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`relative h-[2px] overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] ${
                  isCurrent ? "bg-foreground/15" : "w-2 bg-foreground/15"
                }`}
                style={isCurrent ? { width: ACTIVE_DOT_WIDTH } : undefined}
              >
                {isCurrent && showFill && (
                  <motion.span
                    key={`fill-${current}`}
                    initial={{ width: 0 }}
                    animate={{ width: ACTIVE_DOT_WIDTH }}
                    transition={{
                      duration: currentDurationMs / 1000,
                      ease: "linear",
                    }}
                    className="absolute inset-y-0 left-0 block rounded-full bg-foreground/55"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
