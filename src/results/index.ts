import "server-only";
import { IndividualResultType } from "@/types";

export async function getYearResults(year: number): Promise<IndividualResultType[]> {
  const results = await importYearResults(year);

  const tiedPlaceResult = getTiedPlaceResult(results);
  if (tiedPlaceResult) {
    throw new Error(
      `Tied place in ${year} results: race ${tiedPlaceResult.raceNum} has more than one runner in place ${tiedPlaceResult.place}`,
    );
  }

  return results;
}

async function importYearResults(year: number): Promise<IndividualResultType[]> {
  switch (year) {
    case 1998:
      return (await import("./results1998")).results1998;
    case 1999:
      return (await import("./results1999")).results1999;
    case 2000:
      return (await import("./results2000")).results2000;
    case 2001:
      return (await import("./results2001")).results2001;
    case 2002:
      return (await import("./results2002")).results2002;
    case 2003:
      return (await import("./results2003")).results2003;
    case 2004:
      return (await import("./results2004")).results2004;
    case 2005:
      return (await import("./results2005")).results2005;
    case 2006:
      return (await import("./results2006")).results2006;
    default:
      return [];
  }
}

function getTiedPlaceResult(results: IndividualResultType[]): IndividualResultType | undefined {
  const racePlaces = new Set<string>();
  for (const result of results) {
    const racePlace = `${result.raceNum}-${result.place}`;
    if (racePlaces.has(racePlace)) return result;
    racePlaces.add(racePlace);
  }
  return undefined;
}
