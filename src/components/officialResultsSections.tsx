import { ReactNode } from "react";
import {
  divisions,
  genders,
  getFeaturedRacesForResults,
  getNonFeaturedRacesForResults,
  levels,
} from "@/config/races";
import { DivisionType, OverallGendersType, OverallGenderType, RaceType } from "@/types";
import { Card } from "@heroui/react";
import { getSubheaderStyle } from "@/styles/styles";
import clsx from "clsx";
import BaseLink from "@/components/baseLink";
import LinkPendingSpinner from "@/components/linkPendingSpinner";
import { data } from "@/config/data";
import { pages } from "@/config/site";

function isHtmlResultYear(selectedYear: number): boolean {
  return selectedYear < data.pdfResultStartYear;
}

function getHtmlResultPath(selectedYear: number, segment: number | string): string {
  return `${pages.raceResults.path}/${selectedYear}/${segment}`;
}

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

function getResultUrl(filename: string, selectedYear: number): string {
  return `/resultFiles/${selectedYear}/${filename}.pdf`;
}

function getRaceResultUrl(race: RaceType, isIndiv: boolean, selectedYear: number): string {
  const filename =
    race.level === levels.sweepstakes
      ? getSweepstakesResultFilename(race, isIndiv)
      : race.level === levels.rated
        ? getRatedResultFilename(race, isIndiv)
        : getDivisionResultFilename(race, isIndiv);

  return getResultUrl(filename, selectedYear);
}

function getOverallResultUrl(isIndiv: boolean, selectedYear: number): string {
  const filename = isIndiv ? "top100boysandgirls" : "teammeetresults";
  return getResultUrl(filename, selectedYear);
}

function ResultLink({
  href,
  isExternal,
  isFontLight,
  label,
}: {
  href: string;
  isExternal: boolean;
  isFontLight: boolean;
  label: string;
}) {
  return (
    <BaseLink
      isExternal={isExternal}
      prefetch={false}
      scroll={false}
      href={href}
      className={clsx("hover:underline", isFontLight && "font-light", !isExternal && "relative")}
    >
      {label}
      {!isExternal && <LinkPendingSpinner />}
    </BaseLink>
  );
}

function OverallLink({ isIndiv, selectedYear }: { isIndiv: boolean; selectedYear: number }) {
  const url = getOverallResultUrl(isIndiv, selectedYear);
  const label = `Top 100 ${getBaseResultLabel(isIndiv)}`;
  return <ResultLink href={url} isExternal={true} isFontLight={false} label={label} />;
}

function getBaseResultLabel(isIndiv: boolean): string {
  return isIndiv ? "Individuals" : "Teams";
}

function RaceLink({
  race,
  isIndiv,
  selectedYear,
}: {
  race: RaceType;
  isIndiv: boolean;
  selectedYear: number;
}) {
  const label = getBaseResultLabel(isIndiv);
  const url = getRaceResultUrl(race, isIndiv, selectedYear);
  return <ResultLink href={url} isExternal={true} isFontLight={true} label={label} />;
}

function OverallSection({ selectedYear }: { selectedYear: number }) {
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

function getDivisionBackgroundColor(division?: DivisionType): string {
  switch (division?.num) {
    case divisions.one.num:
      return "bg-blue-300";
    case divisions.two.num:
      return "bg-amber-200";
    case divisions.three.num:
      return "bg-rose-300";
    case divisions.four.num:
      return "bg-indigo-50";
    case divisions.five.num:
      return "bg-green-200";
    default:
      return "bg-violet-300";
  }
}

function getDivisionBorderColor(division?: DivisionType): string {
  switch (division?.num) {
    case divisions.one.num:
      return "border-blue-400/70";
    case divisions.two.num:
      return "border-amber-400/90";
    case divisions.three.num:
      return "border-rose-400/60";
    case divisions.four.num:
      return "border-gray-400/70";
    case divisions.five.num:
      return "border-green-400/40";
    default:
      return "border-violet-400/60";
  }
}

function getRowSpanStyling(race: RaceType, year: number): string | undefined {
  if (race.level === levels.sweepstakes && race.gender === genders.girls && year === 2006) {
    return "row-span-2 self-start";
  }
  if (
    race.level === levels.froshSoph ||
    race.level === levels.juniorSenior ||
    (race.level === levels.juniorVarsity && year > 2012)
  ) {
    return "row-span-2";
  }
  return undefined;
}

function GenderColumn({ races, selectedYear }: { races: RaceType[]; selectedYear: number }) {
  return (
    <>
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
              className={clsx("px-4 py-2", getRowSpanStyling(race, selectedYear))}
            >
              {isHtmlResultYear(selectedYear) ? (
                <ResultLink
                  href={getHtmlResultPath(selectedYear, race.num)}
                  isExternal={false}
                  isFontLight={false}
                  label={levelAndHeat}
                />
              ) : (
                <>
                  <div className="font-medium">{levelAndHeat}</div>
                  <div>
                    <RaceLink race={race} isIndiv={true} selectedYear={selectedYear} />
                  </div>
                  {!race.level.isIndivOnly && (
                    <div>
                      <RaceLink race={race} isIndiv={false} selectedYear={selectedYear} />
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
    </>
  );
}

function ResultCard({
  title,
  backgroundColor,
  borderColor,
  gridRowsClassName,
  children,
}: {
  title: string;
  backgroundColor: string;
  borderColor: string;
  gridRowsClassName: string;
  children: ReactNode;
}) {
  return (
    <Card className="block w-80 overflow-hidden rounded-2xl p-0 shadow-lg">
      <div
        className={clsx(
          "rounded-t-[inherit] border-2 border-b-0 text-center font-medium",
          backgroundColor,
          borderColor,
        )}
      >
        <div className={clsx("border-b py-2", borderColor)}>{title}</div>
        <div className={clsx("flex justify-around border-b py-2", borderColor)}>
          <div>{genders.girls}</div>
          <div>{genders.boys}</div>
        </div>
      </div>
      <div
        className={clsx(
          "grid grid-flow-col grid-cols-2 items-center rounded-b-[inherit] border-2 border-t-0 border-gray-300",
          gridRowsClassName,
        )}
      >
        {children}
      </div>
    </Card>
  );
}

function ResultGrid({ division, selectedYear }: { division?: DivisionType; selectedYear: number }) {
  const girlsRaces = division
    ? getNonFeaturedRacesForResults(division, genders.girls, selectedYear)
    : getFeaturedRacesForResults(genders.girls, selectedYear);

  const boysRaces = division
    ? getNonFeaturedRacesForResults(division, genders.boys, selectedYear)
    : getFeaturedRacesForResults(genders.boys, selectedYear);

  if (girlsRaces.length === 0 || boysRaces.length === 0) return null;

  return (
    <ResultCard
      title={division ? `${division.name} (Div ${division.numRoman})` : "Featured"}
      backgroundColor={getDivisionBackgroundColor(division)}
      borderColor={getDivisionBorderColor(division)}
      gridRowsClassName={
        boysRaces.length === 1
          ? "grid-rows-[repeat(1,auto)]"
          : boysRaces.length === 2
            ? "grid-rows-[repeat(2,auto)]"
            : boysRaces.length === 4
              ? "grid-rows-[repeat(4,auto)]"
              : boysRaces.length === 5
                ? "grid-rows-[repeat(5,auto)]"
                : boysRaces.length === 6
                  ? "grid-rows-[repeat(6,auto)]"
                  : "grid-rows-[repeat(7,auto)]"
      }
    >
      <GenderColumn races={girlsRaces} selectedYear={selectedYear} />
      <GenderColumn races={boysRaces} selectedYear={selectedYear} />
    </ResultCard>
  );
}

export const overallGenders: OverallGendersType = {
  girls: { param: genders.girls.toLowerCase(), label: genders.girls, code: "F" },
  boys: { param: genders.boys.toLowerCase(), label: genders.boys, code: "M" },
};

export const overallResultTypes = {
  individuals: { segment: "overallIndividuals", label: "Top Individuals" },
  teams: { segment: "overallTeams", label: "Teams" },
};

function OverallGenderColumnItem({
  gender,
  resultType,
  selectedYear,
}: {
  gender: OverallGenderType;
  resultType: { segment: string; label: string };
  selectedYear: number;
}) {
  return (
    <div className="px-4 py-2">
      <ResultLink
        href={getHtmlResultPath(selectedYear, `${resultType.segment}/${gender.param}`)}
        isExternal={false}
        isFontLight={false}
        label={resultType.label}
      />
    </div>
  );
}

function OverallGenderColumn({
  gender,
  selectedYear,
}: {
  gender: OverallGenderType;
  selectedYear: number;
}) {
  return (
    <>
      <OverallGenderColumnItem
        gender={gender}
        resultType={overallResultTypes.individuals}
        selectedYear={selectedYear}
      />
      <OverallGenderColumnItem
        gender={gender}
        resultType={overallResultTypes.teams}
        selectedYear={selectedYear}
      />
    </>
  );
}

function OverallCard({ selectedYear }: { selectedYear: number }) {
  return (
    <ResultCard
      title="Overall"
      backgroundColor="bg-teal-200"
      borderColor="border-teal-400/60"
      gridRowsClassName="grid-rows-[repeat(2,auto)]"
    >
      <OverallGenderColumn gender={overallGenders.girls} selectedYear={selectedYear} />
      <OverallGenderColumn gender={overallGenders.boys} selectedYear={selectedYear} />
    </ResultCard>
  );
}

function hasFeaturedRaces(selectedYear: number): boolean {
  return (
    getFeaturedRacesForResults(genders.girls, selectedYear).length > 0 ||
    getFeaturedRacesForResults(genders.boys, selectedYear).length > 0
  );
}

export function Subtitle({ children }: { children: ReactNode }) {
  return <h1 className={clsx("pt-4", getSubheaderStyle())}>{children}</h1>;
}

export default function OfficialResultsSections({ selectedYear }: { selectedYear: number }) {
  return (
    <>
      {hasFeaturedRaces(selectedYear) && (
        <>
          <Subtitle>Featured</Subtitle>
          <div className="flex justify-center md:justify-start md:pl-5">
            <ResultGrid selectedYear={selectedYear} />
          </div>
        </>
      )}

      <Subtitle>Divisions</Subtitle>
      <div className="grid grid-cols-1 items-start justify-items-center gap-6 md:grid-cols-2 md:justify-items-start md:pl-5 xl:grid-cols-3 2xl:grid-cols-4">
        <ResultGrid division={divisions.one} selectedYear={selectedYear} />
        <ResultGrid division={divisions.two} selectedYear={selectedYear} />
        <ResultGrid division={divisions.three} selectedYear={selectedYear} />
        <ResultGrid division={divisions.four} selectedYear={selectedYear} />
        <ResultGrid division={divisions.five} selectedYear={selectedYear} />
      </div>

      {isHtmlResultYear(selectedYear) ? (
        <>
          <Subtitle>Overall</Subtitle>
          <div className="flex justify-center md:justify-start md:pl-5">
            <OverallCard selectedYear={selectedYear} />
          </div>
        </>
      ) : (
        <>
          <Subtitle>Boys & Girls Overall</Subtitle>
          <div className="flex gap-8 pl-5">
            <OverallSection selectedYear={selectedYear} />
          </div>
        </>
      )}
    </>
  );
}
