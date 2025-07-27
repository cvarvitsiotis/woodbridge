import Image from "next/image";

import woodbridgeCourse from "@/../public/images/woodbridge-course.png";
import { Metadata } from "next";
import { pages } from "@/config/site";
import PageHeader from "@/components/pageHeader";

export const metadata: Metadata = {
  title: pages.courseAndVenueMap.menuLabel,
};

export default async function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Course</span> & <span className="font-bold">Venue</span> Map
      </PageHeader>
      <div className="pt-10">
        <div className="relative mx-auto aspect-[4196/3246] h-full max-h-[90dvh] max-w-[800px] lg:max-h-[70dvh]">
          <Image
            fill
            src={woodbridgeCourse}
            quality={100}
            placeholder="blur"
            alt="Course & Venue Map"
            className="rounded-lg object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </>
  );
}
