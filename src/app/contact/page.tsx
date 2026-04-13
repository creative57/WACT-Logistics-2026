import type { Metadata } from "next";
import { MapPin, Phone, Clock, CreditCard } from "lucide-react";
import ContactForm from "./ContactForm";
import { BUSINESS, PAYMENT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact — WACT Logistics LLC | Trenton, TX",
  description:
    "Get in touch with WACT Logistics LLC. Request a quote, ask a question, or schedule a pickup. Call 972-984-8858 or use our contact form.",
};

export default function ContactPage() {
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
          Need a quote fast? Call{" "}
          <a href={BUSINESS.phoneHref} className="font-bold underline text-white">
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
            Get in Touch
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)", fontSize: "1.1rem" }}>
            Order quotes, scheduling, or general questions — we&apos;re easy to reach.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-5">
            <div
              className="rounded-sm p-5 flex flex-col gap-4"
              style={{ background: "var(--color-off-white)", border: "1px solid var(--color-gray-light)" }}
            >
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-red)" }} />
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-0.5"
                    style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                  >
                    Address
                  </p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
                  >
                    {BUSINESS.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Phone size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-red)" }} />
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-0.5"
                    style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                  >
                    Phone
                  </p>
                  <a
                    href={BUSINESS.phoneHref}
                    className="font-bold hover:underline"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
                  >
                    {BUSINESS.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Clock size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-red)" }} />
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-0.5"
                    style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                  >
                    Hours
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
                    {BUSINESS.hours.weekday}
                    <br />
                    {BUSINESS.hours.saturday}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <CreditCard size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-red)" }} />
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-0.5"
                    style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                  >
                    Payment
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
                    💳 Cards: {PAYMENT.cardFeeLabel} fee
                    <br />
                    💵 Cash: no fee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-sm overflow-hidden" style={{ height: "350px" }}>
          <iframe
            title="WACT Logistics LLC map"
            src="https://maps.google.com/maps?q=11560+TX-56+Sherman+TX+75090&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
