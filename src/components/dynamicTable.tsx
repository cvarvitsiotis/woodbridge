"use client";

import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { EmptyState, Table, TableLayout, Virtualizer } from "@heroui/react";
import { JSX, ReactNode, useEffect, useState } from "react";
import { ColumnProps } from "react-aria-components/Table";

export default function DynamicTable({
  tableKey,
  topContent,
  columns,
  ariaLabel,
  children,
}: {
  tableKey: string;
  topContent: JSX.Element;
  columns: ColumnProps[];
  ariaLabel: string;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const windowDimensions = useWindowDimensions();
  // eslint-disable-next-line
  useEffect(() => setMounted(true), []);

  const maxTableHeight =
    mounted && windowDimensions.height !== undefined
      ? Math.floor(windowDimensions.height * 0.7)
      : 300;

  return (
    <div className="space-y-4">
      {topContent}
      <Virtualizer layout={TableLayout}>
        <Table
          key={tableKey} //to force rerender - bug was preventing
        >
          <Table.ResizableContainer>
            <Table.ScrollContainer>
              <Table.Content
                aria-label={ariaLabel}
                className="min-h-52 overflow-auto"
                style={{ maxHeight: `${maxTableHeight}px` }}
              >
                <Table.Header columns={columns} className="h-full">
                  {(column) => (
                    <Table.Column
                      id={column.id}
                      isRowHeader={column.isRowHeader}
                      defaultWidth={column.defaultWidth}
                    >
                      {column.textValue}
                      <Table.ColumnResizer />
                    </Table.Column>
                  )}
                </Table.Header>
                {children}
              </Table.Content>
            </Table.ScrollContainer>
          </Table.ResizableContainer>
        </Table>
      </Virtualizer>
    </div>
  );
}

export function TableEmptyState() {
  return (
    <EmptyState className="flex h-full flex-col items-center justify-center gap-4">
      <span className="text-sm text-zinc-500">No results found</span>
    </EmptyState>
  );
}
