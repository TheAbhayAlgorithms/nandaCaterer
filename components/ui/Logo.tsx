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
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-xs p-0.5 border border-accent/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
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
            "font-heading font-bold text-lg sm:text-xl tracking-tight leading-none transition-colors",
            isLight ? "text-white" : "text-ink"
          )}
        >
          Nanda{" "}
          <span
            className={cn(
              "font-bold transition-colors",
              isLight ? "text-white" : "text-accent"
            )}
          >
            Caterers
          </span>
        </span>
        <span
          className={cn(
            "text-[9px] uppercase tracking-[0.2em] font-semibold leading-none mt-1 transition-colors",
            isLight ? "text-white/80" : "text-ink/60"
          )}
        >
          Mumbai • Since 2005
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
