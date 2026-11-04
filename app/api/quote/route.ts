import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

const quoteApiSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(1),
  phone: z.string().regex(phoneRegex),
  service: z.string(),
  location: z.string().optional(),
  eventDate: z.string().optional(),
  guests: z.string().optional(),
  message: z.string().optional(),
  selectedDishes: z.array(z.string()).optional(),
  botField: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Honeypot check
    if (body.botField) {
      return NextResponse.json({ success: true, message: "Enquiry received." });
    }

    const parseResult = quoteApiSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid form submission. Please verify your entries.", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    const resendApiKey = process.env.RESEND_API_KEY;
    // TODO: confirm correct email
    const quoteToEmail = process.env.QUOTE_TO_EMAIL || "info@nandacaterer.com";

    // If Resend API credentials exist, email the enquiry
    if (resendApiKey && !resendApiKey.startsWith("re_123456789")) {
      try {
        const emailContent = `
New Catering Enquiry from ${data.firstName} ${data.lastName}

Phone: ${data.phone}
Service: ${data.service}
Event Date: ${data.eventDate || "Not specified"}
Guests: ${data.guests || "Not specified"}
Location: ${data.location || "Not specified"}

Selected Dishes (${data.selectedDishes?.length || 0}):
${data.selectedDishes?.map((d) => `• ${d}`).join("\n") || "None selected from menu tray"}

Message:
${data.message || "No additional message provided."}
        `;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Nanda Caterers Website <onboarding@resend.dev>",
            to: [quoteToEmail],
            subject: `New Catering Enquiry: ${data.service} - ${data.firstName} ${data.lastName}`,
            text: emailContent,
          }),
        });
      } catch (emailErr) {
        console.error("Error sending email via Resend:", emailErr);
      }
    } else {
      // In development, log enquiry details clearly to console
      console.log("------------------------------------------");
      console.log("✉️ [DEVELOPMENT MODE] Catering Enquiry Received:");
      console.log(`Name: ${data.firstName} ${data.lastName}`);
      console.log(`Phone: ${data.phone}`);
      console.log(`Service: ${data.service} | Date: ${data.eventDate} | Guests: ${data.guests}`);
      console.log(`Dishes:`, data.selectedDishes);
      console.log(`Message: ${data.message}`);
      console.log("------------------------------------------");
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry request successfully received.",
    });
  } catch (error) {
    console.error("API quote error:", error);
    return NextResponse.json(
      { error: "Internal server error while processing your request." },
      { status: 500 }
    );
  }
}
