import { urls } from "@/config/data";
import { Metadata } from "next";
import { pages } from "@/config/site";
import OfficialResults from "@/components/officialResults";
import PageHeader from "@/components/pageHeader";
import ButtonLink from "@/components/buttonLink";

export const metadata: Metadata = {
  title: pages.raceResults.menuLabel,
};

function LiveLink({ url, label }: { url: string; label: string }) {
  return (
    <ButtonLink href={url} isExternal variant="primary">
      {label}
    </ButtonLink>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Live</span> Results
      </PageHeader>
      <div className="mx-auto max-w-fit space-x-8 pt-4 sm:pt-8">
        <LiveLink url={urls.athleticNet.altheticLIVEMeet} label="Live Results" />
        <LiveLink url={urls.athleticNet.runnerSpaceMeet} label="Live Video Stream" />
      </div>

      <div className="pt-2 sm:pt-6">
        <PageHeader>
          <span className="font-bold">Official</span> Results
        </PageHeader>
      </div>

      <OfficialResults />
    </>
  );
}
