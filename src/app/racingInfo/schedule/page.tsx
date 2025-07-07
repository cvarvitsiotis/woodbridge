import { filteredRaces } from "@/config/races";
import { dates } from "@/config/dates";
import { Metadata } from "next";
import { pages } from "@/config/site";
import RacesTable from "@/components/racesTable";

export const metadata: Metadata = {
  title: pages.schedule.menuLabel,
};

function DayHeader({ date }: { date: string }) {
  return <div className="text-center text-sm font-light uppercase sm:text-base">{date}</div>;
}

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        Race <span className="font-bold">Schedule</span>
      </h1>
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
