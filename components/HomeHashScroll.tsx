"use client";

import { useEffect } from "react";

/** Scrolls to `#connect` when the home page loads with that hash (e.g. after Contact from another route). */
export default function HomeHashScroll() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id !== "connect") return;
    const el = document.getElementById(id);
    if (!el) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raf = requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
