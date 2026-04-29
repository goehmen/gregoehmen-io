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
  title: {
    template: "%s | Greg Oehmen",
    default: "Greg Oehmen | AI-Native Building & Fractional CPO",
  },
  description: "Apply product judgment at the execution layer. AI-native building advisory for senior leaders. Fractional CPO for startups.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Greg Oehmen | AI-Native Building & Fractional CPO",
    description: "Structured, spec-driven AI-native building for senior product and engineering leaders. Fractional CPO for early-stage startups. Partner with Greg Oehmen — 15+ years at Visa, Pivotal, and Salesforce.",
    url: "https://gregoehmen.io",
    siteName: "Greg Oehmen",
    images: [
      {
        url: "https://gregoehmen.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Greg Oehmen — AI-Native Building & Fractional CPO",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greg Oehmen | AI-Native Building & Fractional CPO",
    description: "Structured, spec-driven AI-native building for senior product and engineering leaders. Fractional CPO for early-stage startups. Partner with Greg Oehmen — 15+ years at Visa, Pivotal & Salesforce.",
    images: ["https://gregoehmen.io/og-image.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
