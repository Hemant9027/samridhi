/** Leaf monogram mark for the Samridhi brand. */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-800 ${className ?? ""}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-ivory-50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.5c-4.6 0-8-3.4-8-8 0-4.9 3.8-9.6 9.3-11 4.1-1 7.4-.7 8.7-.6-.1 1.3-.4 4.7-1.6 8.6C19 15.4 16 21.5 12 21.5Z" />
        <path d="M12 21.5c0-6.5 2.5-11.8 6.6-15" />
        <path d="M8.5 13.5c1.2.2 2.5.2 3.9 0M7 9.7c1.4.3 2.9.3 4.6.1" />
      </svg>
    </span>
  );
}
