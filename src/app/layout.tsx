/**
 * External Dependencies
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

/**
 * Internal Dependencies
 */
import AboutInfo from "@/components/about-info/about-info";

/**
 * Styles
 */
import "./globals.css";

/**
 * Font Configuration
 * Inter font setup with Latin subset for optimal performance
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/**
 * Metadata Configuration
 * Defines SEO metadata for the application
 */
export const metadata: Metadata = {
  title: "Prompt Area - Advanced AI Prompt Input Box",
  description:
    "A powerful textarea input control for AI tools. Supports single-line and multi-line movements, copying, boundary handling, and more for seamless large prompt input management.",
};

/**
 * Root Layout Component
 * Provides the base structure for all pages in the application
 *
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {JSX.Element} The root layout structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className="font-sans antialiased tracking-tight"
        // Add basic accessibility attributes
        role="document"
        aria-label="Main content"
      >
        <main>{children}</main>
        <Toaster />
        <div
          className="absolute right-2 bottom-2 w-fit md:right-4 md:bottom-4"
          role="complementary"
          aria-label="About information"
        >
          <AboutInfo />
        </div>
      </body>
    </html>
  );
}
