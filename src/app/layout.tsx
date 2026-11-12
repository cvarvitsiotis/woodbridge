import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "@/app/providers";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import BreadcrumbsAndSponsor from "@/components/breadcrumbsAndSponsor";
import { ReactNode } from "react";
import Body from "@/components/body";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { dates } from "@/config/dates";
import { getPageGutterStyle } from "@/styles/styles";
import clsx from "clsx";

const verticalStackStyle = "flex flex-col space-y-3 sm:space-y-4";

export const metadata: Metadata = {
  title: {
    default: siteConfig.woodbridgeClassic,
    template: `%s - ${siteConfig.woodbridgeClassic}`,
  },
  description: `${siteConfig.woodbridgeCrossCountryClassic}. The road to championships. ${dates.meetStartToEndDateShort}. ${dates.meetAge}${dates.meetAgeOrdinal} Annual.`,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <Body>
        <Providers>
          <div className={clsx("relative min-h-dvh items-center", verticalStackStyle)}>
            <Navbar />
            <div
              className={clsx("w-full grow items-center", verticalStackStyle, getPageGutterStyle())}
            >
              <main className={clsx("container grow", verticalStackStyle)}>
                <BreadcrumbsAndSponsor />
                <div className="flex grow flex-col space-y-4">{children}</div>
              </main>
              <Footer />
            </div>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </Body>
    </html>
  );
}
