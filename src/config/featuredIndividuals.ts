import { FeaturedIndividualType } from "@/types";
import { filteredRaces } from "./races";

const internalFeaturedIndividuals: FeaturedIndividualType[] = Array(15)
  .fill({
    name: "Chris Varvas",
    grade: 11,
    teamName: "Glendale",
    teamCity: "Glendale",
    teamState: "CA",
    featuredRace: filteredRaces.sweepstakesBoysRace,
  })
  .concat(
    Array(15).fill({
      name: "Chris Varvas",
      grade: 11,
      teamName: "Glendale",
      teamCity: "Glendale",
      teamState: "CA",
      featuredRace: filteredRaces.ratedBoysRace,
    }),
  )
  .concat(
    Array(15).fill({
      name: "Chris Varvas",
      grade: 11,
      teamName: "Glendale",
      teamCity: "Glendale",
      teamState: "CA",
      featuredRace: filteredRaces.sweepstakesGirlsRace,
    }),
  )
  .concat(
    Array(15).fill({
      name: "Chris Varvas",
      grade: 11,
      teamName: "Glendale",
      teamCity: "Glendale",
      teamState: "CA",
      featuredRace: filteredRaces.ratedGirlsRace,
    }),
  )
  .map((individual, index) => ({
    ...individual,
    name: individual.name + ` ${index}`,
  }))
  .map((individual, index) => ({
    ...individual,
    id: index,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const featuredIndividuals = {
  sweepstakesBoysIndividuals: internalFeaturedIndividuals.filter(
    (individual) => individual.featuredRace === filteredRaces.sweepstakesBoysRace,
  ),
  ratedBoysIndividuals: internalFeaturedIndividuals.filter(
    (individual) => individual.featuredRace === filteredRaces.ratedBoysRace,
  ),
  sweepstakesGirlsIndividuals: internalFeaturedIndividuals.filter(
    (individual) => individual.featuredRace === filteredRaces.sweepstakesGirlsRace,
  ),
  ratedGirlsIndividuals: internalFeaturedIndividuals.filter(
    (individual) => individual.featuredRace === filteredRaces.ratedGirlsRace,
  ),
};
