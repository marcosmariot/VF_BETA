import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider as CustomThemeProvider } from "@/contexts/ThemeContext";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vertical Fashion - Criação de Moda com IA",
  description: "Plataforma de criação de moda com inteligência artificial. Crie croquis, modelos, estampas e muito mais sem limites criativos.",
  keywords: "fashion, AI, design, moda, inteligência artificial, croquis, estampas, modelos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <CustomThemeProvider>
            <TranslationProvider>
              {children}
              <Toaster />
            </TranslationProvider>
          </CustomThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

