import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { cn } from "@/lib/utils";
import "./globals.css";

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
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <Provider>
        <html
          lang="en"
          className={cn(
            "h-full",
            "antialiased",
            robotoCondensed.className
          )}
          suppressHydrationWarning
        >
          <body className="min-h-full flex flex-col">
            {children}
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}