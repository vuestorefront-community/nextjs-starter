import "./globals.css";
import type { Metadata } from "next";
import { SdkProvider } from "../sdk/sdk";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vue Storefront Next.js Starter",
  description: "Vue Storefront Next.js Starter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SdkProvider>
          {children}
        </SdkProvider>
      </body>
    </html>
  );
}