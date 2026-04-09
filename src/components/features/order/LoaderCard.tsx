import { Truck } from "lucide-react";
import Button from "@/components/ui/Button";

interface LoaderCardProps {
  className?: string;
}

export default function LoaderCard({ className = "" }: LoaderCardProps) {
  return (
    <div
      className={`rounded-sm p-6 flex flex-col gap-4 ${className}`}
      style={{ background: "var(--color-blue)", color: "#fff" }}
    >
      <div className="flex items-center gap-3">
        <Truck size={32} style={{ color: "var(--color-red)" }} />
        <h3
          className="text-xl font-bold"
          style={{
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Loader On Site
        </h3>
      </div>

      <p
        className="text-lg font-semibold"
        style={{ fontFamily: "var(--font-accent)", color: "rgba(255,255,255,0.9)" }}
      >
        Bring your truck. We&apos;ll fill it.
      </p>

      <p
        className="text-sm"
        style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.75)" }}
      >
        Available for commercial vehicles. Schedule a time and show up ready to haul.
      </p>

      <Button href="/appointments" variant="primary" size="md" className="self-start">
        Book a Load
      </Button>
    </div>
  );
}
