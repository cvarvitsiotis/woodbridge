import GreatParkLogo, { AsicsLogo, IrvineTimingLogo } from "@/components/icons";
import { urls } from "@/config/data";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";
import { ReactNode } from "react";
import { getParagraphStyle } from "@/styles/styles";
import PageHeader from "@/components/pageHeader";
import Image from "next/image";
import athletic from "@/../public/images/athletic.png";

export const metadata: Metadata = {
  title: pages.partners.menuLabel,
};

function Sponsor({ url, motto, children }: { url: string; motto: string; children: ReactNode }) {
  return (
    <div className="grid items-center justify-center gap-x-2 gap-y-2 pt-12 md:auto-cols-fr md:grid-flow-col">
      <div className="justify-self-center rounded-4xl md:justify-self-auto">
        <Link isExternal href={url}>
          {children}
        </Link>
      </div>
      <p
        className={clsx(
          "justify-self-center md:justify-self-auto",
          getParagraphStyle(false, false),
        )}
      >
        {motto}
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader>
        Meet <span className="font-bold">Partners</span>
      </PageHeader>
      <p className={clsx("pt-8 text-center sm:pt-10", getParagraphStyle(true))}>
        Our partners make this great meet possible.
      </p>
      <div className="mx-auto max-w-xl">
        <Sponsor url={urls.partners.asics} motto="sound mind, sound body">
          <AsicsLogo height="h-16" />
        </Sponsor>
        <Sponsor url={urls.partners.athletic} motto="The digital hub for the running community">
          <div className="relative aspect-8977/2235 h-15">
            <Image fill src={athletic} quality={100} alt={siteConfig.athleticNet} />
          </div>
        </Sponsor>
        <Sponsor url={urls.athleticNet.irvineTiming} motto="Measure the moment">
          <IrvineTimingLogo height="h-32" />
        </Sponsor>
        <Sponsor url={urls.partners.asics} motto="Grounded in history, driven by community">
          <GreatParkLogo />
        </Sponsor>
      </div>
    </>
  );
}
