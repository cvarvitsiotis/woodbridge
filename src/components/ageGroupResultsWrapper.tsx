import { PressEvent } from "@heroui/react";
import AgeGroupResultsTableWrapper from "./ageGroupResultsTableWrapper";
import { memo } from "react";
import { IndividualResultType } from "@/types";
import PromptAgeGroupsSection from "./promptAgeGroupsSection";

const MemoizedAgeGroupResultsTableWrapper = memo(AgeGroupResultsTableWrapper);

export default function AgeGroupResultsWrapper({
  individualResults,
  shouldPromptAgeGroups,
  handleShouldPromptAgeGroupsAction,
  ageGroups,
  handlePromptAgeGroupsAction,
  handlePromptAgeGroupsSubmissionAction,
  ageGroupResults,
}: {
  individualResults: IndividualResultType[];
  shouldPromptAgeGroups: boolean;
  handleShouldPromptAgeGroupsAction: (value: boolean) => void;
  ageGroups: string;
  handlePromptAgeGroupsAction: (value: string) => void;
  handlePromptAgeGroupsSubmissionAction: (e: PressEvent) => void;
  ageGroupResults: Array<IndividualResultType & { rank: number; ageGroup: string }>;
}) {
  return (
    <>
      <PromptAgeGroupsSection
        show={individualResults.length > 0}
        shouldPromptAgeGroups={shouldPromptAgeGroups}
        handleShouldPromptAgeGroupsAction={handleShouldPromptAgeGroupsAction}
        ageGroups={ageGroups}
        handlePromptAgeGroupsAction={handlePromptAgeGroupsAction}
        handlePromptAgeGroupsSubmissionAction={handlePromptAgeGroupsSubmissionAction}
      />

      <MemoizedAgeGroupResultsTableWrapper ageGroupResults={ageGroupResults} />
    </>
  );
}
