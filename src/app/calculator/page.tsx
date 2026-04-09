import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import MaterialCalculator from "@/components/features/calculator/MaterialCalculator";
import { PRODUCTS } from "@/lib/products";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Material Calculator — Instant Estimates for Sand, Gravel & Aggregate",
  description:
    "Free material calculator for sand, gravel, topsoil, decomposed granite, fill dirt, and more. Get cubic yards, tons, truck loads, and price estimates instantly.",
};

export default function CalculatorPage() {
  const calcProducts = PRODUCTS.filter((p) => p.densityKey !== null);

  return (
    <>
      {/* Hero */}
      <section
        className="py-16 px-4 sm:px-6"
        style={{ background: "var(--color-blue)", borderBottom: "4px solid var(--color-red)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
          >
            Free Tool
          </p>
          <h1
            className="text-white font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "0.04em",
            }}
          >
            Material Calculator
          </h1>
          <p
            className="text-lg"
            style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)" }}
          >
            Get an accurate estimate for any project. Takes 30 seconds.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <MaterialCalculator />
        </div>
      </section>

      {/* Product quick-links */}
      <section className="py-12 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-xl font-bold mb-6 text-center"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
          >
            Jump to a Product
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {calcProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="rounded-sm p-4 text-center transition-all hover:-translate-y-0.5"
                style={{
                  background: "#fff",
                  border: "1px solid var(--color-gray-light)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  textDecoration: "none",
                }}
              >
                <p
                  className="text-sm font-bold uppercase"
                  style={{ fontFamily: "var(--font-accent)", color: "var(--color-blue)", letterSpacing: "0.06em" }}
                >
                  {product.name}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
                >
                  {product.price !== null
                    ? `$${product.price.toFixed(2)} ${product.unit}`
                    : "Call for pricing"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help callout */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-sm p-8 text-center"
            style={{ background: "var(--color-blue)" }}
          >
            <p
              className="text-lg font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
            >
              Still Have Questions?
            </p>
            <p
              className="mb-4"
              style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}
            >
              Our team can help you estimate your project and get you the right material.
            </p>
            <a
              href={BUSINESS.phoneHref}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <Phone size={16} />
              Call {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
