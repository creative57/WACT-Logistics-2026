import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HardHat, Home, Phone, Truck } from "lucide-react";
import MaterialCalculator from "@/components/features/calculator/MaterialCalculator";
import QuickOrderForm from "@/components/features/order/QuickOrderForm";
import LoaderCard from "@/components/features/order/LoaderCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import StatCallout from "@/components/ui/StatCallout";
import { PRODUCTS } from "@/lib/products";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "WACT Logistics LLC | Sand, Gravel & Aggregate Delivery — Trenton, TX",
  description:
    "Sand, gravel, fill dirt, and aggregate delivery in Grayson County, TX. Free material calculator. Contractor bulk ordering and residential DIY. Call 972-984-8858.",
};

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <>
      {/* 1. HERO */}
      <section
        className="relative flex items-center justify-start"
        style={{ minHeight: "90vh", background: "var(--color-blue)" }}
      >
        <Image
          src="/location-piles.png"
          alt="WACT Logistics material piles at location"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 z-0"
          style={{ background: "rgba(0,0,0,0.60)" }}
          aria-hidden="true"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="max-w-3xl">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
            >
              Trenton, Texas · Grayson County
            </p>
            <h1
              className="font-bold mb-6 leading-none text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              North Texas Materials.
              <br />
              <span style={{ color: "var(--color-red)" }}>Delivered.</span>
            </h1>
            <p
              className="text-xl mb-10 leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.8)",
                maxWidth: "520px",
              }}
            >
              Sand, gravel, fill dirt, and aggregate delivered across Grayson County. Contractor bulk ordering. Residential DIY. Always done right.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contractors" className="btn btn-primary btn-lg">
                Order Now
              </Link>
              <Link
                href="/calculator"
                className="btn btn-secondary btn-lg"
                style={{ borderColor: "rgba(255,255,255,0.6)", color: "#fff" }}
              >
                Calculate My Needs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEE NOTICE STRIP */}
      <div
        className="py-3 text-center text-sm"
        style={{
          background: "var(--color-off-white)",
          borderBottom: "1px solid var(--color-gray-light)",
          fontFamily: "var(--font-accent)",
          color: "var(--color-gray-mid)",
        }}
      >
        <span>💳 All major cards accepted · 3.5% processing fee</span>
        <span className="mx-3" aria-hidden="true" style={{ color: "var(--color-gray-light)" }}>
          |
        </span>
        <span>💵 Cash always welcome — no fee</span>
      </div>

      {/* 3. AUDIENCE SELECTOR */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/contractors"
            className="group relative rounded-sm p-8 flex flex-col gap-4 transition-transform hover:-translate-y-1"
            style={{
              background: "var(--color-blue)",
              boxShadow: "0 4px 24px rgba(10,31,107,0.18)",
              textDecoration: "none",
            }}
          >
            <div
              className="w-12 h-12 rounded-sm flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <HardHat size={24} color="#fff" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold mb-2 text-white"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
              >
                Contractors &amp; Sub-Contractors
              </h2>
              <p
                className="text-base mb-4"
                style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}
              >
                Fast bulk ordering. Loader on site. Contractor pricing. No runaround.
              </p>
            </div>
            <span
              className="text-sm font-bold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
            >
              Order in Bulk →
            </span>
          </Link>

          <Link
            href="/residential"
            className="group relative rounded-sm p-8 flex flex-col gap-4 transition-transform hover:-translate-y-1"
            style={{
              background: "var(--color-red)",
              boxShadow: "0 4px 24px rgba(191,10,48,0.18)",
              textDecoration: "none",
            }}
          >
            <div
              className="w-12 h-12 rounded-sm flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <Home size={24} color="#fff" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold mb-2 text-white"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
              >
                Homeowners &amp; DIY
              </h2>
              <p
                className="text-base mb-4"
                style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-body)" }}
              >
                Calculate exactly what you need. Order with confidence. No guesswork.
              </p>
            </div>
            <span
              className="text-sm font-bold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-accent)", color: "#fff" }}
            >
              Use the Calculator →
            </span>
          </Link>
        </div>
      </section>

      {/* 4. QUICK ORDER */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <QuickOrderForm />
        </div>
      </section>

      {/* 5. PRODUCT CATEGORY GRID */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="section-heading">What Can We Deliver?</h2>
            <p
              className="mt-2 text-base"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
            >
              Bulk aggregate, specialty stone, and packaged materials. Trenton, TX and surrounding areas.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group relative rounded-sm overflow-hidden"
                style={{
                  background: "var(--color-blue)",
                  aspectRatio: "4/3",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-blue-mid), var(--color-blue))",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ border: "3px solid var(--color-red)" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-3"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                  }}
                >
                  <p
                    className="text-sm font-bold text-white uppercase"
                    style={{ fontFamily: "var(--font-accent)", letterSpacing: "0.06em" }}
                  >
                    {product.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}
                  >
                    {product.price !== null
                      ? `$${product.price.toFixed(2)} ${product.unit}`
                      : "Call for pricing"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/products/mason-sand" className="btn btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CALCULATOR EMBED */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="section-heading">How Much Do You Need?</h2>
            <p
              className="mt-2 text-base"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
            >
              Enter your project dimensions. Get an instant estimate — no phone call required.
            </p>
          </div>
          <MaterialCalculator />
        </div>
      </section>

      {/* 7. TRUST STATS STRIP */}
      <section className="py-12 px-4 sm:px-6" style={{ background: "var(--color-blue)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCallout value="Grayson" label="County — Based in Trenton, TX" />
          <StatCallout value="On-Site" label="Loader for Commercial Vehicles" />
          <StatCallout value="Same-Day" label="Delivery Available" />
          <StatCallout value="Cash" label="Always Accepted — No Fee" />
        </div>
      </section>

      {/* 8. SERVICES CARDS */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="section-heading">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className="rounded-sm p-6 flex flex-col gap-4"
              style={{ border: "1px solid var(--color-gray-light)" }}
            >
              <div className="flex items-center gap-3">
                <Truck size={32} style={{ color: "var(--color-blue)" }} />
                <h3
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-blue)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Delivery Service
                </h3>
              </div>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
                Dump truck delivery throughout Grayson County and North Texas. Pricing varies by location and load size. Get a quote — usually same or next day.
              </p>
              <Link href="/contact" className="btn btn-secondary self-start">
                Get a Quote →
              </Link>
            </div>
            <LoaderCard />
          </div>
        </div>
      </section>

      {/* 9. AERIAL DIVIDER */}
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight: "280px", background: "var(--color-blue-mid)" }}
      >
        <div className="relative z-10 text-center px-4">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-2"
            style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
          >
            Trenton, Texas
          </p>
          <p
            className="text-2xl sm:text-3xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
          >
            Serving North Texas Every Day
          </p>
          <p
            className="mt-2 text-base"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}
          >
            11560 TX-56 · Trenton, TX 75490
          </p>
          <a href={BUSINESS.phoneHref} className="mt-6 inline-flex btn btn-primary items-center gap-2">
            <Phone size={16} />
            {BUSINESS.phone}
          </a>
        </div>
      </div>

      {/* 10. FAQ */}
      <section className="py-16 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="section-heading">Common Questions</h2>
            <p
              className="mt-2 text-base"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
            >
              Can&apos;t find your answer?{" "}
              <a
                href={BUSINESS.phoneHref}
                className="font-semibold"
                style={{ color: "var(--color-red)" }}
              >
                Call {BUSINESS.phone}
              </a>
            </p>
          </div>
          <div
            className="bg-white rounded-sm p-6"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            <FAQAccordion />
          </div>
        </div>
      </section>
    </>
  );
}
