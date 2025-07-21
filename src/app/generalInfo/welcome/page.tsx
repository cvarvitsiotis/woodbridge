import { people, urls } from "@/config/data";
import { filteredRaces } from "@/config/races";
import { dates } from "@/config/dates";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { pages, siteConfig } from "@/config/site";
import { Metadata } from "next";
import { getParagraphStyle } from "@/styles/styles";
import PageHeader from "@/components/pageHeader";

export const metadata: Metadata = {
  title: pages.welcome.menuLabel,
};

function ParagraphLink({
  url,
  name,
  isExternal = true,
}: {
  url: string;
  name: string;
  isExternal?: boolean;
}) {
  return (
    <Link isExternal={isExternal} href={url} className={getParagraphStyle()}>
      {name}
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Welcome</span> to Woodbridge
      </PageHeader>
      <div className={clsx("space-y-4 pt-10", getParagraphStyle(false, true))}>
        <p>
          The {dates.meetStartDateParts.year} {siteConfig.woodbridgeCrossCountryClassic}{" "}
          {siteConfig.presentedByAsics} is scheduled for{" "}
          {dates.meetStartDateParts.dayDescriptionMonthDayYearLong} (first race at{" "}
          {filteredRaces.fridayRaces[0]?.time}) and{" "}
          {dates.meetEndDateParts.dayDescriptionMonthDayYearLong} (first race at{" "}
          {filteredRaces.saturdayRaces[0]?.time}) at the {siteConfig.greatPark} in Irvine,
          California. This website has all the information you might need about the meet
          (registration forms/information, schedule of races, race photos and videos, all-time
          performance lists, etc.).
        </p>
        <p>
          The {dates.meetStartDateParts.year} {siteConfig.woodbridgeCrossCountryClassic} Team
          Registration IS NOW OPEN!
        </p>
        <p>
          The {siteConfig.greatPark} is an excellent venue for our meet. The facility provides the
          space for a running course that has a 100-meter-wide starting line, is run on a
          combination of grass, synthetic and paved surfaces, is very visible for the spectators,
          and is very fast (typical {siteConfig.woodbridge}).
        </p>
        <p>
          The spacious {siteConfig.greatPark} will accommodate the spectator parking, the loading
          and unloading of athletes, provide amenities such as the {siteConfig.greatPark} Balloon
          rides, Merry-go-Round rides, concessions for food and drinks, exhibits for running-related
          apparel and footwear, ample bathrooms, etc. Everyone will enjoy a great experience.
        </p>
        <p>
          Red and White divisions will run on {dates.meetStartDateParts.dayDescriptionLong}. Blue
          and Gold divisions will run on {dates.meetEndDateParts.dayDescriptionLong}. Divisions are
          based on school size (White, Red, Gold, Blue is the order from small to large), team
          strength (White to Blue is the order) and coach&apos;s/team travel plan requests.
        </p>
        <p>
          The staff of this well-organized/festive meet are committed to continue to work very hard
          in order to provide an enjoyable and positive experience for the coaches, athletes and
          families. Here is a summary of the meet features:
        </p>
        <ul className="list-outside list-disc space-y-4 px-10">
          <li>
            The meet is staged under ideal weather conditions and under the lights. The late
            afternoon cool breeze and evening temperatures will give your athletes a
            once-in-a-lifetime opportunity to experience the excitement of night racing in cross
            country while also avoiding the very hot {dates.meetStartDateParts.monthLong} weather.
          </li>
          <li>
            The meet brings together the top teams and individuals from multiple states for the
            ultimate in early-season competition. Year after year, this meet consistently draws many
            of the top ranked teams and individuals in California and the nation.
          </li>
          <li>
            The meet will be timed using the FinishLynx camera system that is integrated with the
            RFID bib-chip system.
          </li>
          <li>
            The meet will have real-time results at{" "}
            <ParagraphLink url={urls.athleticNet.irvineTimingMeet} name={siteConfig.athleticLIVE} />{" "}
            for teams and individuals at the 1-mile, 2-mile, and end of race marks.
          </li>
          <li>
            <ParagraphLink url={urls.athleticNet.runnerSpaceMeet} name={siteConfig.runnerSpace} />{" "}
            will live-stream (entirely) each race.
          </li>
          <li>
            Finish-line results (as they happen) will be displayed on a jumbo display board at the
            finish line area.
          </li>
          <li>
            The meet will distribute 4,800 individual medals and 2,016 team patches (6 sets of
            patches per race, 7 patches per set).
          </li>
        </ul>
        <p>
          Please check back regularly to this website for all the latest news and announcements
          relating to the meet.
        </p>
        <p>
          Thank you for adding the {siteConfig.woodbridgeCrossCountryClassic}{" "}
          {siteConfig.presentedByAsics} to your {dates.meetStartDateParts.year} schedule! See you in
          the Fall!
        </p>
        <p>
          For more information on how your participation in our meet can be made most enjoyable,
          please reach out using our{" "}
          <ParagraphLink
            url={pages.contact.path}
            name={pages.contact.menuLabel}
            isExternal={false}
          />{" "}
          page.
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
