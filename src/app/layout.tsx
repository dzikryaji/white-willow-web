import type { Metadata } from "next";
import { Charm, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import Noise from "@/components/Noise";
import { siteConfig } from "@/lib/site";

const display = Charm({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const body = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whitewillow.example"),
  title: {
    default: `${siteConfig.name} | A cozy medieval puzzle game`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "White Willow",
    "cozy puzzle game",
    "medieval",
    "witch",
    "herb shop",
    "potion making",
    "deduction",
    "macOS",
  ],
  openGraph: {
    title: `${siteConfig.name} | A cozy medieval puzzle game`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | A cozy medieval puzzle game`,
    description: siteConfig.description,
  },
  icons: {
    icon: "/images/studio-icon.png",
    apple: "/images/studio-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <SmoothScroll>
          <Noise fixed opacity={0.055} size={1} fps={0} blendMode="soft-light" contrast={0.35} />
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
