import { dates } from "@/config/dates";
import { filteredRaces } from "@/config/races";
import { fontSerif } from "@/styles/fonts";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: pages.coachesIntro.menuLabel,
};

function ParagraphLink({ url, name }: { url: string; name: string }) {
  return (
    <Link href={url} className="text-lg sm:text-xl">
      {name}
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        <span className="font-bold">Coaches</span> Intro
      </h1>
      <div className={clsx("space-y-4 pt-10 text-lg font-light sm:text-xl", fontSerif.className)}>
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
          Please note and share the following information with the other coaches in your school:
        </p>
        <ol className="list-outside list-decimal space-y-4 px-10">
          <li>Most of the information you will need about our meet is posted on this website.</li>
          <li>
            Your team is assigned a division per the{" "}
            <ParagraphLink
              url={pages.participatingTeams.path}
              name={pages.participatingTeams.menuLabel}
            />{" "}
            page. Please find your division&apos;s race schedule for your athletes and parents on
            the <ParagraphLink url={pages.schedule.path} name={pages.schedule.menuLabel} /> page.
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
            expensive and preparing bib numbers for athletes that will not compete but are on your
            roster is time-consuming. You can always make adjustments to your roster up to the
            registration deadline and you also can add new runners at the day of the meet.
          </li>
          <li>
            The NOVICE race does require a fee like all other races. It is designed to give boys
            that run 24:00 or slower and girls that run 24:00 or slower a more meaningful experience
            for their race by competing against those with similar abilities. Also, this race
            reduces congestion in the regular races and we can record the time all of these
            athletes.
          </li>
          <li>
            Bring the ENTRY FEE to the check-in table at our meet. If mailing it, it needs to be
            mailed early enough (by {dates.entryFeeMailDateParts.monthDayLong}) for us to have it in
            time for the meet. Refer to{" "}
            <ParagraphLink url={pages.entryFees.path} name={pages.entryFees.menuLabel} /> for more
            details. Personal payment will be required if a school check is not brought to the meet
            otherwise.
          </li>
          <li>
            The Sweepstakes (Top 25 teams) and Rated (Teams 26-55) selections will be announced by
            Rich Gonzalez after September 1st. If you have a team that you would like for Rich to
            consider, send an email request (with needed information) by contacting us.
          </li>
        </ol>
        <p>
          Best wishes for a successful track and field season next year. We hope that your athletes
          will enjoy our meet!
        </p>
      </div>
    </>
  );
}
