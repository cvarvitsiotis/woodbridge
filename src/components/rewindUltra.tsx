"use client";

import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { getParagraphStyle } from "@/styles/styles";
import { Input, Label, Radio, RadioGroup, TextField } from "@heroui/react";
import { Table } from "@heroui/react";
import { pages } from "@/config/site";
import StyledTableCell from "./styledTableCell";
import StyledInput from "./styledInput";

const columns = [
  {
    key: "bib",
    label: "Bib",
  },
  {
    key: "resultTime",
    label: "Result Time",
  },
];

const AnchorTypes = {
  RaceStartTime: "1",
  RunnerResultTime: "2",
};

interface BibResult {
  finishTime: number;
  originalOrder: number;
  resultTime?: string;
}

type OrderedBibEntry = [string, BibResult];

function getBibResults(lines: string[]): Map<string, BibResult> {
  const bibFinishTimes = new Map<string, BibResult>();

  for (let i = 0; i < lines.length; i++) {
    if (!lines[i]) continue;

    const fields = lines[i].split(",");
    const bib = fields[1];
    const finishTimeStr = fields[3].slice(1, -1);
    const finishTime = parseTime(finishTimeStr);

    const existing = bibFinishTimes.get(bib);
    if (existing && existing.finishTime <= finishTime) continue;

    bibFinishTimes.set(bib, { finishTime, originalOrder: i });
  }

  return bibFinishTimes;
}

function getOrderedBibResults(bibResults: Map<string, BibResult>): OrderedBibEntry[] {
  const arr = Array.from(bibResults.entries()) as OrderedBibEntry[];
  arr.sort((a, b) => a[1].finishTime - b[1].finishTime || a[1].originalOrder - b[1].originalOrder);
  return arr;
}

function parseTime(timeStr: string): number {
  const hours = Number(timeStr.slice(0, 2));
  const minutes = Number(timeStr.slice(3, 5));
  const seconds = Number(timeStr.slice(6, 8));
  const thousandths = Number(timeStr.slice(9, 12));

  return 1000 * 60 * 60 * hours + 1000 * 60 * minutes + 1000 * seconds + thousandths;
}

function getStartTime(
  raceStartTime: string,
  runnerResultTime: string,
  runnerBib: string,
  bibResults: Map<string, BibResult>,
): number {
  return raceStartTime
    ? parseTime(raceStartTime)
    : getStartTimeFromRunnerResultTime(runnerResultTime, runnerBib, bibResults);
}

function getStartTimeFromRunnerResultTime(
  runnerResultTime: string,
  runnerBib: string,
  bibResults: Map<string, BibResult>,
): number {
  const resultTime = parseTime(runnerResultTime);
  const result = bibResults.get(runnerBib);
  if (!result) throw new Error("Bib not found");
  if (result.finishTime < resultTime) throw new Error("Cannot cross midnight");
  return result.finishTime - resultTime;
}

function setResultTime(bibResults: OrderedBibEntry[], startTime: number) {
  for (let i = 0; i < bibResults.length; i++) {
    const bibResult = bibResults[i];
    const resultTime = getResultTime(bibResult[1].finishTime, startTime);
    const { hours, minutes, seconds, thousandths } = getTimeComponents(resultTime);
    const hoursStr = hours.toString().padStart(2, "0");
    const minutesStr = minutes.toString().padStart(2, "0");
    const secondsStr = seconds.toString().padStart(2, "0");
    const thousandthsStr = thousandths.toString().padStart(3, "0");
    bibResult[1].resultTime = `${hoursStr}:${minutesStr}:${secondsStr}.${thousandthsStr}`;
  }
}

function getResultTime(finishTime: number, startTime: number): number {
  const resultTime = finishTime - startTime;
  if (resultTime < 0) throw new Error("Cannot cross midnight");
  return resultTime;
}

function getTimeComponents(timeInThousandths: number): {
  hours: number;
  minutes: number;
  seconds: number;
  thousandths: number;
} {
  const thousandths = timeInThousandths % 1000;
  const timeInSeconds = Math.floor(timeInThousandths / 1000);
  const seconds = timeInSeconds % 60;
  const timeInMinutes = Math.floor(timeInSeconds / 60);
  const minutes = timeInMinutes % 60;
  const timeInHours = Math.floor(timeInMinutes / 60);
  const hours = Math.floor(timeInHours / 60);
  return { hours, minutes, seconds, thousandths };
}

function getResults(
  fileContent: string,
  raceStartTime: string,
  runnerResultTime: string,
  runnerBib: string,
) {
  const lines = fileContent.split(/\r?\n/);
  const bibResults = getBibResults(lines);
  const orderedBibResults = getOrderedBibResults(bibResults);
  const startTime = getStartTime(raceStartTime, runnerResultTime, runnerBib, bibResults);
  setResultTime(orderedBibResults, startTime);
  return orderedBibResults;
}
function AnchorTypeRadio({ value, label }: { value: string; label: string }) {
  return (
    <Radio value={value} className="mt-0">
      <Radio.Control>
        <Radio.Indicator />
      </Radio.Control>
      <Radio.Content>
        <Label className="text-lg font-light">{label}</Label>
      </Radio.Content>
    </Radio>
  );
}

function AnchorTypeRadioGroup({
  anchorType,
  handleAnchorTypeChange,
}: {
  anchorType: string;
  handleAnchorTypeChange: (value: string) => void;
}) {
  return (
    <RadioGroup value={anchorType} onChange={handleAnchorTypeChange} className="pl-4">
      <AnchorTypeRadio value={AnchorTypes.RaceStartTime} label="Race start time" />
      <AnchorTypeRadio
        value={AnchorTypes.RunnerResultTime}
        label="Particular athlete's result time"
      />
    </RadioGroup>
  );
}

function ResultsTable({ results }: { results: OrderedBibEntry[] }) {
  return (
    <div className="max-w-80">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label={pages.timing.menuLabel}>
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column id={column.key} isRowHeader={column.key === "bib"}>
                  {column.label}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={results}>
              {(item) => (
                <Table.Row id={item[1].originalOrder}>
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

export default function RewindUltra() {
  const [anchorType, setAnchorType] = useState("");
  const [raceStartTime, setRaceStartTime] = useState("");
  const [runnerResultTime, setRunnerResultTime] = useState("");
  const [runnerBib, setRunnerBib] = useState("");
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>();
  const [fileReadError, setFileReadError] = useState<DOMException | null>();
  const [isDisabled, setIsDisabled] = useState(false);

  function handleAnchorTypeChange(value: string) {
    setAnchorType(value);
    if (value === AnchorTypes.RaceStartTime) {
      setRunnerResultTime("");
      setRunnerBib("");
    } else {
      setRaceStartTime("");
    }
    setFileContent("");
    setIsDisabled(false);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    function handleFileLoad(event: ProgressEvent<FileReader>) {
      setFileContent(event.target?.result);
      setIsDisabled(true);
    }

    function handleFileError(event: ProgressEvent<FileReader>) {
      setFileReadError(event.target?.error);
    }

    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = handleFileLoad;
      reader.onerror = handleFileError;
      reader.readAsText(file);
    }
  }

  const results =
    fileContent && typeof fileContent === "string"
      ? getResults(fileContent, raceStartTime, runnerResultTime, runnerBib)
      : null;

  return (
    <div className={clsx("space-y-2 sm:pl-6", getParagraphStyle(false, false))}>
      <div className="space-y-2">
        <p>
          We need to convert the Ultra data from time of day to result time. To do so, we need an
          anchor point.
        </p>
        <p>Pick the one that you know most-accurately:</p>
        <AnchorTypeRadioGroup
          anchorType={anchorType}
          handleAnchorTypeChange={handleAnchorTypeChange}
        />
        <div className="w-xs space-y-2 pt-2">
          <div className="space-y-2">
            {anchorType === AnchorTypes.RaceStartTime && (
              <StyledInput
                label="Start Time (HH:mm:ss.fff)"
                value={raceStartTime}
                onValueChange={setRaceStartTime}
                includeSearchIcon={false}
                isPrimary={false}
                isDisabled={isDisabled}
              />
            )}
            {anchorType === AnchorTypes.RunnerResultTime && (
              <div className="space-y-2">
                <StyledInput
                  label="Result Time (HH:mm:ss.fff)"
                  value={runnerResultTime}
                  onValueChange={setRunnerResultTime}
                  includeSearchIcon={false}
                  isPrimary={false}
                  isDisabled={isDisabled}
                />
                <StyledInput
                  label="Bib Number"
                  value={runnerBib}
                  onValueChange={setRunnerBib}
                  includeSearchIcon={false}
                  isPrimary={false}
                  isDisabled={isDisabled}
                />
              </div>
            )}
          </div>
          {anchorType && (raceStartTime || (runnerResultTime && runnerBib)) && (
            <div className="pt-2">
              <Input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="w-full"
                variant="secondary"
              />
            </div>
          )}
        </div>
      </div>
      {fileReadError && (
        <>
          <p>Error reading file:</p>
          <p>
            {fileReadError.name} - {fileReadError.message}
          </p>
        </>
      )}
      {results && (
        <div className="pt-4">
          <p>Results:</p>
          <ResultsTable results={results} />
        </div>
      )}
    </div>
  );
}
