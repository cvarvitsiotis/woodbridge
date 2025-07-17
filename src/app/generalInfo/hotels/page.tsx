import { urls } from "@/config/data";
import { fontSerif } from "@/styles/fonts";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: pages.hotels.menuLabel,
};

function LinkListItem({ url, label }: { url: string; label: string }) {
  return (
    <li>
      <ExternalLink url={url} label={label} />
    </li>
  );
}

function ExternalLink({ url, label }: { url: string; label: string }) {
  return (
    <Link isExternal href={url}>
      {label}
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        Recommended <span className="font-bold">Hotels</span>
      </h1>
      <p className={clsx("pt-8 text-xl sm:pt-10", fontSerif.className)}>Hotels of the meet</p>
      <div className="flex flex-col gap-x-28 gap-y-10 px-10 sm:flex-row">
        <div className="basis-1/2">
          <ExternalLink url={urls.hotels.embassySuites} label="Embassy Suites Irvine" />
          <p>2120 Main St., Irvine, 92614</p>
          <p className="pt-4">2 night minimum stay required</p>
          <p>King Bed Suite + Queen Size Sofa Bed Rate: $199.00</p>
          <p>
            Includes complimentary cooked to order breakfast buffet, complimentary evening
            reception, complimentary Wi-Fi, parking $15.00
          </p>
          <p className="pt-4">Please contact Corina De la Isla</p>
          <p>949.705.5149</p>
        </div>
        <div className="basis-1/2">
          <ExternalLink url={urls.hotels.comfortInn} label="Comfort Inn & Suites Irvine Spectrum" />
          <p>23702 Rockfield Blvd., Lake Forest, CA 92630</p>
          <p>949.528.1278</p>
          <p className="pt-4">
            $164.00 plus tax, per night and inclusive of a hot buffet breakfast
          </p>
          <p>
            Reservations must be made by midnight of August 21, 2025, to guarantee the special group
            rate
          </p>
          <p>
            If you need 10 or more rooms, call the hotel directly and ask for the{" "}
            {siteConfig.woodbridgeCrossCountryClassic} group
          </p>
          <p>Or, use the custom online booking link above</p>
        </div>
      </div>
      <p className={clsx("pt-8 text-xl sm:pt-10", fontSerif.className)}>
        Additional hotels with great facilities in a convenient location
      </p>
      <ul className="list-outside list-disc space-y-4 px-10">
        <LinkListItem url={urls.hotels.hiltonIrvine} label="Hilton Irvine/Orange County Airport" />
        <LinkListItem
          url={urls.hotels.hiltonGardenInn}
          label="Hilton Garden Inn Irvine/Orange County Airport"
        />
        <LinkListItem
          url={urls.hotels.springHillSuites}
          label="SpringHill Suites Irvine John Wayne Airport/Orange County"
        />
        <LinkListItem
          url={urls.hotels.staybridgeSuites}
          label="Staybridge Suites Irvine - John Wayne Airport"
        />
        <LinkListItem url={urls.hotels.sonesta} label="Sonesta Irvine John Wayne Airport" />
        <LinkListItem
          url={urls.hotels.hampton}
          label="Hampton Inn & Suites Irvine-Orange County Airport"
        />
        <LinkListItem
          url={urls.hotels.doubleTree}
          label="DoubleTree by Hilton Hotel Irvine - Spectrum"
        />
        <LinkListItem url={urls.hotels.acHotel} label="AC Hotel Irvine" />
      </ul>
    </>
  );
}
