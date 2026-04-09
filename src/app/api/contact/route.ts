import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name:    z.string().min(2),
  phone:   z.string().min(10),
  email:   z.string().email(),
  subject: z.enum(["quote", "booking", "general"]),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from:    "WACT Logistics <noreply@wactlogisticsllc.com>",
        to:      process.env.NOTIFICATION_EMAIL ?? "info@wactlogisticsllc.com",
        subject: `Contact Form — ${data.subject} — ${data.name}`,
        html: `
          <h2>Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
