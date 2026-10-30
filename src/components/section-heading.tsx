import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <Reveal
      className={`${center ? "text-center mx-auto" : ""} max-w-2xl ${center ? "flex flex-col items-center" : ""}`}
    >
      {eyebrow ? <p className={`eyebrow ${dark ? "text-olive-300!" : ""}`}>{eyebrow}</p> : null}
      <h2
        className={`mt-4 font-serif text-3xl sm:text-4xl leading-[1.15] font-semibold tracking-[-0.01em] ${
          dark ? "text-ivory-50" : "text-charcoal-950"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            dark ? "text-forest-200" : "text-charcoal-600"
          }`}
        >
          {lead}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}
