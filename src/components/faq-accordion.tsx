"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, Plus } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSearchableAccordion({
  items,
  searchable = true,
}: {
  items: FaqItem[];
  searchable?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");
  const reduceMotion = useReducedMotion();

  const filtered = query.trim()
    ? items.filter(
        (i) =>
          i.question.toLowerCase().includes(query.trim().toLowerCase()) ||
          i.answer.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : items;

  return (
    <div>
      {searchable ? (
        <div className="relative mb-6 max-w-md">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400"
            aria-hidden
          />
          <label htmlFor="faq-search" className="sr-only">
            Search frequently asked questions
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="field-input pl-10!"
            autoComplete="off"
          />
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="card max-w-lg px-6 py-8 text-center text-sm text-charcoal-600" role="status">
          No questions match “{query}”. Try a different term or{" "}
          <a href="/contact" className="font-semibold text-forest-700 underline underline-offset-2">
            send us your question
          </a>
          .
        </p>
      ) : (
        <ul className="divide-y divide-ivory-300 border-y border-ivory-300">
          {filtered.map((item) => {
            const originalIndex = items.indexOf(item);
            const open = openIndex === originalIndex;
            const panelId = `faq-panel-${originalIndex}`;
            const buttonId = `faq-button-${originalIndex}`;
            return (
              <li key={item.question}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : originalIndex)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={`text-base font-semibold transition-colors ${
                        open ? "text-forest-800" : "text-charcoal-900"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        open
                          ? "rotate-45 border-forest-700 bg-forest-800 text-ivory-50"
                          : "border-sand-300 text-charcoal-500"
                      }`}
                    >
                      <Plus className="h-4 w-4" aria-hidden />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-[0.95rem] leading-relaxed text-charcoal-700">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
