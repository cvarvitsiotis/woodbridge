import { FeaturedIndividualType, LevelType } from "@/types";
import { genders, levels } from "@/config/races";

const internalFeaturedIndividuals: FeaturedIndividualType[] = (
  [] as Omit<FeaturedIndividualType, "id" | "name">[]
)
  .map((individual, index) => ({
    ...individual,
    id: index,
    name: `${individual.firstName} ${individual.lastName}`,
  }))
  .sort((a, b) => a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName));

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
