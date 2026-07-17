import { IndividualResultType, IndividualType, RawResult } from "@/types";

export const Unknown = "Unknown";

export default function getIndividualResults(
  rawResults: RawResult[] | undefined,
  individuals: IndividualType[] | undefined,
): IndividualResultType[] {
  if (!rawResults || !individuals) return [];

  const bibIndividuals = new Map(
    individuals.map((individual) => [String(individual.bib), individual]),
  );

  return rawResults.map((rawResult) => {
    const individual = bibIndividuals.get(rawResult.bib);

    const registeredIndividual = individual ?? {
      bib: Number(rawResult.bib),
      firstName: Unknown,
      lastName: Unknown,
      gender: "?",
      age: "?",
      team: Unknown,
    };

    return {
      ...registeredIndividual,
      place: rawResult.place,
      resultTime: rawResult.resultTimeRounded,
      resultTimeStr: rawResult.resultTimeRoundedStr,
    };
  });
}
