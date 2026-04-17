"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineSections } from "@/content/site";
import { setActiveTimelineSection } from "@/lib/timelineActive";

const SPREAD = 14;

export default function TimelineRail() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const railLockRef = useRef<string | null>(null);
  const pickActiveSectionRef = useRef<() => void>(() => {});

  const activeIndex = activeId
    ? timelineSections.findIndex((s) => s.id === activeId)
    : -1;

  useEffect(() => {
    const timelineEl = document.getElementById("timeline");
    if (!timelineEl) return;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" }
    );
    visibilityObserver.observe(timelineEl);

    const thresholds = [
      0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
      0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
    ];

    const pickActiveSection = () => {
      if (railLockRef.current) return;

      const vh = window.innerHeight;
      const bandTop = vh * 0.35;
      const bandBottom = vh * 0.65;
      let bestId: string | null = null;
      let bestOverlap = 0;

      for (const section of timelineSections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const overlap = Math.max(
          0,
          Math.min(r.bottom, bandBottom) - Math.max(r.top, bandTop)
        );
        if (overlap > bestOverlap) {
          bestOverlap = overlap;
          bestId = section.id;
        } else if (overlap === bestOverlap && overlap > 0 && bestId) {
          const prev = document.getElementById(bestId);
          if (prev && r.top < prev.getBoundingClientRect().top) bestId = section.id;
        }
      }

      // Only update when a section actually overlaps the band. Above the
      // first timeline section (e.g. on the hero), nothing overlaps and we
      // want `activeId` to stay null so the mobile chapter picker shows
      // "Contents" instead of defaulting to "2005".
      setActiveId(bestId);
    };

    pickActiveSectionRef.current = pickActiveSection;

    const sectionObserver = new IntersectionObserver(() => pickActiveSection(), {
      rootMargin: "-35% 0px -35% 0px",
      threshold: thresholds,
    });

    timelineSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) sectionObserver.observe(el);
    });

    pickActiveSection();

    return () => {
      visibilityObserver.disconnect();
      sectionObserver.disconnect();
      pickActiveSectionRef.current = () => {};
    };
  }, []);

  useEffect(() => {
    setActiveTimelineSection(activeId);
    return () => {
      setActiveTimelineSection(null);
    };
  }, [activeId]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.3 }}
          className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        >
          <div className="flex flex-col">
            {timelineSections.map((section, i) => {
              const isActive = section.id === activeId;

              let yOffset = 0;
              if (activeIndex >= 0) {
                if (i < activeIndex) yOffset = -SPREAD;
                else if (i > activeIndex) yOffset = SPREAD;
              }

              return (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(section.id);
                    if (!el) return;

                    railLockRef.current = section.id;
                    setActiveId(section.id);
                    window.history.replaceState(null, "", `#${section.id}`);

                    el.scrollIntoView({ behavior: "auto", block: "start" });

                    requestAnimationFrame(() => {
                      railLockRef.current = null;
                      pickActiveSectionRef.current();
                    });
                  }}
                  animate={{ y: yOffset }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="group flex items-center gap-3 py-2"
                >
                  <motion.span
                    animate={{
                      width: isActive ? 24 : 10,
                      backgroundColor: isActive
                        ? "var(--foreground)"
                        : "rgba(26, 26, 26, 0.18)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="block h-[1.5px] rounded-full"
                  />
                  <span
                    className={`whitespace-nowrap text-[14px] italic tracking-[0.01em] transition-all duration-200 ${
                      isActive
                        ? "text-foreground"
                        : "text-foreground/45"
                    }`}
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontWeight: 500,
                    }}
                  >
                    {section.title}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
