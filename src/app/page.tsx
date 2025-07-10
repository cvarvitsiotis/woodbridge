import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Button } from "@heroui/button";

import clsx from "clsx";
import { pageParents, pages, siteConfig } from "@/config/site";
import { AsicsLogo, CalendarIcon } from "@/components/icons";
import { dates } from "@/config/dates";
import { fontSerif } from "@/styles/fonts";
import { urls } from "@/config/data";
import { Alert } from "@heroui/alert";

export default function Home() {
  return (
    <>
      <div className="mx-auto">
        <Alert
          hideIcon
          color="primary"
          title={
            <p>
              Our website got a facelift. We welcome all{" "}
              <Link href={pages.contact.path} className="text-sm font-semibold">
                feedback
              </Link>
              .
            </p>
          }
          variant="flat"
          radius="sm"
          classNames={{
            base: "p-2",
            mainWrapper: "ms-0 min-h-0 text-center",
            title: "font-normal",
          }}
        />
      </div>
      <div className="relative flex grow flex-col items-center justify-center">
        <div className="absolute h-full w-full bg-[radial-gradient(#cbcbcb_1px,transparent_2px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_50%,transparent_100%)] dark:bg-[radial-gradient(#4a4a4a_1px,transparent_2px)]" />

        <div className="z-10 text-center">
          <div
            className={clsx("text-4xl font-light tracking-tight md:text-5xl", fontSerif.className)}
          >
            Kick off the season
          </div>
          <div className="flex w-full items-center justify-center">
            <span className="absolute mx-auto box-content flex w-fit select-none border bg-gradient-to-r from-pink-500 via-indigo-500 to-green-500 bg-clip-text text-center text-5xl font-extrabold tracking-tight text-transparent blur-xl md:text-7xl">
              Under the Lights
            </span>
            <h1 className="relative top-0 flex h-auto w-fit select-auto items-center justify-center bg-gradient-to-r from-pink-500 via-indigo-500 to-green-500 bg-clip-text py-2 text-center text-5xl font-extrabold tracking-tight text-transparent md:text-7xl">
              Under the Lights
            </h1>
          </div>
          <div
            className={clsx("text-4xl font-light tracking-tight md:text-5xl", fontSerif.className)}
          >
            The road to championships
          </div>
        </div>

        <div className="z-10 mt-10">
          <div className="text-center text-xl font-light">
            {dates.meetAge}
            <sup>{dates.meetAgeOrdinal}</sup> Annual{" "}
            <span className="text-3xl font-extrabold text-default-600">
              {siteConfig.woodbridge}
            </span>{" "}
            Cross Country Classic
          </div>
          <div className="mt-3 flex items-center justify-center gap-1">
            <span className="mt-1">Presented by</span>
            <Link isExternal href={urls.sponsors.asics}>
              <AsicsLogo />
            </Link>
            <span className="mt-1">AMERICA</span>
          </div>
        </div>

        <div className="z-10 mt-20 flex gap-3">
          <Button
            as={Link}
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
            href={pages.raceResults.path}
          >
            {pageParents.results}
          </Button>
          <Button
            as={Link}
            className={buttonStyles({
              color: "secondary",
              radius: "full",
              variant: "bordered",
              size: "lg",
            })}
            href={pages.schedule.path}
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
