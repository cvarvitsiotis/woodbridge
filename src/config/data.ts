export const data = {
  firstMeetYear: 1981,
  pdfResultStartYear: 2007,
  pdfResultEndYear: 2024,
  meetStartDate: new Date(2025, 8, 19, 17, 0, 0),
  teamRegistrationStartDate: new Date(2025, 0, 1, 0, 0, 0),
  athleteRegistrationStartDate: new Date(2025, 8, 1, 0, 0, 0),
  athleteRegistrationEndDate: new Date(2025, 8, 12, 0, 0, 0),
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
    keck: "https://www.keckmedicine.org/",
    martinLaw: "https://employmentdefenselaw.com/",
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
  parking: {
    lot0: "33.67441530099316%2C-117.74813794406717",
    lot1: "33.67415547083599%2C-117.74815275109665",
    lot2: "33.67614981951949%2C-117.74483361819793",
    lot3: "33.67435940869166%2C-117.74097384535757",
    lot4: "33.67535880565344%2C-117.73544093394585",
    lot5: "33.669419217851036%2C-117.73792923917985",
    lot6: "33.668434811890535%2C-117.74149029360404",
    lot7: "33.66996071213284%2C-117.74523029229603",
    lot8: "33.66905734418818%2C-117.73574196690696",
    portolaChinon: "33.67424716551163%2C-117.71482275547011",
    portolaCadence: "33.67257862990563%2C-117.71576210656995",
    portolaMerit: "33.670865494647906%2C-117.71242756986437",
    runnerDropoffPickup: "33.67462515265455%2C-117.74650695673266",
    busStaging: "33.66811163961207%2C-117.76805627347623",
    waypoint: "33.69166722737075%2C-117.76647333982905",
  },
};

export const people = {
  coachPacheco: "Coach Pacheco",
  bryan: "Bryan Pacheco",
  bryanPhone: "714.404.2156",
  bryanEmail: "bryanpacheco@iusd.org",
  louie: "Louie Muniz",
};
