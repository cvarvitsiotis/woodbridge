import { FeaturedTeamType, LevelType } from "@/types";
import { genders, levels } from "@/config/races";

const internalFeaturedTeams: FeaturedTeamType[] = ([] as Omit<FeaturedTeamType, "id">[])
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
