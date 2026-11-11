import { notFound } from "next/navigation";
import IndividualResultsTableWrapper from "@/components/individualResultsTableWrapper";
import ResultSection, { NoResultsAlert, ResultDescription } from "@/components/resultSection";
import TeamResultsTableWrapper from "@/components/teamResultsTableWrapper";
import { getRaceDescription, getRacesForYear } from "@/config/races";
import { getYearResults } from "@/results";
import { IndividualResultType, RaceType } from "@/types";
import { getResultTimeStr } from "@/utils/getRawResultsFromUltra";
import getTeamResults from "@/utils/getTeamResults";

function FullRaceDescription({ race, year }: { race: RaceType; year: number }) {
  const raceInfo = [String(year), `Race ${race.num}`, race.time].filter(Boolean).join(" · ");

  const raceDivisions = race.divisions
    ?.map((division) => `${division.name} (Div ${division.numRoman})`)
    .join(" / ");

  return (
    <ResultDescription info={raceInfo}>
      {raceDivisions && <>{raceDivisions} · </>}
      <span className="font-semibold">{getRaceDescription(race)}</span>
    </ResultDescription>
  );
}

export default async function HtmlYearResults({
  year,
  raceNum,
}: {
  year: number;
  raceNum: number;
}) {
  const race = getRacesForYear(year).find((race) => race.num === raceNum);
  if (!race) notFound();

  const results = await getYearResults(year);
  const individualResults = results
    .filter((result) => result.raceNum === raceNum)
    .map(
      (result): IndividualResultType => ({
        ...result,
        resultTimeStr:
          result.resultTime === undefined
            ? undefined
            : getResultTimeStr(result.resultTime, undefined, year).resultTimeStr,
      }),
    );

  return (
    <ResultSection>
      <FullRaceDescription race={race} year={year} />
      {individualResults.length > 0 ? (
        <>
          {!race.level.isIndivOnly && (
            <TeamResultsTableWrapper
              teamResults={getTeamResults(individualResults, true, year)}
              isRaceResults={true}
            />
          )}
          <IndividualResultsTableWrapper
            individualResults={individualResults}
            isRaceResults={true}
          />
        </>
      ) : (
        <NoResultsAlert>No results available for this race.</NoResultsAlert>
      )}
    </ResultSection>
  );
}
