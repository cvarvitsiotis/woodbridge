import { OrderedBibEntry, IndividualResultType, IndividualType } from "@/types";

export const Unknown = "Unknown";

export default function getIndividualResults(
  ultraResults: OrderedBibEntry[] | undefined,
  individuals: IndividualType[] | undefined,
): IndividualResultType[] {
  if (!ultraResults || !individuals) return [];

  const bibIndividuals = new Map(
    individuals.map((individual) => [String(individual.bib), individual]),
  );

  return ultraResults.reduce<IndividualResultType[]>((individualResults, [bib, bibResult]) => {
    const individual = bibIndividuals.get(bib);
    const registeredIndividual = individual ?? {
      bib: Number(bib),
      firstName: Unknown,
      lastName: Unknown,
      gender: "?",
      age: "?",
      team: Unknown,
    };

    individualResults.push({
      ...registeredIndividual,
      place: bibResult.place,
      resultTime: bibResult.resultTimeRounded,
      resultTimeStr: bibResult.resultTimeRoundedStr,
    });

    return individualResults;
  }, []);
}
