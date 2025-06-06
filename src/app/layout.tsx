import type { Metadata } from "next";
import "./globals.css";
import { PrimaryBar } from "@/components/PrimaryBar";
import { SecondaryBar } from "@/components/SecondaryBar";
import { Footer } from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
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
