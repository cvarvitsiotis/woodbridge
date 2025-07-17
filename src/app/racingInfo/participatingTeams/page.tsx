import { Alert } from "@heroui/alert";
import { Metadata } from "next";
import { pages } from "@/config/site";
import ParticipatingTeamsTable from "@/components/participatingTeamsTable";
import { dates } from "@/config/dates";

export const metadata: Metadata = {
  title: pages.participatingTeams.menuLabel,
};

function AlertMessage() {
  return (
    <div className="mx-auto pt-6">
      <Alert
        hideIcon
        color="primary"
        title={`Division and Varsity Heat will be added ${dates.participatingTeamsUpdateDateParts.monthDayLong}`}
        variant="faded"
        radius="sm"
        classNames={{
          base: "p-3",
          mainWrapper: "ms-0 min-h-0 text-center",
          title: "font-normal",
        }}
      />
    </div>
  );
}

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        Participating <span className="font-bold">Teams</span>
      </h1>
      <AlertMessage />
      <ParticipatingTeamsTable />
    </>
  );
}
