"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MapPin, Clock, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/data/site";
import { openWhatsApp, getWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const toggleSection = (name: string) => {
    setOpenSection((prev) => (prev === name ? null : name));
  };

  return (
    <footer className="w-full bg-night text-white/80 border-t border-accent/20">
      {/* Brand Bar Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Logo theme="light" />

          {/* Social Icons: Facebook, X, Instagram, WhatsApp in original brand colors with circular UI */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href={siteConfig.social.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Nanda Caterers on Facebook"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm hover:shadow-[0_4px_16px_rgba(24,119,242,0.4)] hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href={siteConfig.social.x.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Nanda Caterers on X (Twitter)"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black text-white border border-white/20 flex items-center justify-center shadow-sm hover:shadow-[0_4px_16px_rgba(255,255,255,0.15)] hover:border-white/40 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={siteConfig.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Nanda Caterers on Instagram"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-sm hover:shadow-[0_4px_16px_rgba(220,39,67,0.4)] hover:brightness-110 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={getWhatsAppUrl()}
              onClick={(e) => {
                e.preventDefault();
                openWhatsApp();
              }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Nanda Caterers on WhatsApp"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm hover:shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:brightness-110 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Full-width Divider Line 1 (30% transparency) */}
      <div className="w-full border-t border-white/30" />

      {/* Main Columns Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Desktop: Compact 3 columns (Contact, Working hours, Quick links) */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {/* Column 1: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-accent">
              Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-[3px]" />
                <span className="leading-relaxed">{siteConfig.offices[0].address}</span>
              </div>
              <a
                href={`tel:${siteConfig.phone.raw}`}
                className="flex items-center gap-2.5 min-h-0 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span className="leading-5">{siteConfig.phone.display}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Working hours */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-accent">
              Working Hours
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-white/70">
              <div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-accent shrink-0" />
                  <span className="leading-5">{siteConfig.workingHours.days}</span>
                </div>
                <p className="font-semibold text-white/90 pl-[26px] mt-1 leading-5">
                  {siteConfig.workingHours.time}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-accent">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">Food Menu</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile: Accordion for 3 sections */}
        <div className="md:hidden divide-y divide-white/20 border-b border-white/30 mb-4">
          {/* Contact Mobile */}
          <div>
            <button
              onClick={() => toggleSection("contact")}
              className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-bold tracking-wider text-accent"
            >
              <span>Contact Information</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "contact" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "contact" && (
              <div className="pb-4 space-y-2 text-xs text-white/70">
                <p>{siteConfig.offices[0].address}</p>
                <p>Phone: {siteConfig.phone.display}</p>
              </div>
            )}
          </div>

          {/* Working hours Mobile */}
          <div>
            <button
              onClick={() => toggleSection("hours")}
              className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-bold tracking-wider text-accent"
            >
              <span>Working Hours</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "hours" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "hours" && (
              <div className="pb-4 space-y-1 text-xs text-white/70">
                <p>{siteConfig.workingHours.days}: {siteConfig.workingHours.time}</p>
              </div>
            )}
          </div>

          {/* Quick links Mobile */}
          <div>
            <button
              onClick={() => toggleSection("links")}
              className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase font-bold tracking-wider text-accent"
            >
              <span>Quick Links</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "links" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "links" && (
              <div className="pb-4 grid grid-cols-2 gap-2 text-xs text-white/70">
                <Link href="/">Home</Link>
                <Link href="/about">About Us</Link>
                <Link href="/services">Services</Link>
                <Link href="/menu">Food Menu</Link>
                <Link href="/gallery">Gallery</Link>
                <Link href="/contact">Contact</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-width Divider Line 2 (30% transparency) */}
      <div className="w-full border-t border-white/30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs leading-none">
          <p className="text-xs text-white/70 m-0 p-0 leading-none">
            © 2026 Nanda Caterers. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs m-0 p-0 leading-none">
            <Link
              href="/privacy"
              className="text-white/70 hover:text-white hover:underline transition-colors leading-none"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/70 hover:text-white hover:underline transition-colors leading-none"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
