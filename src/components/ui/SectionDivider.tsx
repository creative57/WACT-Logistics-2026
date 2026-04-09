interface SectionDividerProps {
  className?: string;
  flip?: boolean;
}

export default function SectionDivider({ className = "", flip = false }: SectionDividerProps) {
  return (
    <div
      className={`section-divider ${className}`}
      style={{
        clipPath: flip
          ? "polygon(0 60%, 100% 0, 100% 100%, 0 100%)"
          : "polygon(0 0, 100% 0, 100% 40%, 0 100%)",
      }}
      aria-hidden="true"
    />
  );
}
