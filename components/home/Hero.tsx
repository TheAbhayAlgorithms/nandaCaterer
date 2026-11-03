"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TornEdge } from "@/components/shape/TornEdge";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-night text-white flex flex-col justify-center items-center" style={{ minHeight: "min(88svh, 820px)" }}>
      {/* Background Image with slow zoom focused on the crisp in-focus catering feast */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full pointer-events-none origin-center"
      >
        <Image
          src="/images/hero-wedding-feast.jpg"
          alt="Royal wedding catering buffet feast and gourmet food banquet"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay: 50% maroon-black */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-[#451213]/60 to-black/75" />
      </motion.div>

      {/* Centred Content Stack */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20 flex flex-col items-center">
        {/* Tiny uppercase eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-poppins text-[11px] sm:text-xs uppercase font-bold tracking-[0.2em] text-white/80 mb-2 select-none"
        >
          WELCOME TO
        </motion.p>

        {/* Large serif/display H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading font-extrabold text-white text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.12] tracking-tight mb-6 max-w-3xl"
        >
          A Perfect Blend of <span className="italic text-accent">Sensational</span> Food
        </motion.h1>

        {/* Outlined pill button "Explore Menu" with shimmer effect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center"
        >
          <div className="relative inline-flex items-center justify-center group">
            {/* Ambient radiant glow behind button */}
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-white/25 opacity-30 blur-md group-hover:opacity-80 transition-opacity duration-300"
            />

            <Link
              href="/menu"
              aria-label="Explore food menu"
              className="font-poppins relative inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/80 bg-white/10 backdrop-blur-sm text-white font-semibold text-base shadow-soft hover:bg-white/20 hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Animated Light Sweep Shimmer Effect */}
              <span
                aria-hidden="true"
                className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none"
              />

              <span className="relative z-10 tracking-wide">Explore Menu</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Signature Torn-Paper bottom edge cut revealing paper section beneath */}
      <TornEdge position="bottom" color="var(--paper)" variant={0} />
    </section>
  );
}
