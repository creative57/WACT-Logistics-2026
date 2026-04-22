"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import AudienceStrip from "./AudienceStrip";

const navLinks = [
  {
    label: "Products",
    href: "/products",
    dropdown: [
      {
        group: "Aggregates & Sand",
        items: [
          { label: "Mason Sand", href: "/products/mason-sand" },
          { label: "Crushed Limestone", href: "/products/crushed-limestone" },
          { label: "Screenings", href: "/products/screenings" },
          { label: "Fill Dirt", href: "/products/fill-dirt" },
          { label: "Gravel", href: "/products/gravel" },
        ],
      },
      {
        group: "Specialty",
        items: [
          { label: "Decomposed Granite", href: "/products/decomposed-granite" },
          { label: "Topsoil", href: "/products/topsoil" },
          { label: "Austin Chop White", href: "/products/austin-chop-white" },
          { label: "Pearl White Pebbles", href: "/products/pearl-white-pebbles" },
          { label: "Boulders", href: "/products/boulders" },
        ],
      },
      {
        group: "Packaged",
        items: [{ label: "Super Sacks", href: "/products/super-sacks" }],
      },
      {
        group: "Services",
        items: [
          { label: "Skid Steer", href: "/services" },
          { label: "Delivery", href: "/services#delivery" },
          { label: "Loading for Commercial Vehicles", href: "/appointments" },
        ],
      },
    ],
  },
  { label: "Order / Book", href: "/contractors" },
  { label: "Calculator", href: "/calculator" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: "1px solid var(--color-gray-light)" }}
    >
      {/* Main nav bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-24">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 flex-shrink-0">
          <span
            className="font-bold tracking-widest"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-red)", fontSize: "27px" }}
          >
            WACT
          </span>
          <span
            className="text-xs font-semibold tracking-wide hidden sm:block ml-1"
            style={{ fontFamily: "var(--font-accent)", color: "var(--color-blue)" }}
          >
            LOGISTICS LLC
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide hover:text-red-700 transition-colors"
                  style={{
                    fontFamily: "var(--font-accent)",
                    color: "var(--color-blue)",
                    letterSpacing: "0.06em",
                  }}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 min-w-[600px]">
                  <div
                    className="bg-white shadow-xl rounded-sm border p-4 grid grid-cols-4 gap-4"
                    style={{ borderColor: "var(--color-gray-light)" }}
                  >
                    {link.dropdown.map((group) => (
                      <div key={group.group}>
                        <p
                          className="text-xs font-bold uppercase tracking-widest mb-2 pb-1"
                          style={{
                            fontFamily: "var(--font-accent)",
                            color: "var(--color-gray-mid)",
                            borderBottom: "1px solid var(--color-gray-light)",
                          }}
                        >
                          {group.group}
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="text-sm hover:text-red-600 transition-colors block"
                                style={{
                                  fontFamily: "var(--font-body)",
                                  color: "var(--color-gray-dark)",
                                }}
                                onClick={() => setDropdownOpen(false)}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-wide transition-colors"
                style={{
                  fontFamily: "var(--font-accent)",
                  color: "var(--color-blue)",
                  letterSpacing: "0.06em",
                }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center gap-1.5 font-semibold"
            style={{ fontFamily: "var(--font-accent)", color: "var(--color-blue)", fontSize: "1.17rem" }}
          >
            <Phone size={18} />
            {BUSINESS.phone}
          </a>
          <Link
            href="/contractors"
            className="btn btn-primary text-sm px-5 py-2.5"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center"
            style={{ color: "var(--color-blue)" }}
            aria-label={`Call ${BUSINESS.phone}`}
          >
            <Phone size={26} />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{ color: "var(--color-blue)" }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 top-24 z-40 overflow-y-auto"
          style={{ background: "var(--color-blue)" }}
        >
          <div className="p-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href ?? "#"}
                  className="block py-3 text-xl font-bold uppercase tracking-wide text-white border-b"
                  style={{
                    fontFamily: "var(--font-display)",
                    borderColor: "rgba(255,255,255,0.15)",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="pl-4 pt-2 pb-3 flex flex-col gap-2">
                    {link.dropdown.flatMap((group) =>
                      group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-base py-1"
                          style={{
                            fontFamily: "var(--font-body)",
                            color: "rgba(255,255,255,0.75)",
                          }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-4 flex flex-col gap-3">
              <a
                href={BUSINESS.phoneHref}
                className="btn btn-secondary text-center text-white"
                style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
              >
                <Phone size={21} className="inline mr-2" />
                {BUSINESS.phone}
              </a>
              <Link
                href="/contractors"
                className="btn btn-primary text-center"
                onClick={() => setMobileOpen(false)}
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Audience Strip */}
      <AudienceStrip />
    </header>
  );
}
