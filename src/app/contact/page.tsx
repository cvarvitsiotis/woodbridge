import { people } from "@/config/data";
import { Card } from "@heroui/card";
import { Link } from "@heroui/link";
import clsx from "clsx";
import Image from "next/image";
import bryanPacheco from "@/../public/bryan-pacheco.jpg";
import { Metadata } from "next";
import { pages } from "@/config/site";
import { MailIcon, CallIcon } from "@/components/icons";
import { ReactNode } from "react";
import { getParagraphStyle } from "@/styles/styles";
import PageHeader from "@/components/pageHeader";

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
      <PageHeader>
        <span className="font-bold">Contact</span> Us
      </PageHeader>
      <div className={clsx("space-y-4 pt-8 text-center sm:pt-10", getParagraphStyle(true))}>
        <p>We would love to hear from you!</p>
        <p>Please contact {people.coachPacheco} and he will get in touch with you shortly.</p>
      </div>
      <div className="mx-auto pt-14">
        <Card shadow="lg">
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
            <div className="px-6 sm:px-8">
              <p className={getParagraphStyle(true, false)}>{people.bryan}</p>
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
