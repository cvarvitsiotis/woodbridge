export const data = {
  firstMeetYear: 1981,
  pdfResultStartYear: 2007,
  pdfResultEndYear: 2025,
  meetStartDate: new Date(2026, 8, 18, 17, 0, 0),
  teamRegistrationStartDate: new Date(2026, 0, 1, 0, 0, 0),
  teamRegistrationSaturdayMorningOnlyStartDate: new Date(2026, 3, 4, 0, 0, 0),
  teamRegistrationWaitingListOnlyStartDate: new Date(2026, 6, 29, 0, 0, 0),
  teamRegistrationEndDate: new Date(2026, 7, 12, 23, 59, 59),
  athleteRegistrationLinkStartDate: new Date(2026, 6, 29, 0, 0, 0),
  athleteRegistrationStartDate: new Date(2026, 7, 1, 0, 0, 0),
  athleteRegistrationEndDate: new Date(2026, 8, 4, 23, 59, 59),
  participatingTeamsPublishDate: new Date(2026, 4, 9, 0, 0, 0),
  participatingTeamsUpdateDate: new Date(2026, 6, 14, 0, 0, 0),
  featuredEntriesPublishDate: new Date(2026, 8, 1, 0, 0, 0),
  preOrderTShirtsStartDate: new Date(2026, 7, 14, 0, 0, 0),
  preOrderTShirtsEndDate: new Date(2026, 8, 15, 23, 59, 59),
  hotelReservationEndDateEmbassySuites: new Date(2026, 7, 27, 23, 59, 59),
  hotelReservationEndDateComfortInn: new Date(2026, 7, 21, 23, 59, 59),
  hotelReservationEndDateHiltonGardenInn: new Date(2026, 8, 1, 23, 59, 59),
  parkingPassPurchaseDate: new Date(2026, 7, 13, 0, 0, 0),
  parkingGoFanFridayEventId: "6763955",
  parkingGoFanSaturdayMorningEventId: "6753143",
  parkingGoFanSaturdayNightEventId: "6763968",
  altheticNetMeet: 273870,
  altheticLIVEMeet: 56371,
  runnerSpaceEvent: 361,
  teamRegistrationGoogleForm: "MAh4FtBGYtyrhVWs9",
};

const irvineTiming = "https://irvinetiming.anet.live";

export const urls = {
  other: {
    teamRegistration: `https://forms.gle/${data.teamRegistrationGoogleForm}`,
    preOrderTShirts:
      "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=Z2gZHYB4SkOiqb-NDwFoAdS3lvPXvRFDq_VQWeCNRdxUNTRUMzBQMjEzOVdVVEJWUlZXVU9aSlJBNi4u",
  },
  schools: {
    woodbridgeHighSchool: "https://woodbridgehigh.iusd.org/",
    northwoodHighSchool: "https://northwoodhigh.iusd.org/",
  },
  socials: {
    twitter: "https://x.com/hashtag/WoodbridgeClassic",
    instagram: "https://www.instagram.com/explore/search/keyword/?q=%23woodbridgeclassic",
  },
  athleticNet: {
    home: "https://www.athletic.net",
    athleteRegistration: `https://www.athletic.net/Help/CrossCountry.aspx?Meet=${data.altheticNetMeet}`,
    irvineTiming,
    altheticLIVEMeet: `${irvineTiming}/meets/${data.altheticLIVEMeet}`,
    runnerSpaceMeet: `https://cross-country-classic.runnerspace.com/eprofile.php?event_id=${data.runnerSpaceEvent}&do=videos&folder_id=11828`,
  },
  parkingPasses: {
    friday: `https://gofan.co/event/${data.parkingGoFanFridayEventId}`,
    saturdayMorning: `https://gofan.co/event/${data.parkingGoFanSaturdayMorningEventId}`,
    saturdayNight: `https://gofan.co/event/${data.parkingGoFanSaturdayNightEventId}`,
  },
  partners: {
    asics: "https://www.asics.com",
    athletic: "https://www.athletic.net",
    greatPark: "https://cityofirvine.gov/great-park",
  },
  hotels: {
    hiltonIrvine: "https://www.hilton.com/en/hotels/snaochf-hilton-irvine-orange-county-airport/",
    hiltonGardenInn:
      "https://www.hilton.com/en/attend-my-event/snaijgi-91r-6d458d7b-e007-4907-a738-4374bb4fdc89/",
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
    comfortInn: "https://www.choicehotels.com/reservations/groups/HW79H6",
  },
};

export const people = {
  coachPacheco: "Coach Pacheco",
  bryan: "Bryan Pacheco",
  bryanPhone: "714.404.2156",
  bryanEmail: "bryanpacheco@iusd.org",
  louie: "Louie Muniz",
};
