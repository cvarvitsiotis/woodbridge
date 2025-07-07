import { Alert } from "@heroui/alert";
import { Metadata } from "next";
import { pages } from "@/config/site";
import ParticipatingTeamsTable from "@/components/participatingTeamsTable";

export const metadata: Metadata = {
  title: pages.participatingTeams.menuLabel,
};

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        Participating <span className="font-bold">Teams</span>
      </h1>
      <div className="mx-auto mt-6">
        <Alert
          color="secondary"
          title="Division and Varsity Heat will be added later"
          variant="bordered"
          radius="sm"
          classNames={{ base: "mt-6 py-1 px-2" }}
        />
      </div>
      <ParticipatingTeamsTable />
    </>
  );
}
