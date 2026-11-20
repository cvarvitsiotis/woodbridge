import { notFound } from "next/navigation";
import IndividualResultsTableWrapper from "@/components/individualResultsTableWrapper";
import ResultSection, { NoResultsAlert, ResultDescription } from "@/components/resultSection";
import TeamResultsTableWrapper from "@/components/teamResultsTableWrapper";
import { getRaceDescription, getRacesForYear } from "@/config/races";
import { getYearResults } from "@/results";
import { IndividualResultType, RaceType } from "@/types";
import { getResultTimeStr } from "@/utils/getRawResultsFromUltra";
import getTeamResults from "@/utils/getTeamResults";
import { Tabs } from "@heroui/react";

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
          {race.level.isIndivOnly ? (
            <IndividualResultsTableWrapper
              individualResults={individualResults}
              isRaceResults={true}
            />
          ) : (
            <Tabs className="pt-2">
              <Tabs.ListContainer className="mx-auto w-full max-w-xs md:mx-0">
                <Tabs.List aria-label="Options">
                  <Tabs.Tab id="teams" className="text-base">
                    TEAMS
                    <Tabs.Indicator />
                  </Tabs.Tab>
                  <Tabs.Tab id="individuals" className="text-base">
                    INDIVIDUALS
                    <Tabs.Indicator />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
              <Tabs.Panel
                id="teams"
                className="px-0 pt-6 data-[inert=true]:hidden"
                shouldForceMount
              >
                <TeamResultsTableWrapper
                  teamResults={getTeamResults(individualResults, true, year)}
                  isRaceResults={true}
                />
              </Tabs.Panel>
              <Tabs.Panel
                id="individuals"
                className="px-0 pt-6 data-[inert=true]:hidden"
                shouldForceMount
              >
                <IndividualResultsTableWrapper
                  individualResults={individualResults}
                  isRaceResults={true}
                />
              </Tabs.Panel>
            </Tabs>
          )}
        </>
      ) : (
        <NoResultsAlert>No results available for this race.</NoResultsAlert>
      )}
    </ResultSection>
  );
}
