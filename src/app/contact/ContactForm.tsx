"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BUSINESS } from "@/lib/constants";

const schema = z.object({
  name:    z.string().min(2, "Name required"),
  phone:   z.string().min(10, "Valid phone number required"),
  email:   z.string().email("Valid email required"),
  subject: z.enum(["quote", "booking", "general"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
          Message Sent!
        </p>
        <p className="mb-4" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
          We&apos;ll get back to you shortly.
        </p>
        <a href={BUSINESS.phoneHref} className="btn btn-primary">
          Or Call Now: {BUSINESS.phone}
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
          Send a Message
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="form-label">Name</label>
            <input {...register("name")} placeholder="Jane Smith" className="form-input" />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input {...register("phone")} type="tel" placeholder="555-555-5555" className="form-input" />
            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="form-label">Email</label>
            <input {...register("email")} type="email" placeholder="jane@example.com" className="form-input" />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="form-label">Subject</label>
            <select {...register("subject")} className="form-input">
              <option value="">Select a subject...</option>
              <option value="quote">Order Quote</option>
              <option value="booking">Pickup Booking</option>
              <option value="general">General Question</option>
            </select>
            {errors.subject && <p className="form-error">{errors.subject.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="form-label">Message</label>
            <textarea
              {...register("message")}
              rows={5}
              placeholder="Tell us about your project, material needs, or question..."
              className="form-input resize-none"
            />
            {errors.message && <p className="form-error">{errors.message.message}</p>}
          </div>
        </div>
        <button type="submit" disabled={submitting} className="btn btn-primary w-full justify-center text-base">
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
