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

// URL de base pour les meta (og:image) — doit correspondre au domaine de déploiement
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "https://blacklayer.io";

const shareImageUrl = `${siteUrl}/share3.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "BlackLayer",
  description: "Compte à rebours BlackLayer — Lancement lundi 23 mars à 19h.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "BlackLayer",
    title: "BlackLayer",
    description: "Compte à rebours BlackLayer — Lancement lundi 23 mars à 19h.",
    images: [{ url: shareImageUrl, width: 1536, height: 1024, alt: "BlackLayer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackLayer",
    description: "Compte à rebours BlackLayer — Lancement lundi 23 mars à 19h.",
    images: [{ url: shareImageUrl, width: 1536, height: 1024, alt: "BlackLayer" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
