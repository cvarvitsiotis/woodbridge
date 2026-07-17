import { pages } from "@/config/site";
import { RawResult } from "@/types";
import { Table } from "@heroui/react";
import StyledTableCell from "./styledTableCell";
import { ColumnProps } from "react-aria-components/Table";

const columns: ColumnProps[] = [
  { id: "place", textValue: "Place", isRowHeader: true },
  { id: "bib", textValue: "Bib" },
  { id: "resultTime", textValue: "Result Time" },
];

function RawResultsTable({ rawResults }: { rawResults: RawResult[] }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={pages.timing.menuLabel}>
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                {column.textValue}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={rawResults}>
            {(rawResult) => (
              <Table.Row id={rawResult.bib}>
                <StyledTableCell>{rawResult.place}</StyledTableCell>
                <StyledTableCell>{rawResult.bib}</StyledTableCell>
                <StyledTableCell>{rawResult.resultTimeStrFull}</StyledTableCell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

export default function RawResultsTableWrapper({
  rawResults,
}: {
  rawResults: RawResult[] | undefined;
}) {
  if (!rawResults) return null;
  return (
    <div className="max-w-sm space-y-2">
      <p>Results:</p>
      <RawResultsTable rawResults={rawResults} />
    </div>
  );
}
