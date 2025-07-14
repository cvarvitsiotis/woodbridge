import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/styles/fonts";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import BreadcrumbsAndSponsor from "@/components/breadcrumbsAndSponsor";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.woodbridgeClassic,
    template: `%s - ${siteConfig.woodbridgeClassic}`,
  },
  description: siteConfig.woodbridgeCrossCountryClassic,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "bg-gradient-to-br from-indigo-200 from-50% to-[#ffd1b9] font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class" }}>
          <div className="relative flex min-h-dvh flex-col items-center space-y-3 sm:space-y-4">
            <Navbar />
            <main className="container flex grow flex-col space-y-3 px-3 sm:px-6">
              <BreadcrumbsAndSponsor />
              <div className="flex grow flex-col space-y-4">{children}</div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
