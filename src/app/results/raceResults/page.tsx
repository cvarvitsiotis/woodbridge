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
          linkClass="bg-pink-100"
          labelClass="text-pink-800/70 border-pink-600/20 font-semibold"
          imageSrc={athletic}
          imageAspectRatio="aspect-8977/2235"
          imageClass="opacity-70"
        />
        <LiveResultsLink
          url={urls.athleticNet.runnerSpaceMeet}
          label="Live Video Stream"
          linkClass="bg-blue-800/40"
          labelClass="text-gray-50 border-zinc-100/30"
          imageSrc={runnerSpace}
          imageAspectRatio="aspect-11650/2554"
        />
      </div>

      <div className="pt-10">
        <PageHeader>
          <span className="font-bold">Official</span> Results
        </PageHeader>
      </div>

      <OfficialResults />
    </>
  );
}
