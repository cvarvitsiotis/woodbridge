import IndividualResultsTableWrapper from "@/components/individualResultsTableWrapper";
import { overallResultTypes } from "@/components/officialResultsSections";
import ResultSection, { NoResultsAlert, ResultDescription } from "@/components/resultSection";
import { getYearResults } from "@/results";
import { OverallGenderType } from "@/types";
import { getOverallIndividualResults } from "@/utils/getOverallResults";

export default async function HtmlYearOverallIndividualResults({
  year,
  gender,
}: {
  year: number;
  gender: OverallGenderType;
}) {
  const individualResults = getOverallIndividualResults(
    await getYearResults(year),
    gender.code,
    year,
  );

  return (
    <ResultSection>
      <ResultDescription info={`${year} · Overall`}>
        <span className="font-semibold">{`${gender.label} ${overallResultTypes.individuals.label}`}</span>
      </ResultDescription>
      {individualResults.length > 0 ? (
        <IndividualResultsTableWrapper individualResults={individualResults} isRaceResults={true} />
      ) : (
        <NoResultsAlert>No results available.</NoResultsAlert>
      )}
    </ResultSection>
  );
}
