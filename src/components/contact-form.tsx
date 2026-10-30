"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { submitJson } from "@/lib/submit-client";
import { FieldError, FormBanner, Honeypot } from "@/components/form-bits";

export const ENQUIRY_TYPES = [
  "Product information",
  "Where to buy / availability",
  "Distributor or wholesale enquiry",
  "Feedback about the website",
  "Other",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  initialTopic,
  initialProductName,
}: {
  initialTopic?: string;
  initialProductName?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [bannerMessage, setBannerMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const defaultEnquiryType =
    initialTopic === "product" ? "Product information" : "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      enquiryType: String(fd.get("enquiryType") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      formStartedAt: startedAt.current,
    };

    setStatus("submitting");
    setErrors({});
    const { data } = await submitJson("/api/contact", body);

    if (data.ok) {
      setStatus("success");
      setBannerMessage(
        data.message ?? "Thank you — your enquiry has been received.",
      );
      form.reset();
      startedAt.current = Date.now();
    } else {
      setStatus("error");
      setErrors(data.errors ?? {});
      setBannerMessage(
        data.message ?? "Something went wrong. Please try again.",
      );
    }
    requestAnimationFrame(() => bannerRef.current?.focus());
  }

  const err = (field: string) => errors[field];

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      {status !== "idle" && status !== "submitting" ? (
        <div ref={bannerRef} tabIndex={-1} className="outline-none">
          <FormBanner
            id="contact-form-status"
            status={status === "success" ? "success" : "error"}
            message={bannerMessage}
            errors={status === "error" && Object.keys(errors).length > 1 ? errors : undefined}
          />
        </div>
      ) : null}

      <Honeypot />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="field-label">
            Full name <span aria-hidden className="text-clay-600">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            aria-invalid={Boolean(err("name"))}
            aria-describedby={err("name") ? "cf-name-error" : undefined}
            className="field-input"
            placeholder="Your name"
          />
          <FieldError id="cf-name-error" message={err("name")} />
        </div>
        <div>
          <label htmlFor="cf-email" className="field-label">
            Email <span aria-hidden className="text-clay-600">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={190}
            aria-invalid={Boolean(err("email"))}
            aria-describedby={err("email") ? "cf-email-error" : undefined}
            className="field-input"
            placeholder="you@example.com"
          />
          <FieldError id="cf-email-error" message={err("email")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className="field-label">
            Phone number <span aria-hidden className="text-clay-600">*</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={20}
            aria-invalid={Boolean(err("phone"))}
            aria-describedby={err("phone") ? "cf-phone-error" : undefined}
            className="field-input"
            placeholder="+91 …"
          />
          <FieldError id="cf-phone-error" message={err("phone")} />
        </div>
        <div>
          <label htmlFor="cf-type" className="field-label">
            Enquiry type <span aria-hidden className="text-clay-600">*</span>
          </label>
          <select
            id="cf-type"
            name="enquiryType"
            required
            defaultValue={defaultEnquiryType}
            aria-invalid={Boolean(err("enquiryType"))}
            aria-describedby={err("enquiryType") ? "cf-type-error" : undefined}
            className="field-input"
          >
            <option value="" disabled>
              Select…
            </option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FieldError id="cf-type-error" message={err("enquiryType")} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="field-label">
          Message <span aria-hidden className="text-clay-600">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          defaultValue={
            initialProductName
              ? `I would like more information about ${initialProductName}. `
              : ""
          }
          aria-invalid={Boolean(err("message"))}
          aria-describedby={err("message") ? "cf-message-error" : "cf-message-hint"}
          className="field-input resize-y"
          placeholder="How can the team help?"
        />
        {err("message") ? (
          <FieldError id="cf-message-error" message={err("message")} />
        ) : (
          <p id="cf-message-hint" className="mt-1.5 text-xs text-charcoal-500">
            Do not include personal medical details — the team cannot give medical advice.
          </p>
        )}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="cf-consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(err("consent"))}
            aria-describedby={err("consent") ? "cf-consent-error" : undefined}
            className="mt-1 h-4 w-4 rounded border-sand-300 accent-[#234736]"
          />
          <label htmlFor="cf-consent" className="text-sm leading-relaxed text-charcoal-700">
            I have read the{" "}
            <a href="/privacy-policy" className="font-semibold text-forest-700 underline underline-offset-2">
              privacy policy
            </a>{" "}
            and consent to my details being used to respond to this enquiry.{" "}
            <span aria-hidden className="text-clay-600">*</span>
          </label>
        </div>
        <FieldError id="cf-consent-error" message={err("consent")} />
      </div>

      <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            Send enquiry
          </>
        )}
      </button>
    </form>
  );
}
