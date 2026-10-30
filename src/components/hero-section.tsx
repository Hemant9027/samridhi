"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { site, siteImages } from "@/lib/site";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section className="relative overflow-hidden">
      {/* soft botanical gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_10%,var(--color-forest-100),transparent_60%),radial-gradient(ellipse_50%_50%_at_0%_100%,var(--color-sand-100),transparent_55%)]"
      />
      <div className="container-site relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
        <div>
          <motion.p {...fadeUp(0)} className="eyebrow">
            Ayurved · Nutraceutical · Saharanpur, U.P.
          </motion.p>
          <motion.h1
            {...fadeUp(0.08)}
            className="mt-5 font-serif text-[2.65rem] font-semibold leading-[1.06] tracking-[-0.015em] text-charcoal-950 sm:text-6xl lg:text-[4.2rem]"
          >
            Wellness, drawn from{" "}
            <em className="not-italic text-forest-700">nature&rsquo;s</em>{" "}
            pharmacy.
          </motion.h1>
          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-600 sm:text-lg"
          >
            {site.name} markets Ayurvedic proprietary products — herbal syrups,
            oils and granules — under the Samridhi brand. The Samridhi mark is
            registered for Ayurvedic and nutraceutical products, and the range
            is listed with leading pharmacy and trade platforms in India.
          </motion.p>
          <motion.div
            {...fadeUp(0.24)}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <Link href="/products" className="btn btn-primary">
              Explore products
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact us
            </Link>
          </motion.div>

          <motion.dl
            {...fadeUp(0.32)}
            className="mt-11 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-ivory-300 pt-7"
          >
            <div>
              <dt className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-olive-600">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                Registered mark
              </dt>
              <dd className="mt-1.5 font-serif text-lg font-semibold text-charcoal-950">
                № 4658771 · Class 5
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-olive-600">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Based in
              </dt>
              <dd className="mt-1.5 font-serif text-lg font-semibold text-charcoal-950">
                Saharanpur, India
              </dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, scale: 0.97, y: 18 },
                animate: { opacity: 1, scale: 1, y: 0 },
                transition: {
                  duration: 0.9,
                  delay: 0.14,
                  ease: [0.16, 1, 0.3, 1],
                },
              })}
          className="relative"
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] border border-ivory-300 shadow-[var(--shadow-card-hover)]">
            <Image
              src={siteImages.hero}
              alt="Illustrative Unsplash photograph of wellness products; the actual Samridhi packs may differ"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
          <div className="card absolute -bottom-5 -left-3 max-w-[15rem] p-4 sm:-left-6">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-olive-600">
              Product range
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-charcoal-900">
              Syrups · Oils · Granules for everyday wellness routines
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
