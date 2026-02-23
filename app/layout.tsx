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
  title: "Greg Oehmen | FCPO",
  description: "Fractional CPO for early-stage startups. I partner with founders to turn product vision into validated, engineering-ready roadmaps.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Greg Oehmen | Fractional CPO for Early-Stage Startups",
    description: "I partner with founders to turn product vision into validated, engineering-ready roadmaps.",
    url: "https://gregoehmen-io.vercel.app",
    siteName: "Greg Oehmen",
    images: [
      {
        url: "https://gregoehmen-io.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Greg Oehmen - Fractional CPO",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greg Oehmen | Fractional CPO for Early-Stage Startups",
    description: "I partner with founders to turn product vision into validated, engineering-ready roadmaps.",
    images: ["https://gregoehmen-io.vercel.app/og-image.png"],
  },
  /*
  openGraph: {
    title: "Greg Oehmen | Fractional CPO",
    description: "Fractional CPO for early-stage startups. I partner with founders to turn product vision into validated, engineering-ready roadmaps.",
    url: "https://gregoehmen.io",
    siteName: "Greg Oehmen",
    images: [
      {
        url: "https://gregoehmen.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Greg Oehmen - Fractional CPO",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greg Oehmen | Fractional CPO",
    description: "Fractional CPO for early-stage startups.",
    images: ["https://gregoehmen.io/og-image.png"],
  },*/
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
