"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 -mb-15 sm:-mb-20 bg-transparent">
      <Container className="py-4 sm:py-5">
        <nav aria-label="Primary">
          <ul className="flex items-center justify-center gap-5 sm:gap-8">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-block px-1 py-1 text-sm font-medium tracking-[0.12em] no-underline [text-shadow:0_1px_10px_rgb(var(--page-halo)/0.45)] sm:text-[0.95rem]",
                      active
                        ? "text-[rgb(var(--page-heading))]"
                        : "text-[rgb(var(--page-subtle))] hover:text-[rgb(var(--page-heading))]",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
