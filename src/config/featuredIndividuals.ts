import { FeaturedIndividualType, LevelType } from "@/types";
import { genders, levels } from "./races";

const internalFeaturedIndividuals: FeaturedIndividualType[] = [
  {
    name: "Brady Anderson",
    teamName: "Faith Lutheran (NV)",
    teamCity: "Las Vegas",
    teamState: "NV",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Blake Bay",
    teamName: "Fresno Christian",
    teamCity: "Fresno",
    teamState: "CA",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Carson Buergey",
    teamName: "Thurston (OR)",
    teamCity: "Springfield",
    teamState: "OR",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Mateo Cafaro",
    teamName: "Monte Vista",
    teamCity: "Danville",
    teamState: "CA",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Jace DeLeDonne",
    teamName: "Riverside Polytechnic",
    teamCity: "Riverside",
    teamState: "CA",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Ryan Fitzpatrick",
    teamName: "Nueva",
    teamCity: "San Mateo",
    teamState: "CA",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Tate Grabow",
    teamName: "Hill City",
    teamCity: "Hill City",
    teamState: "SD",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Henry Hauser",
    teamName: "Menlo School",
    teamCity: "Atherton",
    teamState: "CA",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Noel Huato",
    teamName: "Del Oro (Bakersfield)",
    teamCity: "Bakersfield",
    teamState: "CA",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "OIlver Hunter",
    teamName: "Dana Hills",
    teamCity: "Dana Point",
    teamState: "CA",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Aiden LeRoux",
    teamName: "Cheyenne Mountain, CO",
    teamCity: "Colorado Springs",
    teamState: "CO",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Andres Lomeli",
    teamName: "Kimball",
    teamCity: "Tracy",
    teamState: "CA",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Chase Manning",
    teamName: "Tesoro",
    teamCity: "Las Flores",
    teamState: "CA",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Symond Martin",
    teamName: "Page (AZ)",
    teamCity: "Page",
    teamState: "AZ",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Ashenafi McKinnis",
    teamName: "North Eugene",
    teamCity: "Eugene",
    teamState: "OR",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Mason Monical",
    teamName: "Caldera (OR)",
    teamCity: "Bend",
    teamState: "OR",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Zarian Rodriguez",
    teamName: "Hamilton (AZ)",
    teamCity: "Chandler",
    teamState: "AZ",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Marcus Salinas",
    teamName: "Clovis East",
    teamCity: "Clovis",
    teamState: "CA",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Noah Strohman",
    teamName: "Holliday (TX)",
    teamCity: "Holliday",
    teamState: "TX",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
  {
    name: "Kiefer Wilcox",
    teamName: "Tahoe-Truckee",
    teamCity: "Truckee",
    teamState: "CA",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
]
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
  sweepstakesGirlsIndividuals: getIndividualsByLevelGender(levels.sweepstakes, genders.girls),
};
