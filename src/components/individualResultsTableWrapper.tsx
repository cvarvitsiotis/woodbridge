"use client";

import { IndividualResultType } from "@/types";
import StyledTableCell from "./styledTableCell";
import { Table } from "@heroui/react";
import { pages } from "@/config/site";
import { ColumnProps } from "react-aria-components/Table";

const individualResultsColumns: ColumnProps[] = [
  { id: "place", textValue: "Place", isRowHeader: true },
  { id: "name", textValue: "Name" },
  { id: "team", textValue: "Team" },
  { id: "time", textValue: "Time" },
  { id: "age", textValue: "Age" },
  { id: "gender", textValue: "Gender" },
  { id: "bib", textValue: "Bib" },
];

function getName({ firstName, lastName }: IndividualResultType): string {
  return [firstName, lastName].filter(Boolean).join(" ");
}

function getColumnLabel(column: ColumnProps, isRaceResults: boolean): string | undefined {
  if (isRaceResults && column.id === "team") return "School";
  if (isRaceResults && column.id === "age") return "Grade";
  return column.textValue;
}

function IndividualResultsTable({
  individualResults,
  isRaceResults,
}: {
  individualResults: IndividualResultType[];
  isRaceResults: boolean;
}) {
  const showAge =
    !isRaceResults ||
    individualResults.some((individualResult) => individualResult.age !== undefined);
  const showBib =
    !isRaceResults ||
    individualResults.some((individualResult) => individualResult.bib !== undefined);
  const columns = individualResultsColumns.filter(
    (column) =>
      (column.id !== "age" || showAge) &&
      (column.id !== "gender" || !isRaceResults) &&
      (column.id !== "bib" || showBib),
  );

  return (
    <Table className="mx-auto w-fit md:mx-0">
      <Table.ScrollContainer>
        <Table.Content
          aria-label={isRaceResults ? pages.raceResults.menuLabel : pages.timing.menuLabel}
          className="whitespace-nowrap"
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                {getColumnLabel(column, isRaceResults)}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={individualResults}>
            {(individualResult) => (
              <Table.Row
                id={`${individualResult.raceNum ?? ""}-${individualResult.place}-${individualResult.bib ?? ""}`}
              >
                <StyledTableCell>
                  {individualResult.overallPlace ?? individualResult.place}
                </StyledTableCell>
                <StyledTableCell>{getName(individualResult)}</StyledTableCell>
                <StyledTableCell>{individualResult.team}</StyledTableCell>
                <StyledTableCell>{individualResult.resultTimeStr}</StyledTableCell>
                {showAge && <StyledTableCell>{individualResult.age}</StyledTableCell>}
                {!isRaceResults && <StyledTableCell>{individualResult.gender}</StyledTableCell>}
                {showBib && <StyledTableCell>{individualResult.bib}</StyledTableCell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

export default function IndividualResultsTableWrapper({
  individualResults,
  isRaceResults = false,
}: {
  individualResults: IndividualResultType[];
  isRaceResults?: boolean;
}) {
  if (individualResults.length === 0) return null;
  return (
    <IndividualResultsTable individualResults={individualResults} isRaceResults={isRaceResults} />
  );
}
