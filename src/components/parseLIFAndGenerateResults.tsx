"use client";

import { useMemo, useState } from "react";
import getIndividualResults from "@/utils/getIndividualResults";
import getAgeGroupResults from "@/utils/getAgeGroupResults";
import getTeamResults from "@/utils/getTeamResults";
import TeamResultsWrapper from "./teamResultsWrapper";
import AgeGroupResultsWrapper from "./ageGroupResultsWrapper";
import IndividualResultsWrapper from "./individualResultsWrapper";
import getIndividuals from "@/utils/getIndividuals";
import LIFResultsWrapper from "./lifResultsWrapper";
import getRawResultsFromLIF from "@/utils/getRawResultsFromLIF";

export default function ParseLIFAndGenerateResults() {
  const [lifFileContent, setLIFFileContent] = useState<string | null>(null);
  const [individualsFileContent, setIndividualsFileContent] = useState<string | null>(null);
  const [shouldPromptAgeGroups, setShouldPromptAgeGroups] = useState(false);
  const [ageGroups, setAgeGroups] = useState("");
  const [submittedAgeGroups, setSubmittedAgeGroups] = useState("");
  const [shouldPromptTeams, setShouldPromptTeams] = useState(false);

  function handlePromptLIFAction(newLIFFileContent: string | null) {
    setLIFFileContent(newLIFFileContent);
  }

  function handlePromptIndividualsAction(newIndividualsFileContent: string | null) {
    setIndividualsFileContent(newIndividualsFileContent);
    handleShouldPromptAgeGroupsAction(false);
    handleShouldPromptTeamsAction(false);
  }

  function handleShouldPromptAgeGroupsAction(newShouldPromptAgeGroups: boolean) {
    setShouldPromptAgeGroups(newShouldPromptAgeGroups);
    handlePromptAgeGroupsAction("");
    setSubmittedAgeGroups("");
  }

  function handlePromptAgeGroupsAction(newAgeGroups: string) {
    setAgeGroups(newAgeGroups);
  }

  function handlePromptAgeGroupsSubmissionAction() {
    setSubmittedAgeGroups(ageGroups);
  }

  function handleShouldPromptTeamsAction(newShouldPromptTeams: boolean) {
    setShouldPromptTeams(newShouldPromptTeams);
  }

  const { rawResults, rawResultsError } = useMemo(
    function () {
      return getRawResultsFromLIF(lifFileContent);
    },
    [lifFileContent],
  );

  const { individuals, individualsError } = useMemo(
    function () {
      return getIndividuals(individualsFileContent);
    },
    [individualsFileContent],
  );

  const individualResults = useMemo(
    function () {
      return getIndividualResults(rawResults, individuals);
    },
    [rawResults, individuals],
  );

  const ageGroupResults = useMemo(
    function () {
      return getAgeGroupResults(individualResults, submittedAgeGroups);
    },
    [individualResults, submittedAgeGroups],
  );

  const teamResults = useMemo(
    function () {
      return getTeamResults(individualResults, shouldPromptTeams);
    },
    [shouldPromptTeams, individualResults],
  );

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
