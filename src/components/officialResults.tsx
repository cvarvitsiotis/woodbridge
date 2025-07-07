"use client";

import { useState } from "react";
import { Link } from "@heroui/link";
import { Select, SelectItem } from "@heroui/select";

import { divisions, filteredRaces, levels, resultTypes } from "@/config/races";
import { DivisionType, RaceType } from "@/types";
import { data, urls } from "@/config/data";

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
  return `${urls.gvarvas.resultFileBase}/${selectedYear}/${filename}.pdf`;
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
  return isIndiv ? resultTypes.individuals : resultTypes.team;
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
  const label =
    race.level === levels.sweepstakes || race.level === levels.rated
      ? `${race.gender} ${getBaseResultLabel(isIndiv)}`
      : getBaseResultLabel(isIndiv);
  const url = getRaceResultUrl(race, isIndiv, selectedYear);
  return <ResultLink url={url} label={label} isMedium={isMedium} />;
}

function FeaturedGenderSection({ race, selectedYear }: { race: RaceType; selectedYear: string }) {
  return (
    <>
      <div>
        <RaceLink race={race} isIndiv={true} selectedYear={selectedYear} isMedium={true} />
      </div>
      <div>
        <RaceLink race={race} isIndiv={false} selectedYear={selectedYear} isMedium={true} />
      </div>
    </>
  );
}

function FeaturedSection({
  girlsRace,
  boysRace,
  selectedYear,
}: {
  girlsRace: RaceType;
  boysRace: RaceType;
  selectedYear: string;
}) {
  return (
    <>
      <FeaturedGenderSection race={girlsRace} selectedYear={selectedYear} />
      <FeaturedGenderSection race={boysRace} selectedYear={selectedYear} />
    </>
  );
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

function getDivisionColor(division: DivisionType): string {
  switch (division?.num) {
    case divisions.one.num:
      return "bg-primary-300";
    case divisions.two.num:
      return "bg-warning-300";
    case divisions.three.num:
      return "bg-danger-300";
    case divisions.four.num:
      return "";
    default:
      return "";
  }
}

function DivisionGenderSection({
  races,
  selectedYear,
}: {
  races: RaceType[];
  selectedYear: string;
}) {
  return (
    <>
      <div className="border-b px-4 py-2 text-center font-semibold">{races[0].gender}</div>
      {races.map((race) => {
        const levelAndHeat = race.level.level + (race.heat ? ` - ${race.heat}` : "");
        return (
          <div key={levelAndHeat} className={`px-4 py-2 ${race.level.isCombo ? "row-span-2" : ""}`}>
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

function DivisionGrid({
  division,
  girlsRaces,
  boysRaces,
  selectedYear,
}: {
  division: DivisionType;
  girlsRaces: RaceType[];
  boysRaces: RaceType[];
  selectedYear: string;
}) {
  const divisionColor = getDivisionColor(division);

  return (
    <div className="w-72 overflow-hidden rounded-medium border shadow-medium">
      <div className={`border-b p-2 text-center ${divisionColor}`}>
        {`${division.name} (Div ${division.numRoman})`}
      </div>
      <div className="grid grid-flow-col grid-cols-2 grid-rows-[repeat(8,auto)] items-center text-sm">
        <DivisionGenderSection races={girlsRaces} selectedYear={selectedYear} />
        <DivisionGenderSection races={boysRaces} selectedYear={selectedYear} />
      </div>
    </div>
  );
}

const allYears = Array.from(
  { length: data.pdfResultEndYear - data.pdfResultStartYear + 1 },
  (_, i) => data.pdfResultStartYear + i,
)
  .sort((a, b) => b - a)
  .map((year) => year.toString());

function YearSelect({
  selectedYear,
  handleChangeSelectedYear,
}: {
  selectedYear: string;
  handleChangeSelectedYear: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <Select
      selectedKeys={[selectedYear]}
      size="lg"
      onChange={handleChangeSelectedYear}
      label="YEAR"
      labelPlacement="outside-left"
      placeholder="Select a year"
      classNames={{ base: "w-52", label: "font-light text-xl" }}
    >
      {allYears.map((year) => (
        <SelectItem key={year}>{year}</SelectItem>
      ))}
    </Select>
  );
}

function Subtitle({ children }: { children: React.ReactNode }) {
  return <h1 className="pt-4 text-xl font-light sm:text-2xl">{children}</h1>;
}

export default function OfficialResults() {
  const [selectedYear, setSelectedYear] = useState(allYears[0]);

  function handleChangeSelectedYear(event: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedYear(() => event.target.value);
  }

  return (
    <>
      <div className="flex justify-center">
        <YearSelect
          selectedYear={selectedYear}
          handleChangeSelectedYear={handleChangeSelectedYear}
        />
      </div>

      <Subtitle>{levels.sweepstakes.level}</Subtitle>
      <div className="flex gap-8">
        <FeaturedSection
          girlsRace={filteredRaces.sweepstakesGirlsRace}
          boysRace={filteredRaces.sweepstakesBoysRace}
          selectedYear={selectedYear}
        />
      </div>

      <Subtitle>{levels.rated.level}</Subtitle>
      <div className="flex gap-8">
        <FeaturedSection
          girlsRace={filteredRaces.ratedGirlsRace}
          boysRace={filteredRaces.ratedBoysRace}
          selectedYear={selectedYear}
        />
      </div>

      <Subtitle>Divisions</Subtitle>
      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <DivisionGrid
          division={divisions.one}
          girlsRaces={filteredRaces.div1GirlsRaces}
          boysRaces={filteredRaces.div1BoysRaces}
          selectedYear={selectedYear}
        />
        <DivisionGrid
          division={divisions.two}
          girlsRaces={filteredRaces.div2GirlsRaces}
          boysRaces={filteredRaces.div2BoysRaces}
          selectedYear={selectedYear}
        />
        <DivisionGrid
          division={divisions.three}
          girlsRaces={filteredRaces.div3GirlsRaces}
          boysRaces={filteredRaces.div3BoysRaces}
          selectedYear={selectedYear}
        />
        <DivisionGrid
          division={divisions.four}
          girlsRaces={filteredRaces.div4GirlsRaces}
          boysRaces={filteredRaces.div4BoysRaces}
          selectedYear={selectedYear}
        />
      </div>

      <Subtitle>Boys & Girls Overall</Subtitle>
      <div className="flex gap-8">
        <OverallSection selectedYear={selectedYear} />
      </div>
    </>
  );
}
