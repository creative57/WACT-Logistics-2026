import Image from "next/image";
import Link from "next/link";
import { Mountain, Layers, Package } from "lucide-react";
import type { Product } from "@/lib/products";
import FeeBadge from "./FeeBadge";
import CallForPricing from "./CallForPricing";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

function PlaceholderImage({ product }: { product: Product }) {
  const Icon =
    product.category === "packaged"
      ? Package
      : product.category === "specialty"
      ? Mountain
      : Layers;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{ background: "var(--color-off-white)" }}
    >
      <Icon size={32} style={{ color: "var(--color-gray-mid)" }} />
      <span
        className="text-xs uppercase tracking-wider text-center px-2"
        style={{ color: "var(--color-gray-mid)", fontFamily: "var(--font-accent)" }}
      >
        {product.name}
      </span>
    </div>
  );
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const imgHeight = compact ? "h-32" : "h-48";

  return (
    <div
      className={`product-card bg-white overflow-hidden ${compact ? "rounded" : "rounded-sm"}`}
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}
    >
      {/* Image */}
      <div className={`relative ${imgHeight} bg-gray-100`}>
        <div className="absolute inset-0">
          <PlaceholderImage product={product} />
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${compact ? "p-3" : ""}`}>
        <h3
          className="font-bold uppercase mb-1"
          style={{
            fontFamily: "var(--font-accent)",
            fontSize: compact ? "1rem" : "1.1rem",
            color: "var(--color-blue)",
            letterSpacing: "0.06em",
          }}
        >
          {product.name}
        </h3>

        {!compact && (
          <p
            className="text-sm mb-3 leading-relaxed"
            style={{ color: "var(--color-gray-dark)", fontFamily: "var(--font-body)" }}
          >
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="mb-3">
          {product.price !== null ? (
            <div>
              <div className="flex items-baseline gap-1 mb-1">
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
                >
                  ${product.price.toFixed(2)}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "var(--color-gray-mid)", fontFamily: "var(--font-body)" }}
                >
                  {product.unit}
                </span>
              </div>
              <FeeBadge size="sm" />
            </div>
          ) : (
            <CallForPricing compact />
          )}
        </div>

        {/* Good For tags */}
        {!compact && product.goodFor.length > 0 && (
          <div className="mb-3">
            <p
              className="text-xs uppercase tracking-wider mb-1"
              style={{ color: "var(--color-gray-mid)", fontFamily: "var(--font-accent)" }}
            >
              Great for:
            </p>
            <div className="flex flex-wrap gap-1">
              {product.goodFor.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    background: "var(--color-off-white)",
                    color: "var(--color-gray-dark)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex gap-2 flex-wrap">
          {product.price !== null ? (
            <Button
              href={`/products/${product.slug}`}
              variant="primary"
              size="sm"
            >
              Order Now
            </Button>
          ) : (
            <Button
              href={`/products/${product.slug}`}
              variant="secondary"
              size="sm"
            >
              Call for Quote
            </Button>
          )}
          <Button
            href={`/products/${product.slug}`}
            variant="ghost"
            size="sm"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}
