"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { timelineSections } from "@/content/site";
import { subscribeActiveTimelineSection } from "@/lib/timelineActive";

const SERIF_STYLE = {
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontWeight: 500 as const,
};

const ACCENT = "#2F5DA0";

/**
 * Snapshots the document-space top of every timeline section *before* the
 * zoom-out transform is applied. Using these cached values sidesteps the
 * transform entirely when we compute scroll targets later, so tapping a
 * chapter reliably lands on the correct section.
 */
function snapshotSectionTops(): Record<string, number> {
  const tops: Record<string, number> = {};
  for (const section of timelineSections) {
    const el = document.getElementById(section.id);
    if (!el) continue;
    tops[section.id] = el.getBoundingClientRect().top + window.scrollY;
  }
  return tops;
}

/**
 * Sets `transform-origin` on `#page-content` to the current viewport
 * center (in element-space). Combined with the CSS `scale()` applied via
 * `body.chapter-menu-open`, this keeps the zoom anchored to whatever the
 * reader is currently looking at — no sudden jump to the top of the page
 * when the picker opens.
 */
function setOriginToViewportCenter() {
  const pageEl = document.getElementById("page-content");
  if (!pageEl) return;
  const originY = window.scrollY + window.innerHeight / 2;
  pageEl.style.transformOrigin = `50% ${originY}px`;
}

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Smoothly animates `window.scroll` toward `targetScroll` while keeping
 * `transform-origin` synchronized with the current view center on every
 * frame. We MUST pass `behavior: 'instant'` on each per-frame scrollTo —
 * the site-wide `html { scroll-behavior: smooth }` in `globals.css` would
 * otherwise treat each call as its own smooth scroll, causing the browser
 * to fight our RAF loop (visible as the page jumping past the target and
 * scrolling back).
 */
function animateScrollWithOrigin(
  targetScroll: number,
  duration = 520,
  onDone?: () => void
) {
  const pageEl = document.getElementById("page-content");
  const start = window.scrollY;
  if (Math.abs(targetScroll - start) < 0.5) {
    setOriginToViewportCenter();
    onDone?.();
    return;
  }
  const startTime = performance.now();

  const step = (now: number) => {
    const t = Math.min(1, (now - startTime) / duration);
    const eased = easeInOutCubic(t);
    const s = start + (targetScroll - start) * eased;
    window.scrollTo({ top: s, left: 0, behavior: "instant" as ScrollBehavior });
    if (pageEl) {
      pageEl.style.transformOrigin = `50% ${s + window.innerHeight / 2}px`;
    }
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      onDone?.();
    }
  };
  requestAnimationFrame(step);
}

/**
 * Mobile-only chapter picker — inspired by book.stevejobsarchive.com.
 *
 * Tapping the header trigger zooms `#page-content` out around the current
 * viewport center (no rise-to-top). Tapping a chapter glides the miniature
 * to that section and stays there — the menu only closes when the reader
 * taps the shrunken page, taps the trigger again, or presses Escape.
 */
export default function MobileChapterPicker() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const sectionTopsRef = useRef<Record<string, number>>({});

  useEffect(() => setMounted(true), []);
  useEffect(() => subscribeActiveTimelineSection(setActiveId), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("chapter-menu-open");
      return;
    }
    document.body.classList.add("chapter-menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("chapter-menu-open");
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>('[data-active="true"]');
    if (!el) return;
    const offset = el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2;
    list.scrollTo({ top: Math.max(0, offset), behavior: "auto" });
  }, [open]);

  const openMenu = () => {
    sectionTopsRef.current = snapshotSectionTops();
    setOriginToViewportCenter();
    setOpen(true);
  };

  const closeMenu = () => {
    // Reset origin to current view center so the zoom-back-in animates
    // from the current scroll position instead of a stale anchor.
    setOriginToViewportCenter();
    setOpen(false);
  };

  const scrollToTarget = (target: number, hash?: string) => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hash !== undefined) {
      window.history.replaceState(null, "", hash);
    }

    if (reduced) {
      window.scrollTo({
        top: target,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
      setOriginToViewportCenter();
      setOpen(false);
      return;
    }

    // Glide the miniature to the tapped section, then auto-close (zoom back in)
    // once the scroll settles so the reader lands on the new section zoomed in.
    animateScrollWithOrigin(target, 520, () => {
      setOpen(false);
    });
  };

  const jumpToHome = () => {
    if (pathname !== "/") {
      router.push("/");
      setOpen(false);
      return;
    }
    scrollToTarget(0, "/");
  };

  const jumpTo = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`, { scroll: false });
      setOpen(false);
      return;
    }
    const targetTop = sectionTopsRef.current[id];
    if (targetTop == null) return;
    scrollToTarget(targetTop, `#${id}`);
  };

  const activeSection = timelineSections.find((s) => s.id === activeId);
  const isHome = pathname === "/";

  const shouldShowTrigger = isHome ? Boolean(activeSection) : true;
  const buttonLabel = isHome ? activeSection?.title ?? "" : "Home";

  const listIcon = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="14" y2="12" />
      <line x1="4" y1="17" x2="18" y2="17" />
    </svg>
  );

  const triggerButton = (
    <div className="flex min-w-0 flex-1 items-center justify-center">
      <AnimatePresence>
        {shouldShowTrigger && (
          <motion.button
            key="chapter-trigger"
            type="button"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={() => {
              if (!isHome) {
                router.push("/");
                return;
              }
              if (open) {
                closeMenu();
              } else {
                openMenu();
              }
            }}
            aria-haspopup={isHome ? "dialog" : undefined}
            aria-expanded={isHome ? open : undefined}
            className="flex min-w-0 max-w-full items-center gap-1.5 px-2 py-1.5"
            style={{ color: ACCENT }}
          >
            {listIcon}
            <span
              className="truncate text-[15px] italic tracking-[-0.005em]"
              style={SERIF_STYLE}
            >
              {buttonLabel}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );

  const overlay = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="chapter-backdrop"
            role="presentation"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] cursor-pointer"
            style={{ background: "transparent", touchAction: "none" }}
          />

          <motion.aside
            key="chapter-panel"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 32 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed right-0 top-0 bottom-0 z-[60] flex w-[52%] min-w-[220px] max-w-[320px] flex-col pt-14 pb-10 pr-5 pl-3"
            role="dialog"
            aria-modal="true"
            aria-label="Chapters"
          >
            <ul
              ref={listRef}
              className="flex-1 overflow-y-auto"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {(() => {
                const homeActive = isHome && activeId === null;
                return (
                  <li key="home">
                    <button
                      type="button"
                      data-active={homeActive ? "true" : undefined}
                      onClick={jumpToHome}
                      className={`block w-full py-3 text-right italic tracking-[-0.005em] leading-tight transition-colors ${
                        homeActive
                          ? "text-[22px]"
                          : "text-foreground/35 text-[19px] hover:text-foreground/70"
                      }`}
                      style={{
                        ...SERIF_STYLE,
                        color: homeActive ? ACCENT : undefined,
                      }}
                    >
                      Home
                    </button>
                  </li>
                );
              })()}
              {timelineSections.map((section) => {
                const isActive = section.id === activeId;
                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      data-active={isActive ? "true" : undefined}
                      onClick={() => jumpTo(section.id)}
                      className={`block w-full py-3 text-right italic tracking-[-0.005em] leading-tight transition-colors ${
                        isActive
                          ? "text-[22px]"
                          : "text-foreground/35 text-[19px] hover:text-foreground/70"
                      }`}
                      style={{
                        ...SERIF_STYLE,
                        color: isActive ? ACCENT : undefined,
                      }}
                    >
                      {section.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {triggerButton}
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
