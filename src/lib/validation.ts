import { z } from "zod";

/**
 * Shared server-side validation schemas for the enquiry forms.
 * The same schemas drive the API responses consumed by the client forms.
 */

const phoneSchema = z
  .string()
  .trim()
  .min(8, "Please enter a valid phone number.")
  .max(20, "The phone number looks too long.")
  .regex(/^[+\d][\d\s().-]*$/, "Please enter a valid phone number.");

const emailSchema = z
  .string()
  .trim()
  .min(1, "Please enter your email address.")
  .max(190, "The email address looks too long.")
  .pipe(z.email("Please enter a valid email address."));

const consentSchema = z.literal(true, {
  error: "Please accept the privacy policy to continue.",
});

/** Honeypot: real users never fill this in. */
const honeypotSchema = z.string().max(0).optional().or(z.literal(""));

const formStartedAtSchema = z.number().int().positive();

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: emailSchema,
  phone: phoneSchema,
  enquiryType: z.string().trim().min(1, "Please select an enquiry type.").max(60),
  message: z
    .string()
    .trim()
    .min(10, "Please add a short message (at least 10 characters).")
    .max(2000, "The message is too long (max 2000 characters)."),
  consent: consentSchema,
  website: honeypotSchema,
  formStartedAt: formStartedAtSchema,
});

export const distributorSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  businessName: z.string().trim().min(2, "Please enter your business name.").max(160),
  email: emailSchema,
  phone: phoneSchema,
  city: z.string().trim().min(2, "Please enter your city.").max(90),
  state: z.string().trim().min(2, "Please enter your state.").max(90),
  businessType: z.string().trim().min(1, "Please select your business type.").max(60),
  productInterests: z
    .array(z.string().max(80))
    .min(1, "Please select at least one product interest.")
    .max(12),
  message: z.string().trim().max(2000, "The message is too long (max 2000 characters)."),
  consent: consentSchema,
  website: honeypotSchema,
  formStartedAt: formStartedAtSchema,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type DistributorInput = z.infer<typeof distributorSchema>;

/** Flattened, field-keyed error map returned to clients. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
