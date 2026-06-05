import { Metadata } from "next";
import { pages } from "@/config/site";
import ParticipatingTeamsTable from "@/components/participatingTeamsTable";
import PageHeader from "@/components/pageHeader";
import { dates } from "@/config/dates";
import { getParagraphStyle } from "@/styles/styles";
import clsx from "clsx";
import StyledAlert from "@/components/styledAlert";

export const metadata: Metadata = {
  title: pages.participatingTeams.menuLabel,
};

function AlertMessage() {
  return (
    <div className="mx-auto pt-6">
      <StyledAlert status="accent" includeIndicator={false} isBaseSize={false}>
        {`Division and Varsity Heat will be added ${dates.participatingTeamsUpdateDateParts.monthDayLong}`}
      </StyledAlert>
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
          {new Date() < dates.participatingTeamsUpdateDateParts.date && <AlertMessage />}
          <ParticipatingTeamsTable />
        </>
      )}
    </>
  );
}
