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

export const metadata: Metadata = {
  metadataBase: new URL('https://glasscity.io'),
  title: "GlassCity",
  description: "Compte à rebours GlassCity — Lancement lundi 23 mars à 19h.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://glasscity.io",
    siteName: "GlassCity",
    title: "GlassCity",
    description: "Compte à rebours GlassCity — Lancement lundi 23 mars à 19h.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GlassCity",
    description: "Compte à rebours GlassCity — Lancement lundi 23 mars à 19h.",
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
