import { IndividualResultType } from "@/types";
import StyledTableCell from "./styledTableCell";
import { Table } from "@heroui/react";
import { pages } from "@/config/site";
import { ColumnProps } from "react-aria-components/Table";

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

export default function IndividualResultsTableWrapper({
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
}
