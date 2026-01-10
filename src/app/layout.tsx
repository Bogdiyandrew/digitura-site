import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digitura.ro"),

  title: "Digitura - Partenerul tău strategic în digital",
  description: "Creăm site-uri web și experiențe digitale care nu doar arată bine, ci transformă vizitatorii în clienți. Contactează-ne pentru un prototip gratuit.",

  alternates: {
    canonical: '/',
  },


  icons: {
    icon: '/digituralogo.png',
    shortcut: '/digituralogo.png',
    apple: '/digituralogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisSmoothScroll>
          {children}
        </LenisSmoothScroll>
      </body>
    </html>
  );
}