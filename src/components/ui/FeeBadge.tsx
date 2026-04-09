interface FeeBadgeProps {
  className?: string;
  size?: "sm" | "md";
}

export default function FeeBadge({ className = "", size = "md" }: FeeBadgeProps) {
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  return (
    <div
      className={`fee-badge ${textSize} ${className}`}
      style={{ fontFamily: "var(--font-accent)" }}
    >
      <span>
        <span aria-hidden="true">💳</span>{" "}
        <span style={{ color: "var(--color-gray-dark)" }}>Card: </span>
        <span style={{ color: "var(--color-red)" }}>+3.5%</span>
      </span>
      <span style={{ color: "var(--color-gray-light)" }}>|</span>
      <span>
        <span aria-hidden="true">💵</span>{" "}
        <span style={{ color: "var(--color-gray-dark)" }}>Cash: </span>
        <span style={{ color: "#2a8a4a" }}>No Fee</span>
      </span>
    </div>
  );
}
