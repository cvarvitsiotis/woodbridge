import { AsicsLogo } from "@/components/icons";
import { urls } from "@/config/data";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Metadata } from "next";
import { pages } from "@/config/site";
import { ReactNode } from "react";
import { getParagraphStyle } from "@/styles/styles";
import PageHeader from "@/components/pageHeader";

export const metadata: Metadata = {
  title: pages.sponsors.menuLabel,
};

function Sponsor({ url, motto, children }: { url: string; motto: string; children: ReactNode }) {
  return (
    <div className="grid items-center justify-center gap-x-10 gap-y-2 pt-12 md:auto-cols-fr md:grid-flow-col">
      <div className="justify-self-center md:justify-self-auto">
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
        Meet <span className="font-bold">Sponsors</span>
      </PageHeader>
      <p className={clsx("pt-8 text-center sm:pt-10", getParagraphStyle(true))}>
        The following are the sponsors that make this great meet possible.
      </p>
      <div className="mx-auto max-w-2xl">
        <Sponsor url={urls.sponsors.asics} motto="sound mind, sound body">
          <AsicsLogo height="h-16" />
        </Sponsor>
      </div>
    </>
  );
}
