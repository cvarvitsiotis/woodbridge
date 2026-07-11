import { IndividualType } from "@/types";

function getIndividuals(lines: string[]) {
  return lines
    .filter((line) => line)
    .map((line) => {
      const fields = line.split(",");
      return {
        bib: Number(fields[0]),
        firstName: fields[1],
        lastName: fields[2],
        gender: fields[3],
        age: fields[4],
        team: fields[5],
      };
    });
}

function parseIndividualsInternal(fileContent: string) {
  const lines = fileContent.split(/\r?\n/);
  return getIndividuals(lines);
}

export default function parseIndividuals(fileContent: string | null): {
  individuals?: IndividualType[];
  individualsError?: string;
} {
  try {
    if (!fileContent || typeof fileContent !== "string") return {};

    return {
      individuals: parseIndividualsInternal(fileContent),
    };
  } catch (error) {
    return { individualsError: error instanceof Error ? error.message : "Unknown error" };
  }
}
