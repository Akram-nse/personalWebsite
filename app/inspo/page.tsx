import type { Metadata } from "next";
import InspoPageClient from "./InspoPageClient";

export const metadata: Metadata = {
  title: "Inspo — Akram Nsengiyumva",
  description: "The people, podcasts, and books that shaped how I think.",
};

export default function InspoPage() {
  return <InspoPageClient />;
}
