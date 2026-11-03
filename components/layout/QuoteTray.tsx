"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, X, Trash2, ArrowRight, MessageCircle, ShoppingCart } from "lucide-react";
import { useQuoteSelection } from "@/context/QuoteSelectionContext";
import { openWhatsApp, getWhatsAppUrl } from "@/lib/whatsapp";

export function QuoteTray() {
  const {
    selectedDishes,
    removeDish,
    clearSelection,
    isDrawerOpen,
    setIsDrawerOpen,
    openQuoteSheet,
  } = useQuoteSelection();

  if (selectedDishes.length === 0 && !isDrawerOpen) {
    return null;
  }

  const details = {
    selectedDishes,
  };
  const whatsappHref = getWhatsAppUrl(details);

  return (
    <>
      {/* Floating Cart Button placed directly above WhatsApp FAB */}
      <AnimatePresence>
        {selectedDishes.length > 0 && !isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 15 }}
            className="fixed bottom-[88px] right-6 z-40 group"
          >
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label={`View selected dishes (${selectedDishes.length})`}
              className="relative flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-warm-lg hover:bg-accent-dark hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <ShoppingCart className="w-6 h-6 text-white" />

              {/* Superscript Item Counter Badge */}
              <span className="absolute -top-1.5 -right-1.5 min-w-[24px] h-[24px] px-1 rounded-full bg-white text-accent font-extrabold text-xs flex items-center justify-center shadow-md border-2 border-accent leading-none">
                {selectedDishes.length}
              </span>
            </button>

            {/* Hover Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center px-3 py-1.5 rounded-xl bg-ink text-white text-xs font-medium whitespace-nowrap shadow-md pointer-events-none">
              View your selection ({selectedDishes.length})
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-ink" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-over Sheet Modal */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-night/60 backdrop-blur-xs z-50"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-paper shadow-2xl z-50 flex flex-col justify-between border-l border-ink/10"
            >
              {/* Header */}
              <div className="p-5 border-b border-ink/10 flex items-center justify-between bg-cream">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-peach text-accent flex items-center justify-center">
                    <UtensilsCrossed className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-ink">
                      Selected Dishes
                    </h3>
                    <p className="text-xs text-ink/60">
                      {selectedDishes.length} items selected for enquiry
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-full text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors cursor-pointer"
                  aria-label="Close tray"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dish List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-2">
                {selectedDishes.length === 0 ? (
                  <div className="text-center py-16 text-ink/60 space-y-3">
                    <UtensilsCrossed className="w-10 h-10 mx-auto text-ink/30" />
                    <p className="font-medium text-sm">No dishes added yet</p>
                    <p className="text-xs max-w-xs mx-auto">
                      Click the &ldquo;+&rdquo; button next to any dish across our menus to add it to your selection.
                    </p>
                  </div>
                ) : (
                  selectedDishes.map((dish) => (
                    <div
                      key={dish}
                      className="flex items-center justify-between p-3 rounded-xl bg-cream/40 border border-ink/10"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span className="w-2 h-2 rounded-full bg-leaf shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-ink truncate">
                          {dish}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDish(dish)}
                        className="text-ink/40 hover:text-accent p-1 transition-colors cursor-pointer shrink-0"
                        aria-label={`Remove ${dish}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Actions Footer */}
              {selectedDishes.length > 0 && (
                <div className="p-5 border-t border-ink/10 bg-cream space-y-3">
                  <div className="flex items-center justify-between text-xs text-ink/60 mb-1">
                    <span>{selectedDishes.length} dishes ready</span>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="text-accent hover:underline font-semibold cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Connect with these dishes */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      openQuoteSheet();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-accent text-white font-semibold shadow-xs hover:bg-accent-dark transition-all cursor-pointer text-sm"
                  >
                    <span>Connect with these dishes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* WhatsApp button with prefilled message */}
                  <a
                    href={whatsappHref}
                    onClick={(e) => {
                      e.preventDefault();
                      openWhatsApp(details);
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-leaf text-white font-medium hover:opacity-90 transition-opacity text-xs cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send enquiry via WhatsApp</span>
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
