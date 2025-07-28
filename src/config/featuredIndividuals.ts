import { FeaturedIndividualType, LevelType } from "@/types";
import { genders, levels } from "./races";

const internalFeaturedIndividuals: FeaturedIndividualType[] = Array(40)
  .fill({})
  .map((_, index) => ({
    name: `Chris Varvas ${index}`,
    grade: 11,
    teamName: "Glendale",
    teamCity: "Glendale",
    teamState: "CA",
    level: index % 2 === 0 ? levels.sweepstakes : levels.rated,
    gender: index % 4 === 0 || index % 3 === 0 ? genders.boys : genders.girls,
  }))
  .map((individual, index) => ({
    ...individual,
    id: index,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

function getIndividualsByLevelGender(level: LevelType, gender: string) {
  return internalFeaturedIndividuals.filter(
    (individual) => individual.level === level && individual.gender === gender,
  );
}

export const featuredIndividuals = {
  sweepstakesBoysIndividuals: getIndividualsByLevelGender(levels.sweepstakes, genders.boys),
  ratedBoysIndividuals: getIndividualsByLevelGender(levels.rated, genders.boys),
  sweepstakesGirlsIndividuals: getIndividualsByLevelGender(levels.sweepstakes, genders.girls),
  ratedGirlsIndividuals: getIndividualsByLevelGender(levels.rated, genders.girls),
};
