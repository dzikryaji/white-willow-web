import Image from "next/image";
import Link from "next/link";
import FadeContent from "@/components/FadeContent";
import AnimatedContent from "@/components/AnimatedContent";
import ScrollReveal from "@/components/ScrollReveal";
import DarkNarrativeChapter from "@/components/DarkNarrativeChapter";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.24em] text-bark-soft sm:text-sm">{children}</p>;
}

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      <section className="relative flex min-h-svh items-center pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/approved/MainMenuBackground.png"
            alt="A medieval village scene surrounding White Willow"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center mask-b-from-20% mask-b-to-80%"
          />
        </div>

        <Container className="relative">
          <FadeContent trigger="mount" duration={1.1} blur={8} initialOpacity={0} className="max-w-4xl">
            <h1 className="mt-18 font-display text-5xl leading-[0.95] text-forest sm:text-6xl md:text-7xl lg:text-8xl">
              White Willow
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink sm:text-lg sm:leading-8 lg:text-xl">
              A cozy puzzle game set in the medieval era, where you play as a witch running an herb shop while hiding
              your true identity.
            </p>
          </FadeContent>
        </Container>
      </section>

      <section id="shop" className="py-16 sm:py-24 lg:py-28">
        <Container>
          <FadeContent trigger="scroll" threshold={0.15} duration={0.9} blur={6} initialOpacity={0}>
            <div className="max-w-3xl">
              <SectionEyebrow>The witch and her herb shop</SectionEyebrow>
              <h2 className="mt-3 font-display text-4xl leading-[1.02] text-forest sm:text-5xl lg:text-6xl">
                A quiet shop in Brairwick
              </h2>
              <p className="mt-5 text-base leading-8 text-ink/85 sm:text-lg">
                Step behind the counter of White Willow, an ordinary herb shop with an extraordinary secret.
              </p>
            </div>
          </FadeContent>

          <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <AnimatedContent distance={32} duration={0.85} threshold={0.18}>
              <ScrollReveal
                baseOpacity={0.08}
                enableBlur
                blurStrength={5}
                baseOffset={8}
                splitBy="words"
                stagger={0.03}
                mode="enter"
                duration={0.9}
                textClassName="!text-inherit !text-[length:inherit] !leading-[inherit] !font-normal font-display text-3xl leading-snug text-forest sm:text-4xl lg:text-5xl"
              >
                You are a witch, living as a shopkeeper among the people of Brairwick.
              </ScrollReveal>
              <div className="mt-6 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
                <p>
                  Each day, villagers come to your door seeking relief from everyday troubles. You welcome them, listen
                  closely, and offer the help they need, all while keeping your magical identity hidden in plain sight.
                </p>
                <p>
                  The shop is warm and familiar, but every kindness is careful. To belong in Brairwick, you must seem
                  ordinary, even when your craft is anything but.
                </p>
              </div>
            </AnimatedContent>
            <AnimatedContent paperCrumple={0.48} paperSeed={7} distance={34} reverse duration={1} threshold={0.18}>
              <figure className="space-y-3">
                <div className="overflow-hidden">
                  <Image
                    src="/images/stock/bruegel-haymaking-village.jpg"
                    alt="A medieval village scene evoking Brairwick"
                    width={1200}
                    height={900}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                </div>
                <figcaption className="text-sm leading-6 text-herb-muted">
                  Brairwick is a place of simple routines, watchful neighbors, and quiet hopes.
                </figcaption>
              </figure>
            </AnimatedContent>
          </div>

          <div className="mt-20 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <AnimatedContent distance={34} duration={0.85} threshold={0.18} className="lg:order-2">
              <h3 className="font-display text-3xl leading-tight text-forest sm:text-4xl">Help arrives in small remedies</h3>
              <div className="mt-5 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
                <p>
                  Your shelves hold herbs, notes, and preparations for the ailments and worries that bring people to your
                  door. To the village, you are a helpful herbalist. Only you know the truth you must protect.
                </p>
              </div>
            </AnimatedContent>
            <AnimatedContent paperCrumple={0.48} paperSeed={11} distance={34} reverse duration={1} threshold={0.18} className="lg:order-1">
              <figure className="space-y-3">
                <div className="overflow-hidden">
                  <Image
                    src="/images/stock/apothecary-interior.jpg"
                    alt="An apothecary interior filled with jars and herbs"
                    width={1200}
                    height={900}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                </div>
                <figcaption className="text-sm leading-6 text-herb-muted">
                  Jars, bundles, and careful preparations line the heart of the shop.
                </figcaption>
              </figure>
            </AnimatedContent>
          </div>
        </Container>
      </section>

      <section id="riddled-orders" className="py-16 sm:py-24 lg:py-28">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <AnimatedContent distance={32} duration={0.85} threshold={0.15}>
              <SectionEyebrow>Riddled orders</SectionEyebrow>
              <h2 className="mt-3 font-display text-4xl leading-[1.02] text-forest sm:text-5xl lg:text-6xl">
                Listen for what is not said
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
                <p>
                  Villagers rarely tell you exactly what they need. They arrive with riddles, metaphors, symptoms, and
                  incomplete descriptions, hoping you can understand the trouble behind their words.
                </p>
                <p>
                  As the witch of White Willow, you must interpret each request carefully. What sounds like a strange
                  complaint or a half-told story may be the clue that leads to the right remedy.
                </p>
              </div>
            </AnimatedContent>
            <AnimatedContent distance={32} duration={0.85} threshold={0.15}>
              <figure className="space-y-3 lg:pt-8">
                <Image
                  src="/images/stock/medical-substances-manuscript.jpg"
                  alt="A manuscript page of medical substances"
                  width={1000}
                  height={800}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 35vw, 100vw"
                />
                <figcaption className="text-sm leading-6 text-herb-muted">
                  Every request is a puzzle of signs, symptoms, and meaning.
                </figcaption>
              </figure>
            </AnimatedContent>
          </div>
        </Container>
      </section>

      <section id="guidebook" className="py-16 sm:py-24 lg:py-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <AnimatedContent distance={32} duration={0.85} threshold={0.15} className="lg:order-2">
              <SectionEyebrow>Consult the guidebook</SectionEyebrow>
              <h2 className="mt-3 font-display text-4xl leading-[1.02] text-forest sm:text-5xl lg:text-6xl">
                Turn clues into knowledge
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
                <p>
                  When a request is unclear, you turn to your guidebook. Study herbs, ingredients, remedies, and clues to
                  understand what a customer truly needs.
                </p>
                <p>
                  The guidebook helps you connect symptoms to the right treatment, transforming riddled orders into clear
                  answers you can act on.
                </p>
              </div>
            </AnimatedContent>
            <AnimatedContent paperCrumple={0.42} paperSeed={13} distance={34} reverse duration={1} threshold={0.18} className="lg:order-1">
              <figure className="space-y-3">
                <Image
                  src="/images/stock/mandragora-tacuinum.jpg"
                  alt="A historical herbal illustration used as reference knowledge"
                  width={1000}
                  height={800}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
                <figcaption className="text-sm leading-6 text-herb-muted">
                  Herbs and remedies become clear when you know where to look.
                </figcaption>
              </figure>
            </AnimatedContent>
          </div>
        </Container>
      </section>

      <section id="potion" className="py-16 sm:py-24 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimatedContent distance={32} duration={0.85} threshold={0.15}>
              <SectionEyebrow>Create the potion</SectionEyebrow>
              <h2 className="mt-3 font-display text-4xl leading-[1.02] text-forest sm:text-5xl lg:text-6xl">
                Prepare the remedy with care
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
                <p>
                  Once you understand the request, it is time to act. Choose the appropriate herbs and prepare the potion
                  that will answer your customer&apos;s need.
                </p>
                <p>
                  Selecting the correct ingredients matters. A thoughtful remedy brings comfort and trust, while the wrong
                  choice can leave a problem unsolved.
                </p>
              </div>
            </AnimatedContent>
          </div>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <AnimatedContent distance={32} duration={0.85} threshold={0.15}>
              <figure className="space-y-3">
                <Image
                  src="/images/stock/alchemist-laboratory-wyck.jpg"
                  alt="An alchemist laboratory scene representing potion preparation"
                  width={1200}
                  height={900}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <figcaption className="text-sm leading-6 text-herb-muted">
                  Careful hands and the right ingredients turn knowledge into healing.
                </figcaption>
              </figure>
            </AnimatedContent>
            <AnimatedContent distance={32} duration={0.85} threshold={0.15}>
              <div className="border-l border-[var(--line-strong)] pl-5 sm:pl-7">
                <h3 className="font-display text-3xl leading-tight text-forest sm:text-4xl">The rhythm of each day</h3>
                <ol className="mt-6 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
                  <li>
                    <span className="font-semibold text-forest">1. Customer arrives.</span> A villager brings a need
                    wrapped in hints and uncertainty.
                  </li>
                  <li>
                    <span className="font-semibold text-forest">2. Interpret the riddle.</span> Listen closely and make
                    sense of what they are asking for.
                  </li>
                  <li>
                    <span className="font-semibold text-forest">3. Consult the guidebook.</span> Connect symptoms and
                    clues to the right ingredients and remedies.
                  </li>
                  <li>
                    <span className="font-semibold text-forest">4. Select herbs.</span> Choose the ingredients that fit
                    the treatment.
                  </li>
                  <li>
                    <span className="font-semibold text-forest">5. Prepare the remedy.</span> Create the potion and serve
                    your customer with care.
                  </li>
                </ol>
              </div>
            </AnimatedContent>
          </div>
        </Container>
      </section>

      <DarkNarrativeChapter />

      <section id="memory-spell" className="py-16 sm:py-24 lg:py-28">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <AnimatedContent distance={32} duration={0.85} threshold={0.15}>
              <SectionEyebrow>Memory Spell Minigame</SectionEyebrow>
              <h2 className="mt-3 font-display text-4xl leading-[1.02] text-forest sm:text-5xl lg:text-6xl">
                Hold on to what matters
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-ink/85 sm:text-lg">
                <p>
                  Memory Spell is a gameplay mechanic that challenges your memory and observation. Customers arrive with
                  personalities, needs, and clues, and remembering those details can make the difference when it is time
                  to help.
                </p>
                <p>
                  By paying attention and recalling what you have learned, you connect observation to action. Memory
                  Spell turns careful noticing into an important part of fulfilling each order.
                </p>
              </div>
            </AnimatedContent>
            <AnimatedContent distance={32} duration={0.85} threshold={0.15}>
              <figure className="space-y-3 lg:pt-8">
                <Image
                  src="/images/stock/mandragora-tacuinum.jpg"
                  alt="A herbal illustration representing memory, symbols, and observation"
                  width={1000}
                  height={800}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <figcaption className="text-sm leading-6 text-herb-muted">
                  Details noticed in one moment may become the key to the next remedy.
                </figcaption>
              </figure>
            </AnimatedContent>
          </div>
        </Container>
      </section>

      <section id="survive" className="py-16 sm:py-24 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <FadeContent trigger="scroll" threshold={0.15} duration={0.9} blur={6} initialOpacity={0}>
              <SectionEyebrow>Survive 14 days</SectionEyebrow>
              <h2 className="mt-3 font-display text-4xl leading-[1.02] text-forest sm:text-5xl lg:text-6xl">
                Keep the shop running, day after day
              </h2>
              <p className="mt-5 text-base leading-8 text-ink/85 sm:text-lg">
                Your journey in White Willow unfolds across 14 days. Each day asks you to balance the comfort of shop life
                with the tension of a secret that must never be revealed.
              </p>
            </FadeContent>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Fulfill villagers' orders",
                text: "Welcome each customer and prepare the remedy they need.",
              },
              {
                title: "Interpret challenging riddles",
                text: "Read between symptoms, metaphors, and incomplete descriptions.",
              },
              {
                title: "Prepare the correct remedies",
                text: "Consult your guidebook and choose the right herbs with care.",
              },
              {
                title: "Remember important information",
                text: "Use observation and memory to stay one step ahead.",
              },
              {
                title: "Avoid suspicion",
                text: "Help the village without drawing the witch hunter's attention.",
              },
              {
                title: "Keep the shop running",
                text: "Manage each day of your 14-day journey and protect your hidden life.",
              },
            ].map((item, index) => (
              <AnimatedContent key={item.title} distance={28} duration={0.8} threshold={0.12} delay={index * 0.03}>
                <div className="h-full border-t border-[var(--line-strong)] pt-5">
                  <h3 className="font-display text-2xl leading-tight text-forest sm:text-[1.7rem]">{item.title}</h3>
                  <p className="mt-3 text-base leading-8 text-ink/85">{item.text}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24 lg:py-28">
        <Container>
          <AnimatedContent distance={32} duration={0.85} threshold={0.12}>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-bark-soft">White Willow</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl lg:text-6xl">
                Keep the shop open. Keep the secret safe.
              </h2>
              <p className="mt-6 text-base leading-8 text-ink/85 sm:text-lg">
                Brew cures, solve riddled orders, and live quietly in Brairwick for as long as you can.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                {siteConfig.testFlightUrl ? (
                  <a
                    href={siteConfig.testFlightUrl}
                    className="inline-flex items-center justify-center border border-[rgba(61,46,34,0.45)] bg-[rgba(61,46,34,0.92)] px-6 py-3 text-sm font-semibold tracking-[0.08em] !text-paper no-underline transition-colors hover:bg-forest hover:!text-paper"
                  >
                    {siteConfig.testFlightLabel}
                  </a>
                ) : null}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-[rgba(61,46,34,0.45)] bg-[rgba(251,247,239,0.7)] px-6 py-3 text-sm font-semibold tracking-[0.08em] text-forest no-underline transition-colors hover:bg-[rgba(244,236,222,0.9)]"
                >
                  Contact the studio
                </Link>
              </div>
            </div>
          </AnimatedContent>
        </Container>
      </section>
    </div>
  );
}
