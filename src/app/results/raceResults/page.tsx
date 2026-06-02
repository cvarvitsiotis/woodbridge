import { urls } from "@/config/data";
import { Metadata } from "next";
import { pages } from "@/config/site";
import OfficialResults from "@/components/officialResults";
import PageHeader from "@/components/pageHeader";
import ButtonLink from "@/components/buttonLink";

export const metadata: Metadata = {
  title: pages.raceResults.menuLabel,
};

function LiveLink({ url, label, isPrimary }: { url: string; label: string; isPrimary: boolean }) {
  return (
    <ButtonLink
      href={url}
      isExternal
      variant="outline"
      customVariantColor={isPrimary ? "ghostPrimary" : "ghostSecondary"}
    >
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
        <LiveLink url={urls.athleticNet.altheticLIVEMeet} label="Live Results" isPrimary={true} />
        <LiveLink
          url={urls.athleticNet.runnerSpaceMeet}
          label="Live Video Stream"
          isPrimary={false}
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
