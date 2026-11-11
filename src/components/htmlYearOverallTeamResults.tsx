import { overallResultTypes } from "@/components/officialResultsSections";
import ResultSection, { NoResultsAlert, ResultDescription } from "@/components/resultSection";
import TeamResultsTableWrapper from "@/components/teamResultsTableWrapper";
import { getYearResults } from "@/results";
import { OverallGenderType } from "@/types";
import { getOverallTeamResults } from "@/utils/getOverallResults";

export default async function HtmlYearOverallTeamResults({
  year,
  gender,
}: {
  year: number;
  gender: OverallGenderType;
}) {
  const teamResults = getOverallTeamResults(await getYearResults(year), gender.code, year);

  return (
    <ResultSection>
      <ResultDescription info={`${year} · Overall`}>
        <span className="font-semibold">{`${gender.label} ${overallResultTypes.teams.label}`}</span>
      </ResultDescription>
      {teamResults.length > 0 ? (
        <TeamResultsTableWrapper teamResults={teamResults} isOverall={true} isRaceResults={true} />
      ) : (
        <NoResultsAlert>No results available.</NoResultsAlert>
      )}
    </ResultSection>
  );
}
