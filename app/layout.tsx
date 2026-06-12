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
  description: "Terai Law Students Association (TeLSA) - तराई कानुन विद्यार्थी मञ्च - is a student-led organization at Prithvi Narayan Campus, established in 2080 B.S., dedicated to legal education, moot court activities, and legal awareness for law students from the Terai/Madhesh region.",
  keywords: ["TeLSA", "Law Students", "Nepal", "Terai", "Madhesh", "Student-led legal organization", "Prithvi Narayan Campus", "Established 2080 B.S.", "Legal education", "Moot court activities", "Legal awareness", "Terai Law Association", "Terai Law Students Association Nepal", "Terai Kanun Bidhyarthi Manch", "तराई कानुन विद्यार्थी मञ्च"],
  metadataBase: new URL("https://www.terailawassociation.org.np"),
  alternates: {
    canonical: "https://www.terailawassociation.org.np",
  },
  openGraph: {
    title: organization.name,
    description: "Promoting legal education and social justice among Terai/Madhesh law students.",
    url: "https://www.terailawassociation.org.np",
    siteName: organization.name,
    locale: "en_NP",
    type: "website",
    images: [{ url: "https://www.terailawassociation.org.np/opengraph-image.png", width: 1200, height: 630 }],
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
  verification: {
    google: "tyakn6YFnmtpgOjL4mUI8AdBN2G0y4BWv4APQyZ3Vpw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": `${organization.domain}/#organization`,
        name: organization.name,
        alternateName: [
          "TELSA",
          "Terai Law Association",
          "Terai Kanun Bidhyarthi Manch",
          "तराई कानुन विद्यार्थी मञ्च"
        ],
        url: organization.domain,
        logo: `${organization.domain}/images/telsa-logo.jpeg`,
        description: "Student-led legal organization promoting legal education, leadership, advocacy, research, and opportunities for law students.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: organization.phone,
          contactType: "office",
          email: organization.email,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Prithvi Narayan Campus",
          addressLocality: "Pokhara",
          addressRegion: "Gandaki",
          addressCountry: "NP",
        },
        foundingDate: "2080 B.S.",
        sameAs: [
          organization.socials.facebook,
          organization.socials.twitter,
          organization.socials.instagram,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${organization.domain}/#website`,
        url: organization.domain,
        name: organization.name,
        description: "Official representative body for Terai-origin law students at Prithvi Narayan Campus.",
        publisher: {
          "@id": `${organization.domain}/#organization`
        }
      }
    ]
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
