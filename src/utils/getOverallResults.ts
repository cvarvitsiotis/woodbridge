import { IndividualResultType, TeamResultType } from "@/types";
import { getResultTimeStr } from "./getRawResultsFromUltra";
import { SCORING_TEAM_SIZE } from "./getTeamResults";

export function getOverallIndividualResults(
  results: IndividualResultType[],
  gender: string,
  year: number,
): IndividualResultType[] {
  const timedResults = results
    .filter((result) => result.gender === gender && result.resultTime !== undefined)
    .sort(
      (a, b) =>
        a.resultTime! - b.resultTime! ||
        (a.lastName ?? "").localeCompare(b.lastName ?? "") ||
        (a.firstName ?? "").localeCompare(b.firstName ?? ""),
    );
  const overallPlaces = getCompetitionPlaces(timedResults.map((result) => result.resultTime!));
  const overallCount = overallPlaces.filter((overallPlace) => overallPlace <= 100).length;

  return timedResults.slice(0, overallCount).map(
    (result, index): IndividualResultType => ({
      ...result,
      overallPlace: overallPlaces[index],
      resultTimeStr: getResultTimeStr(result.resultTime!, undefined, year).resultTimeStr,
    }),
  );
}

export function getOverallTeamResults(
  results: IndividualResultType[],
  gender: string,
  year: number,
): TeamResultType[] {
  const resultsByTeam = new Map<string, IndividualResultType[]>();
  results
    .filter((result) => result.gender === gender && result.resultTime !== undefined)
    .forEach((result) => {
      const teamResults = resultsByTeam.get(result.team) ?? [];
      teamResults.push(result);
      resultsByTeam.set(result.team, teamResults);
    });

  const teamResults = Array.from(resultsByTeam, ([team, teamIndividualResults]) => ({
    team,
    scorers: [...teamIndividualResults]
      .sort((a, b) => a.resultTime! - b.resultTime!)
      .slice(0, SCORING_TEAM_SIZE),
  }))
    .filter(({ scorers }) => scorers.length === SCORING_TEAM_SIZE)
    .map(({ team, scorers }): TeamResultType => {
      const scoringTime = scorers.reduce((sum, scorer) => sum + scorer.resultTime!, 0);
      return {
        team,
        scoringTime,
        scoringTimeStr: getResultTimeStr(scoringTime, undefined, year).resultTimeStr,
        averageTimeStr: getResultTimeStr(scoringTime / SCORING_TEAM_SIZE, undefined, year)
          .resultTimeStr,
        spreadTimeStr: getResultTimeStr(
          scorers[SCORING_TEAM_SIZE - 1].resultTime! - scorers[0].resultTime!,
          undefined,
          year,
        ).resultTimeStr,
        individualResults: scorers,
      };
    })
    .sort((a, b) => a.scoringTime! - b.scoringTime! || a.team.localeCompare(b.team));
  const places = getCompetitionPlaces(teamResults.map((teamResult) => teamResult.scoringTime!));

  return teamResults.map(
    (teamResult, index): TeamResultType => ({ ...teamResult, place: places[index] }),
  );
}

function getCompetitionPlaces(sortedValues: number[]): number[] {
  const places: number[] = [];
  sortedValues.forEach((value, index) => {
    places.push(index > 0 && value === sortedValues[index - 1] ? places[index - 1] : index + 1);
  });
  return places;
}
