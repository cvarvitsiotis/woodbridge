import Image from "next/image";

import woodbridgeCourse from "@/../public/woodbridge-course.png";
import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.courseAndVenueMap.menuLabel,
};

export default async function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        <span className="font-bold">Course</span> & <span className="font-bold">Venue</span> Map
      </h1>
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
