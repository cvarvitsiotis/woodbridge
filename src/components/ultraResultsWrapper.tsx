import { ParseUltraStateType, RawResult } from "@/types";
import RawResultsTableWrapper from "./rawResultsTableWrapper";
import { memo } from "react";
import PromptUltraSection from "./promptUltraSection";

const MemoizedRawResultsTableWrapper = memo(RawResultsTableWrapper);

export default function UltraResultsWrapper({
  parseUltraState,
  handlePromptUltraAction,
  rawResultsError,
  rawResults,
}: {
  parseUltraState: ParseUltraStateType;
  handlePromptUltraAction: () => void;
  rawResultsError: string | undefined;
  rawResults?: RawResult[];
}) {
  return (
    <>
      <PromptUltraSection
        parseUltraState={parseUltraState}
        handlePromptUltraAction={handlePromptUltraAction}
        rawResultsError={rawResultsError}
      />

      <MemoizedRawResultsTableWrapper rawResults={rawResults} />
    </>
  );
}
