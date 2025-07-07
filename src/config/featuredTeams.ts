import { FeaturedTeamType } from "@/types";
import { filteredRaces } from "./races";

const internalFeaturedTeams: FeaturedTeamType[] = Array(30)
  .fill({
    name: "Glendale",
    raceDay: "Friday",
    city: "Glendale ",
    state: "CA",
    featuredRaces: [
      filteredRaces.sweepstakesBoysRace,
      filteredRaces.sweepstakesGirlsRace,
      filteredRaces.ratedBoysRace,
      filteredRaces.ratedGirlsRace,
    ],
  })
  .map((team, index) => ({
    ...team,
    name: team.name + ` ${index}`,
  }))
  .map((team, index) => ({
    ...team,
    id: index,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const featuredTeams = {
  sweepstakesBoysTeams: internalFeaturedTeams.filter((team) =>
    team.featuredRaces?.includes(filteredRaces.sweepstakesBoysRace),
  ),
  ratedBoysTeams: internalFeaturedTeams.filter((team) =>
    team.featuredRaces?.includes(filteredRaces.ratedBoysRace),
  ),
  sweepstakesGirlsTeams: internalFeaturedTeams.filter((team) =>
    team.featuredRaces?.includes(filteredRaces.sweepstakesGirlsRace),
  ),
  ratedGirlsTeams: internalFeaturedTeams.filter((team) =>
    team.featuredRaces?.includes(filteredRaces.ratedGirlsRace),
  ),
};
