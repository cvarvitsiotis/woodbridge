import { OrderedBibEntry, RaceResultType, IndividualType } from "@/types";

export default function getIndividualResults(
  ultraResults: OrderedBibEntry[] | undefined,
  individuals: IndividualType[] | undefined,
): RaceResultType[] {
  if (!ultraResults || !individuals) return [];

  const bibIndividuals = new Map(
    individuals.map((individual) => [String(individual.bib), individual]),
  );

  return ultraResults.reduce<RaceResultType[]>((individualResults, [bib, bibResult]) => {
    const individual = bibIndividuals.get(bib);
    const registeredIndividual = individual ?? {
      bib: Number(bib),
      firstName: "Unknown",
      lastName: "Unknown",
      gender: "?",
      age: "?",
      team: "Unknown",
    };

    individualResults.push({
      ...registeredIndividual,
      resultOrder: bibResult.resultOrder,
      resultTime: bibResult.resultTime,
    });

    return individualResults;
  }, []);
}
