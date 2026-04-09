"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { DEFAULT_FAQS, type FAQItem } from "@/lib/faqs";

export type { FAQItem };

interface FAQAccordionProps {
  items?: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items = DEFAULT_FAQS, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`divide-y ${className}`} style={{ borderColor: "var(--color-gray-light)" }}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between py-5 px-1 text-left group"
              aria-expanded={isOpen}
            >
              <span
                className="text-lg font-semibold pr-4"
                style={{
                  fontFamily: "var(--font-display)",
                  color: isOpen ? "var(--color-red)" : "var(--color-blue)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {item.question}
              </span>
              <span
                className="flex-shrink-0 transition-transform duration-200"
                style={{ color: "var(--color-red)" }}
              >
                {isOpen ? <X size={20} /> : <Plus size={20} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    className="pb-5 px-1 leading-relaxed"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-gray-dark)",
                      fontSize: "1rem",
                    }}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
