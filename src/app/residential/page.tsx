import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Lightbulb, Route, Grid3X3, Sprout, Layers, Footprints } from "lucide-react";
import MaterialCalculator from "@/components/features/calculator/MaterialCalculator";
import ProductCard from "@/components/ui/ProductCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { type FAQItem } from "@/lib/faqs";
import { PRODUCTS } from "@/lib/products";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Homeowners & DIY — Material Calculator & Delivery Sherman TX",
  description:
    "Not sure how much sand or gravel you need? Use our free calculator. Order aggregate for your driveway, garden, or patio in Grayson County, TX.",
};

const projectTypes = [
  { label: "Driveway", key: "driveway", material: "crushed_limestone", icon: <Route size={24} />, tip: "Crushed limestone or gravel. 4 inches deep, compacted." },
  { label: "Patio", key: "patio", material: "decomposed_granite", icon: <Grid3X3 size={24} />, tip: "Decomposed granite or mason sand. 3 inches deep." },
  { label: "Garden Bed", key: "garden", material: "topsoil", icon: <Sprout size={24} />, tip: "Topsoil or amended soil mix. 6 inches for new beds." },
  { label: "Fill Area", key: "fill", material: "fill_dirt", icon: <Layers size={24} />, tip: "Fill dirt for leveling and grading." },
  { label: "Walkway", key: "walkway", material: "decomposed_granite", icon: <Footprints size={24} />, tip: "Decomposed granite or mason sand. 2–3 inches." },
];

const residentialFAQs: FAQItem[] = [
  {
    question: "How do I know how much material to order?",
    answer:
      "Use our Material Calculator above. Enter your project length, width, and depth and it calculates cubic yards, tons, and truck loads instantly. Always order 10% extra.",
  },
  {
    question: "Can I order less than a full truck load?",
    answer:
      "Yes — we offer Super Sacks (approx. 2,000 lbs) for smaller jobs. Call 972-984-8858 for current pricing and availability.",
  },
  {
    question: "What material should I use for my driveway?",
    answer:
      "Crushed limestone is the most popular choice in North Texas — it compacts tight and holds up to traffic. Decomposed granite is a great-looking option for lighter-traffic driveways.",
  },
  {
    question: "Will you deliver to my neighborhood?",
    answer:
      "We primarily serve Grayson County and North Texas. Call 972-984-8858 with your ZIP and we'll confirm.",
  },
  {
    question: "What's the difference between tons and cubic yards?",
    answer:
      "Cubic yards measure volume. Tons measure weight. Our calculator converts for you — it depends on the material density. Mason sand is about 1.35 tons per cubic yard, for example.",
  },
];

export default function ResidentialPage() {
  const consumerProducts = PRODUCTS.filter(
    (p) => p.category === "aggregate" || p.slug === "topsoil" || p.slug === "decomposed-granite"
  ).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden" style={{ background: "var(--color-blue)" }}>
        <Image
          src="/lrg-gravel.png"
          alt="Large gravel aggregate"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
        <div className="relative max-w-7xl mx-auto">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
          >
            For Homeowners &amp; DIY
          </p>
          <h1
            className="text-white font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "0.04em",
            }}
          >
            Your Project.
            <br />
            <span style={{ color: "var(--color-red)" }}>Your Yard. Done Right.</span>
          </h1>
          <p
            className="text-lg mb-8 max-w-xl"
            style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)" }}
          >
            Not sure how much to order? We make it simple. Enter your dimensions and get an instant estimate — no phone call required.
          </p>
          <Link href="#calculator" className="btn btn-primary btn-lg">
            Calculate My Needs
          </Link>
        </div>
      </section>


      {/* Project type cards */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading text-center mb-8">What Are You Building?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {projectTypes.map(({ label, key, icon, tip }) => (
              <a
                key={key}
                href={`#calculator`}
                className="rounded-sm p-4 text-center flex flex-col items-center gap-2 transition-transform hover:-translate-y-1 cursor-pointer"
                style={{
                  background: "#fff",
                  border: "1px solid var(--color-gray-light)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  textDecoration: "none",
                }}
              >
                <span style={{ color: "var(--color-blue)" }}>{icon}</span>
                <span
                  className="text-sm font-bold uppercase"
                  style={{ fontFamily: "var(--font-accent)", color: "var(--color-blue)", letterSpacing: "0.06em" }}
                >
                  {label}
                </span>
                <span
                  className="text-xs text-center"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
                >
                  {tip}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator embed */}
      <section id="calculator" className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="section-heading">Material Calculator</h2>
            <p
              className="mt-2"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
            >
              Enter your project dimensions for an instant estimate.
            </p>
          </div>
          <MaterialCalculator />
        </div>
      </section>

      {/* Product grid */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="section-heading text-center mb-8">Popular Materials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {consumerProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* DIY Tips */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading text-center mb-8">Pro Tips for DIY Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                tip: "Always Order 10% Extra",
                detail:
                  "Material settles and you'll have waste. Our calculator adds this buffer automatically. Don't run short mid-project.",
              },
              {
                tip: "Depth Matters Most",
                detail:
                  "A 4-inch driveway uses 33% more material than a 3-inch one. Measure your depth carefully — it has the biggest impact on your estimate.",
              },
              {
                tip: "Call Before You Dig",
                detail:
                  "Before any grading or fill project, call 811 to have utilities marked. It's free and required by law in Texas.",
              },
            ].map(({ tip, detail }) => (
              <div
                key={tip}
                className="flex gap-4 p-5 rounded-sm"
                style={{
                  border: "1px solid var(--color-gray-light)",
                  borderLeft: "3px solid var(--color-red)",
                }}
              >
                <Lightbulb
                  size={20}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--color-red)" }}
                />
                <div>
                  <h3
                    className="font-bold uppercase mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-blue)",
                      fontSize: "0.95rem",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tip}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
                  >
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="section-heading mb-6">Homeowner FAQ</h2>
          <div className="bg-white rounded-sm p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <FAQAccordion items={residentialFAQs} />
          </div>
          <div className="text-center mt-8">
            <p style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}>
              Still have questions?{" "}
              <a
                href={BUSINESS.phoneHref}
                className="font-semibold"
                style={{ color: "var(--color-red)" }}
              >
                Call {BUSINESS.phone}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
