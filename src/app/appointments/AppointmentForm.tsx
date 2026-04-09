"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PRODUCTS } from "@/lib/products";
import { BUSINESS } from "@/lib/constants";

const schema = z.object({
  name:         z.string().min(2, "Name required"),
  company:      z.string().optional(),
  phone:        z.string().min(10, "Valid phone number required"),
  type:         z.enum(["pickup", "delivery"]),
  material:     z.string().min(1, "Select a material"),
  quantity:     z.number().positive("Must be > 0"),
  unit:         z.enum(["tons", "yards", "loads"]),
  date:         z.string().min(1, "Preferred date required"),
  time:         z.string().optional(),
  vehicleType:  z.string().optional(),
  notes:        z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apptType, setApptType] = useState<"pickup" | "delivery">("pickup");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: "pickup", unit: "tons" },
  });

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "appointments" }),
      });
    } catch { /* noop */ }
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div
        className="rounded-sm p-10 text-center"
        style={{ background: "var(--color-off-white)", border: "1px solid var(--color-gray-light)" }}
      >
        <p
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
        >
          You&apos;re Booked!
        </p>
        <p className="mb-4" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
          We&apos;ll confirm your time by phone shortly.
        </p>
        <a href={BUSINESS.phoneHref} className="btn btn-primary">
          Call to Confirm: {BUSINESS.phone}
        </a>
      </div>
    );
  }

  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{ borderTop: "3px solid var(--color-red)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", background: "#fff" }}
    >
      <div className="p-6 pb-2">
        <h2
          className="text-2xl font-bold uppercase"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)", letterSpacing: "0.04em" }}
        >
          Book Your Time Slot
        </h2>
      </div>

      {/* Audience toggle */}
      <div className="px-6 py-4">
        <div className="flex gap-2">
          {(["pickup", "delivery"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setApptType(t); setValue("type", t); }}
              className="flex-1 py-2.5 rounded-sm text-sm font-bold uppercase border-2 transition-all"
              style={{
                fontFamily: "var(--font-accent)",
                letterSpacing: "0.06em",
                background: apptType === t ? "var(--color-blue)" : "#fff",
                borderColor: apptType === t ? "var(--color-blue)" : "var(--color-gray-light)",
                color: apptType === t ? "#fff" : "var(--color-gray-dark)",
              }}
            >
              {t === "pickup" ? "Contractor Pickup" : "Delivery Scheduling"}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="form-label">Name</label>
            <input {...register("name")} placeholder="John Smith" className="form-input" />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div>
            <label className="form-label">Company (optional)</label>
            <input {...register("company")} placeholder="Smith Contracting" className="form-input" />
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <input {...register("phone")} type="tel" placeholder="555-555-5555" className="form-input" />
            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
          </div>
          {apptType === "pickup" && (
            <div>
              <label className="form-label">Vehicle Type</label>
              <input {...register("vehicleType")} placeholder="Semi, flatbed, dump truck..." className="form-input" />
            </div>
          )}
          <div>
            <label className="form-label">Material</label>
            <select {...register("material")} className="form-input">
              <option value="">Select a material...</option>
              {PRODUCTS.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
            </select>
            {errors.material && <p className="form-error">{errors.material.message}</p>}
          </div>
          <div>
            <label className="form-label">Quantity</label>
            <div className="flex gap-2">
              <input
                {...register("quantity", { valueAsNumber: true })}
                type="number" min="0" step="0.5" placeholder="5"
                className="form-input flex-1"
              />
              <select {...register("unit")} className="form-input w-24">
                <option value="tons">Tons</option>
                <option value="yards">Cu Yds</option>
                <option value="loads">Loads</option>
              </select>
            </div>
            {errors.quantity && <p className="form-error">{errors.quantity.message}</p>}
          </div>
          <div>
            <label className="form-label">Preferred Date</label>
            <input
              {...register("date")}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="form-input"
            />
            {errors.date && <p className="form-error">{errors.date.message}</p>}
          </div>
          <div>
            <label className="form-label">Preferred Time (optional)</label>
            <select {...register("time")} className="form-input">
              <option value="">Any time</option>
              <option value="7am-9am">7am – 9am</option>
              <option value="9am-11am">9am – 11am</option>
              <option value="11am-1pm">11am – 1pm</option>
              <option value="1pm-3pm">1pm – 3pm</option>
              <option value="3pm-5pm">3pm – 5pm</option>
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label className="form-label">Notes (optional)</label>
          <textarea
            {...register("notes")}
            rows={3}
            placeholder="Gate codes, access notes, special instructions..."
            className="form-input resize-none"
          />
        </div>

        <button type="submit" disabled={submitting} className="btn btn-primary w-full justify-center text-base">
          {submitting ? "Booking..." : "Book My Time Slot"}
        </button>
      </form>
    </div>
  );
}
