import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || !body.name || !body.email || !body.message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  // TODO: wire this up to an email/CRM service (e.g. Resend, SendGrid, HubSpot)
  // once credentials are available. For now the enquiry is logged server-side
  // so the form is fully functional end-to-end.
  console.log("New enquiry received:", {
    name: body.name,
    phone: body.phone,
    email: body.email,
    projectType: body.projectType,
    budget: body.budget,
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
