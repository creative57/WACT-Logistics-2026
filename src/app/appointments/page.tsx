import type { Metadata } from "next";
import { Phone, Clock, MapPin } from "lucide-react";
import AppointmentForm from "./AppointmentForm";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Schedule a Load — Book Pickup or Delivery | WACT Logistics LLC",
  description:
    "Book a loader time slot or schedule a delivery at WACT Logistics LLC in Trenton, TX. Available for commercial vehicles Mon–Fri 7am–5pm, Sat 7am–12pm.",
};

export default function AppointmentsPage() {
  return (
    <>
      {/* Red fast-call banner */}
      <div
        className="py-3 px-4 text-center"
        style={{ background: "var(--color-red)" }}
      >
        <p
          className="text-white text-sm font-semibold"
          style={{ fontFamily: "var(--font-accent)" }}
        >
          Need it fast? Call us directly:{" "}
          <a
            href={BUSINESS.phoneHref}
            className="font-bold underline"
            style={{ color: "#fff" }}
          >
            {BUSINESS.phone}
          </a>
        </p>
      </div>

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-blue)" }}>
        <div className="max-w-5xl mx-auto">
          <h1
            className="text-white font-bold mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "0.04em",
            }}
          >
            Schedule a Load
          </h1>
          <p
            className="text-lg max-w-xl"
            style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)" }}
          >
            Book a loader time slot for commercial pickup, or schedule a delivery to your job site.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form — 2/3 */}
          <div className="lg:col-span-2">
            <AppointmentForm />
          </div>

          {/* Info panel — 1/3 */}
          <div className="flex flex-col gap-6">
            <div
              className="rounded-sm p-5"
              style={{ background: "var(--color-off-white)", border: "1px solid var(--color-gray-light)" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
              >
                Hours
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Clock size={14} style={{ color: "var(--color-red)" }} />
                  <span className="text-sm" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
                    {BUSINESS.hours.weekday}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} style={{ color: "var(--color-red)" }} />
                  <span className="text-sm" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
                    {BUSINESS.hours.saturday}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} style={{ color: "var(--color-gray-light)" }} />
                  <span className="text-sm" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}>
                    {BUSINESS.hours.sunday}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="rounded-sm p-5"
              style={{ background: "var(--color-off-white)", border: "1px solid var(--color-gray-light)" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
              >
                Location
              </p>
              <div className="flex gap-2">
                <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-red)" }} />
                <p className="text-sm" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
                  {BUSINESS.address}
                </p>
              </div>
            </div>

            <div
              className="rounded-sm p-5"
              style={{ background: "var(--color-blue)" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
              >
                Prefer to Call?
              </p>
              <a
                href={BUSINESS.phoneHref}
                className="text-xl font-bold text-white block hover:underline"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
              >
                {BUSINESS.phone}
              </a>
              <p
                className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}
              >
                We&apos;ll get you scheduled fast.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
