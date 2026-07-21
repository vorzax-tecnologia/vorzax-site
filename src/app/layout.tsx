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

const title =
  "Vorzax Tecnologia | Sistemas, Automação e Soluções Digitais";
const description =
  "A Vorzax desenvolve sistemas sob medida, automações, dashboards, sites e soluções digitais para empresas que querem reduzir retrabalho, ganhar controle e crescer.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Vorzax Tecnologia",
  },
  description,
  applicationName: "Vorzax Tecnologia",
  keywords: [
    "Vorzax",
    "tecnologia empresarial",
    "sistemas sob medida",
    "automação de processos",
    "dashboards",
    "business intelligence",
    "sites empresariais",
    "transformação digital",
    "gestão empresarial",
  ],
  authors: [{ name: "Vorzax Tecnologia" }],
  creator: "Vorzax Tecnologia",
  publisher: "Vorzax Tecnologia",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Vorzax Tecnologia",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
