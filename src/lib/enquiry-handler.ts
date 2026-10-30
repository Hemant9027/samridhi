import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import type { z } from "zod";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { fieldErrors } from "@/lib/validation";
import { sendEnquiryNotification } from "@/lib/email";

/** Minimum time a human needs to read and complete a form. */
const MIN_FILL_TIME_MS = 1500;
/** Per-IP submission budget. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function hashIp(ip: string): string {
  return createHash("sha256").update(`${ip}:${process.env.DATABASE_URL ? "samridhi" : ""}`).digest("hex");
}

interface HandlerConfig<S extends z.ZodType> {
  kind: "contact" | "distributor";
  schema: S;
  buildPayload: (data: z.infer<S>) => Record<string, unknown>;
  buildEmailText: (data: z.infer<S>) => string;
}

/**
 * Shared, hardened handler for both enquiry endpoints:
 * JSON-only → honeypot → time-trap → per-IP rate limit → zod validation →
 * DB persistence → optional e-mail notification.
 */
export async function handleEnquiry<S extends z.ZodType>(
  req: NextRequest,
  config: HandlerConfig<S>,
): Promise<Response> {
  // Content type guard
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return Response.json(
      { ok: false, message: "Unsupported request format." },
      { status: 415 },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return Response.json({ ok: false, message: "Malformed request body." }, { status: 400 });
  }

  const antiSpam = rawBody as { website?: unknown; formStartedAt?: unknown };

  // Honeypot: silently accept so bots think they succeeded — but store nothing.
  if (typeof antiSpam.website === "string" && antiSpam.website.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  // Time-trap: submissions faster than a human can type are rejected.
  if (typeof antiSpam.formStartedAt === "number") {
    const elapsed = Date.now() - antiSpam.formStartedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_TIME_MS) {
      return Response.json(
        { ok: false, message: "The form was submitted too quickly. Please try again." },
        { status: 429 },
      );
    }
  }

  const parsed = config.schema.safeParse(rawBody);

  const ip = clientIp(req);
  const withinLimit = rateLimit(`${config.kind}:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!withinLimit.ok) {
    return Response.json(
      {
        ok: false,
        message: `Too many submissions. Please try again in about ${Math.ceil(
          withinLimit.retryAfterSeconds / 60,
        )} minute(s).`,
      },
      { status: 429, headers: { "Retry-After": String(withinLimit.retryAfterSeconds) } },
    );
  }

  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        message: "Please review the highlighted fields.",
        errors: fieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  const data = parsed.data as z.infer<S> & {
    name: string;
    email: string;
    phone: string;
    message?: string;
  };

  try {
    await db.insert(enquiries).values({
      kind: config.kind,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message || "—",
      payload: config.buildPayload(data),
      consent: true,
      ipHash: hashIp(ip),
    });
  } catch (error) {
    console.error("[enquiry] Failed to persist enquiry:", error);
    return Response.json(
      {
        ok: false,
        message:
          "We could not save your enquiry just now. Please try again in a few minutes.",
      },
      { status: 500 },
    );
  }

  await sendEnquiryNotification({
    subject: `New ${config.kind} enquiry — ${data.name}`,
    text: config.buildEmailText(data),
  });

  return Response.json(
    {
      ok: true,
      message:
        "Thank you — your enquiry has been received. The team will review it and respond to genuine requests.",
    },
    { status: 200 },
  );
}
