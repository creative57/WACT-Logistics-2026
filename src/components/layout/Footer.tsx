import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { BUSINESS, PAYMENT } from "@/lib/constants";

const footerLinks = {
  Products: [
    { label: "Mason Sand", href: "/products/mason-sand" },
    { label: "Topsoil", href: "/products/topsoil" },
    { label: "Decomposed Granite", href: "/products/decomposed-granite" },
    { label: "Crushed Limestone", href: "/products/crushed-limestone" },
    { label: "Fill Dirt", href: "/products/fill-dirt" },
    { label: "Gravel", href: "/products/gravel" },
    { label: "Super Sacks", href: "/products/super-sacks" },
  ],
  Tools: [
    { label: "Material Calculator", href: "/calculator" },
    { label: "Quick Order Form", href: "/contractors" },
    { label: "Book a Load", href: "/appointments" },
    { label: "Get a Quote", href: "/contact" },
  ],
  Company: [
    { label: "Skid Steer Services", href: "/services" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Appointments", href: "/appointments" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-blue)",
        borderTop: "4px solid var(--color-red)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Products */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3
                className="text-sm font-bold uppercase tracking-widest mb-4"
                style={{
                  fontFamily: "var(--font-accent)",
                  color: "var(--color-red)",
                  letterSpacing: "0.12em",
                }}
              >
                {title}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:underline"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "rgba(255,255,255,0.75)",
                        textDecorationColor: "var(--color-red)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{
                fontFamily: "var(--font-accent)",
                color: "var(--color-red)",
                letterSpacing: "0.12em",
              }}
            >
              Contact
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 text-sm hover:underline"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(255,255,255,0.75)",
                  textDecorationColor: "var(--color-red)",
                }}
              >
                <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-red)" }} />
                <span>{BUSINESS.address}</span>
              </a>

              <a
                href={BUSINESS.phoneHref}
                className="flex gap-2 items-center text-sm font-bold hover:underline"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#fff",
                  textDecorationColor: "var(--color-red)",
                  letterSpacing: "0.04em",
                }}
              >
                <Phone size={14} style={{ color: "var(--color-red)" }} />
                {BUSINESS.phone}
              </a>

              <div
                className="flex gap-2 text-sm"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}
              >
                <Clock size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-red)" }} />
                <div>
                  <p>{BUSINESS.hours.weekday}</p>
                  <p>{BUSINESS.hours.saturday}</p>
                </div>
              </div>

              <div
                className="mt-2 text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}
              >
                <p>💳 {PAYMENT.cardDisclosure}</p>
                <p>💵 {PAYMENT.cashDisclosure}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-body)",
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p>
            Trenton, TX{" "}
            <span role="img" aria-label="American Flag">
              🇺🇸
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
