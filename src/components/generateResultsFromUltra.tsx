"use client";

import { ReactNode, useState } from "react";
import { Switch, Table } from "@heroui/react";
import { pages } from "@/config/site";
import StyledTableCell from "./styledTableCell";
import { ColumnProps } from "react-aria-components/Table";
import { RaceResultType } from "@/types";
import parseUltra from "@/utils/parseUltra";
import useParseUltra from "@/hooks/useParseUltra";
import PromptUltra from "./promptUltra";
import PromptIndividuals from "./promptIndividuals";
import parseIndividuals from "@/utils/parseIndividuals";
import getIndividualResults from "@/utils/getIndividualResults";
import PromptAgeGroups from "./promptAgeGroups";
import getAgeGroupResults from "@/utils/ageGroups";

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

function AgeGroupResultsTableWrapper({
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
}

function AgeGroupResultsTable({
  ageGroupResults,
}: {
  ageGroupResults: Array<RaceResultType & { rank: number; ageGroup: string }>;
}) {
  console.log(ageGroupResults);
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
    >
      <Switch.Content>
        Show age group results
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}

function PromptAgeGroupsWrapper({
  show,
  ageGroups,
  handlePromptAgeGroupsAction,
}: {
  show: boolean;
  ageGroups: string;
  handlePromptAgeGroupsAction: (value: string) => void;
}) {
  if (!show) return null;
  return (
    <PromptAgeGroups
      ageGroups={ageGroups}
      handlePromptAgeGroupsAction={handlePromptAgeGroupsAction}
    />
  );
}

function IndividualResultsTableWrapper({
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
}

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
  handlePromptIndividualsAction: (individualsFileContent: string | ArrayBuffer | null) => void;
}) {
  if (!show) return null;
  return (
    <div className="-mt-2">
      <PromptIndividuals handlePromptIndividualsAction={handlePromptIndividualsAction} />
    </div>
  );
}

function ErrorInfo({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <div>
      <p>Error reading file:</p>
      <p className="text-rose-700">{children}</p>
    </div>
  );
}

export default function GenerateResultsFromUltra() {
  const parseUltraState = useParseUltra();
  const [individualsFileContent, setIndividualsFileContent] = useState<string | ArrayBuffer | null>(
    null,
  );
  const [shouldPromptAgeGroups, setShouldPromptAgeGroups] = useState(false);
  const [ageGroups, setAgeGroups] = useState("");

  function handlePromptUltraAction() {
    handlePromptIndividualsAction(null);
  }

  function handlePromptIndividualsAction(individualsFileContent: string | ArrayBuffer | null) {
    setIndividualsFileContent(individualsFileContent);
    handleShouldPromptAgeGroupsAction(false);
  }

  function handleShouldPromptAgeGroupsAction(shouldPromptAgeGroups: boolean) {
    setShouldPromptAgeGroups(shouldPromptAgeGroups);
    handlePromptAgeGroupsAction("");
  }

  function handlePromptAgeGroupsAction(newAgeGroups: string) {
    setAgeGroups(newAgeGroups);
  }

  const { ultraResults, ultraResultsError } = parseUltra(parseUltraState);
  const { individuals, individualsError } = parseIndividuals(individualsFileContent);
  const individualResults = getIndividualResults(ultraResults, individuals);
  const ageGroupResults = getAgeGroupResults(individualResults, ageGroups);

  return (
    <div className="space-y-4">
      <PromptUltra {...parseUltraState} handlePromptUltraAction={handlePromptUltraAction} />
      <ErrorInfo>{ultraResultsError}</ErrorInfo>
      <PromptIndividualsWrapper
        show={!!ultraResults}
        handlePromptIndividualsAction={handlePromptIndividualsAction}
      />
      <ErrorInfo>{individualsError}</ErrorInfo>
      <IndividualResultsTableWrapper individualResults={individualResults} />
      <ShouldPromptAgeGroups
        show={individualResults?.length > 0}
        shouldPromptAgeGroups={shouldPromptAgeGroups}
        handleShouldPromptAgeGroupsAction={handleShouldPromptAgeGroupsAction}
      />
      <PromptAgeGroupsWrapper
        show={shouldPromptAgeGroups}
        ageGroups={ageGroups}
        handlePromptAgeGroupsAction={handlePromptAgeGroupsAction}
      />
      <AgeGroupResultsTableWrapper ageGroupResults={ageGroupResults} />
    </div>
  );
}
