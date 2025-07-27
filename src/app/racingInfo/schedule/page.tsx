import { filteredRaces } from "@/config/races";
import { dates } from "@/config/dates";
import { Metadata } from "next";
import { pages } from "@/config/site";
import RacesTable from "@/components/racesTable";
import PageHeader from "@/components/pageHeader";
import clsx from "clsx";
import { getParagraphStyle } from "@/styles/styles";

export const metadata: Metadata = {
  title: pages.schedule.menuLabel,
};

function DayHeader({ date }: { date: string }) {
  return (
    <div
      className={clsx("text-center uppercase tracking-tighter", getParagraphStyle(false, false))}
    >
      {date}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader>
        Race <span className="font-bold">Schedule</span>
      </PageHeader>
      <div className="flex flex-wrap items-start justify-evenly gap-x-5 gap-y-8 pt-10">
        <div className="space-y-3">
          <DayHeader date={dates.meetStartDateParts.dayDescriptionMonthDayYearLong} />
          <RacesTable races={filteredRaces.fridayRaces} />
        </div>
        <div className="space-y-3">
          <DayHeader date={dates.meetEndDateParts.dayDescriptionMonthDayYearLong} />
          <RacesTable races={filteredRaces.saturdayNonFeaturedRaces} />
          <RacesTable races={filteredRaces.saturdayFeaturedRaces} isFeatured={true} />
        </div>
      </div>
    </>
  );
}
