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
    <div className={cn("flex items-center gap-2.5 sm:gap-3.5 select-none group", className)}>
      {/* Official Nanda Caterers Chef Logo Badge */}
      <div
        className={cn(
          "relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-md p-0.5 border flex items-center justify-center shrink-0 group-hover:scale-105 transition-all overflow-hidden",
          isLight
            ? "border-white/30 ring-2 ring-white/20 shadow-[0_2px_14px_rgba(0,0,0,0.5)]"
            : "border-accent/20"
        )}
      >
        <Image
          src="/logo-transparent.png"
          alt="Nanda Caterers Official Logo"
          width={48}
          height={48}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {/* Wordmark "Nanda Caterers" */}
      <div className="flex flex-col text-left">
        <span
          className={cn(
            "font-heading font-black text-xl sm:text-2xl tracking-tight leading-none transition-all",
            isLight
              ? "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
              : "text-ink"
          )}
        >
          Nanda{" "}
          <span
            className={cn(
              "font-heading font-black transition-all",
              isLight
                ? "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                : "text-accent"
            )}
          >
            Caterers
          </span>
        </span>
        <span
          className={cn(
            "text-[9.5px] uppercase tracking-[0.24em] font-bold leading-none mt-1.5 transition-colors flex items-center gap-1.5",
            isLight
              ? "text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
              : "text-ink/70"
          )}
        >
          <span>MUMBAI</span>
          <span className="text-accent">•</span>
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
