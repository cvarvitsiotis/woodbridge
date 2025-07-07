import { Metadata } from "next";
import { pages } from "@/config/site";
import AllTimeTables from "@/components/allTimeTables";

export const metadata: Metadata = {
  title: pages.allTimeLists.menuLabel,
};

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        <span className="font-bold">All Time</span> Lists
      </h1>
      <AllTimeTables />
    </>
  );
}
