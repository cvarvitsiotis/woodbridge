import { Metadata } from "next";
import { pages } from "@/config/site";
import PageHeader from "@/components/pageHeader";
import StyledAlert from "@/components/styledAlert";
import BaseLink from "@/components/baseLink";

export const metadata: Metadata = {
  title: pages.courseAerialTour.menuLabel,
};

export default function Page() {
  return (
    <>
      <PageHeader>
        Course <span className="font-bold">Aerial Tour</span>
      </PageHeader>
      <div className="mx-auto pt-6">
        <StyledAlert status="accent" includeIndicator={true} isBaseSize={true} className="py-2">
          We also have a{" "}
          <BaseLink
            href={pages.courseAndVenueMap.path}
            className="font-semibold text-accent-soft-foreground"
          >
            {pages.courseAndVenueMap.menuLabel}
          </BaseLink>
          .
        </StyledAlert>
      </div>
      <div className="pt-10">
        <iframe
          allowFullScreen
          className="mx-auto aspect-video max-h-[90dvh] w-full max-w-5xl rounded-lg shadow-lg lg:max-h-[70dvh]"
          src="https://www.youtube.com/embed/Vw3-lWR7GEA?si=AJhVQtPuvWFJLej4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </>
  );
}
