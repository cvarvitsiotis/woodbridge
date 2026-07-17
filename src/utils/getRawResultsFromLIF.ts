import { RawResult } from "@/types";
import {
  parseTime,
  finishTimePattern,
  getResultTimeStr,
  getResultTimeRounded,
} from "./getRawResultsFromUltra";

function getRawResults(fileContent: string) {
  const lines = fileContent.split(/\r?\n/);
  return getOrderedRawResults(lines);
}

function getOrderedRawResults(lines: string[]): RawResult[] {
  return lines
    .slice(1)
    .filter((line) => line)
    .map((line) => {
      const fields = line.split(",");
      const place = fields[0];
      const bib = fields[1];
      const resultTimeStrFull = fields[6];

      if (!finishTimePattern.test(resultTimeStrFull))
        throw new Error("Unexpected finish time in LIF data");

      const resultTime = parseTime(resultTimeStrFull, true);
      const resultTimeRounded = getResultTimeRounded(resultTime);

      return {
        bib,
        place: Number(place),
        resultTime,
        resultTimeStrFull,
        resultTimeRounded: resultTimeRounded,
        resultTimeRoundedStr: getResultTimeStr(resultTimeRounded, 1).resultTimeStr,
      };
    });
}

export default function getRawResultsFromLIF(fileContent: string | null): {
  rawResults?: RawResult[];
  rawResultsError?: string;
} {
  try {
    if (!fileContent || typeof fileContent !== "string") return {};

    return {
      rawResults: getRawResults(fileContent),
    };
  } catch (error) {
    return { rawResultsError: error instanceof Error ? error.message : "Unknown error" };
  }
}
