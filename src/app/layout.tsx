import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}