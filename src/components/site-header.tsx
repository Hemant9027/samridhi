"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, MessageSquareText, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { mainNav, site } from "@/lib/site";
import { getCategoryCounts } from "@/lib/products";
import { Logo } from "@/components/logo";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);
  const reduceMotion = useReducedMotion();
  const categories = getCategoryCounts();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything when the route changes (render-time adjustment pattern).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setDropOpen(false);
  }

  // Close dropdown on outside click / Escape
  useEffect(() => {
    if (!dropOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropOpen]);

  // Lock body scroll when the drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled
          ? "bg-ivory-50/95 backdrop-blur-sm shadow-[0_1px_0_0_var(--color-ivory-300),0_8px_24px_-16px_rgb(23_22_15/0.18)]"
          : "bg-ivory-50 shadow-[0_1px_0_0_var(--color-ivory-300)]"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:bg-forest-800 focus:text-ivory-50 focus:px-4 focus:py-2 focus:rounded-full text-sm font-semibold"
      >
        Skip to main content
      </a>

      <div className="container-site">
        <div className="flex h-[4.25rem] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md"
            aria-label={`${site.name} — home`}
          >
            <Logo />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[1.15rem] font-semibold tracking-tight text-forest-900">
                Samridhi
              </span>
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-olive-600">
                Ayurved &amp; Nutraceutical
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {mainNav.map((item) =>
                "dropdown" in item && item.dropdown ? (
                  <li key={item.href} className="relative" ref={dropRef}>
                    <div className="flex items-center gap-1">
                      <Link
                        href={item.href}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className={`nav-link text-[0.925rem] font-medium transition-colors ${
                          isActive(pathname, item.href)
                            ? "text-forest-800"
                            : "text-charcoal-700 hover:text-forest-800"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={dropOpen}
                        aria-haspopup="true"
                        aria-label="Open product categories"
                        onClick={() => setDropOpen((v) => !v)}
                        className={`rounded-full p-1.5 transition-colors ${
                          dropOpen
                            ? "bg-forest-100 text-forest-800"
                            : "text-charcoal-500 hover:bg-ivory-200 hover:text-forest-800"
                        }`}
                      >
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                          aria-hidden
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {dropOpen ? (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 overflow-hidden rounded-xl border border-ivory-300 bg-ivory-50 shadow-[var(--shadow-card-hover)]"
                        >
                          <div className="p-2">
                            <Link
                              href="/products"
                              className="block rounded-lg px-3.5 py-2.5 text-sm font-semibold text-forest-800 hover:bg-forest-100/60"
                            >
                              All products
                            </Link>
                            <div
                              className="mx-3.5 my-1 border-t border-ivory-300"
                              role="separator"
                            />
                            {categories.map((c) => (
                              <Link
                                key={c.category}
                                href={`/products?category=${encodeURIComponent(c.category)}`}
                                className="flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm text-charcoal-700 hover:bg-forest-100/60 hover:text-forest-800"
                              >
                                <span>{c.category}</span>
                                <span className="text-xs text-charcoal-400">{c.count}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className={`nav-link text-[0.925rem] font-medium transition-colors ${
                        isActive(pathname, item.href)
                          ? "text-forest-800"
                          : "text-charcoal-700 hover:text-forest-800"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link href="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
              <MessageSquareText className="h-4 w-4" aria-hidden />
              Enquire
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ivory-300 bg-ivory-50 text-charcoal-800 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[4.25rem] bottom-0 z-40 overflow-y-auto bg-ivory-50 lg:hidden"
          >
            <nav aria-label="Mobile" className="container-site py-6">
              <ul className="divide-y divide-ivory-300">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className={`flex items-center justify-between py-4 text-lg font-medium ${
                        isActive(pathname, item.href) ? "text-forest-800" : "text-charcoal-800"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {"dropdown" in item && item.dropdown ? (
                      <ul className="pb-4 pl-1">
                        {categories.map((c) => (
                          <li key={c.category}>
                            <Link
                              href={`/products?category=${encodeURIComponent(c.category)}`}
                              className="flex items-center justify-between py-2 text-[0.95rem] text-charcoal-600"
                            >
                              {c.category}
                              <span className="text-xs text-charcoal-400">{c.count}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
                <li>
                  <Link
                    href="/distributor-enquiry"
                    aria-current={isActive(pathname, "/distributor-enquiry") ? "page" : undefined}
                    className={`flex items-center justify-between py-4 text-lg font-medium ${
                      isActive(pathname, "/distributor-enquiry") ? "text-forest-800" : "text-charcoal-800"
                    }`}
                  >
                    Distributor Enquiries
                  </Link>
                </li>
              </ul>
              <div className="mt-6 flex flex-col gap-3 pb-8">
                <Link href="/contact" className="btn btn-primary w-full">
                  Contact us
                </Link>
                <Link href="/products" className="btn btn-outline w-full">
                  Explore products
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
