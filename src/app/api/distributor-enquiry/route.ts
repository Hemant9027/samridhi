import type { NextRequest } from "next/server";
import { distributorSchema, type DistributorInput } from "@/lib/validation";
import { handleEnquiry } from "@/lib/enquiry-handler";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return handleEnquiry(req, {
    kind: "distributor",
    schema: distributorSchema,
    buildPayload: (d: DistributorInput) => ({
      businessName: d.businessName,
      city: d.city,
      state: d.state,
      businessType: d.businessType,
      productInterests: d.productInterests,
    }),
    buildEmailText: (d: DistributorInput) =>
      [
        `Name: ${d.name}`,
        `Business: ${d.businessName}`,
        `Email: ${d.email}`,
        `Phone: ${d.phone}`,
        `Location: ${d.city}, ${d.state}`,
        `Business type: ${d.businessType}`,
        `Product interests: ${d.productInterests.join(", ")}`,
        "",
        "Message:",
        d.message || "—",
      ].join("\n"),
  });
}
