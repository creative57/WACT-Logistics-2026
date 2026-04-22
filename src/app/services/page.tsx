import type { Metadata } from "next";
import Image from "next/image";
import { Shovel, Truck, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Skid Steer Services — WACT Logistics LLC | Trenton, Texas",
  description:
    "Skid steer services in Trenton, TX and Grayson County. Land clearing, driveway prep, grading, and pad work for residential and commercial jobs.",
};

const services = [
  {
    icon: Shovel,
    title: "Land Clearing & Brush Removal",
    description:
      "We clear overgrown lots, fence lines, and pastures — removing brush, trees, and debris to get your land ready for its next use.",
  },
  {
    icon: Truck,
    title: "Driveway Prep & Grading",
    description:
      "Proper grading and base prep for new driveways or roads. We cut, fill, and shape to ensure drainage and a solid foundation.",
  },
  {
    icon: Building2,
    title: "Pad Work & New Builds",
    description:
      "Building pads for homes, barns, or shops. We grade and compact to spec so your structure starts on solid ground.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* 1. HERO */}
      <section
        className="relative flex items-center justify-start"
        style={{ height: "400px", background: "var(--color-blue)" }}
      >
        <Image
          src="/skidSteer.jpg"
          alt="Kubota skid steer working on a job site in Trenton, Texas"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 z-0"
          style={{ background: "rgba(0,0,0,0.55)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
          >
            Trenton, Texas
          </p>
          <h1
            className="font-bold text-white leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Skid Steer Services
          </h1>
        </div>
      </section>

      {/* 2. INTRO + PHOTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2
            className="text-2xl font-bold uppercase mb-5"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
          >
            Local Skid Steer Work Done Right
          </h2>
          <p
            className="text-base leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
          >
            WACT Logistics provides skid steer services throughout Grayson County and surrounding North Texas communities. Whether you need a lot cleared, a pad built, or a driveway graded, our experienced operators show up ready to work.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}
          >
            We work with homeowners, contractors, and landowners — residential and commercial. Call us for a no-pressure quote and we&apos;ll assess the job and get you on the schedule.
          </p>
        </div>
        <div
          className="rounded-sm bg-gray-200 flex items-center justify-center"
          style={{ height: "360px" }}
          aria-label="Job site photo — coming soon"
        >
          <span
            className="text-gray-400 text-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Job site photo coming soon
          </span>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section
        className="py-16"
        style={{
          background: "var(--color-off-white)",
          borderTop: "1px solid var(--color-gray-light)",
          borderBottom: "1px solid var(--color-gray-light)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2
            className="text-center text-2xl font-bold uppercase mb-12"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
          >
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-sm p-8 flex flex-col items-start"
                style={{ border: "1px solid var(--color-gray-light)" }}
              >
                <div
                  className="mb-5 p-3 rounded-sm"
                  style={{ background: "var(--color-blue)" }}
                >
                  <Icon size={28} color="white" />
                </div>
                <h3
                  className="text-lg font-bold uppercase mb-3"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR WORK PHOTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2
          className="text-2xl font-bold uppercase mb-10 text-center"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
        >
          Our Work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-sm bg-gray-200 flex items-center justify-center"
              style={{ height: "240px" }}
              aria-label={`Work photo ${n} — coming soon`}
            >
              <span
                className="text-gray-400 text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Photo {n} coming soon
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA STRIP */}
      <section className="py-16 text-center" style={{ background: "var(--color-blue)" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2
            className="font-bold text-white uppercase mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "0.04em",
            }}
          >
            Ready to Get Started?
          </h2>
          <p
            className="mb-8 text-base"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.75)" }}
          >
            Call us for a quote — we&apos;ll assess the job and get you scheduled.
          </p>
          <a href="tel:9729848858" className="btn btn-primary btn-lg inline-block">
            Call for a Quote
          </a>
          <p
            className="mt-4 text-sm font-bold tracking-wide"
            style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.6)" }}
          >
            972-984-8858
          </p>
        </div>
      </section>
    </main>
  );
}
