import { Link } from "@heroui/link";
import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";
import { getParagraphStyle } from "@/styles/styles";
import PageHeader from "@/components/pageHeader";
import List from "@/components/list";
import { people } from "@/config/data";

export const metadata: Metadata = {
  title: pages.raceDayInfo.menuLabel,
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
        <span className="font-bold">Race Day</span> Info
      </PageHeader>
      <div className={clsx("space-y-4 pt-10", getParagraphStyle())}>
        <p>
          Thank you for attending our meet. Your support of our meet is appreciated. Here are some
          last-minute notes to make your participation an enjoyable one at our meet:
        </p>
        <List isOrdered={true}>
          <li>
            Results (live streaming, live results of the 1-mile split, 2-mile split, and finish
            line, and verified final results) can be accessed on our{" "}
            <ParagraphLink url={pages.raceResults.path} name={pages.raceResults.menuLabel} /> page.
          </li>
          <li>
            If you need to make any adjustments (add or change info) to your roster, they must be
            made before the meet starts at the checkin area.
          </li>
          <List isOrdered={false}>
            <li>
              If you do not have a bib for a new runner, fill out the ADD ATHLETES SHEET at the
              checkin table, pay the $20.00, and take the add ticket to the coaches&apos; corner at
              the finish line.
            </li>
            <li>
              If you need to make a change to the information for one of your runners, fill out the
              CHANGE OF INFORMATION SHEET at the checkin table, pay the $5.00, and take the change
              ticket to the coaches&apos; corner at the finish line.
            </li>
          </List>
          <li>
            Have each athlete check his/her bib number and name tag. They need to match. No name
            changes in the results after the race(s) if an athlete wears the wrong bib.
          </li>
          <li>
            Make sure that the athletes have their bib numbers pinned at belly button height before
            they go to the starting line. Recycle the pins among your team members from one race to
            another. Caution your athletes not to drop safety pins on the ground. They are hazardous
            to the athletes.
          </li>
          <li>
            Your runners must report to the clerk of the course (behind the start line) 15 minutes
            before the race is scheduled to go off.
          </li>
          <li>
            Any boy that runs 23:00 or girl that runs 24:00 or slower should be placed in a NOVICE
            race. It gives them a more meaningful experience by competing against those with similar
            abilities. It also serves to reduce congestion in the regular races. And, we keep the
            clocks running longer than regular races, so every athlete gets their time recorded.
          </li>
          <li>Make sure that your runners line up in the correct race and the correct division.</li>
          <li>
            Pick up the team patches (first through sixth place finish in all races) at the awards
            table as soon as results become official. We have many left over each year.
          </li>
          <li>Medals will be given in the finish chute.</li>
          <li>
            Only coaches at the coaches&apos; corner for adjustments/questions. Parents/athletes are
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
