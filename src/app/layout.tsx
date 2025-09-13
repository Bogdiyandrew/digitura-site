import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // <-- ADAUGĂ LINIA DE MAI JOS 
  metadataBase: new URL("https://digitura.ro"),

  title: "Digitura - Partenerul Tău Strategic în Digital",
  description: "Creăm site-uri web și experiențe digitale care nu doar arată bine, ci transformă vizitatorii în clienți. Contactează-ne pentru un prototip gratuit.",
  
  // <-- ADAUGĂ ACESTE 3 LINII
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <-- AM SCHIMBAT AICI "en" ÎN "ro"
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}