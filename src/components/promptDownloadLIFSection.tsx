import { RawResult } from "@/types";
import ButtonLink from "./buttonLink";
import { DownloadIcon } from "./icons";
import { useMemo } from "react";
import { Label, NumberField, Switch } from "@heroui/react";

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
  rawResults,
}: {
  show: boolean;
  raceNumber: number;
  handlePromptDownloadLIFAction: (value: number) => void;
  rawResults: RawResult[];
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
      <DownloadLink raceNumber={raceNumber} rawResults={rawResults} />
    </div>
  );
}

function DownloadLink({ raceNumber, rawResults }: { raceNumber: number; rawResults: RawResult[] }) {
  const lifHref = useMemo(
    function () {
      const lines = [`${raceNumber},,,,,,,,,,`];
      for (const rawResult of rawResults) {
        lines.push(
          `${rawResult.place},${rawResult.bib},,,,,${rawResult.resultTimeStrFull},,,,,,,,,,,,`,
        );
      }
      const lifContent = lines.join("\n");
      return `data:text/csv;charset=utf-8,${encodeURIComponent("\uFEFF" + lifContent)}`;
    },
    [rawResults, raceNumber],
  );

  return (
    <ButtonLink href={lifHref} variant="primary" download="Parsed-Ultra.lif" className="mb-4">
      <DownloadIcon />
      Download
    </ButtonLink>
  );
}

export default function PromptDownloadLIFSection({
  rawResults,
  shouldPromptDownloadLIF,
  handleShouldPromptDownloadLIFAction,
  raceNumber,
  handlePromptDownloadLIFAction,
}: {
  rawResults: RawResult[] | undefined;
  shouldPromptDownloadLIF: boolean;
  handleShouldPromptDownloadLIFAction: (value: boolean) => void;
  raceNumber: number;
  handlePromptDownloadLIFAction: (value: number) => void;
}) {
  if (!rawResults || rawResults.length === 0) return null;
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
        rawResults={rawResults}
      />
    </>
  );
}
