import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import BreadcrumbsAndSponsor from "@/components/breadcrumbsAndSponsor";
import { ReactNode } from "react";
import Body from "@/components/body";

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

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <Body>
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
      </Body>
    </html>
  );
}
