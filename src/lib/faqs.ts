export type FAQItem = {
  question: string;
  answer: string;
};

export const DEFAULT_FAQS: FAQItem[] = [
  {
    question: "How much material do I need?",
    answer:
      "Use our free Material Calculator. It calculates cubic yards, tons, and truck loads instantly for your project dimensions. Just enter your length, width, and depth.",
  },
  {
    question: "Do you deliver?",
    answer:
      "Yes. Delivery pricing varies by location. Use the Quick Order form or call 972-984-8858 for a quote. We primarily serve Grayson County and North Texas.",
  },
  {
    question: "Can I pick up materials?",
    answer:
      "Yes. Our loader is on site for commercial vehicles. Book a time at wactlogisticsllc.com/appointments to schedule your pickup.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "All major credit and debit cards are accepted — a 3.5% processing fee applies. Cash is always accepted with no fee.",
  },
  {
    question: "What is a Super Sack?",
    answer:
      "A large bulk bag (~2,000 lbs) — good when a full truck load is more than you need. Available in sand, gravel, and topsoil. Call for current pricing: 972-984-8858.",
  },
  {
    question: "Do you serve my area?",
    answer:
      "We primarily serve Grayson County and North Texas. Call 972-984-8858 to confirm delivery to your address.",
  },
];
