import { Metadata } from "next";
import { pages } from "@/config/site";
import AllTimeTables from "@/components/allTimeTables";
import PageHeader from "@/components/pageHeader";

export const metadata: Metadata = {
  title: pages.allTimeLists.menuLabel,
};

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">All Time</span> Lists
      </PageHeader>
      <AllTimeTables />
    </>
  );
}
