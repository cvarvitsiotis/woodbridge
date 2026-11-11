"use client";

import { IndividualResultType } from "@/types";
import StyledTableCell from "./styledTableCell";
import { Table } from "@heroui/react";
import { pages } from "@/config/site";
import { ColumnProps } from "react-aria-components/Table";

const raceIndividualResultsColumns: ColumnProps[] = [
  { id: "place", textValue: "Place", isRowHeader: true },
  { id: "name", textValue: "Name" },
  { id: "school", textValue: "School" },
  { id: "time", textValue: "Time" },
  { id: "grade", textValue: "Grade" },
  { id: "bib", textValue: "Bib" },
];

function getName({ firstName, lastName }: IndividualResultType): string {
  return [firstName, lastName].filter(Boolean).join(" ");
}

function RaceIndividualResultsTable({
  individualResults,
}: {
  individualResults: IndividualResultType[];
}) {
  const hasGrade = individualResults.some((individualResult) => individualResult.age !== undefined);
  const hasBib = individualResults.some((individualResult) => individualResult.bib !== undefined);
  const columns = raceIndividualResultsColumns.filter(
    (column) => (column.id !== "grade" || hasGrade) && (column.id !== "bib" || hasBib),
  );

  return (
    <Table className="mx-auto w-fit md:mx-0">
      <Table.ScrollContainer>
        <Table.Content aria-label={pages.raceResults.menuLabel} className="whitespace-nowrap">
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                {column.textValue}
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
                {hasGrade && <StyledTableCell>{individualResult.age}</StyledTableCell>}
                {hasBib && <StyledTableCell>{individualResult.bib}</StyledTableCell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

export default function RaceIndividualResultsTableWrapper({
  individualResults,
}: {
  individualResults: IndividualResultType[];
}) {
  if (individualResults.length === 0) return null;
  return <RaceIndividualResultsTable individualResults={individualResults} />;
}
