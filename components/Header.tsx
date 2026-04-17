"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/content/site";

interface HeaderProps {
  collapseOnScroll?: boolean;
  showHomeIcon?: boolean;
}

const linkClass =
  "text-[14px] italic tracking-[0.01em] text-foreground/70 transition-[color,letter-spacing] duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] hover:text-foreground";
const linkStyle = {
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontWeight: 500,
};

const dropdownLinkClass =
  "whitespace-nowrap text-[14px] italic tracking-[0.01em] text-foreground/70 transition-colors hover:text-foreground";

export default function Header({
  collapseOnScroll = true,
  showHomeIcon = false,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!collapseOnScroll) return;

    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [collapseOnScroll]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const collapsed = collapseOnScroll && scrolled;

  const expandedNav = (
    <div className="flex items-center gap-20 md:gap-24">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={linkClass}
          style={linkStyle}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  const homeIcon = (
    <Link
      href="/"
      className="flex items-center text-foreground/50 transition-colors hover:text-foreground"
      aria-label="Home"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    </Link>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] ${
        collapsed
          ? "bg-background/70 shadow-[0_1px_0_0_rgba(26,26,26,0.06)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center px-6">
        <div className="flex w-10 items-center">
          {showHomeIcon ? homeIcon : null}
        </div>

        <div className="flex flex-1 items-center justify-center">
          {!mounted ? (
            expandedNav
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              {!collapsed && (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  {expandedNav}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        <div className="relative flex w-10 items-center justify-end" ref={menuRef}>
          <AnimatePresence initial={false}>
            {mounted && collapsed && (
              <motion.button
                key="hamburger"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                onClick={() => setMenuOpen((v) => !v)}
                className="flex flex-col gap-[5px] p-2"
                aria-label="Open menu"
                aria-expanded={menuOpen}
              >
                <span className="block h-[1.5px] w-5 bg-foreground" />
                <span className="block h-[1.5px] w-5 bg-foreground" />
                <span className="block h-[1.5px] w-5 bg-foreground" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="absolute right-0 top-full mt-3 min-w-[140px] origin-top-right rounded-lg border border-border/70 bg-background/95 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md"
              >
                <div className="flex flex-col gap-3">
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className={dropdownLinkClass}
                    style={linkStyle}
                  >
                    Home
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={dropdownLinkClass}
                      style={linkStyle}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
