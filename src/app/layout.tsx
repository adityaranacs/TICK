import type React from "react";
import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";

import { TRPCReactProvider } from "@/trpc/react";
import { AbilityProvider } from "@/providers/ability-context";
import {
  ConsentManagerDialog,
  ConsentManagerProvider,
  CookieBanner,
} from "@c15t/nextjs";
import { Analytics } from "@vercel/analytics/next";

import ClientLoaderWrapper from "@/components/ClientLoaderWrapper"; // ✅ new wrapper

export const metadata: Metadata = {
  title: "tick | AI Powered Human Resource Management System",
  description: "A comprehensive HRMS solution leveraging AI for enhanced efficiency.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};


const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body>
        {/* 👇 Global loader now runs safely on client only */}
        <ClientLoaderWrapper />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <AbilityProvider>
              <Suspense fallback={null}>
                <ConsentManagerProvider
                  options={{
                    mode: "c15t",
                    backendURL: "/api/c15t",
                  }}
                >
                  {children}
                  <Analytics />
                  <ConsentManagerDialog />
                  <CookieBanner />
                </ConsentManagerProvider>
              </Suspense>
            </AbilityProvider>
            <Toaster position="top-right" />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
