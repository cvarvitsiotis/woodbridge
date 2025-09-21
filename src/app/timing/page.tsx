import PageHeader from "@/components/pageHeader";
import RewindUltra from "@/components/rewindUltra";
import { pages } from "@/config/site";
import { getSubheaderStyle } from "@/styles/styles";
import clsx from "clsx";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: pages.timing.menuLabel,
};

function Subheader({ padTop, children }: { padTop?: boolean; children: ReactNode }) {
  return <h1 className={clsx(padTop && "pt-4", getSubheaderStyle())}>{children}</h1>;
}

function RewindUltraSection() {
  return (
    <>
      <Subheader>Rewind Ultra</Subheader>
      <RewindUltra />
    </>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Timing</span> Tools
      </PageHeader>
      <RewindUltraSection />
    </>
  );
}
