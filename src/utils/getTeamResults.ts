import { IndividualResultType, TeamResultType } from "@/types";
import { Unknown } from "./getIndividualResults";
import { getResultTimeStr } from "./getRawResultsFromUltra";

const SCORING_TEAM_SIZE = 5;

export default function getTeamResults(
  individualResults: IndividualResultType[],
  shouldPromptTeams: boolean,
): TeamResultType[] {
  if (!individualResults || individualResults.length === 0 || !shouldPromptTeams) return [];

  const teamResults = initializeTeamResults(individualResults);

  setIndividualScoringPlaces(teamResults);

  setTeamScores(teamResults);

  setTeamRanks(teamResults);

  return getSortedTeamResults(teamResults);
}

function initializeTeamResults(individualResults: IndividualResultType[]): TeamResultType[] {
  const individualResultsByTeam = new Map<string, IndividualResultType[]>();

  individualResults.forEach((individualResult) => {
    const teamIndividualResults = individualResultsByTeam.get(individualResult.team) ?? [];
    teamIndividualResults.push(getClonedIndividualResultToPreventMutationOfMemo(individualResult));
    individualResultsByTeam.set(individualResult.team, teamIndividualResults);
  });

  return Array.from(individualResultsByTeam, ([team, individualResults]) => ({
    team,
    individualResults,
  }));
}

function getClonedIndividualResultToPreventMutationOfMemo(individualResult: IndividualResultType) {
  return { ...individualResult };
}

function setIndividualScoringPlaces(teamResults: TeamResultType[]) {
  const currentTeamCounts = new Map<string, number>();
  let scoringPlace = 0;

  teamResults
    .filter(
      (teamResult) =>
        teamResult.team !== Unknown && teamResult.individualResults.length >= SCORING_TEAM_SIZE,
    )
    .flatMap((teamResult) => teamResult.individualResults)
    .filter(
      (individualResult) =>
        individualResult.place !== undefined && individualResult.resultTime !== undefined,
    )
    .sort((a, b) => a.place! - b.place!)
    .forEach((individualResult) => {
      const currentTeamCount = currentTeamCounts.get(individualResult.team) ?? 0;
      if (currentTeamCount >= SCORING_TEAM_SIZE + 2) return;
      currentTeamCounts.set(individualResult.team, currentTeamCount + 1);
      individualResult.scoringPlace = ++scoringPlace;
    });
}

function setTeamScores(teamResults: TeamResultType[]) {
  teamResults.forEach((teamResult) => {
    const scorers = teamResult.individualResults
      .filter((individualResult) => individualResult.scoringPlace !== undefined)
      .sort((a, b) => a.scoringPlace! - b.scoringPlace!);

    if (scorers.length < SCORING_TEAM_SIZE) return;

    const topScorers = scorers.slice(0, SCORING_TEAM_SIZE);
    teamResult.score = topScorers.reduce((sum, scorer) => sum + scorer.scoringPlace!, 0);
    teamResult.scoringTime = topScorers.reduce((sum, scorer) => sum + scorer.resultTime!, 0);
    teamResult.scoringTimeStr = getResultTimeStr(teamResult.scoringTime, 1).resultTimeStr;
    teamResult.averageTimeStr = getResultTimeStr(
      teamResult.scoringTime / SCORING_TEAM_SIZE,
      1,
    ).resultTimeStr;
    teamResult.spreadTimeStr = getResultTimeStr(
      scorers[SCORING_TEAM_SIZE - 1].resultTime! - scorers[0].resultTime!,
      1,
    ).resultTimeStr;

    if (scorers.length < SCORING_TEAM_SIZE + 1) return;

    teamResult.sixthRunnerPlace = scorers[SCORING_TEAM_SIZE].scoringPlace;
  });
}

function setTeamRanks(teamResults: TeamResultType[]) {
  teamResults
    .filter((teamResult) => teamResult.score !== undefined)
    .sort(
      (a, b) =>
        a.score! - b.score! ||
        (a.sixthRunnerPlace ?? Infinity) - (b.sixthRunnerPlace ?? Infinity) ||
        a.scoringTime! - b.scoringTime!,
    )
    .forEach((teamResult, index) => {
      teamResult.rank = index + 1;
    });
}

function getSortedTeamResults(teamResults: TeamResultType[]): TeamResultType[] {
  return teamResults.sort(
    (a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity) || a.team.localeCompare(b.team),
  );
}
