export const siteConfig = {
  name: "White Willow",
  studio: "Kuwa Kuwitch Studio",
  description:
    "White Willow is a cozy medieval puzzle game about a witch running an herb shop in Brairwick, solving riddled orders, and staying hidden from the witch hunter.",
  contactEmail: "kuwakuwitch@gmail.com",
  testFlightUrl: "https://testflight.apple.com/join/UAeWFbJN" as string | null,
  testFlightLabel: "Join TestFlight",
  nav: [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
