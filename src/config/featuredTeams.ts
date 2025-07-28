import { FeaturedTeamType, LevelType } from "@/types";
import { genders, levels } from "./races";

const internalFeaturedTeams: FeaturedTeamType[] = Array(40)
  .fill({})
  .map((_, index) => ({
    name: `Glendale ${index}`,
    city: "Glendale ",
    state: "CA",
    level: index % 2 === 0 ? levels.sweepstakes : levels.rated,
    gender: index % 4 === 0 || index % 3 === 0 ? genders.boys : genders.girls,
  }))
  .map((team, index) => ({
    ...team,
    id: index,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

function getTeamsByLevelGender(level: LevelType, gender: string) {
  return internalFeaturedTeams.filter((team) => team.level === level && team.gender === gender);
}

export const featuredTeams = {
  sweepstakesBoysTeams: getTeamsByLevelGender(levels.sweepstakes, genders.boys),
  ratedBoysTeams: getTeamsByLevelGender(levels.rated, genders.boys),
  sweepstakesGirlsTeams: getTeamsByLevelGender(levels.sweepstakes, genders.girls),
  ratedGirlsTeams: getTeamsByLevelGender(levels.rated, genders.girls),
};
