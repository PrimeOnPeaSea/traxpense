import type { Metadata } from "next";
import { Open_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Traxpense",
  description:
    "A simple expense tracker to help you keep track of all your expenses.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Traxpense",
    description:
      "A simple expense tracker to help you keep track of all your expenses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traxpense",
    description:
      "A simple expense tracker to help you keep track of all your expenses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
