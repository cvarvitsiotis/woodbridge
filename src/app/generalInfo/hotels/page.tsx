import { urls } from "@/config/data";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";
import PageHeader from "@/components/pageHeader";
import { ReactNode } from "react";
import { getSubheaderStyle } from "@/styles/styles";
import List from "@/components/list";
import { dates } from "@/config/dates";

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

function Subheader({ children }: { children: ReactNode }) {
  return <p className={clsx("pt-8 sm:pt-10", getSubheaderStyle())}>{children}</p>;
}

function EmbassySuites() {
  return (
    <div>
      <ExternalLink url={urls.hotels.embassySuites} label="Embassy Suites Irvine" />
      <p>2120 Main St., Irvine, CA 92614</p>
      <p className="pt-4">2 night minimum stay required</p>
      <p>King Bed Suite + Queen Size Sofa Bed Rate: $199.00</p>
      <p>2 Queen Beds + Queen Size Sofa Bed Rate: $210.00</p>
      <p>
        Includes complimentary cooked to order breakfast buffet, complimentary evening reception,
        complimentary Wi-Fi, Parking $15.00.
      </p>
      <p className="pt-4">Please contact Corina De la Isla</p>
      <p>949.705.5149</p>
    </div>
  );
}

function ComfortInn() {
  return (
    <div>
      <ExternalLink url={urls.hotels.comfortInn} label="Comfort Inn & Suites Irvine Spectrum" />
      <p>23702 Rockfield Blvd., Lake Forest, CA 92630</p>
      <p>949.528.1278</p>
      <p className="pt-4">$164.00 plus tax, per night and inclusive of a hot buffet breakfast</p>
      <p>
        Reservations must be made by midnight of{" "}
        {dates.hotelReservationEndDateComfortInn.monthDayLong}, to guarantee the special group rate.
      </p>
      <p className="pt-4">
        If you need 10 or more rooms, call the hotel directly and ask for the{" "}
        {siteConfig.woodbridgeCrossCountryClassic} group.
      </p>
      <p>Or, use the custom online booking link above.</p>
    </div>
  );
}

function HiltonGardenInn() {
  return (
    <div>
      <ExternalLink
        url={urls.hotels.hiltonGardenInn}
        label="Hilton Garden Inn Irvine/Orange County Airport"
      />
      <p>2381 Morse Avenue, Irvine, CA 92614</p>
      <p>949.224.3900</p>
      <p className="pt-4">1 King Bed ($179.00) or 2 Queen Beds ($189.00).</p>
      <p>Includes a hot, full breakfast, parking $15.00.</p>
      <p>2 night minimum stay required</p>
      <p>Book by {dates.hotelReservationEndDateHiltonGardenInn.monthDayLong}.</p>
      <p className="pt-4">
        For Team Reservations or to set up a Group Block, please call Sabina Arace in the Sales
        Department at 949.656.8705.
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader>
        Recommended <span className="font-bold">Hotels</span>
      </PageHeader>
      <Subheader>Hotels of the meet</Subheader>
      <div className="grid grid-cols-1 justify-items-center gap-x-28 gap-y-10 pl-10 sm:grid-cols-2 sm:justify-items-start lg:grid-cols-3">
        <EmbassySuites />
        <ComfortInn />
        <HiltonGardenInn />
      </div>
      <Subheader>Additional hotels nearby</Subheader>
      <List isOrdered={false}>
        <LinkListItem url={urls.hotels.hiltonIrvine} label="Hilton Irvine/Orange County Airport" />
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
      </List>
    </>
  );
}
