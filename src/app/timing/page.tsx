import ParseUltra from "@/components/parseUltra";
import GenerateResultsFromUltra from "@/components/generateResultsFromUltra";
import PageHeader from "@/components/pageHeader";
import { pages } from "@/config/site";
import { getParagraphStyle, getSubheaderStyle } from "@/styles/styles";
import clsx from "clsx";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: pages.timing.menuLabel,
};

function Section({ subheader, children }: { subheader: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <h1 className={getSubheaderStyle()}>{subheader}</h1>
      <div className={clsx("space-y-4 sm:pl-12", getParagraphStyle(false, false))}>{children}</div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Timing</span> Tools
      </PageHeader>
      <div className="space-y-12">
        <Section subheader="Parse Ultra">
          <ParseUltra />
        </Section>
        <Section subheader="Generate Results from Ultra">
          <GenerateResultsFromUltra />
        </Section>
      </div>
    </>
  );
}
