import { RawResult, UltraResult } from "@/types";

export const finishTimePattern = /^\d{2}:\d{2}:\d{2}\.\d{3}$/;
const raceStartTimePattern = /^\d{2}:\d{2}:\d{2}$/;

function getRawResults(
  fileContent: string,
  raceStartTime: string,
  runnerResultTime: string,
  runnerBib: string,
) {
  const lines = fileContent.split(/\r?\n/);
  const bibUltraResults = getBibUltraResults(lines);
  const startTime = getStartTime(raceStartTime, runnerResultTime, runnerBib, bibUltraResults);
  return getOrderedRawResults(bibUltraResults, startTime);
}

function getBibUltraResults(lines: string[]): Map<string, UltraResult> {
  const bibUltraResults = new Map<string, UltraResult>();

  for (let i = 0; i < lines.length; i++) {
    if (!lines[i]) continue;

    const fields = lines[i].split(",");
    const bib = fields[1];
    const finishTimeStr = fields[3].slice(1, -1);

    if (!finishTimePattern.test(finishTimeStr))
      throw new Error("Unexpected finish time in Ultra data");

    const finishTime = parseTime(finishTimeStr, true);

    const existing = bibUltraResults.get(bib);
    if (existing && existing.finishTime <= finishTime) continue;

    bibUltraResults.set(bib, { bib, finishTime, originalOrder: i });
  }

  return bibUltraResults;
}

export function parseTime(timeStr: string, hasThousandths: boolean): number {
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
  bibUltraResults: Map<string, UltraResult>,
): number {
  if (raceStartTime) {
    if (!raceStartTimePattern.test(raceStartTime)) throw new Error("Unexpected race start time");
    return parseTime(raceStartTime, false);
  }

  return getStartTimeFromRunnerResultTime(runnerResultTime, runnerBib, bibUltraResults);
}

function getStartTimeFromRunnerResultTime(
  runnerResultTime: string,
  runnerBib: string,
  bibUltraResults: Map<string, UltraResult>,
): number {
  if (!raceStartTimePattern.test(runnerResultTime))
    throw new Error("Unexpected runner result time");
  const resultTime = parseTime(runnerResultTime, false);
  const ultraResult = bibUltraResults.get(runnerBib);
  if (!ultraResult) throw new Error("Bib not found");
  if (ultraResult.finishTime < resultTime) throw new Error("Cannot cross midnight");
  return ultraResult.finishTime - resultTime;
}

function getOrderedRawResults(
  bibUltraResults: Map<string, UltraResult>,
  startTime: number,
): RawResult[] {
  return [...bibUltraResults.values()]
    .sort((a, b) => a.finishTime - b.finishTime || a.originalOrder - b.originalOrder)
    .map((ultraResult, index) => {
      const resultTime = getResultTime(ultraResult.finishTime, startTime);
      const resultTimeRounded = getResultTimeRounded(resultTime);

      return {
        bib: ultraResult.bib,
        place: index + 1,
        resultTime,
        resultTimeStrFull: getResultTimeStr(resultTime, 3).resultTimeStrFull,
        resultTimeRounded,
        resultTimeRoundedStr: getResultTimeStr(resultTimeRounded, 1).resultTimeStr,
      };
    });
}

function getResultTime(finishTime: number, startTime: number): number {
  const resultTime = finishTime - startTime;
  if (resultTime < 0) throw new Error("Cannot cross midnight");
  return resultTime;
}

export function getResultTimeRounded(resultTime: number) {
  return Math.ceil(resultTime / 100) * 100;
}

export function getResultTimeStr(resultTime: number, fractionLen: number) {
  const { hours, minutes, seconds, thousandths } = getTimeComponents(resultTime);

  const hoursStrAbbr = hours.toString();
  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStrAbbr = minutes.toString();
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");
  const fractionStr = thousandths.toString().padStart(fractionLen, "0").slice(0, fractionLen);

  const resultTimeStr =
    (hours ? `${hoursStrAbbr}:` : "") +
    `${hours ? minutesStr : minutesStrAbbr}:${secondsStr}.${fractionStr}`;
  const resultTimeStrFull = `${hoursStr}:${minutesStr}:${secondsStr}.${fractionStr}`;

  return { resultTimeStr, resultTimeStrFull };
}

export function getTimeComponents(timeInThousandths: number): {
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
  const hours = Math.floor(timeInMinutes / 60);
  return { hours, minutes, seconds, thousandths };
}

export default function getRawResultsFromUltra(
  fileContent: string | null,
  raceStartTime: string,
  runnerResultTime: string,
  runnerBib: string,
): { rawResults?: RawResult[]; rawResultsError?: string } {
  try {
    if (!fileContent || typeof fileContent !== "string") return {};

    return {
      rawResults: getRawResults(fileContent, raceStartTime, runnerResultTime, runnerBib),
    };
  } catch (error) {
    return { rawResultsError: error instanceof Error ? error.message : "Unknown error" };
  }
}
