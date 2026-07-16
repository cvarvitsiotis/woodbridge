import { BibResult, OrderedBibEntry } from "@/types";

const ultraFinishTimePattern = /^\d{2}:\d{2}:\d{2}\.\d{3}$/;
const raceStartTimePattern = /^\d{2}:\d{2}:\d{2}$/;

function getBibResults(lines: string[]): Map<string, BibResult> {
  const bibFinishTimes = new Map<string, BibResult>();

  for (let i = 0; i < lines.length; i++) {
    if (!lines[i]) continue;

    const fields = lines[i].split(",");
    const bib = fields[1];
    const finishTimeStr = fields[3].slice(1, -1);

    if (!ultraFinishTimePattern.test(finishTimeStr))
      throw new Error("Unexpected finish time in Ultra data");

    const finishTime = parseTime(finishTimeStr, true);

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

function parseTime(timeStr: string, hasThousandths: boolean): number {
  const hours = Number(timeStr.slice(0, 2));
  const minutes = Number(timeStr.slice(3, 5));
  const seconds = Number(timeStr.slice(6, 8));
  const thousandths = hasThousandths ? Number(timeStr.slice(9, 12)) : 0;

  return 1000 * 60 * 60 * hours + 1000 * 60 * minutes + 1000 * seconds + thousandths;
}

function getStartTime(
  raceStartTime: string,
  runnerResultTime: string,
  runnerBib: string,
  bibResults: Map<string, BibResult>,
): number {
  if (raceStartTime) {
    if (!raceStartTimePattern.test(raceStartTime)) throw new Error("Unexpected race start time");
    return parseTime(raceStartTime, false);
  }

  return getStartTimeFromRunnerResultTime(runnerResultTime, runnerBib, bibResults);
}

function getStartTimeFromRunnerResultTime(
  runnerResultTime: string,
  runnerBib: string,
  bibResults: Map<string, BibResult>,
): number {
  if (!raceStartTimePattern.test(runnerResultTime))
    throw new Error("Unexpected runner result time");
  const resultTime = parseTime(runnerResultTime, false);
  const result = bibResults.get(runnerBib);
  if (!result) throw new Error("Bib not found");
  if (result.finishTime < resultTime) throw new Error("Cannot cross midnight");
  return result.finishTime - resultTime;
}

function setResultOrderAndTime(bibResults: OrderedBibEntry[], startTime: number) {
  for (let i = 0; i < bibResults.length; i++) {
    const bibResult = bibResults[i];
    const resultTime = getResultTime(bibResult[1].finishTime, startTime);
    const resultTimeRounded = getResultTimeRounded(resultTime);

    bibResult[1].place = i + 1;
    bibResult[1].resultTime = resultTime;
    bibResult[1].resultTimeStrFull = getResultTimeStr(resultTime, 3).resultTimeStrFull;
    bibResult[1].resultTimeRounded = resultTimeRounded;
    bibResult[1].resultTimeRoundedStr = getResultTimeStr(resultTimeRounded, 1).resultTimeStr;
  }
}

function getResultTime(finishTime: number, startTime: number): number {
  const resultTime = finishTime - startTime;
  if (resultTime < 0) throw new Error("Cannot cross midnight");
  return resultTime;
}

function getResultTimeRounded(resultTime: number) {
  return Math.ceil(resultTime / 100) * 100;
}

export function getResultTimeStr(resultTime: number, fractionLen: number) {
  const { hours, minutes, seconds, thousandths } = getTimeComponents(resultTime);

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");
  const fractionStr = thousandths.toString().padStart(fractionLen, "0").slice(0, fractionLen);

  const resultTimeStr =
    (hours ? `${hoursStr}:` : "") + `${minutesStr}:${secondsStr}.${fractionStr}`;

  const resultTimeStrFull = `${hoursStr}:${minutesStr}:${secondsStr}.${fractionStr}`;

  return { resultTimeStr, resultTimeStrFull };
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

function parseUltraInternal(
  fileContent: string,
  raceStartTime: string,
  runnerResultTime: string,
  runnerBib: string,
) {
  const lines = fileContent.split(/\r?\n/);
  const bibResults = getBibResults(lines);
  const orderedBibResults = getOrderedBibResults(bibResults);
  const startTime = getStartTime(raceStartTime, runnerResultTime, runnerBib, bibResults);
  setResultOrderAndTime(orderedBibResults, startTime);
  return orderedBibResults;
}

export default function parseUltra(
  fileContent: string | null,
  raceStartTime: string,
  runnerResultTime: string,
  runnerBib: string,
): { ultraResults?: OrderedBibEntry[]; ultraResultsError?: string } {
  try {
    if (!fileContent || typeof fileContent !== "string") return {};

    return {
      ultraResults: parseUltraInternal(fileContent, raceStartTime, runnerResultTime, runnerBib),
    };
  } catch (error) {
    return { ultraResultsError: error instanceof Error ? error.message : "Unknown error" };
  }
}
