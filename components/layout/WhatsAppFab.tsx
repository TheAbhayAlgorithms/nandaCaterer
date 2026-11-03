"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export function WhatsAppFab() {
  const href = siteConfig.whatsappUrl;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <div className="relative group">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Nanda Caterers on WhatsApp"
          className="animate-gentle-blink relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-warm-lg hover:brightness-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
        >
          {/* Complete WhatsApp Logo/Icon */}
          <MessageCircle className="w-7 h-7 fill-white/20 text-white" />
        </a>

        {/* Tooltip on hover */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center px-3 py-1.5 rounded-xl bg-ink text-white text-xs font-medium whitespace-nowrap shadow-md pointer-events-none">
          Chat on WhatsApp
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-ink" />
        </div>
      </div>
    </div>
  );
}
