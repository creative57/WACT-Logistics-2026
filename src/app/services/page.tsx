import type { Metadata } from "next";
import Link from "next/link";
import { Truck, CheckCircle, Phone } from "lucide-react";
import LoaderCard from "@/components/features/order/LoaderCard";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services — Delivery & On-Site Loading | Sherman TX",
  description:
    "Dump truck delivery throughout Grayson County and on-site loading for commercial vehicles. Get a delivery quote or book a loader at WACT Logistics LLC.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-blue)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h1
            className="text-white font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "0.04em",
            }}
          >
            Our Services
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)", fontSize: "1.1rem" }}>
            Delivery to your job site or pickup with your own truck. We make it easy.
          </p>
        </div>
      </section>

      {/* Delivery Service */}
      <section id="delivery" className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Truck size={36} style={{ color: "var(--color-blue)" }} />
              <h2
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-blue)",
                  letterSpacing: "0.04em",
                }}
              >
                Delivery Service
              </h2>
            </div>
            <p
              className="text-base mb-6 leading-relaxed"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
            >
              We deliver sand, gravel, fill dirt, and aggregate directly to your job site or home. Dump truck delivery throughout Grayson County and North Texas. Pricing varies by location and load size — call or submit a quote request.
            </p>

            <div className="mb-8">
              <p
                className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
              >
                How It Works
              </p>
              <ol className="flex flex-col gap-4">
                {[
                  "Place your order using the Quick Order form or call 972-984-8858.",
                  "We confirm your route, material, and delivery price.",
                  "Delivery is scheduled — usually same or next day.",
                ].map((step, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                      style={{ background: "var(--color-red)", fontFamily: "var(--font-display)" }}
                    >
                      {idx + 1}
                    </span>
                    <p style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <Link href="/contact" className="btn btn-primary">
              Request a Delivery Quote
            </Link>
          </div>

          {/* Quote form summary */}
          <div
            className="rounded-sm p-6"
            style={{
              background: "var(--color-off-white)",
              border: "1px solid var(--color-gray-light)",
            }}
          >
            <p
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
            >
              Delivery Details
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Grayson County and surrounding North Texas areas",
                "Any material from our full product catalog",
                "Standard dump truck loads (~13 tons)",
                "Super Sacks available for smaller quantities",
                "Same-day and next-day scheduling often available",
                "Cash (no fee) or card (+3.5%) accepted",
              ].map((item) => (
                <li key={item} className="flex gap-2 items-start">
                  <CheckCircle
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "var(--color-red)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--color-gray-light)" }}>
              <p
                className="text-sm mb-2"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
              >
                Questions about delivery to your area?
              </p>
              <a
                href={BUSINESS.phoneHref}
                className="btn btn-secondary flex items-center gap-2 justify-center"
              >
                <Phone size={14} />
                {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Loader Section */}
      <section
        id="loading"
        className="py-16 px-4 sm:px-6"
        style={{ background: "var(--color-off-white)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-blue)",
                letterSpacing: "0.04em",
              }}
            >
              Loading for Commercial Vehicles
            </h2>
            <p
              className="max-w-xl"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
            >
              Bring your own truck and we&apos;ll load it on site. Our loader is available for commercial vehicles during business hours. Book a time to make sure we&apos;re ready for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LoaderCard />
            <div className="flex flex-col gap-4">
              <p
                className="text-sm font-bold uppercase tracking-widest"
                style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
              >
                What to Expect
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Book your time slot via /appointments",
                  "Arrive with your commercial vehicle during scheduled window",
                  "Tell us what material and how much",
                  "We load it — you haul it",
                  "Pay on site: cash or card (+3.5%)",
                ].map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <CheckCircle
                      size={16}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "var(--color-red)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
