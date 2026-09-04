import { Metadata } from "next";
import { pages } from "@/config/site";
import { dates } from "@/config/dates";
import clsx from "clsx";
import PageHeader from "@/components/pageHeader";
import FeaturedTeamsAndIndividualsSection from "@/components/featuredTeamsAndIndividualsSection";
import { featuredTeams } from "@/config/featuredTeams";
import { featuredIndividuals } from "@/config/featuredIndividuals";
import { getParagraphStyle } from "@/styles/styles";
import StyledAlert from "@/components/styledAlert";
import { urls } from "@/config/data";
import BaseLink from "@/components/baseLink";

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
      {new Date() < dates.featuredEntriesPublishDateParts.date ? (
        <div className={clsx("pt-8 text-center sm:pt-10", getParagraphStyle(true))}>
          <p>Entries will be posted on {dates.featuredEntriesPublishDateParts.monthDayLong}.</p>
        </div>
      ) : !featuredTeams.sweepstakesBoysTeams?.length ? (
        <div className={clsx("pt-8 text-center sm:pt-10", getParagraphStyle(true))}>
          <p>Entries will be posted in the next day or two.</p>
        </div>
      ) : (
        <>
          <div className="mx-auto pt-6">
            <StyledAlert
              status="warning"
              includeIndicator={false}
              isBaseSize={true}
              className="py-2 text-center"
            >
              <p>Want to know about the selection process?</p>
              <p>
                Rich Gonzalez of PrepCalTrack explains his methodology in{" "}
                <BaseLink
                  isExternal
                  href={urls.other.featuredEntriesArticle}
                  className={clsx("font-bold", "text-warning-soft-foreground")}
                >
                  this article
                </BaseLink>
                .
              </p>
            </StyledAlert>
          </div>
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
            individuals={featuredIndividuals.ratedBoysIndividuals}
          />
          <FeaturedTeamsAndIndividualsSection
            sectionDescription="Girls Rated"
            teams={featuredTeams.ratedGirlsTeams}
            individuals={featuredIndividuals.ratedGirlsIndividuals}
          />
        </>
      )}
    </>
  );
}
