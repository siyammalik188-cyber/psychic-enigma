import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Echo of the Void King",
  description: "In a world that reads your soul — some are born unreadable. A manga series by Abu Sayeed Siyam.",
  openGraph: {
    title: "Echo of the Void King",
    description: "In a world that reads your soul — some are born unreadable.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
