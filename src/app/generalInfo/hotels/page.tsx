import { urls } from "@/config/data";
import { fontSerif } from "@/styles/fonts";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Metadata } from "next";
import { pages } from "@/config/site";

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
      <p className={clsx("pt-8 text-xl sm:pt-10", fontSerif.className)}>Hotel of the meet</p>
      <div className="px-10">
        <ExternalLink url={urls.hotels.embassySuites} label="Embassy Suites Irvine" />
        <p>2120 Main St., Irvine, 92614</p>
        <p className="pt-4">2 night minimum stay required</p>
        <p>King Bed Suite + Queen Size Sofa Bed Rate: $199.00</p>
        <p>
          Includes complimentary cooked to order breakfast buffet, complimentary evening reception,
          complimentary Wi-Fi, parking $15.00
        </p>
        <p className="pt-4">Please contact Corina De la Isla</p>
        <p>949-705-5149</p>
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
