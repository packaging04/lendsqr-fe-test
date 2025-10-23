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

const workSans = localFont({
  src: [
    {
      path: "../assets/fonts/WorkSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

const SF_UI_Display_Thin = localFont({
  src: [
    {
      path: "../assets/fonts/fonnts.com-SF_UI_Display_Thin.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/fonnts.com-SF_Pro_Text_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/fonnts.com-SF_UI_Text_Regular.ttf",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-sfui",
});

const roboto = localFont({
  src: [
    {
      path: "../assets/fonts/Roboto-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Roboto-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
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
      className={`${geistSans.variable} ${geistMono.variable} ${avenirNext.variable} ${workSans.variable} ${roboto.variable} ${SF_UI_Display_Thin.variable}`}
    >
      <body className="font-avenir">{children}</body>
    </html>
  );
}
