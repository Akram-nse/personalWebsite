"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function SiteHeader() {
  const pathname = usePathname();
  const showHomeIcon = pathname !== "/";

  return <Header showHomeIcon={showHomeIcon} />;
}
