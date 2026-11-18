import type { Metadata } from "next";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for White Willow, a game by Kuwa Kuwitch Studio.",
};

const sections = [
  { id: "scope", label: "Introduction and scope" },
  { id: "information-processed", label: "Information the game processes" },
  { id: "local-storage", label: "Information stored locally on your device" },
  { id: "game-center", label: "Apple Game Center and platform services" },
  { id: "analytics-diagnostics", label: "Analytics, diagnostics, and network communication" },
  { id: "sharing", label: "Third-party services and data sharing" },
  { id: "retention-deletion", label: "Data retention and deletion" },
  { id: "children", label: "Children's privacy" },
  { id: "security", label: "Security" },
  { id: "changes", label: "Changes to this Privacy Policy" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <Container className="py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <header className="max-w-3xl">
          <h1 className="mt-4 font-display text-5xl leading-[0.95] text-forest sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/85 sm:text-xl">
            This Privacy Policy explains how information is handled when you play <strong>White Willow</strong>, a game
            by {siteConfig.studio}.
          </p>
          <p className="mt-4 text-sm leading-7 text-herb-muted sm:text-base">Last updated: November 18, 2026</p>
        </header>

        <nav aria-label="Privacy policy contents" className="mt-12">
          <h2 className="font-display text-3xl text-forest">Contents</h2>
          <ol className="mt-4 space-y-2 text-base leading-7 sm:text-lg">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-forest hover:text-ember">
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-14 space-y-14">
          <section id="scope" aria-labelledby="scope-heading" className="scroll-mt-24">
            <h2 id="scope-heading" className="font-display text-3xl leading-tight text-forest sm:text-4xl">
              Introduction and scope
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
              <p>
                <strong>White Willow</strong> is a game developed by <strong>{siteConfig.studio}</strong> (&quot;we&quot;,
                &quot;us&quot;, or &quot;our&quot;). This Privacy Policy explains what information White Willow processes, what
                is stored on your device, and when information may be handled by third-party platform services.
              </p>
              <p>
                You do not need to create an account with us or provide personal information to us to play White Willow.
              </p>
            </div>
          </section>

          <section id="information-processed" aria-labelledby="information-processed-heading" className="scroll-mt-24">
            <h2 id="information-processed-heading" className="font-display text-3xl leading-tight text-forest sm:text-4xl">
              Information the game processes
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
              <p>
                White Willow processes gameplay information needed for the game to work as expected. This includes your
                progress, in-game resources, unlocks, and the preferences you choose in the game, such as audio and
                display settings.
              </p>
              <p>
                We use this information to run the game, save your progress, and remember your settings. White Willow
                does not require you to provide your name, email address, phone number, or other personal information to
                play.
              </p>
            </div>
          </section>

          <section id="local-storage" aria-labelledby="local-storage-heading" className="scroll-mt-24">
            <h2 id="local-storage-heading" className="font-display text-3xl leading-tight text-forest sm:text-4xl">
              Information stored locally on your device
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
              <p>
                White Willow stores your save data and game preferences locally on your device. This allows you to
                continue your progress and keep your settings between play sessions.
              </p>
              <p>
                Information stored locally on your device stays on your device unless you choose to use an optional
                platform service described in this policy. It is different from information sent to us or to another
                company.
              </p>
            </div>
          </section>

          <section id="game-center" aria-labelledby="game-center-heading" className="scroll-mt-24">
            <h2 id="game-center-heading" className="font-display text-3xl leading-tight text-forest sm:text-4xl">
              Apple Game Center and platform services
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
              <p>
                On supported Apple platforms, White Willow offers optional Apple Game Center features, such as
                achievements and access to the Game Center dashboard. Whether these features are available depends on
                your device, platform, and Game Center settings.
              </p>
              <p>
                Apple Game Center is a service provided by Apple, not by {siteConfig.studio}. If you choose to use Game
                Center, Apple may process information related to your Game Center account and activity, such as your
                player profile and achievements, under Apple&apos;s own terms and privacy practices.
              </p>
              <p>
                We do not control how Apple handles Game Center information. You can manage Game Center from your Apple
                device and account settings.
              </p>
            </div>
          </section>

          <section id="analytics-diagnostics" aria-labelledby="analytics-diagnostics-heading" className="scroll-mt-24">
            <h2
              id="analytics-diagnostics-heading"
              className="font-display text-3xl leading-tight text-forest sm:text-4xl"
            >
              Analytics, diagnostics, and network communication
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
              <p>
                White Willow does not use third-party analytics, advertising, or tracking services, and it does not
                include third-party crash reporting.
              </p>
              <p>
                White Willow does not send your gameplay information, save data, or personal information to servers
                operated by {siteConfig.studio}. If you use an optional platform service such as Apple Game Center,
                information needed for that service is handled by the platform provider as described above.
              </p>
            </div>
          </section>

          <section id="sharing" aria-labelledby="sharing-heading" className="scroll-mt-24">
            <h2 id="sharing-heading" className="font-display text-3xl leading-tight text-forest sm:text-4xl">
              Third-party services and data sharing
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
              <p>
                {siteConfig.studio} does not sell your personal information.
              </p>
              <p>
                White Willow does not share your information with third parties for advertising or analytics. If you use
                Apple Game Center or obtain White Willow through a platform or app store, those providers may handle
                information independently as part of their services, such as account management, downloads, licensing, or
                achievements. Their handling of information is governed by their own policies.
              </p>
            </div>
          </section>

          <section id="retention-deletion" aria-labelledby="retention-deletion-heading" className="scroll-mt-24">
            <h2 id="retention-deletion-heading" className="font-display text-3xl leading-tight text-forest sm:text-4xl">
              Data retention and deletion
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
              <p>
                Save data and settings stored by White Willow remain on your device until you remove them, overwrite
                them by playing, or delete the game or its local data. Removing the game may not remove all locally
                saved data on every device or platform, so you may need to delete the game&apos;s local data separately
                using your device or platform tools.
              </p>
              <p>
                If you use Apple Game Center, Apple manages Game Center data according to your Apple account and Apple&apos;s
                policies.
              </p>
            </div>
          </section>

          <section id="children" aria-labelledby="children-heading" className="scroll-mt-24">
            <h2 id="children-heading" className="font-display text-3xl leading-tight text-forest sm:text-4xl">
              Children&apos;s privacy
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
              <p>
                White Willow does not ask children or other players to provide personal information to {siteConfig.studio}{" "}
                to play. If you are a parent or guardian and have questions about privacy in White Willow or about a
                platform service such as Apple Game Center, please contact us or review the platform provider&apos;s
                privacy and family settings.
              </p>
            </div>
          </section>

          <section id="security" aria-labelledby="security-heading" className="scroll-mt-24">
            <h2 id="security-heading" className="font-display text-3xl leading-tight text-forest sm:text-4xl">
              Security
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
              <p>
                We take reasonable steps to design White Willow so that your game data is handled appropriately. Because
                save data and settings are stored on your device, their protection also depends on your device, operating
                system, and account security.
              </p>
            </div>
          </section>

          <section id="changes" aria-labelledby="changes-heading" className="scroll-mt-24">
            <h2 id="changes-heading" className="font-display text-3xl leading-tight text-forest sm:text-4xl">
              Changes to this Privacy Policy
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
              <p>
                We may update this Privacy Policy from time to time. If we make changes, we will update the &quot;Last
                updated&quot; date at the top of this page.
              </p>
            </div>
          </section>

          <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24">
            <h2 id="contact-heading" className="font-display text-3xl leading-tight text-forest sm:text-4xl">
              Contact
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
              <p>
                If you have questions about this Privacy Policy, you can contact {siteConfig.studio} at{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-forest hover:text-ember">
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
