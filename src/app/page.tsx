import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import clsx from "clsx";
import { pageParents, pages, siteConfig } from "@/config/site";
import { CalendarIcon, FormatListBulletedIcon, OverviewIcon } from "@/components/icons";
import { dates } from "@/config/dates";
import { fontSerif } from "@/styles/fonts";
import { Alert } from "@heroui/alert";
import PresentedByAsics from "@/components/presentedByAsics";

function AlertMessages() {
  return (
    <div className="mx-auto">
      <Alert
        hideIcon
        color="warning"
        title={
          <p>
            Thank you, <span className="font-semibold">runners</span>,{" "}
            <span className="font-semibold">spectators</span>, and{" "}
            <span className="font-semibold">coaches</span> for a great meet! Good luck this season.
          </p>
        }
        variant="faded"
        radius="sm"
        classNames={{
          base: "p-2",
          mainWrapper: "ms-0 min-h-0 text-center",
          title: "font-normal",
        }}
      />
    </div>
  );
}

function SpacerforAlertMessage() {
  return <div className="sm:min-h-[5dvh]" />;
}

export default function Home() {
  return (
    <>
      <AlertMessages />
      <div className="relative flex grow flex-col items-center justify-center">
        <SpacerforAlertMessage />

        <div className="absolute h-full w-full bg-[radial-gradient(#220b592d_1px,transparent_2px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-size-[25px_25px]" />

        <div className="z-10 text-center">
          <div
            className={clsx("text-4xl font-light tracking-tight md:text-5xl", fontSerif.className)}
          >
            Kick off the season
          </div>
          <div className="flex w-full items-center justify-center">
            <span className="absolute mx-auto box-content flex w-fit border bg-linear-to-r from-pink-500 via-indigo-500 to-green-500 bg-clip-text text-center text-5xl font-extrabold tracking-tight text-transparent blur-xl select-none md:text-7xl">
              Under the Lights
            </span>
            <h1 className="relative top-0 flex h-auto w-fit items-center justify-center bg-linear-to-r from-pink-500 via-indigo-500 to-green-500 bg-clip-text py-2 text-center text-5xl font-extrabold tracking-tight text-transparent select-auto md:text-7xl">
              Under the Lights
            </h1>
          </div>
          <div
            className={clsx(
              "pt-2 text-4xl font-light tracking-tight md:text-5xl",
              fontSerif.className,
            )}
          >
            The road to championships
          </div>
        </div>

        <div className="z-10 mt-10">
          <div className="flex flex-col items-center text-xl font-light sm:flex-row sm:items-end">
            <div>
              {dates.meetAge}
              <sup>{dates.meetAgeOrdinal}</sup> Annual{" "}
              <span className="text-3xl font-bold tracking-tighter text-sky-950">
                {siteConfig.woodbridge}
              </span>
            </div>
            <div>
              <span className="hidden sm:inline">&nbsp;</span>Cross Country Classic
            </div>
          </div>

          <div className="mt-3">
            <PresentedByAsics />
          </div>
        </div>

        <div className="z-10 mt-16 flex gap-3 sm:mt-20">
          <Button
            as={Link}
            color="primary"
            radius="full"
            variant="shadow"
            size="lg"
            href={pages.raceResults.path}
            startContent={<FormatListBulletedIcon />}
          >
            {pageParents.results}
          </Button>
          <Button
            as={Link}
            color="secondary"
            radius="full"
            variant="bordered"
            size="lg"
            href={pages.schedule.path}
            startContent={<OverviewIcon />}
          >
            {pages.schedule.menuLabel}
          </Button>
        </div>

        <div className="z-10 mt-12 text-default-600 md:mt-20">
          <div className="flex items-center justify-center gap-1">
            <CalendarIcon />
            <div>{dates.meetStartToEndDateShort}</div>
          </div>
        </div>
      </div>
    </>
  );
}
