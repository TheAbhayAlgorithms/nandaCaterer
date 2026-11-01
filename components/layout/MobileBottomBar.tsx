"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { siteConfig } from "@/data/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useQuoteSelection } from "@/context/QuoteSelectionContext";

export function MobileBottomBar() {
  const { selectedDishes } = useQuoteSelection();

  const whatsappHref = buildWhatsAppLink({
    selectedDishes: selectedDishes.length > 0 ? selectedDishes : undefined,
  });

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-ivory/95 backdrop-blur-md border-t border-turmeric/30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-2 px-3 safe-bottom">
      <div className="grid grid-cols-3 gap-2">
        {/* Direct Call Button */}
        <a
          href={`tel:${siteConfig.phone.raw}`}
          aria-label="Call Nanda Caterers immediately"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-cream border border-charcoal/10 text-charcoal active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-maroon mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Call Now</span>
        </a>

        {/* WhatsApp Chat Button */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Nanda Caterers on WhatsApp"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 text-white shadow-sm active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Connect Button */}
        <Link
          href="/connect"
          aria-label="Connect with Nanda Caterers"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gold-gradient text-charcoal shadow-sm active:scale-95 transition-transform"
        >
          <FileText className="w-4 h-4 mb-0.5 text-charcoal" />
          <span className="text-[11px] font-bold tracking-tight">Connect</span>
        </Link>
      </div>
    </div>
  );
}
