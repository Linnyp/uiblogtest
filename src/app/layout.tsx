import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Love_Ya_Like_A_Sister,
  Inter,
} from "next/font/google";
import Link from "next/link";
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
        className={`${geistSans.variable} ${geistMono.variable} ${loveYaLikeASister.variable} ${inter.variable} antialiased min-h-screen bg-white`}
        data-fonts-loaded="true"
        data-love-ya-like-a-sister={loveYaLikeASister.variable}
        data-inter={inter.variable}
      >
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  Ord-X
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/blog"
                    className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Blog
                  </Link>
                </div>
              </div>
              <div className="md:hidden">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-md"
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Ord-X</h3>
                <p className="text-gray-300 mb-4">{SITE_CONFIG.description}</p>
                <p className="text-sm text-gray-400">
                  © 2024 {SITE_CONFIG.author}. All rights reserved.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Categories</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/blog?category=Guides"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog?category=News"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      News
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog?category=Tools"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Tools
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog?category=Analysis"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Analysis
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
