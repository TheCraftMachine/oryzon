import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oryzon – Constructeur de maisons sur mesure à Caen, Calvados",
    template: "%s | Oryzon",
  },
  description:
    "Oryzon conçoit et construit votre maison sur mesure en Calvados. Construction, rénovation, agrandissement. Visualisez votre projet en réalité virtuelle avant le premier coup de pelle.",
  keywords: [
    "constructeur maison Caen",
    "construction sur mesure Calvados",
    "constructeur maison individuelle Normandie",
    "rénovation maison Caen",
    "agrandissement maison Calvados",
  ],
  authors: [{ name: "Oryzon" }],
  creator: "Oryzon",
  metadataBase: new URL("https://oryzon.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Oryzon",
    title: "Oryzon – Constructeur de maisons sur mesure à Caen",
    description:
      "Construisez la maison de vos rêves avec Oryzon. 30 ans de métier, un interlocuteur unique, et la réalité virtuelle pour visualiser votre projet.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${cinzel.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[--color-bg] text-[--color-text]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
