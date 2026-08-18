import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import SiteFooter from "@/components/Home/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "HackOn",
    template: "%s | HackOn",
  },

  description:
    "A complete platform to discover, create, manage and participate in hackathons.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-slate-950">
        <div className="flex-1">
          {children}
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}