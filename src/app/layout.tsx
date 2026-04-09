import type { Metadata } from "next";
import { Oswald, Source_Sans_3, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WACT Logistics LLC | Sand, Gravel & Aggregate Delivery — Sherman, TX",
    template: "%s | WACT Logistics LLC",
  },
  description:
    "Sand, gravel, fill dirt, and aggregate delivery in Grayson County, TX. Contractor bulk ordering and residential DIY. Call 972-984-8858.",
  keywords: [
    "sand delivery Sherman TX",
    "gravel Grayson County",
    "aggregate delivery North Texas",
    "fill dirt Sherman",
    "WACT Logistics",
    "dump truck delivery Texas",
    "crushed limestone Sherman TX",
    "decomposed granite delivery",
  ],
  openGraph: {
    siteName: "WACT Logistics LLC",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${sourceSans3.variable} ${barlowCondensed.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
