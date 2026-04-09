import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import QuickOrderForm from "@/components/features/order/QuickOrderForm";
import LoaderCard from "@/components/features/order/LoaderCard";
import FeeBadge from "@/components/ui/FeeBadge";
import CallForPricing from "@/components/ui/CallForPricing";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { type FAQItem } from "@/lib/faqs";
import { PRODUCTS } from "@/lib/products";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contractors & Bulk Orders — Fast Aggregate Delivery Sherman TX",
  description:
    "Bulk sand, gravel, and aggregate ordering for contractors and subs in North Texas. On-site loader, same-day delivery, cash pricing. Call 972-984-8858.",
};

const contractorFAQs: FAQItem[] = [
  {
    question: "Is there a minimum order size?",
    answer:
      "Call us at 972-984-8858 to confirm minimums for your specific material. For full truck load orders we generally work with any quantity that fits a load.",
  },
  {
    question: "How quickly can you deliver?",
    answer:
      "Same-day and next-day delivery is often available. Schedule through the Quick Order form or call 972-984-8858 to confirm availability.",
  },
  {
    question: "Can I bring my own truck to load?",
    answer:
      "Yes. We have a loader on site for commercial vehicles. Book a time at /appointments so we can have your material ready.",
  },
  {
    question: "Do you offer net-30 or contractor accounts?",
    answer:
      "Call 972-984-8858 to discuss account terms. We work with repeat contractors on a regular basis.",
  },
  {
    question: "What are your loader hours?",
    answer:
      "Mon–Fri 7am–5pm, Sat 7am–12pm. Book via /appointments to guarantee your slot.",
  },
];

export default function ContractorsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative py-20 px-4 sm:px-6 overflow-hidden"
        style={{ background: "var(--color-blue)" }}
      >
        <Image
          src="/deliveyr-truck image.png"
          alt="WACT Logistics trucks on the road"
          fill
          priority
          className="object-cover object-center"
          style={{ opacity: 0.25, transform: "scale(1.6)", transformOrigin: "center 60%" }}
        />
        <div className="relative max-w-7xl mx-auto">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
          >
            For Contractors &amp; Subs
          </p>
          <h1
            className="text-white font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "0.04em",
            }}
          >
            Built for Pros.
            <br />
            <span style={{ color: "var(--color-red)" }}>Priced for Volume.</span>
          </h1>
          <p
            className="text-lg mb-8 max-w-xl"
            style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)" }}
          >
            Fast ordering. On-site loading. Cash pricing. No runaround. Just material when you need it.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#order-form" className="btn btn-primary btn-lg">
              Place a Bulk Order
            </Link>
            <Link
              href="/appointments"
              className="btn btn-secondary btn-lg"
              style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
            >
              Book a Loader
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Order Form */}
      <section id="order-form" className="py-16 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
        <div className="max-w-4xl mx-auto">
          <QuickOrderForm />
        </div>
      </section>

      {/* Loader Card */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <LoaderCard />
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
          >
            Material Pricing
          </h2>
          <div className="mb-4">
            <FeeBadge />
          </div>
          <div
            className="rounded-sm overflow-hidden"
            style={{ border: "1px solid var(--color-gray-light)" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ background: "var(--color-blue)" }}>
                  {["Material", "Category", "Price", "Unit"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((product, idx) => (
                  <tr
                    key={product.slug}
                    style={{
                      background: idx % 2 === 0 ? "#fff" : "var(--color-off-white)",
                      borderBottom: "1px solid var(--color-gray-light)",
                    }}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-semibold hover:underline"
                        style={{
                          fontFamily: "var(--font-accent)",
                          color: "var(--color-blue)",
                          textDecorationColor: "var(--color-red)",
                        }}
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td
                      className="px-4 py-3 text-sm capitalize"
                      style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
                    >
                      {product.category}
                    </td>
                    <td className="px-4 py-3">
                      {product.price !== null ? (
                        <span
                          className="font-bold"
                          style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
                        >
                          ${product.price.toFixed(2)}
                        </span>
                      ) : (
                        <CallForPricing compact />
                      )}
                    </td>
                    <td
                      className="px-4 py-3 text-sm"
                      style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
                    >
                      {product.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            className="mt-3 text-xs"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
          >
            * Delivery pricing varies by ZIP code. Call for delivery quotes.
          </p>
        </div>
      </section>

      {/* Account features callout */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Repeat Orders", body: "Tell us your schedule. We show up." },
              { title: "Saved Job Sites", body: "Keep your frequently-used addresses on file." },
              { title: "Order History", body: "Track every delivery for your records." },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="rounded-sm p-6"
                style={{
                  borderLeft: "3px solid var(--color-red)",
                  background: "var(--color-off-white)",
                }}
              >
                <h3
                  className="font-bold mb-2 uppercase"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-blue)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}>
              Set up a contractor account:{" "}
              <a
                href={BUSINESS.phoneHref}
                className="font-semibold"
                style={{ color: "var(--color-red)" }}
              >
                {BUSINESS.phone}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
          >
            Contractor FAQ
          </h2>
          <div className="bg-white rounded-sm p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <FAQAccordion items={contractorFAQs} />
          </div>
        </div>
      </section>
    </>
  );
}
