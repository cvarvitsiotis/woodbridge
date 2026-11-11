import { IndividualResultType, TeamResultType } from "@/types";
import PromptTeamsWrapper from "./promptTeamsWrapper";
import TeamResultsTableWrapper from "./teamResultsTableWrapper";
import { memo } from "react";

const MemoizedTeamResultsTableWrapper = memo(TeamResultsTableWrapper);

export default function TeamResultsWrapper({
  individualResults,
  shouldPromptTeams,
  handleShouldPromptTeamsAction,
  teamResults,
}: {
  individualResults: IndividualResultType[];
  shouldPromptTeams: boolean;
  handleShouldPromptTeamsAction: (value: boolean) => void;
  teamResults: TeamResultType[];
}) {
  return (
    <>
      <PromptTeamsWrapper
        show={individualResults.length > 0}
        shouldPromptTeams={shouldPromptTeams}
        handleShouldPromptTeamsAction={handleShouldPromptTeamsAction}
      />
      {teamResults.length > 0 && (
        <div className="space-y-2">
          <p>Team Results:</p>
          <MemoizedTeamResultsTableWrapper teamResults={teamResults} />
        </div>
      )}
    </>
  );
}
