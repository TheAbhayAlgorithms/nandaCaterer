"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MapPin, ChevronRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Food Menu", href: "/menu" },
  { name: "Photo Gallery", href: "/gallery" },
  { name: "Client Reviews", href: "/testimonials" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "FAQs", href: "/faq" },
  { name: "Contact & Offices", href: "/contact" },
];

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-cream shadow-2xl flex flex-col justify-between overflow-y-auto safe-bottom"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            {/* Drawer Header */}
            <div className="p-5 flex items-center justify-between border-b border-charcoal/10 bg-ivory sticky top-0 z-10">
              <Logo withLink={false} />
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className="p-2 rounded-xl text-charcoal/70 hover:text-maroon hover:bg-cream transition-all duration-200 hover:rotate-90 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="p-5 flex-1 space-y-1.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    prefetch={true}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center justify-between p-3 rounded-2xl font-lora font-semibold text-lg transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-ivory text-maroon shadow-xs border border-turmeric/35 font-bold translate-x-1"
                        : "text-charcoal hover:text-maroon hover:bg-ivory hover:shadow-xs border border-transparent hover:border-turmeric/25 hover:translate-x-1.5"
                    )}
                  >
                    <span className="transition-colors duration-200">
                      {link.name}
                    </span>
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 transition-all duration-200 shrink-0",
                        isActive
                          ? "text-maroon opacity-100 translate-x-0"
                          : "text-saffron opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                      )}
                    />
                  </Link>
                );
              })}

              {/* CTA Button with hover animations */}
              <div className="pt-3">
                <Link
                  href="/connect"
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gold-gradient text-charcoal font-semibold shadow-warm text-base hover:shadow-warm-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <span>Connect</span>
                  <ChevronRight className="w-4 h-4 text-charcoal/70" />
                </Link>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="p-5 border-t border-charcoal/10 bg-ivory text-xs text-charcoal/70 space-y-2">
              <a
                href={`tel:${siteConfig.phone.raw}`}
                className="flex items-center gap-2 text-charcoal hover:text-maroon transition-colors"
              >
                <Phone className="w-4 h-4 text-saffron" />
                <span>{siteConfig.phone.display}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
                <span>Bandra (East) & Khar (East), Mumbai</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
