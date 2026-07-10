"use client";

import { ReactNode } from "react";
import { Table } from "@heroui/react";
import { pages } from "@/config/site";
import StyledTableCell from "./styledTableCell";
import { ColumnProps } from "react-aria-components/Table";
import { OrderedBibEntry } from "@/types";
import parseUltra from "@/utils/parseUltra";
import useParseUltra from "@/hooks/useParseUltra";
import PromptUltra from "./promptUltra";

const columns: ColumnProps[] = [
  { id: "resultOrder", textValue: "Place", isRowHeader: true },
  { id: "bib", textValue: "Bib" },
  { id: "resultTime", textValue: "Result Time" },
];

function UltraResultsTableWrapper({
  ultraResults,
}: {
  ultraResults: OrderedBibEntry[] | undefined;
}) {
  if (!ultraResults) return null;
  return (
    <div className="space-y-2">
      <p>Results:</p>
      <UltraResultsTable ultraResults={ultraResults} />
    </div>
  );
}

function UltraResultsTable({ ultraResults }: { ultraResults: OrderedBibEntry[] }) {
  return (
    <div className="max-w-xs">
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
            <Table.Body items={ultraResults}>
              {(item) => (
                <Table.Row id={item[0]}>
                  <StyledTableCell>{item[1].resultOrder}</StyledTableCell>
                  <StyledTableCell>{item[0]}</StyledTableCell>
                  <StyledTableCell>{item[1].resultTime}</StyledTableCell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
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

export default function ParseUltra() {
  const parseUltraState = useParseUltra();

  const { ultraResults, ultraResultsError } = parseUltra(parseUltraState);

  return (
    <div className="space-y-4">
      <PromptUltra {...parseUltraState} />
      <ErrorInfo>{ultraResultsError}</ErrorInfo>
      <UltraResultsTableWrapper ultraResults={ultraResults} />
    </div>
  );
}
