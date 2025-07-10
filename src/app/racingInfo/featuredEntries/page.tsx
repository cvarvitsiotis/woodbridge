import { Metadata } from "next";
import { pages } from "@/config/site";
import { dates } from "@/config/dates";
import { fontSerif } from "@/styles/fonts";
import clsx from "clsx";

export const metadata: Metadata = {
  title: pages.featuredEntries.menuLabel,
};

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        <span className="font-bold">Sweepstakes</span> & <span className="font-bold">Rated</span>{" "}
        Entries
      </h1>
      <div
        className={clsx(
          "pt-8 text-center text-xl font-light sm:pt-10 sm:text-2xl",
          fontSerif.className,
        )}
      >
        <p>Entries will be posted on {dates.featuredEntriesUpdateDateParts.monthDayLong}.</p>
      </div>

      {/* <FeaturedTeamsAndIndividualsSection
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
      /> */}
    </>
  );
}
