import { people } from "@/config/data";
import { fontSerif } from "@/styles/fonts";
import { Card } from "@heroui/card";
import { Link } from "@heroui/link";
import clsx from "clsx";
import Image from "next/image";
import bryanPacheco from "@/../public/bryan-pacheco.jpg";
import { Metadata } from "next";
import { pages } from "@/config/site";
import { AddressCardIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: pages.contact.menuLabel,
};

function ParagraphLink({ url, name }: { url: string; name: string }) {
  return (
    <Link isExternal href={url} className="sm:text-lg">
      {name}
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-center gap-6 pt-4 sm:pt-8">
        <h1 className="text-2xl font-extralight sm:text-3xl">
          <span className="font-bold">Contact</span> Us
        </h1>
        <AddressCardIcon className="text-default-400" />
      </div>
      <div
        className={clsx(
          "space-y-4 pt-8 text-center text-xl font-light sm:pt-10 sm:text-2xl",
          fontSerif.className,
        )}
      >
        <p>We would love to hear from you!</p>
        <p>Please contact {people.coachPacheco} and he will get in touch with you shortly.</p>
      </div>
      <div className="mx-auto pt-14">
        <Card shadow="sm">
          <div className="flex items-center">
            <div className="relative aspect-[400/415] h-32 sm:h-36">
              <Image
                fill
                src={bryanPacheco}
                quality={100}
                placeholder="blur"
                alt="Bryan Pacheco"
                className="saturate-[.75]"
              />
            </div>
            <div className="px-8 font-light sm:text-lg">
              <p>{people.bryan}</p>
              <div>
                <ParagraphLink url={`tel:${people.bryanPhone}`} name={people.bryanPhone} />
              </div>
              <div>
                <ParagraphLink url={`mailto:${people.bryanEmail}`} name={people.bryanEmail} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
