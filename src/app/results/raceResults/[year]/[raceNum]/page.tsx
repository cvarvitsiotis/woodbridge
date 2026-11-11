import HtmlYearResults from "@/components/htmlYearResults";
import { htmlResultYears } from "@/config/data";
import { getRacesForYear } from "@/config/races";

export const dynamicParams = false;

export function generateStaticParams() {
  return htmlResultYears.flatMap((year) =>
    getRacesForYear(year).map((race) => ({ year: String(year), raceNum: String(race.num) })),
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; raceNum: string }>;
}) {
  const { year, raceNum } = await params;
  return <HtmlYearResults year={Number(year)} raceNum={Number(raceNum)} />;
}
