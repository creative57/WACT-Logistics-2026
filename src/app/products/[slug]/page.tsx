import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Mountain, Layers, Package, Phone } from "lucide-react";
import MaterialCalculator from "@/components/features/calculator/MaterialCalculator";
import FeeBadge from "@/components/ui/FeeBadge";
import CallForPricing from "@/components/ui/CallForPricing";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { PRODUCTS, getProductBySlug, PRODUCT_CATEGORIES, type Product } from "@/lib/products";
import { BUSINESS } from "@/lib/constants";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.price != null ? `$${product.price.toFixed(2)} ${product.unit}` : "Call for Pricing"}`,
    description: `${product.description} Available for delivery in Grayson County, TX. ${product.price != null ? `$${product.price.toFixed(2)} ${product.unit}.` : "Call 972-984-8858 for pricing."} WACT Logistics LLC, Sherman TX.`,
  };
}

function PlaceholderHero({ product }: { product: Product }) {
  const Icon =
    product.category === "packaged" ? Package : product.category === "specialty" ? Mountain : Layers;
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: "45vh", background: "linear-gradient(135deg, var(--color-blue), var(--color-blue-mid))" }}
    >
      <div className="flex flex-col items-center gap-4 text-white opacity-30">
        <Icon size={64} />
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.04em" }}>
          {product.name}
        </p>
      </div>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.slug !== slug && p.category === product.category
  ).slice(0, 3);

  // Map product slug to density key for the calculator
  const calcMaterial = product.densityKey ?? undefined;

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <PlaceholderHero product={product} />
        <div
          className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-6 pt-12"
          style={{ background: "linear-gradient(to top, rgba(10,31,107,0.9), transparent)" }}
        >
          <div className="max-w-7xl mx-auto">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-sm mb-2"
              style={{
                background: "var(--color-red)",
                color: "#fff",
                fontFamily: "var(--font-accent)",
              }}
            >
              {PRODUCT_CATEGORIES[product.category]}
            </span>
            <h1
              className="text-white font-bold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                letterSpacing: "0.04em",
              }}
            >
              {product.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Product details */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: description */}
            <div className="lg:col-span-3">
              <h2
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-blue)",
                  letterSpacing: "0.04em",
                }}
              >
                About This Material
              </h2>
              <p
                className="text-base mb-6 leading-relaxed"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
              >
                {product.description}
              </p>

              {product.goodFor.length > 0 && (
                <div className="mb-6">
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                  >
                    Great For:
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {product.goodFor.map((use) => (
                      <li
                        key={use}
                        className="px-3 py-1 rounded-sm text-sm"
                        style={{
                          background: "var(--color-off-white)",
                          border: "1px solid var(--color-gray-light)",
                          fontFamily: "var(--font-body)",
                          color: "var(--color-gray-dark)",
                        }}
                      >
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.densityKey && (
                <div
                  className="rounded-sm p-4"
                  style={{
                    background: "var(--color-off-white)",
                    border: "1px solid var(--color-gray-light)",
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                  >
                    Coverage Tip
                  </p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
                  >
                    Use the calculator below to find exactly how much you need for your project dimensions.
                  </p>
                </div>
              )}
            </div>

            {/* Right: price card */}
            <div className="lg:col-span-2">
              <div
                className="rounded-sm overflow-hidden"
                style={{
                  borderTop: "3px solid var(--color-red)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <div className="p-6">
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                  >
                    Pricing
                  </p>

                  {product.price !== null ? (
                    <>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span
                          className="text-4xl font-bold"
                          style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
                        >
                          ${product.price.toFixed(2)}
                        </span>
                        <span style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}>
                          {product.unit}
                        </span>
                      </div>
                      <FeeBadge className="mb-4" />
                    </>
                  ) : (
                    <div className="mb-4">
                      <CallForPricing />
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <Button href="/contractors" variant="primary">
                      Order Now
                    </Button>
                    <Button href="/appointments" variant="secondary">
                      Book Pickup
                    </Button>
                    <a
                      href={BUSINESS.phoneHref}
                      className="btn btn-ghost flex items-center justify-center gap-2 text-sm"
                    >
                      <Phone size={14} />
                      {BUSINESS.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator embed */}
      {calcMaterial && (
        <section className="py-12 px-4 sm:px-6" style={{ background: "var(--color-off-white)" }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-xl font-bold mb-6 text-center"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-blue)",
                letterSpacing: "0.04em",
              }}
            >
              How Much Do You Need?
            </h2>
            <MaterialCalculator compact defaultMaterial={calcMaterial} />
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-blue)",
                letterSpacing: "0.04em",
              }}
            >
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
