import { Metadata } from "next";
import { pages } from "@/config/site";
import { dates } from "@/config/dates";
import clsx from "clsx";
import PageHeader from "@/components/pageHeader";
import FeaturedTeamsAndIndividualsSection from "@/components/featuredTeamsAndIndividualsSection";
import { featuredTeams } from "@/config/featuredTeams";
import { featuredIndividuals } from "@/config/featuredIndividuals";
import { getParagraphStyle } from "@/styles/styles";

export const metadata: Metadata = {
  title: pages.featuredEntries.menuLabel,
};

export default function Page() {
  return (
    <>
      <PageHeader>
        <span className="font-bold">Sweepstakes</span> & <span className="font-bold">Rated</span>{" "}
        Entries
      </PageHeader>
      {new Date() < dates.featuredEntriesUpdateDateParts.date ? (
        <div className={clsx("pt-8 text-center sm:pt-10", getParagraphStyle(true))}>
          <p>Entries will be posted on {dates.featuredEntriesUpdateDateParts.monthDayLong}.</p>
        </div>
      ) : (
        <>
          <FeaturedTeamsAndIndividualsSection
            sectionDescription="Boys Sweepstakes"
            teams={featuredTeams.sweepstakesBoysTeams}
            individuals={featuredIndividuals.sweepstakesBoysIndividuals}
          />
          <FeaturedTeamsAndIndividualsSection
            sectionDescription="Girls Sweepstakes"
            teams={featuredTeams.sweepstakesGirlsTeams}
            individuals={featuredIndividuals.sweepstakesGirlsIndividuals}
          />
          <FeaturedTeamsAndIndividualsSection
            sectionDescription="Boys Rated"
            teams={featuredTeams.ratedBoysTeams}
          />
          <FeaturedTeamsAndIndividualsSection
            sectionDescription="Girls Rated"
            teams={featuredTeams.ratedGirlsTeams}
          />
        </>
      )}
    </>
  );
}
