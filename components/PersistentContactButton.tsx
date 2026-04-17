"use client";

import { usePathname, useRouter } from "next/navigation";

const CONNECT_ID = "connect";

export default function PersistentContactButton() {
  const pathname = usePathname();
  const router = useRouter();

  const goToConnect = () => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (pathname === "/") {
      document.getElementById(CONNECT_ID)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", `#${CONNECT_ID}`);
      return;
    }

    router.push(`/#${CONNECT_ID}`, { scroll: false });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={goToConnect}
        className="rounded-full border border-border/70 bg-background/90 px-5 py-2.5 text-[13px] font-medium tracking-[0.02em] text-foreground shadow-[0_2px_10px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] hover:bg-foreground hover:text-background hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
      >
        Contact
      </button>
    </div>
  );
}
