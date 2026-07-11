import ParseUltra from "@/components/parseUltra";
import ParseUltraAndGenerateResults from "@/components/parseUltraAndGenerateResults";
import PageHeader from "@/components/pageHeader";
import { pages } from "@/config/site";
import { getParagraphStyle, getSubheaderStyle } from "@/styles/styles";
import clsx from "clsx";
import { Metadata } from "next";
import { ReactNode } from "react";
import { TabProps, Tabs } from "@heroui/react";

export const metadata: Metadata = {
  title: pages.timing.menuLabel,
};

function Section({ subheader, children }: { subheader: string; children: ReactNode }) {
  return (
    <div className="space-y-4 pt-6">
      <h1 className={getSubheaderStyle()}>{subheader}</h1>
      <div className={clsx("space-y-4", getParagraphStyle(false, false))}>{children}</div>
    </div>
  );
}

function Tab({ id, children }: TabProps) {
  return (
    <Tabs.Tab id={id} className="h-10">
      {children}
    </Tabs.Tab>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Timing</span> Tools
      </PageHeader>
      <Tabs className="pt-5">
        <Tabs.ListContainer className="mx-auto w-full max-w-sm">
          <Tabs.List aria-label="Options">
            <Tab id="parseUltra">
              Parse Ultra
              <Tabs.Indicator />
            </Tab>
            <Tab id="generateResultsFromUltra" className="h-10">
              Parse Ultra and Generate Results
              <Tabs.Indicator />
            </Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel id="parseUltra">
          <Section subheader="Parse Ultra">
            <ParseUltra />
          </Section>
        </Tabs.Panel>
        <Tabs.Panel id="generateResultsFromUltra">
          <Section subheader="Parse Ultra and Generate Results">
            <ParseUltraAndGenerateResults />
          </Section>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
