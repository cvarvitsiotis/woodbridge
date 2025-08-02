import { dates } from "@/config/dates";
import { filteredRaces } from "@/config/races";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";
import { getParagraphStyle } from "@/styles/styles";
import PageHeader from "@/components/pageHeader";
import List from "@/components/list";
import { people } from "@/config/data";

export const metadata: Metadata = {
  title: pages.coachesIntro.menuLabel,
};

function ParagraphLink({ url, name }: { url: string; name: string }) {
  return (
    <Link href={url} className={getParagraphStyle()}>
      {name}
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Coaches</span> Intro
      </PageHeader>
      <div className={clsx("space-y-4 pt-10", getParagraphStyle())}>
        <p>Dear Cross Country Coaches,</p>
        <p>
          Welcome to the {dates.meetAge}
          <sup>{dates.meetAgeOrdinal}</sup> Annual {siteConfig.woodbridgeCrossCountryClassic}{" "}
          {siteConfig.presentedByAsics}!
        </p>
        <p>
          The meet will be contested on {dates.meetStartDateParts.dayDescriptionMonthDayYearLong}{" "}
          starting at {filteredRaces.fridayRaces[0]?.time} (Red and White divisions) and{" "}
          {dates.meetEndDateParts.dayDescriptionMonthDayYearLong} starting at{" "}
          {filteredRaces.saturdayRaces[0]?.time} (Blue and Gold divisions).
        </p>
        <p>
          TEAM registration is now FULL for the {dates.meetStartDateParts.year}{" "}
          {siteConfig.woodbridgeCrossCountryClassic}.
        </p>
        <p>
          Please note and share the following information with the other coaches in your school:
        </p>
        <List isOrdered={true}>
          <li>
            Your team is assigned a division per the{" "}
            <ParagraphLink
              url={pages.participatingTeams.path}
              name={pages.participatingTeams.menuLabel}
            />{" "}
            page. Please find your division&apos;s races on the{" "}
            <ParagraphLink url={pages.schedule.path} name={pages.schedule.menuLabel} /> page.
          </li>
          <li>
            If you have changed your mind about attending the meet, please let us know of this
            decision immediately. A $100 cancellation fee will be expected if we are notified after{" "}
            {dates.teamRegistrationCancellationDeadlineDateParts.monthDayLong}.
          </li>
          <li>
            ATHLETE registration will be through {siteConfig.athleticNet}. For more information, go
            to the{" "}
            <ParagraphLink url={pages.registration.path} name={pages.registration.menuLabel} />{" "}
            page. The athletes need to be registered by{" "}
            {dates.athleteRegistrationEndDateParts.dayDescriptionMonthDayYearLong}.
          </li>
          <li>
            Please register those athletes that have a chance to be in our meet. It would be helpful
            if you drop those that will not compete from your class roster. Bib numbers are
            expensive and preparing them for athletes that will not compete but are on your roster
            is time-consuming. You can always make adjustments to your roster up to the registration
            deadline and you also can add new runners at the meet on race day.
          </li>
          <li>
            The NOVICE races require a fee like all other races. They are designed to give boys that
            run 23:00 or slower and girls that run 24:00 or slower a more meaningful experience by
            competing against those with similar abilities. They also serve to reduce congestion in
            the regular races. And, we keep the clocks running longer than regular races, so every
            athlete gets their time recorded.
          </li>
          <li>
            Bring the ENTRY FEE to the checkin table at our meet. If mailing it, do so by{" "}
            {dates.entryFeeMailDateParts.monthDayLong} so that we have it by race day. Refer to{" "}
            <ParagraphLink url={pages.entryFees.path} name={pages.entryFees.menuLabel} /> for more
            details.
          </li>
          <li>
            The Sweepstakes (top 25 teams) and Rated (teams 26-55) selections will be announced by
            Rich Gonzalez on {dates.featuredEntriesUpdateDateParts.monthDayLong}. If you have a team
            that you would like for Rich to consider, please{" "}
            <ParagraphLink url={pages.contact.path} name={pages.contact.menuLabel} /> us.
          </li>
        </List>
        <p>
          Best wishes for a successful track and field season next year. We hope that your athletes
          will enjoy our meet!
        </p>
        <div>
          <p>{people.bryan}</p>
          <p>{people.louie}</p>
          <p>{siteConfig.woodbridgeHighSchoolCrossCountry}</p>
        </div>
      </div>
    </>
  );
}
