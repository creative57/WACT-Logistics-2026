import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Users, Truck, Heart } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About WACT Logistics LLC — Sherman, Texas",
  description:
    "WACT Logistics LLC is a locally owned sand, gravel, and aggregate company based in Sherman, TX. Serving Grayson County and North Texas.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center py-24 px-4 sm:px-6"
        style={{ minHeight: "50vh", background: "var(--color-blue)" }}
      >
        <div className="text-center">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
          >
            Sherman, Texas
          </p>
          <h1
            className="text-white font-bold"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              letterSpacing: "0.04em",
            }}
          >
            Who We Are
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
          >
            Built in Sherman. Built for Texas.
          </h2>
          <div
            className="text-base leading-relaxed flex flex-col gap-4"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
          >
            <p>
              WACT Logistics LLC is a locally owned aggregate delivery company based in Sherman, Texas. We supply sand, gravel, topsoil, decomposed granite, fill dirt, and specialty stone to contractors, builders, and homeowners across Grayson County and North Texas.
            </p>
            <p>
              We started because we saw a need for a no-nonsense materials company in this area — one that shows up on time, delivers what it says it will, and treats every customer the same whether they&apos;re ordering a single pallet or a fleet of loads.
            </p>
            <p>
              We work with subs, GCs, landscapers, and DIY homeowners alike. If you need it delivered to a job site or loaded into your own truck, we&apos;ve got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="section-heading text-center mb-10"
          >
            How We Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <MapPin size={28} />,
                title: "Local & Owned",
                body: "We live here. We work here. Every load we deliver stays in this community.",
              },
              {
                icon: <Truck size={28} />,
                title: "We Show Up",
                body: "No excuses. If we say we&apos;re delivering Tuesday, we&apos;re there Tuesday.",
              },
              {
                icon: <Heart size={28} />,
                title: "Community First",
                body: "Grayson County contractors and homeowners built this business. We don&apos;t forget that.",
              },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="rounded-sm p-6 text-center flex flex-col items-center gap-3"
                style={{
                  background: "#fff",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  borderTop: "3px solid var(--color-red)",
                }}
              >
                <div style={{ color: "var(--color-blue)" }}>{icon}</div>
                <h3
                  className="font-bold uppercase"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
              >
                Service Area
              </h2>
              <p
                className="mb-4 leading-relaxed"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
              >
                We&apos;re based at 11560 TX-56 in Sherman, TX and serve Grayson County and the surrounding North Texas region. Call to confirm delivery to your specific address.
              </p>
              <div className="flex items-start gap-2 mb-6">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-red)" }} />
                <p style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
                  {BUSINESS.address}
                </p>
              </div>
              <a
                href={BUSINESS.phoneHref}
                className="btn btn-primary"
              >
                Call to Confirm Your Area
              </a>
            </div>
            {/* Map embed */}
            <div className="rounded-sm overflow-hidden" style={{ height: "300px", background: "var(--color-gray-light)" }}>
              <iframe
                title="WACT Logistics LLC location"
                src="https://maps.google.com/maps?q=11560+TX-56+Sherman+TX+75090&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-blue)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
          >
            Ready to Order?
          </p>
          <h2
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
          >
            Let&apos;s Get to Work.
          </h2>
          <Link href="/contractors" className="btn btn-primary btn-lg">
            Order Now
          </Link>
        </div>
      </section>
    </>
  );
}
