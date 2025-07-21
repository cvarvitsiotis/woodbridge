import { Metadata } from "next";
import { pages } from "@/config/site";
import ParkingAndDirections from "@/components/parkingAndDirections";
import PageHeader from "@/components/pageHeader";

export const metadata: Metadata = {
  title: pages.parkingAndDirections.menuLabel,
};

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Parking</span> & <span className="font-bold">Directions</span>
      </PageHeader>
      <ParkingAndDirections />
    </>
  );
}
