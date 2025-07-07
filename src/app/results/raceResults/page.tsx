import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";

import { urls } from "@/config/data";
import { Metadata } from "next";
import { pages } from "@/config/site";
import OfficialResults from "@/components/officialResults";

export const metadata: Metadata = {
  title: pages.raceResults.menuLabel,
};

function LiveLink({ url, label, isPrimary }: { url: string; label: string; isPrimary: boolean }) {
  return (
    <Button
      isExternal
      as={Link}
      className={buttonStyles({
        color: isPrimary ? "primary" : "secondary",
        radius: "full",
        variant: "ghost",
      })}
      href={url}
    >
      {label}
    </Button>
  );
}

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        <span className="font-bold">Live</span> Results
      </h1>
      <div className="mx-auto max-w-fit space-x-8 pt-4 sm:pt-8">
        <LiveLink url={urls.athleticNet.irvineTimingMeet} label="Live Results" isPrimary={true} />
        <LiveLink
          url={urls.athleticNet.runnerSpaceMeet}
          label="Live Video Stream"
          isPrimary={false}
        />
      </div>

      <h1 className="pt-6 text-center text-2xl font-extralight sm:pt-14 sm:text-3xl">
        <span className="font-bold">Official</span> Results
      </h1>

      <OfficialResults />
    </>
  );
}
