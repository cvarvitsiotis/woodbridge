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
    lot0: {
      apple:
        "https://maps.apple.com/place?address=Great+Park%2C+Phantom%2C+Irvine%2C+CA++92618%2C+United+States&coordinate=33.6742342%2C-117.7481335&name=Marked+Location",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.67441530099316,-117.74813794406717&waypoints=33.69166722737075,-117.76647333982905",
    },
    lot1: {
      apple: "https://maps.apple.com/place?place-id=ID5EA8D2A18F0D7F8&_provider=9902",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.67415547083599,-117.74815275109665&waypoints=33.69166722737075,-117.76647333982905",
    },
    lot2: {
      apple: "https://maps.apple.com/place?place-id=IDB6EFBB62792F07F&_provider=9902",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.67614981951949,-117.74483361819793&waypoints=33.69166722737075,-117.76647333982905",
    },
    lot3: {
      apple: "https://maps.apple.com/place?place-id=I663CA9977BE188FD&_provider=9902",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.67435940869166,-117.74097384535757&waypoints=33.69166722737075,-117.76647333982905",
    },
    lot4: {
      apple: "https://maps.apple.com/place?place-id=I9C5B250E50EF17C9&_provider=9902",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.67535880565344,-117.73544093394585&waypoints=33.69166722737075,-117.76647333982905",
    },
    lot5: {
      apple: "https://maps.apple.com/place?place-id=IF187CE3EFBC6A605&_provider=9902",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.669419217851036,-117.73792923917985&waypoints=33.69166722737075,-117.76647333982905",
    },
    lot6: {
      apple: "https://maps.apple.com/place?place-id=I2AF8796888EEF80C&_provider=9902",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.668434811890535,-117.74149029360404&waypoints=33.69166722737075,-117.76647333982905",
    },
    lot7: {
      apple: "https://maps.apple.com/place?place-id=I2C131B2FE4C73F61&_provider=9902",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.66996071213284,-117.74523029229603&waypoints=33.69166722737075,-117.76647333982905",
    },
    lot8: {
      apple:
        "https://maps.apple.com/place?address=950%E2%80%93956+Skyhawk%2C+Irvine%2C+CA++92618%2C+United+States&coordinate=33.6691254%2C-117.7357257&name=Marked+Location",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.66881469250246,-117.73195718812212&waypoints=33.69166722737075,-117.76647333982905",
    },
    portolaChinon: {
      apple:
        "https://maps.apple.com/place?map=explore&address=Chinon%2C+Irvine%2C+CA++92618%2C+United+States&coordinate=33.6743194%2C-117.7148924&name=Marked+Location",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.67424716551163,-117.71482275547011&waypoints=33.69166722737075,-117.76647333982905",
    },
    portolaCadence: {
      apple:
        "https://maps.apple.com/place?address=1045%E2%80%931063+Cadence%2C+Irvine%2C+CA++92618%2C+United+States&coordinate=33.6724037%2C-117.7160253&name=Marked+Location",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.67257862990563,-117.71576210656995&waypoints=33.69166722737075,-117.76647333982905",
    },
    portolaMerit: {
      apple:
        "https://maps.apple.com/place?map=explore&address=Portola+High+School%2C+Bulldog+Way%2C+Irvine%2C+CA++92618%2C+United+States&coordinate=33.6707018%2C-117.7123912&name=Marked+Location",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.670865494647906,-117.71242756986437&waypoints=33.69166722737075,-117.76647333982905",
    },
    runnerDropoffPickup: {
      apple:
        "https://maps.apple.com/place?address=Great+Park%2C+Phantom%2C+Irvine%2C+CA++92618%2C+United+States&coordinate=33.6747727%2C-117.7464505&name=Marked+Location",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.67462515265455,-117.74650695673266&waypoints=33.69166722737075,-117.76647333982905",
    },
    busStaging: {
      apple:
        "https://maps.apple.com/place?address=15545+Sand+Canyon+Ave%2C+Irvine%2C+CA++92618%2C+United+States&coordinate=33.6681605%2C-117.7696703&name=Marked+Location",
      google:
        "https://www.google.com/maps/dir/?api=1&destination=33.66811163961207,-117.76805627347623",
    },
  },
};

export const people = {
  coachPacheco: "Coach Pacheco",
  bryan: "Bryan Pacheco",
  bryanPhone: "714.404.2156",
  bryanEmail: "bryanpacheco@iusd.org",
  louie: "Louie Muniz",
};
