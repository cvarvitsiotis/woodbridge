"use client";

import { memo, useMemo, useState } from "react";
import { PressEvent, Switch, Table } from "@heroui/react";
import { pages } from "@/config/site";
import StyledTableCell from "./styledTableCell";
import { ColumnProps } from "react-aria-components/Table";
import { RaceResultType } from "@/types";
import parseUltra from "@/utils/parseUltra";
import useParseUltra from "@/hooks/useParseUltra";
import PromptIndividuals from "./promptIndividuals";
import parseIndividuals from "@/utils/parseIndividuals";
import getIndividualResults from "@/utils/getIndividualResults";
import getAgeGroupResults from "@/utils/ageGroups";
import PromptUltraSection from "./promptUltraSection";
import FileErrorInfo from "./fileErrorInfo";
import StyledInput from "./styledInput";
import StyledButton from "./styledButton";

const individualResultsColumns: ColumnProps[] = [
  { id: "bib", textValue: "Bib", isRowHeader: true },
  { id: "resultOrder", textValue: "Place" },
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
  { id: "resultOrder", textValue: "Place" },
  { id: "firstName", textValue: "First Name" },
  { id: "lastName", textValue: "Last Name" },
  { id: "age", textValue: "Age" },
  { id: "team", textValue: "Team" },
  { id: "resultTime", textValue: "Result Time" },
];

const AgeGroupResultsTableWrapper = memo(function AgeGroupResultsTableWrapper({
  ageGroupResults,
}: {
  ageGroupResults: Array<RaceResultType & { rank: number; ageGroup: string }>;
}) {
  if (!ageGroupResults || ageGroupResults.length === 0) return null;
  return (
    <div className="space-y-2">
      <p>Results:</p>
      <AgeGroupResultsTable ageGroupResults={ageGroupResults} />
    </div>
  );
});

function AgeGroupResultsTable({
  ageGroupResults,
}: {
  ageGroupResults: Array<RaceResultType & { rank: number; ageGroup: string }>;
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
            {(item) => (
              <Table.Row id={item.bib}>
                <StyledTableCell>{item.ageGroup}</StyledTableCell>
                <StyledTableCell>{item.gender}</StyledTableCell>
                <StyledTableCell>{item.rank}</StyledTableCell>
                <StyledTableCell>{item.bib}</StyledTableCell>
                <StyledTableCell>{item.resultOrder}</StyledTableCell>
                <StyledTableCell>{item.firstName}</StyledTableCell>
                <StyledTableCell>{item.lastName}</StyledTableCell>
                <StyledTableCell>{item.age}</StyledTableCell>
                <StyledTableCell>{item.team}</StyledTableCell>
                <StyledTableCell>{item.resultTime}</StyledTableCell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
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

const IndividualResultsTableWrapper = memo(function IndividualResultsTableWrapper({
  individualResults,
}: {
  individualResults: RaceResultType[] | undefined;
}) {
  if (!individualResults || individualResults.length === 0) return null;
  return (
    <div className="space-y-2">
      <p>Results:</p>
      <IndividualResultsTable individualResults={individualResults} />
    </div>
  );
});

function IndividualResultsTable({ individualResults }: { individualResults: RaceResultType[] }) {
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
            {(item) => (
              <Table.Row id={item.bib}>
                <StyledTableCell>{item.resultOrder}</StyledTableCell>
                <StyledTableCell>{item.bib}</StyledTableCell>
                <StyledTableCell>{item.firstName}</StyledTableCell>
                <StyledTableCell>{item.lastName}</StyledTableCell>
                <StyledTableCell>{item.gender}</StyledTableCell>
                <StyledTableCell>{item.age}</StyledTableCell>
                <StyledTableCell>{item.team}</StyledTableCell>
                <StyledTableCell>{item.resultTime}</StyledTableCell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
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

export default function ParseUltraAndGenerateResults() {
  const parseUltraState = useParseUltra();
  const [individualsFileContent, setIndividualsFileContent] = useState<string | null>(null);
  const [shouldPromptAgeGroups, setShouldPromptAgeGroups] = useState(false);
  const [ageGroups, setAgeGroups] = useState("");
  const [submittedAgeGroups, setSubmittedAgeGroups] = useState("");

  function handlePromptUltraAction() {
    handlePromptIndividualsAction(null);
  }

  function handlePromptIndividualsAction(individualsFileContent: string | null) {
    setIndividualsFileContent(individualsFileContent);
    handleShouldPromptAgeGroupsAction(false);
  }

  function handleShouldPromptAgeGroupsAction(shouldPromptAgeGroups: boolean) {
    setShouldPromptAgeGroups(shouldPromptAgeGroups);
    handlePromptAgeGroupsAction("");
    setSubmittedAgeGroups("");
  }

  function handlePromptAgeGroupsAction(newAgeGroups: string) {
    setAgeGroups(newAgeGroups);
  }

  function handlePromptAgeGroupsSubmissionAction() {
    setSubmittedAgeGroups(ageGroups);
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
    </div>
  );
}
