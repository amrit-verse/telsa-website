import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { organization } from "@/lib/data/organization";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export const metadata: Metadata = {
  title: {
    template: `%s | ${organization.shortName}`,
    default: organization.name,
  },
  description: "The official website and management platform for TeLSA, promoting legal education, unity, and social justice among Terai/Madhesh law students.",
  keywords: ["TeLSA", "Law Students", "Nepal", "Terai", "Madhesh", "Legal Education", "Moot Court"],
  metadataBase: new URL(organization.domain),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: organization.name,
    description: "Promoting legal education and social justice among Terai/Madhesh law students.",
    url: organization.domain,
    siteName: organization.name,
    locale: "en_NP",
    type: "website",
    // images: [{ url: "/og-image.png", width: 1200, height: 630 }], // Placeholder for actual OG image
  },
  twitter: {
    card: "summary_large_image",
    title: organization.name,
    description: "Promoting legal education and social justice among Terai/Madhesh law students.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: organization.name,
    alternateName: organization.shortName,
    url: organization.domain,
    // logo: `${organization.domain}/logo.png`, // Uncomment when logo exists
    contactPoint: {
      "@type": "ContactPoint",
      telephone: organization.phone,
      contactType: "office",
      email: organization.email,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ward No. 1",
      addressLocality: "Pokhara Metropolitan City",
      addressRegion: "Kaski",
      addressCountry: "NP",
    },
    sameAs: [
      organization.socials.facebook,
      organization.socials.twitter,
      organization.socials.instagram,
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
