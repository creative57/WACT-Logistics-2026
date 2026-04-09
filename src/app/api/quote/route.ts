import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:        z.string().min(2),
  phone:       z.string().min(10),
  zip:         z.string().min(5).optional(),
  material:    z.string().min(1),
  quantity:    z.number().positive().optional(),
  unit:        z.string().optional(),
  date:        z.string().optional(),
  fulfillment: z.string().optional(),
  payment:     z.string().optional(),
  notes:       z.string().optional(),
  source:      z.string().optional(),
  // appointment-specific
  company:     z.string().optional(),
  vehicleType: z.string().optional(),
  time:        z.string().optional(),
  type:        z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    // Insert into Supabase quote_requests table if env vars are set
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ) {
      const { createClient } = await import("@/utils/supabase/server");
      const supabase = await createClient();

      await supabase.from("quote_requests").insert({
        name:              data.name,
        phone:             data.phone,
        zip:               data.zip ?? null,
        material:          data.material,
        quantity:          data.quantity ?? null,
        unit:              data.unit ?? null,
        preferred_date:    data.date ?? null,
        pickup_or_delivery: data.fulfillment ?? data.type ?? null,
        status:            "new",
      });
    }

    // Send email notification if Resend is configured
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from:    "WACT Logistics <noreply@wactlogisticsllc.com>",
        to:      process.env.NOTIFICATION_EMAIL ?? "info@wactlogisticsllc.com",
        subject: `New Quote Request — ${data.name} — ${data.material}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Material:</strong> ${data.material}</p>
          <p><strong>Quantity:</strong> ${data.quantity ?? "—"} ${data.unit ?? ""}</p>
          <p><strong>Date:</strong> ${data.date ?? "—"}</p>
          <p><strong>ZIP:</strong> ${data.zip ?? "—"}</p>
          <p><strong>Fulfillment:</strong> ${data.fulfillment ?? data.type ?? "—"}</p>
          <p><strong>Payment:</strong> ${(data as Record<string, unknown>).payment ?? "—"}</p>
          <p><strong>Notes:</strong> ${data.notes ?? "—"}</p>
          <p><strong>Source:</strong> ${data.source ?? "order form"}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error("Quote API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
