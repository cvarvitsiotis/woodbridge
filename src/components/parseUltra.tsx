"use client";

import { Label, NumberField, Switch, Table } from "@heroui/react";
import { pages } from "@/config/site";
import StyledTableCell from "./styledTableCell";
import { ColumnProps } from "react-aria-components/Table";
import { OrderedBibEntry } from "@/types";
import parseUltra from "@/utils/parseUltra";
import useParseUltra from "@/hooks/useParseUltra";
import PromptUltraSection from "./promptUltraSection";
import ButtonLink from "./buttonLink";
import { DownloadIcon } from "./icons";
import { memo, useMemo, useState } from "react";

const columns: ColumnProps[] = [
  { id: "place", textValue: "Place", isRowHeader: true },
  { id: "bib", textValue: "Bib" },
  { id: "resultTime", textValue: "Result Time" },
];

const UltraResultsTableWrapper = memo(function UltraResultsTableWrapper({
  ultraResults,
}: {
  ultraResults: OrderedBibEntry[] | undefined;
}) {
  if (!ultraResults) return null;
  return (
    <div className="max-w-sm space-y-2">
      <p>Results:</p>
      <UltraResultsTable ultraResults={ultraResults} />
    </div>
  );
});

function UltraResultsTable({ ultraResults }: { ultraResults: OrderedBibEntry[] }) {
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
          <Table.Body items={ultraResults}>
            {(item) => (
              <Table.Row id={item[0]}>
                <StyledTableCell>{item[1].place}</StyledTableCell>
                <StyledTableCell>{item[0]}</StyledTableCell>
                <StyledTableCell>{item[1].resultTimeStrFull}</StyledTableCell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

function PromptDownloadLIFSection({
  ultraResults,
  shouldPromptDownloadLIF,
  handleShouldPromptDownloadLIFAction,
  raceNumber,
  handlePromptDownloadLIFAction,
}: {
  ultraResults: OrderedBibEntry[] | undefined;
  shouldPromptDownloadLIF: boolean;
  handleShouldPromptDownloadLIFAction: (value: boolean) => void;
  raceNumber: number;
  handlePromptDownloadLIFAction: (value: number) => void;
}) {
  if (!ultraResults || ultraResults.length === 0) return null;
  return (
    <>
      <ShouldPromptDownloadLIF
        shouldPromptDownloadLIF={shouldPromptDownloadLIF}
        handleShouldPromptDownloadLIFAction={handleShouldPromptDownloadLIFAction}
      />
      <PromptDownloadLIF
        show={shouldPromptDownloadLIF}
        raceNumber={raceNumber}
        handlePromptDownloadLIFAction={handlePromptDownloadLIFAction}
        ultraResults={ultraResults}
      />
    </>
  );
}

function ShouldPromptDownloadLIF({
  shouldPromptDownloadLIF,
  handleShouldPromptDownloadLIFAction,
}: {
  shouldPromptDownloadLIF: boolean;
  handleShouldPromptDownloadLIFAction: (value: boolean) => void;
}) {
  return (
    <Switch
      isSelected={shouldPromptDownloadLIF}
      onChange={handleShouldPromptDownloadLIFAction}
      className="mt-8"
      size="lg"
    >
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <div className="text-lg font-light">Download LIF File</div>
      </Switch.Content>
    </Switch>
  );
}

function PromptDownloadLIF({
  show,
  raceNumber,
  handlePromptDownloadLIFAction,
  ultraResults,
}: {
  show: boolean;
  raceNumber: number;
  handlePromptDownloadLIFAction: (value: number) => void;
  ultraResults: OrderedBibEntry[];
}) {
  if (!show) return null;

  return (
    <div className="flex items-end gap-4 space-y-4">
      <NumberField
        value={raceNumber}
        onChange={handlePromptDownloadLIFAction}
        name="width"
        minValue={1}
        variant="secondary"
      >
        <Label>Race Number</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-16 text-center" />
          <NumberField.IncrementButton />
        </NumberField.Group>
      </NumberField>
      <DownloadLink raceNumber={raceNumber} ultraResults={ultraResults} />
    </div>
  );
}

function DownloadLink({
  raceNumber,
  ultraResults,
}: {
  raceNumber: number;
  ultraResults: OrderedBibEntry[];
}) {
  const lifHref = useMemo(
    function () {
      const lines = [`${raceNumber},,,,,,,,,,`];
      for (const [bib, result] of ultraResults) {
        lines.push(`${result.place},${bib},,,,,${result.resultTimeStrFull},,,,,,,,,,,,`);
      }
      const lifContent = lines.join("\n");
      return `data:text/csv;charset=utf-8,${encodeURIComponent("\uFEFF" + lifContent)}`;
    },
    [ultraResults, raceNumber],
  );

  return (
    <ButtonLink href={lifHref} variant="primary" download="Parsed-Ultra.lif" className="mb-4">
      <DownloadIcon />
      Download
    </ButtonLink>
  );
}

export default function ParseUltra() {
  const parseUltraState = useParseUltra();
  const [shouldPromptDownloadLIF, setShouldPromptDownloadLIF] = useState(false);
  const [raceNumber, setRaceNumber] = useState(0);

  function handlePromptUltraAction() {
    handleShouldPromptDownloadLIFAction(false);
  }

  function handleShouldPromptDownloadLIFAction(shouldPromptDownloadLIF: boolean) {
    setShouldPromptDownloadLIF(shouldPromptDownloadLIF);
    handlePromptDownloadLIFAction(0);
  }

  function handlePromptDownloadLIFAction(raceNumber: number) {
    setRaceNumber(raceNumber);
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

  return (
    <div className="space-y-6">
      <PromptUltraSection
        parseUltraState={parseUltraState}
        handlePromptUltraAction={handlePromptUltraAction}
        ultraResultsError={ultraResultsError}
      />

      <UltraResultsTableWrapper ultraResults={ultraResults} />

      <PromptDownloadLIFSection
        ultraResults={ultraResults}
        shouldPromptDownloadLIF={shouldPromptDownloadLIF}
        handleShouldPromptDownloadLIFAction={handleShouldPromptDownloadLIFAction}
        raceNumber={raceNumber}
        handlePromptDownloadLIFAction={handlePromptDownloadLIFAction}
      />
    </div>
  );
}
