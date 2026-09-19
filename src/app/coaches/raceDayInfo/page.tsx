import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";
import { getParagraphStyle } from "@/styles/styles";
import PageHeader from "@/components/pageHeader";
import List from "@/components/list";
import { people } from "@/config/data";
import ParagraphLink from "@/components/paragraphLink";
import { dates } from "@/config/dates";

export const metadata: Metadata = {
  title: pages.raceDayInfo.menuLabel,
};

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Race Day</span> Info
      </PageHeader>
      <div className={clsx("space-y-4 pt-10", getParagraphStyle())}>
        <p>
          Thank you for attending the {dates.meetAge}
          <sup>{dates.meetAgeOrdinal}</sup> Annual {siteConfig.woodbridgeCrossCountryClassic} (
          {dates.meetStartDateParts.year}) {siteConfig.presentedByAsics}. Your support of the meet
          is appreciated. Here are some last-minute notes to make your participation an enjoyable
          one:
        </p>
        <List isOrdered={true}>
          <li>Please do not set up team camps in any of the playing fields.</li>
          <li>
            Results (live streaming, live results of the 1-mile split, 2-mile split, and finish
            line, and verified final results) can be accessed on our{" "}
            <ParagraphLink href={pages.raceResults.path}>
              {pages.raceResults.menuLabel}
            </ParagraphLink>{" "}
            page.
          </li>
          <li>
            If you need to make any adjustments to your roster (add late runner or change info),
            they must be made before the meet starts at the checkin area.
          </li>
          <List isOrdered={false}>
            <li>
              If you do not have a bib for a new runner, fill out the ADD ATHLETES form at the
              checkin table, pay the $25.00, and take the form to the Coach&apos;s Corner at the
              finish line for the bib.
            </li>
            <li>
              ...or give the new runner any extra bib (of runner that is not running). There is no
              cost for this!
            </li>
            <li>
              If you need to make a change to the information for one of your runners (spelling,
              gender, year, etc.), fill out the CHANGE OF INFORMATION form at the checkin table, pay
              the $10.00, and take the form to the Coach&apos;s Corner at the finish line.
            </li>
          </List>
          <li>
            Have each athlete check his/her bib number and name tag. They need to match. No name
            changes in the results after the race if an athlete wears the wrong bib.
          </li>
          <li>
            Make sure that the athletes have their bib numbers pinned at the belly button height.
          </li>
          <li>
            Caution your athletes not to drop safety pins on the ground. They are hazardous to the
            athletes.
          </li>
          <li>
            Your runners must report to the clerk of the course 15 minutes before the race starts.
          </li>
          <li>
            Any boy or girl that runs 24 minutes or slower is expected to be placed in the NOVICE
            races. We cannot guarantee time results for runners slower than 24 minutes in regular
            races. There are no individual or team awards for the NOVICE races.
          </li>
          <li>
            Pick up the team patches (first through sixth place finish in all races) at the awards
            table as soon as results become official. We have many left over each year.
          </li>
          <li>Medals will be given in the finish chute.</li>
          <li>
            Only coaches at the Coach&apos;s Corner for adjustments/questions. Parents/athletes are
            prohibited in the area.
          </li>
          <li>
            The medical staff should be the only ones to initiate a 911 call. The primary First Aid
            station is located at the finish line. Please caution your parents not to call 911.
          </li>
        </List>
        <p>Good luck to your team in our meet!</p>
        <div>
          <p>{people.bryan}</p>
          <p>{people.louie}</p>
          <p>{siteConfig.woodbridgeHighSchoolCrossCountry}</p>
        </div>
      </div>
    </>
  );
}
