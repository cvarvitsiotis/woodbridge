import { useMemo, useState } from "react";
import { RawResult } from "@/types";
import getIndividuals from "@/utils/getIndividuals";
import getIndividualResults from "@/utils/getIndividualResults";
import getAgeGroupResults from "@/utils/getAgeGroupResults";
import getTeamResults from "@/utils/getTeamResults";

export default function useIndividualAgeGroupAndTeamResults(rawResults: RawResult[] | undefined) {
  const [individualsFileContent, setIndividualsFileContent] = useState<string | null>(null);
  const [shouldPromptAgeGroups, setShouldPromptAgeGroups] = useState(false);
  const [ageGroups, setAgeGroups] = useState("");
  const [submittedAgeGroups, setSubmittedAgeGroups] = useState("");
  const [shouldPromptTeams, setShouldPromptTeams] = useState(false);

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

  return {
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
  };
}
