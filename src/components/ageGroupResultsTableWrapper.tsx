import { IndividualResultType } from "@/types";
import StyledTableCell from "./styledTableCell";
import { Table } from "@heroui/react";
import { pages } from "@/config/site";
import { ColumnProps } from "react-aria-components/Table";

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
