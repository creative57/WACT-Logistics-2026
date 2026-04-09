import { BUSINESS } from "@/lib/constants";

interface CallForPricingProps {
  compact?: boolean;
  className?: string;
}

export default function CallForPricing({ compact = false, className = "" }: CallForPricingProps) {
  if (compact) {
    return (
      <div className={`${className}`} style={{ fontFamily: "var(--font-accent)" }}>
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--color-gray-mid)" }}
        >
          Call for Pricing
        </span>
        <a
          href={BUSINESS.phoneHref}
          className="block text-base font-bold"
          style={{
            color: "var(--color-red)",
            fontFamily: "var(--font-display)",
            letterSpacing: "0.04em",
          }}
        >
          {BUSINESS.phone}
        </a>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <p
        className="text-xs font-semibold tracking-widest uppercase mb-1"
        style={{
          color: "var(--color-gray-mid)",
          fontFamily: "var(--font-accent)",
        }}
      >
        Call for Pricing
      </p>
      <a
        href={BUSINESS.phoneHref}
        className="text-2xl font-bold block hover:underline"
        style={{
          color: "var(--color-red)",
          fontFamily: "var(--font-display)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {BUSINESS.phone}
      </a>
    </div>
  );
}
