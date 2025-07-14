import { people } from "@/config/data";
import { fontSerif } from "@/styles/fonts";
import { Card } from "@heroui/card";
import { Link } from "@heroui/link";
import clsx from "clsx";
import Image from "next/image";
import bryanPacheco from "@/../public/bryan-pacheco.jpg";
import { Metadata } from "next";
import { pages } from "@/config/site";
import { MailIcon, CallIcon } from "@/components/icons";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: pages.contact.menuLabel,
};

function IconAndLink({ url, name, icon }: { url: string; name: string; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <Link isExternal href={url} className="text-indigo-600 sm:text-lg">
        {name}
      </Link>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        <span className="font-bold">Contact</span> Us
      </h1>
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
        <Card shadow="lg">
          <div className="flex items-center bg-indigo-300">
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
            <div className="px-6 sm:px-8">
              <p className="text-lg font-light sm:text-xl">{people.bryan}</p>
              <div>
                <IconAndLink
                  url={`tel:${people.bryanPhone}`}
                  name={people.bryanPhone}
                  icon={<CallIcon />}
                />
              </div>
              <div>
                <IconAndLink
                  url={`mailto:${people.bryanEmail}`}
                  name={people.bryanEmail}
                  icon={<MailIcon />}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
