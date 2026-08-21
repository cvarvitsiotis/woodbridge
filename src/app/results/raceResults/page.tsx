import { urls } from "@/config/data";
import { Metadata } from "next";
import { pages } from "@/config/site";
import OfficialResults from "@/components/officialResults";
import PageHeader from "@/components/pageHeader";
import athletic from "@/../public/images/athletic.png";
import runnerSpace from "@/../public/images/runnerSpace.png";
import LiveResultsLink from "@/components/liveResultsLink";

export const metadata: Metadata = {
  title: pages.raceResults.menuLabel,
};

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Live</span> Results
      </PageHeader>

      <div className="flex justify-around pt-4 sm:justify-center sm:gap-15 sm:pt-8">
        <LiveResultsLink
          url={urls.athleticNet.altheticLIVEMeet}
          label="Live Results"
          linkClass="bg-gray-950/10"
          imageSrc={athletic}
          imageAspectRatio="aspect-8977/2235"
          imageClass="opacity-80"
        />
        <LiveResultsLink
          url={urls.athleticNet.runnerSpaceMeet}
          label="Live Video Stream"
          linkClass="bg-blue-800/50"
          imageSrc={runnerSpace}
          imageAspectRatio="aspect-11650/2554"
        />
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
