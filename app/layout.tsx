import type { Metadata } from "next";
import { DM_Serif_Display, Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3015";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VonWillingh Online — Custom web applications for South African businesses",
    template: "%s | VonWillingh Online",
  },
  description:
    "VonWillingh Online builds custom web applications for South African businesses — mortuary systems, property platforms, LMS, digital cards, and more.",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "VonWillingh Online",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
