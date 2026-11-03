import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_SITE_URL || "https://nandacaterer.com",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href
          ? {
              item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nandacaterer.com"}${item.href}`,
            }
          : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`py-3 px-4 sm:px-6 max-w-7xl mx-auto w-full text-xs font-medium text-charcoal/60 ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <li className="flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-maroon transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-maroon/70" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center gap-1.5 sm:gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-charcoal/30 flex-shrink-0" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-maroon transition-colors line-clamp-1 max-w-[150px] sm:max-w-none"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="text-maroon font-semibold line-clamp-1 max-w-[200px] sm:max-w-none"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
