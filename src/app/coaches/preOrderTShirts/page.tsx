import { Metadata } from "next";
import { Link } from "@heroui/link";
import { pages } from "@/config/site";
import PageHeader from "@/components/pageHeader";
import { getParagraphStyle } from "@/styles/styles";
import { urls } from "@/config/data";
import Image from "next/image";
import woodbridgeTShirt from "@/../public/images/woodbridge-tshirt-2025.jpg";
import clsx from "clsx";
import List from "@/components/list";
import { dates } from "@/config/dates";

export const metadata: Metadata = {
  title: pages.preOrderTShirts.menuLabel,
};

function ParagraphLink({ url, name }: { url: string; name: string }) {
  return (
    <Link isExternal href={url} className={getParagraphStyle(false)}>
      {name}
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Pre-Order</span> T-Shirts
      </PageHeader>
      <div className={clsx("space-y-4 pt-10", getParagraphStyle())}>
        <p>
          Every year, T-Shirts sell out and some athletes/families miss out on this unique souvenir.
          By pre-ordering T-Shirts for your team, you ensure that everyone gets the size they want
          without the hassle of waiting in long lines.
        </p>
        {new Date() < dates.preOrderTShirtsEndDateParts.date ? (
          <p>
            The deadline to pre-order T-Shirts has passed. Head to the ASICS booth to purchase them
            in-person.
          </p>
        ) : (
          <>
            <p>To pre-order...</p>
            <List isOrdered={false}>
              <li>
                Have someone enter the count of each size that your team needs using the{" "}
                <ParagraphLink url={urls.other.preOrderTShirts} name="T-Shirt Pre-Order Form" /> by{" "}
                {dates.preOrderTShirtsEndDateParts.dayDescriptionMonthDayShort}
              </li>
              <li>Collect $25 from each athlete</li>
              <li>
                On race day, proceed to the ASICS booth to pay the total (cash or card) and pick up
                your bundle
              </li>
            </List>
          </>
        )}
      </div>
      <div className="pt-10">
        <div className="relative mx-auto aspect-[1920/2560] w-64 max-w-full sm:w-96">
          <Image
            fill
            src={woodbridgeTShirt}
            quality={100}
            placeholder="blur"
            alt="Woodbridge T-Shirt"
            className="rounded-lg object-contain shadow-lg"
          />
        </div>
      </div>
    </>
  );
}
