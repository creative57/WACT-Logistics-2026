"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AudienceStrip() {
  const pathname = usePathname();
  const isContractors = pathname.startsWith("/contractors");
  const isResidential = pathname.startsWith("/residential");

  return (
    <div className="flex" role="navigation" aria-label="Audience navigation">
      <Link
        href="/contractors"
        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 text-center transition-colors hover:opacity-90"
        style={{
          background: isContractors ? "var(--color-blue)" : "#4a5260",
        }}
      >
        <span className="text-blue-200 text-sm" aria-hidden="true">&#9679;</span>
        <span
          className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white"
          style={{ fontFamily: "var(--font-accent)" }}
        >
          Contractors &amp; Subs
        </span>
        <span
          className="hidden sm:inline text-xs"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}
        >
          — Bulk Orders &amp; On-Site Loading
        </span>
      </Link>
      <Link
        href="/residential"
        className="flex-1 flex items-center justify-center gap-2 py-2 px-4 text-center transition-colors hover:opacity-90"
        style={{
          background: isResidential ? "var(--color-red)" : "#5e5558",
        }}
      >
        <span className="text-red-200 text-sm" aria-hidden="true">&#9679;</span>
        <span
          className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white"
          style={{ fontFamily: "var(--font-accent)" }}
        >
          Homeowners &amp; DIY
        </span>
        <span
          className="hidden sm:inline text-xs"
          style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}
        >
          — Project Calculator &amp; Easy Ordering
        </span>
      </Link>
    </div>
  );
}
