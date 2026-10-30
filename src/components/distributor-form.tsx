"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { submitJson } from "@/lib/submit-client";
import { FieldError, FormBanner, Honeypot } from "@/components/form-bits";

export const BUSINESS_TYPES = [
  "Distributor / stockist",
  "Retail pharmacy",
  "Ayurvedic practitioner / clinic",
  "Wholesale buyer",
  "Online seller",
  "Other",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function DistributorEnquiryForm({ products }: { products: string[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [bannerMessage, setBannerMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const bannerRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      name: String(fd.get("name") ?? ""),
      businessName: String(fd.get("businessName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      city: String(fd.get("city") ?? ""),
      state: String(fd.get("state") ?? ""),
      businessType: String(fd.get("businessType") ?? ""),
      productInterests: fd.getAll("productInterests").map(String),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      formStartedAt: startedAt.current,
    };

    setStatus("submitting");
    setErrors({});
    const { data } = await submitJson("/api/distributor-enquiry", body);

    if (data.ok) {
      setStatus("success");
      setBannerMessage(
        data.message ?? "Thank you — your trade enquiry has been received.",
      );
      form.reset();
      startedAt.current = Date.now();
    } else {
      setStatus("error");
      setErrors(data.errors ?? {});
      setBannerMessage(data.message ?? "Something went wrong. Please try again.");
    }
    requestAnimationFrame(() => bannerRef.current?.focus());
  }

  const err = (field: string) => errors[field];

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {status === "success" || status === "error" ? (
        <div ref={bannerRef} tabIndex={-1} className="outline-none">
          <FormBanner
            id="distributor-form-status"
            status={status === "success" ? "success" : "error"}
            message={bannerMessage}
            errors={status === "error" && Object.keys(errors).length > 1 ? errors : undefined}
          />
        </div>
      ) : null}

      <Honeypot />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="df-name" className="field-label">
            Your name <span aria-hidden className="text-clay-600">*</span>
          </label>
          <input
            id="df-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            aria-invalid={Boolean(err("name"))}
            aria-describedby={err("name") ? "df-name-error" : undefined}
            className="field-input"
            placeholder="Contact person's name"
          />
          <FieldError id="df-name-error" message={err("name")} />
        </div>
        <div>
          <label htmlFor="df-business" className="field-label">
            Business name <span aria-hidden className="text-clay-600">*</span>
          </label>
          <input
            id="df-business"
            name="businessName"
            type="text"
            autoComplete="organization"
            required
            maxLength={160}
            aria-invalid={Boolean(err("businessName"))}
            aria-describedby={err("businessName") ? "df-business-error" : undefined}
            className="field-input"
            placeholder="Firm / shop name"
          />
          <FieldError id="df-business-error" message={err("businessName")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="df-email" className="field-label">
            Business email <span aria-hidden className="text-clay-600">*</span>
          </label>
          <input
            id="df-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={190}
            aria-invalid={Boolean(err("email"))}
            aria-describedby={err("email") ? "df-email-error" : undefined}
            className="field-input"
            placeholder="you@business.com"
          />
          <FieldError id="df-email-error" message={err("email")} />
        </div>
        <div>
          <label htmlFor="df-phone" className="field-label">
            Phone number <span aria-hidden className="text-clay-600">*</span>
          </label>
          <input
            id="df-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={20}
            aria-invalid={Boolean(err("phone"))}
            aria-describedby={err("phone") ? "df-phone-error" : undefined}
            className="field-input"
            placeholder="+91 …"
          />
          <FieldError id="df-phone-error" message={err("phone")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="df-city" className="field-label">
            City <span aria-hidden className="text-clay-600">*</span>
          </label>
          <input
            id="df-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            required
            maxLength={90}
            aria-invalid={Boolean(err("city"))}
            aria-describedby={err("city") ? "df-city-error" : undefined}
            className="field-input"
            placeholder="City"
          />
          <FieldError id="df-city-error" message={err("city")} />
        </div>
        <div>
          <label htmlFor="df-state" className="field-label">
            State <span aria-hidden className="text-clay-600">*</span>
          </label>
          <input
            id="df-state"
            name="state"
            type="text"
            autoComplete="address-level1"
            required
            maxLength={90}
            aria-invalid={Boolean(err("state"))}
            aria-describedby={err("state") ? "df-state-error" : undefined}
            className="field-input"
            placeholder="State"
          />
          <FieldError id="df-state-error" message={err("state")} />
        </div>
        <div>
          <label htmlFor="df-type" className="field-label">
            Business type <span aria-hidden className="text-clay-600">*</span>
          </label>
          <select
            id="df-type"
            name="businessType"
            required
            defaultValue=""
            aria-invalid={Boolean(err("businessType"))}
            aria-describedby={err("businessType") ? "df-type-error" : undefined}
            className="field-input"
          >
            <option value="" disabled>
              Select…
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <FieldError id="df-type-error" message={err("businessType")} />
        </div>
      </div>

      <fieldset
        aria-invalid={Boolean(err("productInterests"))}
        aria-describedby={err("productInterests") ? "df-interests-error" : undefined}
      >
        <legend className="field-label">
          Product interests <span aria-hidden className="text-clay-600">*</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {products.map((p) => (
            <label
              key={p}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-ivory-300 bg-ivory-50 px-3.5 py-2.5 text-sm text-charcoal-800 transition-colors has-checked:border-forest-600 has-checked:bg-forest-100/60"
            >
              <input
                type="checkbox"
                name="productInterests"
                value={p}
                className="h-4 w-4 rounded border-sand-300 accent-[#234736]"
              />
              {p}
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-ivory-300 bg-ivory-50 px-3.5 py-2.5 text-sm text-charcoal-800 transition-colors has-checked:border-forest-600 has-checked:bg-forest-100/60">
            <input
              type="checkbox"
              name="productInterests"
              value="Full catalogue"
              className="h-4 w-4 rounded border-sand-300 accent-[#234736]"
            />
            Full catalogue / not sure yet
          </label>
        </div>
        <FieldError id="df-interests-error" message={err("productInterests")} />
      </fieldset>

      <div>
        <label htmlFor="df-message" className="field-label">
          Message <span className="font-normal text-charcoal-500">(optional)</span>
        </label>
        <textarea
          id="df-message"
          name="message"
          rows={4}
          maxLength={2000}
          aria-invalid={Boolean(err("message"))}
          aria-describedby={err("message") ? "df-message-error" : undefined}
          className="field-input resize-y"
          placeholder="Territories you cover, approximate volumes, questions…"
        />
        <FieldError id="df-message-error" message={err("message")} />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="df-consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(err("consent"))}
            aria-describedby={err("consent") ? "df-consent-error" : undefined}
            className="mt-1 h-4 w-4 rounded border-sand-300 accent-[#234736]"
          />
          <label htmlFor="df-consent" className="text-sm leading-relaxed text-charcoal-700">
            I have read the{" "}
            <a href="/privacy-policy" className="font-semibold text-forest-700 underline underline-offset-2">
              privacy policy
            </a>{" "}
            and consent to my details being used to respond to this enquiry.{" "}
            <span aria-hidden className="text-clay-600">*</span>
          </label>
        </div>
        <FieldError id="df-consent-error" message={err("consent")} />
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
            Send trade enquiry
          </>
        )}
      </button>
    </form>
  );
}
