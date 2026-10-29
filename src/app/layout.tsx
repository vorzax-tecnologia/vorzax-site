import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.vorzax.com.br";
const siteName = "Vorzax Tecnologia";
const isProduction = process.env.VERCEL_ENV === "production";
const title =
  "Vorzax Tecnologia | Sites Profissionais, Automação e Sistemas";
const description =
  "Sites institucionais e landing pages profissionais para empresas. A Vorzax também desenvolve automações, dashboards, BI e sistemas sob medida.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Vorzax Tecnologia",
  },
  description,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  alternateName: "Vorzax",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/vorzax-logo-oficial.png`,
    contentUrl: `${siteUrl}/vorzax-logo-oficial.png`,
    width: 604,
    height: 172,
  },
  image: `${siteUrl}/vorzax-logo-oficial.png`,
  description,
  email: "contato@vorzax.com.br",
  telephone: "+5531990681495",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contato@vorzax.com.br",
    telephone: "+5531990681495",
    availableLanguage: ["Portuguese"],
  },
  sameAs: ["https://www.instagram.com/vorzaxoficial/"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  alternateName: "Vorzax",
  inLanguage: "pt-BR",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = JSON.stringify([organizationJsonLd, websiteJsonLd]).replace(
    /</g,
    "\\u003c"
  );

  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </body>
    </html>
  );
}
