import { IndividualResultType, RawResult } from "@/types";
import PromptIndividualsSection from "./promptIndividualsSection";
import IndividualResultsTableWrapper from "./individualResultsTableWrapper";
import { memo } from "react";

const MemoizedIndividualResultsTableWrapper = memo(IndividualResultsTableWrapper);

export default function IndividualResultsWrapper({
  rawResults,
  handlePromptIndividualsAction,
  individualsError,
  individualResults,
}: {
  rawResults?: RawResult[];
  handlePromptIndividualsAction: (individualsFileContent: string | null) => void;
  individualsError: string | undefined;
  individualResults: IndividualResultType[];
}) {
  return (
    <>
      <PromptIndividualsSection
        show={!!rawResults}
        handlePromptIndividualsAction={handlePromptIndividualsAction}
        individualsError={individualsError}
      />

      <MemoizedIndividualResultsTableWrapper individualResults={individualResults} />
    </>
  );
}
