import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const avenirNext = localFont({
  src: [
    {
      path: "../assets/fonts/AvenirNextLTPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/AvenirNextLTPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/AvenirNextLTPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-avenir-next",
});

export const metadata: Metadata = {
  title: "Lendsqr Test App",
  description: "Demo app for Lendsqr dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${avenirNext.variable}`}
    >
      <body className="font-avenir">{children}</body>
    </html>
  );
}
