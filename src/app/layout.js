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
    default: "NexKripa | Community-Based Hackathon for Social Innovation",
    template: "%s | NexKripa Social Innovation",
  },

  description:
    "A full-stack social innovation platform where community members report real-world grassroots challenges and multidisciplinary teams build sustainable solutions.",
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