import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 sm:mt-24">
      <Container className="py-10 sm:py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm tracking-[0.08em] text-bark-soft no-underline transition-colors hover:text-forest"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm text-herb-muted">
            {siteConfig.name} by {siteConfig.studio}
          </p>
        </div>
      </Container>
    </footer>
  );
}
