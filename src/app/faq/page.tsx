import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { DEFAULT_FAQS, type FAQItem } from "@/lib/faqs";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions | WACT Logistics LLC",
  description:
    "Answers to common questions about material ordering, delivery, pricing, payment, and more. WACT Logistics LLC — Sherman, TX. Call 972-984-8858.",
};

const extendedFAQs: FAQItem[] = [
  ...DEFAULT_FAQS,
  {
    question: "How is delivery pricing calculated?",
    answer:
      "Delivery pricing varies by your ZIP code and the distance from our yard in Sherman, TX. Submit a quote request or call 972-984-8858 and we&apos;ll give you an accurate price.",
  },
  {
    question: "Can I order by the cubic yard instead of tons?",
    answer:
      "Yes — use the Material Calculator to convert your dimensions to cubic yards and tons. You can specify your preferred unit when placing your order.",
  },
  {
    question: "What if I order too much or too little?",
    answer:
      "Our calculator recommends 10% extra to account for waste and settling. If you&apos;re unsure, call 972-984-8858 and we&apos;ll help you estimate.",
  },
  {
    question: "How do I schedule a delivery or pickup?",
    answer:
      "Use the Quick Order form on our homepage or contractors page, or call 972-984-8858. For loader pickups, book via /appointments.",
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-blue)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-white font-bold mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "0.04em",
            }}
          >
            Frequently Asked Questions
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)" }}>
            Can&apos;t find your answer?{" "}
            <a
              href={BUSINESS.phoneHref}
              className="font-bold underline"
              style={{ color: "var(--color-red)" }}
            >
              Call {BUSINESS.phone}
            </a>
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="bg-white rounded-sm p-6"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            <FAQAccordion items={extendedFAQs} />
          </div>
        </div>
      </section>

      {/* Still need help */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
          >
            Still Need Help?
          </h2>
          <p
            className="mb-6"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
          >
            We&apos;re happy to answer any question about materials, delivery, pricing, or scheduling.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={BUSINESS.phoneHref}
              className="btn btn-primary flex items-center gap-2"
            >
              <Phone size={16} />
              Call {BUSINESS.phone}
            </a>
            <Link href="/contact" className="btn btn-secondary">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
