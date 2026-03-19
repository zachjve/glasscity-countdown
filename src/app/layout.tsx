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
    url: "https://glasscity.io",
    siteName: "BlackLayer",
    title: "BlackLayer",
    description: "Compte à rebours BlackLayer — Lancement lundi 23 mars à 19h.",
    images: [{ url: "/share.png", width: 1200, height: 630, alt: "BlackLayer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlackLayer",
    description: "Compte à rebours BlackLayer — Lancement lundi 23 mars à 19h.",
    images: [{ url: "/share.png", width: 1200, height: 630, alt: "BlackLayer" }],
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
