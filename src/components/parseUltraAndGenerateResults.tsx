"use client";

import { memo, ReactNode, useMemo, useState } from "react";
import { PressEvent, Switch, Table } from "@heroui/react";
import { pages } from "@/config/site";
import StyledTableCell from "./styledTableCell";
import { ColumnProps } from "react-aria-components/Table";
import { IndividualResultType, TeamResultType } from "@/types";
import parseUltra from "@/utils/parseUltra";
import useParseUltra from "@/hooks/useParseUltra";
import PromptIndividuals from "./promptIndividuals";
import parseIndividuals from "@/utils/parseIndividuals";
import getIndividualResults from "@/utils/getIndividualResults";
import getAgeGroupResults from "@/utils/getAgeGroupResults";
import PromptUltraSection from "./promptUltraSection";
import FileErrorInfo from "./fileErrorInfo";
import StyledInput from "./styledInput";
import StyledButton from "./styledButton";
import getTeamResults from "@/utils/getTeamResults";

const individualResultsColumns: ColumnProps[] = [
  { id: "bib", textValue: "Bib", isRowHeader: true },
  { id: "place", textValue: "Place" },
  { id: "firstName", textValue: "First Name" },
  { id: "lastName", textValue: "Last Name" },
  { id: "gender", textValue: "Gender" },
  { id: "age", textValue: "Age" },
  { id: "team", textValue: "Team" },
  { id: "resultTime", textValue: "Result Time" },
];

const ageGroupResultsColumns: ColumnProps[] = [
  { id: "ageGroup", textValue: "Age Group" },
  { id: "gender", textValue: "Gender" },
  { id: "rank", textValue: "Rank" },
  { id: "bib", textValue: "Bib", isRowHeader: true },
  { id: "place", textValue: "Place" },
  { id: "firstName", textValue: "First Name" },
  { id: "lastName", textValue: "Last Name" },
  { id: "age", textValue: "Age" },
  { id: "team", textValue: "Team" },
  { id: "resultTime", textValue: "Result Time" },
];

const teamResultsColumns: ColumnProps[] = [
  { id: "rank", textValue: "Rank" },
  { id: "team", textValue: "Team", isRowHeader: true },
  { id: "score", textValue: "Score" },
  { id: "scoringTime", textValue: "Time" },
  { id: "averageTime", textValue: "Average Time" },
  { id: "spread", textValue: "Spread" },
  { id: "individualActualPlaces", textValue: "Actual Order" },
  { id: "individualScoringPlaces", textValue: "Scoring Order" },
];

function PromptIndividualsSection({
  show,
  handlePromptIndividualsAction,
  individualsError,
}: {
  show: boolean;
  handlePromptIndividualsAction: (individualsFileContent: string | null) => void;
  individualsError: string | undefined;
}) {
  return (
    <>
      <PromptIndividualsWrapper
        show={show}
        handlePromptIndividualsAction={handlePromptIndividualsAction}
      />
      <FileErrorInfo>{individualsError}</FileErrorInfo>
    </>
  );
}

function PromptIndividualsWrapper({
  show,
  handlePromptIndividualsAction,
}: {
  show: boolean;
  handlePromptIndividualsAction: (individualsFileContent: string | null) => void;
}) {
  if (!show) return null;
  return (
    <div className="-mt-2">
      <PromptIndividuals handlePromptIndividualsAction={handlePromptIndividualsAction} />
    </div>
  );
}

const IndividualResultsTableWrapper = memo(function IndividualResultsTableWrapper({
  individualResults,
}: {
  individualResults: IndividualResultType[] | undefined;
}) {
  if (!individualResults || individualResults.length === 0) return null;
  return (
    <div className="space-y-2">
      <p>Individual Results:</p>
      <IndividualResultsTable individualResults={individualResults} />
    </div>
  );
});

function IndividualResultsTable({
  individualResults,
}: {
  individualResults: IndividualResultType[];
}) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={pages.timing.menuLabel}>
          <Table.Header columns={individualResultsColumns}>
            {(column) => (
              <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                {column.textValue}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={individualResults}>
            {(individualResult) => (
              <Table.Row id={individualResult.bib}>
                <StyledTableCell>{individualResult.place}</StyledTableCell>
                <StyledTableCell>{individualResult.bib}</StyledTableCell>
                <StyledTableCell>{individualResult.firstName}</StyledTableCell>
                <StyledTableCell>{individualResult.lastName}</StyledTableCell>
                <StyledTableCell>{individualResult.gender}</StyledTableCell>
                <StyledTableCell>{individualResult.age}</StyledTableCell>
                <StyledTableCell>{individualResult.team}</StyledTableCell>
                <StyledTableCell>{individualResult.resultTimeStr}</StyledTableCell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

function PromptAgeGroupsSection({
  show,
  shouldPromptAgeGroups,
  handleShouldPromptAgeGroupsAction,
  ageGroups,
  handlePromptAgeGroupsAction,
  handlePromptAgeGroupsSubmissionAction,
}: {
  show: boolean;
  shouldPromptAgeGroups: boolean;
  handleShouldPromptAgeGroupsAction: (value: boolean) => void;
  ageGroups: string;
  handlePromptAgeGroupsAction: (value: string) => void;
  handlePromptAgeGroupsSubmissionAction: (e: PressEvent) => void;
}) {
  return (
    <>
      <ShouldPromptAgeGroups
        show={show}
        shouldPromptAgeGroups={shouldPromptAgeGroups}
        handleShouldPromptAgeGroupsAction={handleShouldPromptAgeGroupsAction}
      />
      <PromptAgeGroups
        show={shouldPromptAgeGroups}
        ageGroups={ageGroups}
        handlePromptAgeGroupsAction={handlePromptAgeGroupsAction}
        handlePromptAgeGroupsSubmissionAction={handlePromptAgeGroupsSubmissionAction}
      />
    </>
  );
}

function ShouldPromptAgeGroups({
  show,
  shouldPromptAgeGroups,
  handleShouldPromptAgeGroupsAction,
}: {
  show: boolean;
  shouldPromptAgeGroups: boolean;
  handleShouldPromptAgeGroupsAction: (value: boolean) => void;
}) {
  if (!show) return null;
  return (
    <Switch
      isSelected={shouldPromptAgeGroups}
      onChange={handleShouldPromptAgeGroupsAction}
      className="mt-8"
      size="lg"
    >
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <div className="text-lg font-light">Show age group results</div>
      </Switch.Content>
    </Switch>
  );
}

function PromptAgeGroups({
  show,
  ageGroups,
  handlePromptAgeGroupsAction,
  handlePromptAgeGroupsSubmissionAction,
}: {
  show: boolean;
  ageGroups: string;
  handlePromptAgeGroupsAction: (value: string) => void;
  handlePromptAgeGroupsSubmissionAction: (e: PressEvent) => void;
}) {
  if (!show) return null;
  return (
    <div className="flex items-end gap-2 space-y-4 pt-2">
      <StyledInput
        label="Age Groups (e.g. 10, 20, ...)"
        value={ageGroups}
        onValueChange={handlePromptAgeGroupsAction}
        includeSearchIcon={false}
        isPrimary={false}
        textFieldClassName="w-xs"
      />
      <StyledButton onPress={handlePromptAgeGroupsSubmissionAction} className="mb-4">
        Submit
      </StyledButton>
    </div>
  );
}

const AgeGroupResultsTableWrapper = memo(function AgeGroupResultsTableWrapper({
  ageGroupResults,
}: {
  ageGroupResults: Array<IndividualResultType & { rank: number; ageGroup: string }>;
}) {
  if (!ageGroupResults || ageGroupResults.length === 0) return null;
  return (
    <div className="space-y-2">
      <p>Age Group Results:</p>
      <AgeGroupResultsTable ageGroupResults={ageGroupResults} />
    </div>
  );
});

function AgeGroupResultsTable({
  ageGroupResults,
}: {
  ageGroupResults: Array<IndividualResultType & { rank: number; ageGroup: string }>;
}) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={pages.timing.menuLabel}>
          <Table.Header columns={ageGroupResultsColumns}>
            {(column) => (
              <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                {column.textValue}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={ageGroupResults}>
            {(ageGroupResult) => (
              <Table.Row id={ageGroupResult.bib}>
                <StyledTableCell>{ageGroupResult.ageGroup}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.gender}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.rank}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.bib}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.place}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.firstName}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.lastName}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.age}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.team}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.resultTimeStr}</StyledTableCell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

function ShouldPromptTeams({
  show,
  shouldPromptTeams,
  handleShouldPromptTeamsAction,
}: {
  show: boolean;
  shouldPromptTeams: boolean;
  handleShouldPromptTeamsAction: (value: boolean) => void;
}) {
  if (!show) return null;
  return (
    <Switch
      isSelected={shouldPromptTeams}
      onChange={handleShouldPromptTeamsAction}
      className="mt-8"
      size="lg"
    >
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <div className="text-lg font-light">Show team results</div>
      </Switch.Content>
    </Switch>
  );
}

const TeamResultsTableWrapper = memo(function TeamResultsTableWrapper({
  teamResults,
}: {
  teamResults: TeamResultType[];
}) {
  if (!teamResults || teamResults.length === 0) return null;
  return (
    <div className="space-y-2">
      <p>Team Results:</p>
      <TeamResultsTable teamResults={teamResults} />
    </div>
  );
});

function TeamResultsTable({ teamResults }: { teamResults: TeamResultType[] }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={pages.timing.menuLabel}>
          <Table.Header columns={teamResultsColumns}>
            {(column) => (
              <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                {column.textValue}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={teamResults}>
            {(teamResult) => (
              <Table.Row id={teamResult.team}>
                <StyledTableCell>{teamResult.rank}</StyledTableCell>
                <StyledTableCell>{teamResult.team}</StyledTableCell>
                <StyledTableCell>{teamResult.score}</StyledTableCell>
                <StyledTableCell>{teamResult.scoringTimeStr}</StyledTableCell>
                <StyledTableCell>{teamResult.averageTimeStr}</StyledTableCell>
                <StyledTableCell>{teamResult.spreadTimeStr}</StyledTableCell>
                <TeamResultIndividualPlacesTableCell
                  teamResult={teamResult}
                  useScoringPlace={false}
                />
                <TeamResultIndividualPlacesTableCell
                  teamResult={teamResult}
                  useScoringPlace={true}
                />
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

function TeamResultIndividualPlacesTableCell({
  teamResult,
  useScoringPlace,
}: {
  teamResult: TeamResultType;
  useScoringPlace: boolean;
}) {
  return (
    <StyledTableCell>
      <div className="flex">
        {teamResult.individualResults.map((individualResult) => {
          const place = useScoringPlace ? individualResult.scoringPlace : individualResult.place;
          if (!place) return null;
          return (
            <TeamResultIndividualsTableCellItem
              key={`${teamResult.team}-${useScoringPlace}-${place}`}
            >
              {place}
            </TeamResultIndividualsTableCellItem>
          );
        })}
      </div>
    </StyledTableCell>
  );
}

function TeamResultIndividualsTableCellItem({ children }: { children: ReactNode }) {
  return <div className="-me-px w-9 border-r border-l text-center">{children}</div>;
}

export default function ParseUltraAndGenerateResults() {
  const parseUltraState = useParseUltra();
  const [individualsFileContent, setIndividualsFileContent] = useState<string | null>(null);
  const [shouldPromptAgeGroups, setShouldPromptAgeGroups] = useState(false);
  const [ageGroups, setAgeGroups] = useState("");
  const [submittedAgeGroups, setSubmittedAgeGroups] = useState("");
  const [shouldPromptTeams, setShouldPromptTeams] = useState(false);

  function handlePromptUltraAction() {
    handlePromptIndividualsAction(null);
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

  const { ultraResults, ultraResultsError } = useMemo(
    function () {
      return parseUltra(
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

  const { individuals, individualsError } = useMemo(
    function () {
      return parseIndividuals(individualsFileContent);
    },
    [individualsFileContent],
  );

  const individualResults = useMemo(
    function () {
      return getIndividualResults(ultraResults, individuals);
    },
    [ultraResults, individuals],
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
      <PromptUltraSection
        parseUltraState={parseUltraState}
        handlePromptUltraAction={handlePromptUltraAction}
        ultraResultsError={ultraResultsError}
      />

      <PromptIndividualsSection
        show={!!ultraResults}
        handlePromptIndividualsAction={handlePromptIndividualsAction}
        individualsError={individualsError}
      />

      <IndividualResultsTableWrapper individualResults={individualResults} />

      <PromptAgeGroupsSection
        show={individualResults?.length > 0}
        shouldPromptAgeGroups={shouldPromptAgeGroups}
        handleShouldPromptAgeGroupsAction={handleShouldPromptAgeGroupsAction}
        ageGroups={ageGroups}
        handlePromptAgeGroupsAction={handlePromptAgeGroupsAction}
        handlePromptAgeGroupsSubmissionAction={handlePromptAgeGroupsSubmissionAction}
      />

      <AgeGroupResultsTableWrapper ageGroupResults={ageGroupResults} />

      <ShouldPromptTeams
        show={individualResults?.length > 0}
        shouldPromptTeams={shouldPromptTeams}
        handleShouldPromptTeamsAction={handleShouldPromptTeamsAction}
      />

      <TeamResultsTableWrapper teamResults={teamResults} />
    </div>
  );
}
