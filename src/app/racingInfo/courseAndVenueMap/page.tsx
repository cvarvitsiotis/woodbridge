import Image from "next/image";

import woodbridgeCourse from "@/../public/images/woodbridge-course.png";
import { Metadata } from "next";
import { pages } from "@/config/site";
import PageHeader from "@/components/pageHeader";
import { PrintIcon } from "@/components/icons";
import BaseLink from "@/components/baseLink";

export const metadata: Metadata = {
  title: pages.courseAndVenueMap.menuLabel,
};

export default async function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Course</span> & <span className="font-bold">Venue</span> Map
      </PageHeader>
      <div className="pt-7">
        <div className="max-w-200 text-right">
          <BaseLink isExternal href="/images/woodbridge-course.pdf">
            <div className="flex items-center gap-0.5 text-zinc-600">
              <PrintIcon size={30} />
              <p>PRINT</p>
            </div>
          </BaseLink>
        </div>
        <div className="relative mx-auto aspect-4196/3246 h-full max-h-[90dvh] max-w-200 lg:max-h-[70dvh]">
          <Image
            fill
            src={woodbridgeCourse}
            quality={100}
            placeholder="blur"
            alt="Course & Venue Map"
            className="rounded-lg object-contain shadow-lg"
          />
        </div>
      </div>
    </>
  );
}
