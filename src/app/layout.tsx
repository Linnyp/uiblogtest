import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Love_Ya_Like_A_Sister,
  Inter,
} from "next/font/google";
import { SITE_CONFIG } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const loveYaLikeASister = Love_Ya_Like_A_Sister({
  variable: "--font-love-ya-like-a-sister",
  subsets: ["latin"],
  weight: "400", // This font only has one weight
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.author }],
  keywords: [
    "Bitcoin",
    "Ordinals",
    "NFT",
    "Blockchain",
    "Cryptocurrency",
    "Digital Assets",
    "Bitcoin Inscriptions",
  ],
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.title,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${loveYaLikeASister.variable} ${inter.variable} antialiased min-h-screen`}
        data-fonts-loaded="true"
        data-love-ya-like-a-sister={loveYaLikeASister.variable}
        data-inter={inter.variable}
      >

        <main>{children}</main>

      </body>
    </html>
  );
}
