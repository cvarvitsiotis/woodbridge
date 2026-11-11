import { notFound } from "next/navigation";
import HtmlYearOverallTeamResults from "@/components/htmlYearOverallTeamResults";
import { overallGenders } from "@/components/officialResultsSections";
import { htmlResultYears } from "@/config/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return htmlResultYears.flatMap((year) =>
    Object.values(overallGenders).map((gender) => ({ year: String(year), gender: gender.param })),
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; gender: string }>;
}) {
  const { year, gender } = await params;
  const overallGender = Object.values(overallGenders).find(
    (overallGender) => overallGender.param === gender,
  );
  if (!overallGender) notFound();

  return <HtmlYearOverallTeamResults year={Number(year)} gender={overallGender} />;
}
