"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactInfo } from "@/content/site";

export default function PersistentContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-3 origin-bottom-right rounded-lg border border-border/70 bg-background/95 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md"
          >
            <div className="flex flex-col gap-2 text-sm font-medium">
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-foreground/75 transition-colors hover:text-foreground"
              >
                {contactInfo.email}
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/75 transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/75 transition-colors hover:text-foreground"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="rounded-full border border-border/70 bg-background/90 px-5 py-2.5 text-[13px] font-medium tracking-[0.02em] text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] hover:bg-foreground hover:text-background hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
      >
        Contact
      </button>
    </div>
  );
}
