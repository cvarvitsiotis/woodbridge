import { IndividualResultType } from "@/types";
import StyledTableCell from "./styledTableCell";
import { Table } from "@heroui/react";
import { pages } from "@/config/site";
import { ColumnProps } from "react-aria-components/Table";

const ageGroupResultsColumns: ColumnProps[] = [
  { id: "ageGroup", textValue: "Age Group" },
  { id: "gender", textValue: "Gender" },
  { id: "rank", textValue: "Rank" },
  { id: "name", textValue: "Name", isRowHeader: true },
  { id: "team", textValue: "Team" },
  { id: "age", textValue: "Age" },
  { id: "place", textValue: "Place" },
  { id: "time", textValue: "Time" },
  { id: "bib", textValue: "Bib" },
];

function getName({ firstName, lastName }: IndividualResultType): string {
  return [firstName, lastName].filter(Boolean).join(" ");
}

function AgeGroupResultsTable({
  ageGroupResults,
}: {
  ageGroupResults: Array<IndividualResultType & { rank: number; ageGroup: string }>;
}) {
  return (
    <Table className="mx-auto w-fit md:mx-0">
      <Table.ScrollContainer>
        <Table.Content aria-label={pages.timing.menuLabel} className="whitespace-nowrap">
          <Table.Header columns={ageGroupResultsColumns}>
            {(column) => (
              <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                {column.textValue}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={ageGroupResults}>
            {(ageGroupResult) => (
              <Table.Row id={`${ageGroupResult.place}-${ageGroupResult.bib ?? ""}`}>
                <StyledTableCell>{ageGroupResult.ageGroup}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.gender}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.rank}</StyledTableCell>
                <StyledTableCell>{getName(ageGroupResult)}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.team}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.age}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.place}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.resultTimeStr}</StyledTableCell>
                <StyledTableCell>{ageGroupResult.bib}</StyledTableCell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

export default function AgeGroupResultsTableWrapper({
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
}
