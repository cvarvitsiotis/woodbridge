export const data = {
  firstMeetYear: 1981,
  pdfResultStartYear: 2007,
  pdfResultEndYear: 2024,
  meetStartDate: new Date(2025, 8, 19, 17, 0, 0),
  teamRegistrationStartDate: new Date(2025, 0, 1, 0, 0, 0),
  athleteRegistrationStartDate: new Date(2025, 8, 1, 0, 0, 0),
  athleteRegistrationEndDate: new Date(2025, 8, 12, 0, 0, 0),
  participatingTeamsUpdateDate: new Date(2025, 7, 1, 0, 0, 0),
  featuredEntriesUpdateDate: new Date(2025, 8, 1, 0, 0, 0),
  altheticNetMeet: 237534,
  altheticLIVEMeet: 40009,
  runnerSpaceEvent: 361,
  teamRegistrationGoogleForm: "1sx2vBqrc5fyqSg68",
};

const irvineTiming = "https://irvinetiming.anet.live";

export const urls = {
  other: {
    teamRegistration: `https://forms.gle/${data.teamRegistrationGoogleForm}`,
  },
  schools: {
    woodbridgeHighSchool: "https://woodbridgehigh.iusd.org/",
    northwoodHighSchool: "https://northwoodhigh.iusd.org/",
  },
  gvarvas: {
    resultFileBase: "https://gvarvas.com/wp-content/themes/Avada-Child-Theme/pdfs",
  },
  socials: {
    twitter: "https://x.com/hashtag/WoodbridgeClassic",
    instagram: "https://www.instagram.com/explore/search/keyword/?q=%23woodbridgeclassic",
  },
  athleticNet: {
    athleticNet: `https://www.athletic.net/CrossCountry/meet/${data.altheticNetMeet}/info`,
    irvineTiming,
    irvineTimingMeet: `${irvineTiming}/meets/${data.altheticLIVEMeet}`,
    runnerSpaceMeet: `https://cross-country-classic.runnerspace.com/eprofile.php?event_id=${data.runnerSpaceEvent}&do=videos`,
  },
  sponsors: {
    asics: "https://www.asics.com",
  },
  hotels: {
    hiltonIrvine: "https://www.hilton.com/en/hotels/snaochf-hilton-irvine-orange-county-airport/",
    hiltonGardenInn:
      "https://www.hilton.com/en/hotels/snaijgi-hilton-garden-inn-irvine-orange-county-airport/",
    springHillSuites:
      "https://www.marriott.com/en-us/hotels/snaap-springhill-suites-irvine-john-wayne-airport-orange-county/overview/",
    staybridgeSuites: "https://www.ihg.com/staybridge/hotels/us/en/irvine/irvbp/hoteldetail",
    sonesta:
      "https://www.sonesta.com/sonesta-hotels-resorts/ca/irvine/sonesta-irvine-john-wayne-airport",
    hampton:
      "https://www.hilton.com/en/hotels/snaiohx-hampton-suites-irvine-orange-county-airport/",
    doubleTree: "https://www.hilton.com/en/hotels/onaisdt-doubletree-irvine-spectrum/",
    acHotel: "https://www.marriott.com/en-us/hotels/snaai-ac-hotel-irvine/overview/",
    embassySuites:
      "https://www.hilton.com/en/hotels/kolcaes-embassy-suites-irvine-orange-county-airport/",
  },
};

export const people = {
  coachPacheco: "Coach Pacheco",
  bryan: "Bryan Pacheco",
  bryanPhone: "714.404.2156",
  bryanEmail: "bryanpacheco@iusd.org",
  louie: "Louie Muniz",
};
