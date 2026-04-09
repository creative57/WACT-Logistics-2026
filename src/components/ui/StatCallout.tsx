interface StatCalloutProps {
  value: string;
  unit?: string;
  label: string;
  className?: string;
}

export default function StatCallout({ value, unit, label, className = "" }: StatCalloutProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex items-end justify-center gap-1 mb-1">
        <span
          className="text-4xl font-bold leading-none"
          style={{ fontFamily: "var(--font-display)", color: "#fff" }}
        >
          {value}
        </span>
        {unit && (
          <span
            className="text-lg font-semibold leading-tight mb-1"
            style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
          >
            {unit}
          </span>
        )}
      </div>
      <p
        className="text-sm uppercase tracking-wider"
        style={{ fontFamily: "var(--font-accent)", color: "rgba(255,255,255,0.75)" }}
      >
        {label}
      </p>
    </div>
  );
}
