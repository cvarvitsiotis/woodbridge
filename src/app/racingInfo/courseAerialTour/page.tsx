import { Metadata } from "next";
import { pages } from "@/config/site";

export const metadata: Metadata = {
  title: pages.courseAerialTour.menuLabel,
};

export default function Page() {
  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        Course <span className="font-bold">Aerial Tour</span>
      </h1>
      <div className="pt-10">
        <iframe
          allowFullScreen
          className="mx-auto aspect-video max-h-[90dvh] w-full max-w-5xl rounded-lg drop-shadow-xl lg:max-h-[70dvh]"
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
