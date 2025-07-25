import { data } from "@/config/data";
import { getOrdinal } from "@/utils/number";

export const dates = getDates();

function getDates() {
  const meetStartDateParts = getDateParts(data.meetStartDate);
  const meetEndDateParts = getDateParts(getMeetEndDate());
  const meetStartToEndDateShort = `${meetStartDateParts.monthShort} ${meetStartDateParts.day}-${meetEndDateParts.day}, ${meetStartDateParts.year} (${meetStartDateParts.dayDescriptionShort}-${meetEndDateParts.dayDescriptionShort})`;
  const meetAge = meetStartDateParts.year - data.firstMeetYear;
  const meetAgeOrdinal = getOrdinal(meetAge);
  const teamRegistrationStartDateParts = getDateParts(data.teamRegistrationStartDate);
  const athleteRegistrationStartDateParts = getDateParts(data.athleteRegistrationStartDate);
  const athleteRegistrationEndDateParts = getDateParts(data.athleteRegistrationEndDate);
  const participatingTeamsUpdateDateParts = getDateParts(data.participatingTeamsUpdateDate);
  const featuredEntriesUpdateDateParts = getDateParts(data.featuredEntriesUpdateDate);
  const entryFeeMailDateParts = getDateParts(getEntryFeeMailDate());
  const entryFeeAutoDebitDateParts = getDateParts(getEntryFeeAutoDebitDate());
  const teamRegistrationCancellationDeadlineDateParts = getDateParts(
    getTeamRegistrationCancellationDeadlineDateParts(),
  );

  return {
    meetStartDateParts,
    meetEndDateParts,
    meetStartToEndDateShort,
    meetAge,
    meetAgeOrdinal,
    teamRegistrationStartDateParts,
    athleteRegistrationStartDateParts,
    athleteRegistrationEndDateParts,
    participatingTeamsUpdateDateParts,
    featuredEntriesUpdateDateParts,
    entryFeeMailDateParts,
    entryFeeAutoDebitDateParts,
    teamRegistrationCancellationDeadlineDateParts,
  };
}

function getDateParts(date: Date) {
  const [monthShort, monthLong, day, dayDescriptionShort, dayDescriptionLong, year] = [
    date.toLocaleString("default", { month: "short" }),
    date.toLocaleString("default", { month: "long" }),
    date.getDate(),
    new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date),
    new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date),
    date.getFullYear(),
  ];

  return {
    date,
    monthShort,
    monthLong,
    day,
    dayDescriptionShort,
    dayDescriptionLong,
    year,
    dayDescriptionMonthDayYearShort: `${dayDescriptionShort}, ${monthShort} ${day}, ${year}`,
    dayDescriptionMonthDayYearLong: `${dayDescriptionLong}, ${monthLong} ${day}, ${year}`,
    monthDayLong: `${monthLong} ${day}`,
  };
}

function getMeetEndDate(): Date {
  const meetEndDate = new Date(data.meetStartDate);
  meetEndDate.setDate(meetEndDate.getDate() + 1);
  return meetEndDate;
}

function getEntryFeeMailDate(): Date {
  const entryFeeMailDate = new Date(data.meetStartDate);
  entryFeeMailDate.setDate(entryFeeMailDate.getDate() - 15);
  return entryFeeMailDate;
}

function getEntryFeeAutoDebitDate(): Date {
  const entryFeeAutoDebitDate = getMeetEndDate();
  entryFeeAutoDebitDate.setDate(entryFeeAutoDebitDate.getDate() + 3);
  return entryFeeAutoDebitDate;
}

function getTeamRegistrationCancellationDeadlineDateParts(): Date {
  const meetEndDate = new Date(data.meetStartDate);
  meetEndDate.setDate(meetEndDate.getDate() - 18);
  return meetEndDate;
}
