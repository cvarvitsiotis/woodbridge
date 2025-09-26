import { PagesType } from "@/types";

export const siteConfig = {
  woodbridge: "Woodbridge",
  woodbridgeHighSchoolCrossCountry: "Woodbridge High School Cross Country",
  woodbridgeClassic: "Woodbridge Classic",
  woodbridgeCrossCountryClassic: "Woodbridge Cross Country Classic",
  presentedByAsics: "presented by ASICS",
  northwood: "Northwood",
  greatPark: "Great Park",
  athleticNet: "Athletic.net",
  athleticLIVE: "AthleticLIVE",
  runnerSpace: "RunnerSpace",
};

export const pageParents = {
  coaches: "Coaches",
  racingInfo: "Racing Info",
  generalInfo: "General Info",
  results: "Results",
};

export const pages: PagesType = {
  home: {
    menuLabel: "Home",
    path: "/",
  },
  coachesIntro: {
    menuLabel: "Intro",
    path: "/coaches/intro",
    parent: pageParents.coaches,
  },
  registration: {
    menuLabel: "Registration",
    path: "/coaches/registration",
    parent: pageParents.coaches,
  },
  entryFees: {
    menuLabel: "Entry Fees",
    path: "/coaches/entryFees",
    parent: pageParents.coaches,
  },
  preOrderTShirts: {
    menuLabel: "Pre-Order T-Shirts",
    path: "/coaches/preOrderTShirts",
    parent: pageParents.coaches,
  },
  raceDayInfo: {
    menuLabel: "Race Day Info",
    path: "/coaches/raceDayInfo",
    parent: pageParents.coaches,
  },
  schedule: {
    menuLabel: "Schedule",
    path: "/racingInfo/schedule",
    parent: pageParents.racingInfo,
  },
  courseAndVenueMap: {
    menuLabel: "Course & Venue Map",
    path: "/racingInfo/courseAndVenueMap",
    parent: pageParents.racingInfo,
  },
  courseAerialTour: {
    menuLabel: "Course Aerial Tour",
    path: "/racingInfo/courseAerialTour",
    parent: pageParents.racingInfo,
  },
  participatingTeams: {
    menuLabel: "Participating Teams",
    path: "/racingInfo/participatingTeams",
    parent: pageParents.racingInfo,
  },
  featuredEntries: {
    menuLabel: "Sweepstakes & Rated Entries",
    path: "/racingInfo/featuredEntries",
    parent: pageParents.racingInfo,
  },
  welcome: {
    menuLabel: "Welcome",
    path: "/generalInfo/welcome",
    parent: pageParents.generalInfo,
  },
  parkingAndDirections: {
    menuLabel: "Parking & Directions",
    path: "/generalInfo/parkingAndDirections",
    parent: pageParents.generalInfo,
  },
  hotels: {
    menuLabel: "Recommended Hotels",
    path: "/generalInfo/hotels",
    parent: pageParents.generalInfo,
  },
  sponsors: {
    menuLabel: "Sponsors",
    path: "/generalInfo/sponsors",
    parent: pageParents.generalInfo,
  },
  galleries: {
    menuLabel: "Galleries",
    path: "/generalInfo/galleries",
    parent: pageParents.generalInfo,
  },
  raceResults: {
    menuLabel: "Race Results",
    path: "/results/raceResults",
    parent: pageParents.results,
  },
  allTimeLists: {
    menuLabel: "All Time Lists",
    path: "/results/allTimeLists",
    parent: pageParents.results,
  },
  contact: {
    menuLabel: "Contact",
    path: "/contact",
  },
  timing: {
    menuLabel: "Timing",
    path: "/timing",
  },
};
