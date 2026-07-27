import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: {
    default: "Ricardo Oya — Digital Retoucher",
    template: "%s | Ricardo Oya",
  },
  description:
    "Portfolio of Ricardo Oya, digital retoucher focused on automotive, lifestyle and commercial imagery.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />

          <div className="flex-1">{children}</div>

          <Footer />
        </div>
      </body>
    </html>
  );
}