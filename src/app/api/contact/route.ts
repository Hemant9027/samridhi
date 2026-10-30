import type { NextRequest } from "next/server";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { handleEnquiry } from "@/lib/enquiry-handler";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return handleEnquiry(req, {
    kind: "contact",
    schema: contactSchema,
    buildEmailText: (d: ContactInput) =>
      [
        `Name: ${d.name}`,
        `Email: ${d.email}`,
        `Phone: ${d.phone}`,
        `Enquiry type: ${d.enquiryType}`,
        "",
        "Message:",
        d.message,
      ].join("\n"),
  });
}
