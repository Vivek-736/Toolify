import type { Metadata } from "next";
import { Roboto_Condensed, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Toolify - Intelligent Agent",
  description: "A powerful, tool-enabled AI agent built with Next.js 16, Gemini AI and LangGraph. Designed to automate tasks by interacting with real-world data sources through custom-configured tools.",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", robotoCondensed.className, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}