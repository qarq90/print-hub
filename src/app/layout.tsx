import type { Metadata } from "next";
import "./globals.css";
import { PrimaryBar } from "@/components/PrimaryBar";
import { SecondaryBar } from "@/components/SecondaryBar";
import { Footer } from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "Print Hub | Home",
  description: "Your one-stop solution for all printing needs.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
          <meta name="theme-color" content="#f79817" />
        </head>
        <body className="flex justify-center items-center">
          <PrimaryBar />
          <SecondaryBar />
          <div>
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
