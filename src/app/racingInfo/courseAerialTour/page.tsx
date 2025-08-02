import { Metadata } from "next";
import { pages } from "@/config/site";
import PageHeader from "@/components/pageHeader";

export const metadata: Metadata = {
  title: pages.courseAerialTour.menuLabel,
};

export default function Page() {
  return (
    <>
      <PageHeader>
        Course <span className="font-bold">Aerial Tour</span>
      </PageHeader>
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
