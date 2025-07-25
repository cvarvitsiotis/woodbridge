import { Metadata } from "next";
import { pages } from "@/config/site";
import ParticipatingTeamsTable from "@/components/participatingTeamsTable";
import PageHeader from "@/components/pageHeader";

export const metadata: Metadata = {
  title: pages.participatingTeams.menuLabel,
};

export default function Page() {
  return (
    <>
      <PageHeader>
        Participating <span className="font-bold">Teams</span>
      </PageHeader>
      <ParticipatingTeamsTable />
    </>
  );
}
