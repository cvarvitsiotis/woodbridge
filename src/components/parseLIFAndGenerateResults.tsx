"use client";

import { useMemo, useState } from "react";
import useIndividualAgeGroupAndTeamResults from "@/hooks/useIndividualAgeGroupAndTeamResults";
import TeamResultsWrapper from "./teamResultsWrapper";
import AgeGroupResultsWrapper from "./ageGroupResultsWrapper";
import IndividualResultsWrapper from "./individualResultsWrapper";
import LIFResultsWrapper from "./lifResultsWrapper";
import getRawResultsFromLIF from "@/utils/getRawResultsFromLIF";

export default function ParseLIFAndGenerateResults() {
  const [lifFileContent, setLIFFileContent] = useState<string | null>(null);

  const { rawResults, rawResultsError } = useMemo(
    function () {
      return getRawResultsFromLIF(lifFileContent);
    },
    [lifFileContent],
  );

  const {
    handlePromptIndividualsAction,
    individualsError,
    individualResults,
    shouldPromptAgeGroups,
    handleShouldPromptAgeGroupsAction,
    ageGroups,
    handlePromptAgeGroupsAction,
    handlePromptAgeGroupsSubmissionAction,
    ageGroupResults,
    shouldPromptTeams,
    handleShouldPromptTeamsAction,
    teamResults,
  } = useIndividualAgeGroupAndTeamResults(rawResults);

  function handlePromptLIFAction(newLIFFileContent: string | null) {
    setLIFFileContent(newLIFFileContent);
    handlePromptIndividualsAction(null);
  }

  return (
    <div className="space-y-4">
      <LIFResultsWrapper
        handlePromptLIFAction={handlePromptLIFAction}
        rawResultsError={rawResultsError}
      />

      <IndividualResultsWrapper
        rawResults={rawResults}
        handlePromptIndividualsAction={handlePromptIndividualsAction}
        individualsError={individualsError}
        individualResults={individualResults}
      />

      <AgeGroupResultsWrapper
        individualResults={individualResults}
        shouldPromptAgeGroups={shouldPromptAgeGroups}
        handleShouldPromptAgeGroupsAction={handleShouldPromptAgeGroupsAction}
        ageGroups={ageGroups}
        handlePromptAgeGroupsAction={handlePromptAgeGroupsAction}
        handlePromptAgeGroupsSubmissionAction={handlePromptAgeGroupsSubmissionAction}
        ageGroupResults={ageGroupResults}
      />

      <TeamResultsWrapper
        individualResults={individualResults}
        shouldPromptTeams={shouldPromptTeams}
        handleShouldPromptTeamsAction={handleShouldPromptTeamsAction}
        teamResults={teamResults}
      />
    </div>
  );
}
