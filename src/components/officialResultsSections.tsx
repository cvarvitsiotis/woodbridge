import { ReactNode } from "react";
import { Link } from "@heroui/link";
import {
  divisions,
  genders,
  getFeaturedRacesForResults,
  getNonFeaturedRacesForResults,
  levels,
} from "@/config/races";
import { DivisionType, RaceType } from "@/types";
import { Card } from "@heroui/card";
import { getSubheaderStyle } from "@/styles/styles";
import clsx from "clsx";

function getDivisionForDivisionResultLink(division: DivisionType): string {
  return `d${division.num}`;
}

function getDivisionResultFilename(race: RaceType, isIndiv: boolean): string {
  const divisions = race.divisions ?? [];
  const resultLinkDivisions =
    getDivisionForDivisionResultLink(divisions[0]) +
    (divisions.length > 1 ? getDivisionForDivisionResultLink(divisions[1]) : "");

  return (
    resultLinkDivisions +
    race.level.resultLink +
    race.gender[0].toLowerCase() +
    (race.heat?.toLowerCase() ?? "") +
    (isIndiv ? "i" : "t")
  );
}

function getRatedResultFilename(race: RaceType, isIndiv: boolean): string {
  return "v" + race.gender[0].toLowerCase() + race.level.resultLink + (isIndiv ? "i" : "t");
}

function getSweepstakesResultFilename(race: RaceType, isIndiv: boolean): string {
  return (
    race.level.resultLink + race.gender.slice(0, -1).toLowerCase() + (isIndiv ? "ind" : "team")
  );
}

function getResultUrl(filename: string, selectedYear: string): string {
  return `/resultFiles/${selectedYear}/${filename}.pdf`;
}

function getRaceResultUrl(race: RaceType, isIndiv: boolean, selectedYear: string): string {
  const filename =
    race.level === levels.sweepstakes
      ? getSweepstakesResultFilename(race, isIndiv)
      : race.level === levels.rated
        ? getRatedResultFilename(race, isIndiv)
        : getDivisionResultFilename(race, isIndiv);

  return getResultUrl(filename, selectedYear);
}

function getOverallResultUrl(isIndiv: boolean, selectedYear: string): string {
  const filename = isIndiv ? "top100boysandgirls" : "teammeetresults";
  return getResultUrl(filename, selectedYear);
}

function ResultLink({ url, label, isMedium }: { url: string; label: string; isMedium: boolean }) {
  return (
    <Link isExternal href={url} underline="hover" size={isMedium ? "md" : "sm"} color="primary">
      {label}
    </Link>
  );
}

function OverallLink({ isIndiv, selectedYear }: { isIndiv: boolean; selectedYear: string }) {
  const url = getOverallResultUrl(isIndiv, selectedYear);
  const label = `Top 100 ${getBaseResultLabel(isIndiv)}`;
  return <ResultLink url={url} label={label} isMedium={true} />;
}

function getBaseResultLabel(isIndiv: boolean): string {
  return isIndiv ? "Individuals" : "Teams";
}

function RaceLink({
  race,
  isIndiv,
  selectedYear,
  isMedium,
}: {
  race: RaceType;
  isIndiv: boolean;
  selectedYear: string;
  isMedium: boolean;
}) {
  const label = getBaseResultLabel(isIndiv);
  const url = getRaceResultUrl(race, isIndiv, selectedYear);
  return <ResultLink url={url} label={label} isMedium={isMedium} />;
}

function OverallSection({ selectedYear }: { selectedYear: string }) {
  return (
    <>
      <div>
        <OverallLink isIndiv={true} selectedYear={selectedYear} />
      </div>
      <div>
        <OverallLink isIndiv={false} selectedYear={selectedYear} />
      </div>
    </>
  );
}

function getDivisionColor(division?: DivisionType): string {
  switch (division?.num) {
    case divisions.one.num:
      return "bg-primary-300";
    case divisions.two.num:
      return "bg-warning-300";
    case divisions.three.num:
      return "bg-danger-300";
    case divisions.four.num:
      return "bg-indigo-50";
    default:
      return "bg-secondary-300";
  }
}

function GenderColumn({
  division,
  races,
  selectedYear,
}: {
  division?: DivisionType;
  races: RaceType[];
  selectedYear: string;
}) {
  return (
    <>
      <div
        className={clsx("border-b px-4 py-2 text-center font-semibold", getDivisionColor(division))}
      >
        {races[0].gender}
      </div>
      {[...races]
        .sort(
          (a, b) =>
            a.level.resultOrder - b.level.resultOrder ||
            (a.heat && b.heat ? a.heat.localeCompare(b.heat) : 0),
        )
        .map((race) => {
          const levelAndHeat = race.level.level + (race.heat ? ` - ${race.heat}` : "");
          return (
            <div
              key={levelAndHeat}
              className={`px-4 py-2 ${Number(selectedYear) > 2012 && race.level.resultSpan2 ? "row-span-2" : ""}`}
            >
              <div className="font-semibold">{levelAndHeat}</div>
              <div>
                <RaceLink race={race} isIndiv={true} selectedYear={selectedYear} isMedium={false} />
              </div>
              {!race.level.isIndivOnly && (
                <div>
                  <RaceLink
                    race={race}
                    isIndiv={false}
                    selectedYear={selectedYear}
                    isMedium={false}
                  />
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}

function ResultGrid({ division, selectedYear }: { division?: DivisionType; selectedYear: string }) {
  const girlsRaces = division
    ? getNonFeaturedRacesForResults(division, genders.girls, Number(selectedYear))
    : getFeaturedRacesForResults(genders.girls, Number(selectedYear));

  const boysRaces = division
    ? getNonFeaturedRacesForResults(division, genders.boys, Number(selectedYear))
    : getFeaturedRacesForResults(genders.boys, Number(selectedYear));

  return (
    <Card shadow="lg" className="w-72">
      <div className={`border-b p-2 text-center ${getDivisionColor(division)}`}>
        {division ? `${division.name} (Div ${division.numRoman})` : "Featured"}
      </div>
      <div
        className={clsx(
          "grid grid-flow-col grid-cols-2 items-center text-sm",
          boysRaces.length === 2
            ? "grid-rows-[repeat(3,auto)]"
            : boysRaces.length === 5
              ? "grid-rows-[repeat(6,auto)]"
              : "grid-rows-[repeat(8,auto)]",
        )}
      >
        <GenderColumn division={division} races={girlsRaces} selectedYear={selectedYear} />
        <GenderColumn division={division} races={boysRaces} selectedYear={selectedYear} />
      </div>
    </Card>
  );
}

function Subtitle({ children }: { children: ReactNode }) {
  return <h1 className={clsx("pt-4", getSubheaderStyle())}>{children}</h1>;
}

export default function OfficialResultsSections({ selectedYear }: { selectedYear: string }) {
  return (
    <>
      <Subtitle>Featured</Subtitle>
      <div className="flex justify-center sm:justify-start sm:pl-5">
        <ResultGrid selectedYear={selectedYear} />
      </div>

      <Subtitle>Divisions</Subtitle>
      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:justify-items-start sm:pl-5 lg:grid-cols-3 xl:grid-cols-4">
        <ResultGrid division={divisions.one} selectedYear={selectedYear} />
        <ResultGrid division={divisions.two} selectedYear={selectedYear} />
        <ResultGrid division={divisions.three} selectedYear={selectedYear} />
        <ResultGrid division={divisions.four} selectedYear={selectedYear} />
      </div>

      <Subtitle>Boys & Girls Overall</Subtitle>
      <div className="flex gap-8 pl-5">
        <OverallSection selectedYear={selectedYear} />
      </div>
    </>
  );
}
