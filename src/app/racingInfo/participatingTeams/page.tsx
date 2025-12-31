import { Alert } from "@heroui/alert";
import { Metadata } from "next";
import { pages } from "@/config/site";
import ParticipatingTeamsTable from "@/components/participatingTeamsTable";
import PageHeader from "@/components/pageHeader";
import { dates } from "@/config/dates";
import { participatingTeams } from "@/config/participatingTeams";
import { getParagraphStyle } from "@/styles/styles";
import clsx from "clsx";

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
      <PageHeader>
        Participating <span className="font-bold">Teams</span>
      </PageHeader>
      {new Date() < dates.participatingTeamsPublishDateParts.date ? (
        <div className={clsx("pt-8 text-center sm:pt-10", getParagraphStyle(true))}>
          <p>Teams will be posted on {dates.participatingTeamsPublishDateParts.monthDayLong}.</p>
        </div>
      ) : (
        <>
          {!participatingTeams[0].division && <AlertMessage />}
          <ParticipatingTeamsTable />
        </>
      )}
    </>
  );
}
