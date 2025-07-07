import { featuredIndividuals } from "@/config/featuredIndividuals";
import { featuredTeams } from "@/config/featuredTeams";
import { Metadata } from "next";
import { pages } from "@/config/site";
import FeaturedTeamsAndIndividualsSection from "@/components/featuredTeamsAndIndividualsSection";

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
  );
}
