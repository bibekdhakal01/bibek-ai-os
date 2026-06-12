import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono, Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/src/components/layout/ClientLayoutWrapper";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BIBEK AI OS - Identity System",
  description: "Futuristic digital identity operating system of Bibek Dhakal, Software Engineer & AI OS Architect.",
  keywords: ["Bibek Dhakal", "Software Engineer", "AI OS Portfolio", "Creative Developer", "Kathmandu", "Nepal"],
  authors: [{ name: "Bibek Dhakal" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${shareTechMono.variable} ${inter.variable} h-full select-none overflow-hidden bg-black text-slate-100 antialiased`}
    >
      <body className="h-full w-full bg-black select-none overflow-hidden">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}

