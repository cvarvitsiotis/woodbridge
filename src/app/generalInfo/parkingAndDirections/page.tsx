import { Metadata } from "next";
import { pages } from "@/config/site";
import ParkingAndDirections from "@/components/parkingAndDirections";

export const metadata: Metadata = {
  title: pages.parkingAndDirections.menuLabel,
};

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        <span className="font-bold">Parking</span> & <span className="font-bold">Directions</span>
      </h1>
      <ParkingAndDirections />
    </>
  );
}
