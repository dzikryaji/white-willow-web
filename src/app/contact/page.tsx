import type { Metadata } from "next";
import { Container } from "@/components/container";
import FadeContent from "@/components/FadeContent";
import AnimatedContent from "@/components/AnimatedContent";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Kuwa Kuwitch Studio about White Willow.",
};

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <FadeContent trigger="mount" duration={1} blur={8} initialOpacity={0}>
          <header className="max-w-3xl">
            <h1 className="mt-4 font-display text-5xl leading-[0.95] text-forest sm:text-6xl lg:text-7xl">
              Contact
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/85 sm:text-xl">
              Questions about White Willow, press inquiries, or notes for {siteConfig.studio} can be sent by email.
            </p>
          </header>
        </FadeContent>

        <AnimatedContent distance={32} duration={0.85} threshold={0.15} className="mt-16 sm:mt-20">
          <div className="space-y-12">
            <section aria-labelledby="contact-email-heading">
              <h2 id="contact-email-heading" className="text-xs font-semibold uppercase tracking-[0.22em] text-bark-soft">
                Email
              </h2>
              <p className="mt-4">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="break-all font-display text-3xl leading-tight text-forest underline decoration-[rgba(61,46,34,0.3)] underline-offset-8 transition-colors hover:text-ember sm:text-4xl lg:text-5xl"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
            </section>
          </div>
        </AnimatedContent>
      </div>
    </Container>
  );
}
