"use client";

import { useMemo } from "react";
import getRawResultsFromUltra from "@/utils/getRawResultsFromUltra";
import useParseUltra from "@/hooks/useParseUltra";
import useIndividualAgeGroupAndTeamResults from "@/hooks/useIndividualAgeGroupAndTeamResults";
import TeamResultsWrapper from "./teamResultsWrapper";
import AgeGroupResultsWrapper from "./ageGroupResultsWrapper";
import IndividualResultsWrapper from "./individualResultsWrapper";
import UltraResultsWrapper from "./ultraResultsWrapper";

export default function ParseUltraAndGenerateResults() {
  const parseUltraState = useParseUltra();

  const { rawResults, rawResultsError } = useMemo(
    function () {
      return getRawResultsFromUltra(
        parseUltraState.fileContent,
        parseUltraState.raceStartTime,
        parseUltraState.runnerResultTime,
        parseUltraState.runnerBib,
      );
    },
    [
      parseUltraState.fileContent,
      parseUltraState.raceStartTime,
      parseUltraState.runnerResultTime,
      parseUltraState.runnerBib,
    ],
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

  function handlePromptUltraAction() {
    handlePromptIndividualsAction(null);
  }

  return (
    <div className="space-y-4">
      <UltraResultsWrapper
        parseUltraState={parseUltraState}
        handlePromptUltraAction={handlePromptUltraAction}
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
