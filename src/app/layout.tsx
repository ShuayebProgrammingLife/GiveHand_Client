import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GiveHand | Give a hand, warm a heart",
  description:
    "GiveHand is a community platform to create, join and track winter clothes, blanket and other social service events.",
};

const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem("theme");
    var dark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={geist.className}>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <Navbar />
        {children}
        <Toaster richColors position="top-right" />
      </body> */}

      <body className={`${geist.className} flex min-h-screen flex-col`}>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
