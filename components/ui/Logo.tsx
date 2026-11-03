import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  theme?: "dark" | "light";
  withLink?: boolean;
}

export function Logo({ className, theme = "dark", withLink = true }: LogoProps) {
  const isLight = theme === "light";

  const content = (
    <div className={cn("flex items-center gap-2.5 sm:gap-3 select-none group", className)}>
      {/* Official Nanda Caterers Chef Logo Badge */}
      <div
        className={cn(
          "relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-xs p-0.5 border flex items-center justify-center shrink-0 group-hover:scale-105 transition-all overflow-hidden",
          isLight
            ? "border-white/30 ring-2 ring-white/20 group-hover:ring-turmeric/60 shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            : "border-accent/20"
        )}
      >
        <Image
          src="/logo-transparent.png"
          alt="Nanda Caterers Official Logo"
          width={44}
          height={44}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {/* Wordmark "Nanda Caterers" */}
      <div className="flex flex-col text-left">
        <span
          className={cn(
            "font-heading font-extrabold text-lg sm:text-xl tracking-tight leading-none transition-colors flex items-baseline gap-1.5",
            isLight ? "text-white" : "text-ink"
          )}
        >
          <span>Nanda</span>
          <span
            className={cn(
              "relative inline-block font-heading font-bold transition-all",
              isLight
                ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FDE68A] to-[#F59E0B] drop-shadow-[0_1px_8px_rgba(232,176,4,0.35)]"
                : "text-accent"
            )}
          >
            Caterers
            {isLight && (
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#FDE68A] via-turmeric to-accent opacity-90 shadow-xs"
              />
            )}
          </span>
        </span>
        <span
          className={cn(
            "text-[9px] uppercase tracking-[0.22em] font-semibold leading-none mt-1.5 transition-colors flex items-center gap-1.5",
            isLight ? "text-white/80" : "text-ink/60"
          )}
        >
          <span>MUMBAI</span>
          <span className={cn("text-[8px]", isLight ? "text-turmeric" : "text-accent")}>•</span>
          <span>SINCE 2005</span>
        </span>
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" aria-label="Nanda Caterers Home" className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
