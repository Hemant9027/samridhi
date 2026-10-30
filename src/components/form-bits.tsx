import { AlertCircle, CheckCircle2 } from "lucide-react";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error" role="alert">
      {message}
    </p>
  );
}

export function FormBanner({
  status,
  message,
  errors,
  id,
}: {
  status: "success" | "error";
  message: string;
  errors?: Record<string, string>;
  id: string;
}) {
  const errorList = errors ? Object.values(errors) : [];
  return (
    <div
      id={id}
      role={status === "success" ? "status" : "alert"}
      tabIndex={-1}
      className={`flex items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed ${
        status === "success"
          ? "border-forest-300 bg-forest-100/70 text-forest-900"
          : "border-[#e2c1b6] bg-[#faf0ec] text-[#7c3320]"
      }`}
    >
      {status === "success" ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      ) : (
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      )}
      <div>
        <p className="font-semibold">{message}</p>
        {errorList.length > 0 ? (
          <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
            {errorList.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

/** Visually-hidden honeypot field — must stay empty for humans. */
export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
      <label htmlFor="hp-website">Website</label>
      <input
        id="hp-website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
