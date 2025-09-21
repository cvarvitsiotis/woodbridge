"use client";

import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { getParagraphStyle } from "@/styles/styles";
import { Input } from "@heroui/input";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { pages } from "@/config/site";

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
  console.log({ runnerResultTime, runnerBib, bibResults });
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

export default function RewindUltra() {
  const [anchorType, setAnchorType] = useState("");
  const [raceStartTime, setRaceStartTime] = useState("");
  const [runnerResultTime, setRunnerResultTime] = useState("");
  const [runnerBib, setRunnerBib] = useState("");
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>();
  const [fileReadError, setFileReadError] = useState<DOMException | null>();

  function handleAnchorTypeChange(event: ChangeEvent<HTMLInputElement>) {
    setAnchorType(event.target.value);
    if (event.target.value === AnchorTypes.RaceStartTime) {
      setRunnerResultTime("");
      setRunnerBib("");
    } else {
      setRaceStartTime("");
    }
    setFileContent("");
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    function handleFileLoad(event: ProgressEvent<FileReader>) {
      setFileContent(event.target?.result);
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
        <div className="pl-4">
          <div>
            <input
              type="radio"
              name="anchorType"
              value={AnchorTypes.RaceStartTime}
              checked={anchorType === AnchorTypes.RaceStartTime}
              onChange={handleAnchorTypeChange}
            />
            <label className="pl-2">Race start time</label>
          </div>
          <div>
            <input
              type="radio"
              name="anchorType"
              value={AnchorTypes.RunnerResultTime}
              checked={anchorType === AnchorTypes.RunnerResultTime}
              onChange={handleAnchorTypeChange}
            />
            <label className="pl-2">Particular athlete&apos;s result time</label>
          </div>
        </div>
        <div className="space-y-2 pt-2">
          {anchorType === AnchorTypes.RaceStartTime && (
            <Input
              label="Start Time (HH:mm:ss.fff)"
              variant="faded"
              radius="sm"
              value={raceStartTime}
              onValueChange={setRaceStartTime}
              className="w-max"
              classNames={{
                inputWrapper: "border border-default-300",
              }}
            />
          )}
          {anchorType === AnchorTypes.RunnerResultTime && (
            <>
              <Input
                label="Result Time (HH:mm:ss.fff)"
                variant="faded"
                radius="sm"
                value={runnerResultTime}
                onValueChange={setRunnerResultTime}
                className="w-max"
                classNames={{
                  inputWrapper: "border border-default-300",
                }}
              />
              <Input
                label="Bib Number"
                variant="faded"
                radius="sm"
                value={runnerBib}
                onValueChange={setRunnerBib}
                className="w-max"
                classNames={{
                  inputWrapper: "border border-default-300",
                }}
              />
            </>
          )}
        </div>
        {anchorType && (raceStartTime || (runnerResultTime && runnerBib)) && (
          <Input
            type="file"
            radius="sm"
            accept=".txt"
            variant="faded"
            className="pt-4"
            classNames={{ mainWrapper: "w-max" }}
            onChange={handleFileChange}
          />
        )}
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

function ResultsTable({ results }: { results: OrderedBibEntry[] }) {
  return (
    <div className="max-w-80">
      <Table isCompact aria-label={pages.timing.menuLabel}>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={results}>
          {(item) => (
            <TableRow key={item[1].originalOrder}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "bib" ? item[0] : getKeyValue(item[1], columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
