import { DivisionsType, DivisionType, LevelsType, LevelType, RaceType } from "@/types";

export const resultTypes = {
  individuals: "Individuals",
  team: "Team",
};

export const genders = {
  girls: "Girls",
  boys: "Boys",
};

export const divisions: DivisionsType = {
  one: { num: 1, numRoman: "I", name: "Blue" },
  two: { num: 2, numRoman: "II", name: "Gold" },
  three: { num: 3, numRoman: "III", name: "Red" },
  four: { num: 4, numRoman: "IV", name: "White" },
};

export const scheduleLevelGenderToken = "%%gender%%";
export const scheduleLevelSweepstakesNameToken = "%%sweepstakesName%%";

export const levels: LevelsType = {
  novice: {
    level: "Novice",
    isIndivOnly: true,
    resultLink: "n",
  },
  frosh: {
    level: "Frosh",
    resultLink: "f",
  },
  soph: {
    level: "Soph",
    resultLink: "s",
  },
  junior: {
    level: "Junior",
    resultLink: "j",
  },
  juniorSenior: {
    level: "Junior / Senior",
    isCombo: true,
    resultLink: "js",
  },
  senior: {
    level: "Senior",
    resultLink: "sen",
  },
  varsity: {
    level: "Varsity",
    resultLink: "v",
  },
  rated: {
    level: "Rated",
    resultLink: "rated",
  },
  sweepstakes: {
    level: "Sweepstakes",
    scheduleFormat: `${scheduleLevelSweepstakesNameToken} ${scheduleLevelGenderToken} Sweepstakes`,
    resultLink: "sweep",
  },
};

export const sweepstakesLevelName = {
  [genders.girls]: "Bob Day's",
  [genders.boys]: "Doug Speck's",
};

export const heats = {
  a: "A",
  b: "B",
};

export const races: RaceType[] = [
  {
    num: 1,
    time: "5:00 PM",
    divisions: [divisions.three, divisions.four],
    level: levels.novice,
    gender: genders.boys,
  },
  {
    num: 2,
    time: "5:20 PM",
    divisions: [divisions.three, divisions.four],
    level: levels.novice,
    gender: genders.girls,
  },
  {
    num: 3,
    time: "5:40 PM",
    divisions: [divisions.four],
    level: levels.frosh,
    gender: genders.boys,
  },
  {
    num: 4,
    time: "5:52 PM",
    divisions: [divisions.three],
    level: levels.frosh,
    gender: genders.girls,
  },
  {
    num: 5,
    time: "6:04 PM",
    divisions: [divisions.four],
    level: levels.soph,
    gender: genders.boys,
  },
  {
    num: 6,
    time: "6:16 PM",
    divisions: [divisions.three],
    level: levels.soph,
    gender: genders.girls,
  },
  {
    num: 7,
    time: "6:28 PM",
    divisions: [divisions.four],
    level: levels.junior,
    gender: genders.boys,
  },
  {
    num: 8,
    time: "6:40 PM",
    divisions: [divisions.three],
    level: levels.juniorSenior,
    gender: genders.girls,
  },
  {
    num: 9,
    time: "6:52 PM",
    divisions: [divisions.four],
    level: levels.senior,
    gender: genders.boys,
  },
  {
    num: 10,
    time: "7:04 PM",
    divisions: [divisions.three],
    level: levels.frosh,
    gender: genders.boys,
  },
  {
    num: 11,
    time: "7:16 PM",
    divisions: [divisions.four],
    level: levels.frosh,
    gender: genders.girls,
  },
  {
    num: 12,
    time: "7:28 PM",
    divisions: [divisions.three],
    level: levels.soph,
    gender: genders.boys,
  },
  {
    num: 13,
    time: "7:40 PM",
    divisions: [divisions.four],
    level: levels.soph,
    gender: genders.girls,
  },
  {
    num: 14,
    time: "7:52 PM",
    divisions: [divisions.three],
    level: levels.junior,
    gender: genders.boys,
  },
  {
    num: 15,
    time: "8:04 PM",
    divisions: [divisions.four],
    level: levels.juniorSenior,
    gender: genders.girls,
  },
  {
    num: 16,
    time: "8:16 PM",
    divisions: [divisions.three],
    level: levels.senior,
    gender: genders.boys,
  },
  {
    num: 17,
    time: "8:28 PM",
    divisions: [divisions.four],
    level: levels.varsity,
    heat: heats.a,
    gender: genders.girls,
  },
  {
    num: 18,
    time: "8:40 PM",
    divisions: [divisions.three],
    level: levels.varsity,
    heat: heats.a,
    gender: genders.boys,
  },
  {
    num: 19,
    time: "8:52 PM",
    divisions: [divisions.four],
    level: levels.varsity,
    heat: heats.b,
    gender: genders.girls,
  },
  {
    num: 20,
    time: "9:04 PM",
    divisions: [divisions.three],
    level: levels.varsity,
    heat: heats.b,
    gender: genders.boys,
  },
  {
    num: 21,
    time: "9:16 PM",
    divisions: [divisions.four],
    level: levels.varsity,
    heat: heats.a,
    gender: genders.boys,
  },
  {
    num: 22,
    time: "9:28 PM",
    divisions: [divisions.three],
    level: levels.varsity,
    heat: heats.a,
    gender: genders.girls,
  },
  {
    num: 23,
    time: "9:40 PM",
    divisions: [divisions.four],
    level: levels.varsity,
    heat: heats.b,
    gender: genders.boys,
  },
  {
    num: 24,
    time: "9:52 PM",
    divisions: [divisions.three],
    level: levels.varsity,
    heat: heats.b,
    gender: genders.girls,
  },
  {
    num: 25,
    time: "3:50 PM",
    divisions: [divisions.one, divisions.two],
    level: levels.novice,
    gender: genders.boys,
  },
  {
    num: 26,
    time: "4:02 PM",
    divisions: [divisions.one, divisions.two],
    level: levels.novice,
    gender: genders.girls,
  },
  {
    num: 27,
    time: "4:22 PM",
    divisions: [divisions.two],
    level: levels.frosh,
    gender: genders.boys,
  },
  {
    num: 28,
    time: "4:34 PM",
    divisions: [divisions.one],
    level: levels.frosh,
    gender: genders.girls,
  },
  {
    num: 29,
    time: "4:46 PM",
    divisions: [divisions.two],
    level: levels.soph,
    gender: genders.boys,
  },
  {
    num: 30,
    time: "4:58 PM",
    divisions: [divisions.one],
    level: levels.soph,
    gender: genders.girls,
  },
  {
    num: 31,
    time: "5:10 PM",
    divisions: [divisions.two],
    level: levels.junior,
    gender: genders.boys,
  },
  {
    num: 32,
    time: "5:22 PM",
    divisions: [divisions.one],
    level: levels.juniorSenior,
    gender: genders.girls,
  },
  {
    num: 33,
    time: "5:34 PM",
    divisions: [divisions.two],
    level: levels.senior,
    gender: genders.boys,
  },
  {
    num: 34,
    time: "5:46 PM",
    divisions: [divisions.one],
    level: levels.frosh,
    gender: genders.boys,
  },
  {
    num: 35,
    time: "5:58 PM",
    divisions: [divisions.two],
    level: levels.frosh,
    gender: genders.girls,
  },
  {
    num: 36,
    time: "6:10 PM",
    divisions: [divisions.one],
    level: levels.soph,
    gender: genders.boys,
  },
  {
    num: 37,
    time: "6:22 PM",
    divisions: [divisions.two],
    level: levels.soph,
    gender: genders.girls,
  },
  {
    num: 38,
    time: "6:34 PM",
    divisions: [divisions.one],
    level: levels.junior,
    gender: genders.boys,
  },
  {
    num: 39,
    time: "6:46 PM",
    divisions: [divisions.two],
    level: levels.juniorSenior,
    gender: genders.girls,
  },
  {
    num: 40,
    time: "6:58 PM",
    divisions: [divisions.one],
    level: levels.senior,
    gender: genders.boys,
  },
  {
    num: 41,
    time: "7:10 PM",
    divisions: [divisions.two],
    level: levels.varsity,
    heat: heats.a,
    gender: genders.girls,
  },
  {
    num: 42,
    time: "7:22 PM",
    divisions: [divisions.one],
    level: levels.varsity,
    heat: heats.a,
    gender: genders.boys,
  },
  {
    num: 43,
    time: "7:34 PM",
    divisions: [divisions.two],
    level: levels.varsity,
    heat: heats.b,
    gender: genders.girls,
  },
  {
    num: 44,
    time: "7:46 PM",
    divisions: [divisions.one],
    level: levels.varsity,
    heat: heats.b,
    gender: genders.boys,
  },
  {
    num: 45,
    time: "7:58 PM",
    divisions: [divisions.two],
    level: levels.varsity,
    heat: heats.a,
    gender: genders.boys,
  },
  {
    num: 46,
    time: "8:10 PM",
    divisions: [divisions.one],
    level: levels.varsity,
    heat: heats.a,
    gender: genders.girls,
  },
  {
    num: 47,
    time: "8:22 PM",
    divisions: [divisions.two],
    level: levels.varsity,
    heat: heats.b,
    gender: genders.boys,
  },
  {
    num: 48,
    time: "8:34 PM",
    divisions: [divisions.one],
    level: levels.varsity,
    heat: heats.b,
    gender: genders.girls,
  },
  {
    num: 49,
    time: "8:54 PM",
    level: levels.rated,
    gender: genders.girls,
  },
  {
    num: 50,
    time: "9:14 PM",
    level: levels.rated,
    gender: genders.boys,
  },
  {
    num: 51,
    time: "9:34 PM",
    level: levels.sweepstakes,
    gender: genders.girls,
  },
  {
    num: 52,
    time: "9:54 PM",
    level: levels.sweepstakes,
    gender: genders.boys,
  },
];

function getRacesByNumber(races: RaceType[], min: number, max: number): RaceType[] {
  return races.filter((race) => race.num >= min && race.num <= max);
}

function getRacesByDivisionGender(
  races: RaceType[],
  division: DivisionType,
  gender: string,
): RaceType[] {
  return races.filter((race) => race.gender === gender && race.divisions?.includes(division));
}

function getFeaturedRace(races: RaceType[], level: LevelType, gender: string): RaceType {
  return races.filter((race) => race.gender === gender && race.level === level)[0];
}

export const filteredRaces = {
  fridayRaces: getRacesByNumber(races, 1, 24),
  saturdayRaces: getRacesByNumber(races, 25, 52),
  saturdayNonFeaturedRaces: getRacesByNumber(races, 25, 48),
  saturdayFeaturedRaces: getRacesByNumber(races, 49, 52),
  div1GirlsRaces: getRacesByDivisionGender(races, divisions.one, genders.girls),
  div1BoysRaces: getRacesByDivisionGender(races, divisions.one, genders.boys),
  div2GirlsRaces: getRacesByDivisionGender(races, divisions.two, genders.girls),
  div2BoysRaces: getRacesByDivisionGender(races, divisions.two, genders.boys),
  div3GirlsRaces: getRacesByDivisionGender(races, divisions.three, genders.girls),
  div3BoysRaces: getRacesByDivisionGender(races, divisions.three, genders.boys),
  div4GirlsRaces: getRacesByDivisionGender(races, divisions.four, genders.girls),
  div4BoysRaces: getRacesByDivisionGender(races, divisions.four, genders.boys),
  ratedGirlsRace: getFeaturedRace(races, levels.rated, genders.girls),
  ratedBoysRace: getFeaturedRace(races, levels.rated, genders.boys),
  sweepstakesGirlsRace: getFeaturedRace(races, levels.sweepstakes, genders.girls),
  sweepstakesBoysRace: getFeaturedRace(races, levels.sweepstakes, genders.boys),
};
