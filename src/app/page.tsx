import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import clsx from "clsx";
import { pages, siteConfig } from "@/config/site";
import { CalendarIcon, HelpClinicIcon, HowToRegIcon } from "@/components/icons";
import { dates } from "@/config/dates";
import { fontSerif } from "@/styles/fonts";
import { Alert } from "@heroui/alert";
import PresentedByAsics from "@/components/presentedByAsics";

function RegisterEarlyAlertMessage() {
  return (
    <p className={clsx(siteConfig.showAmbientVideo && "text-base text-white")}>
      <Link
        href={pages.registration.path}
        className={clsx(
          "font-semibold",
          siteConfig.showAmbientVideo ? "text-lg text-white" : "text-sm text-warning-800",
        )}
      >
        Register
      </Link>{" "}
      early (starting {dates.teamRegistrationStartDateParts.monthDayShort}) as space is limited.
    </p>
  );
}

function AlertMessages() {
  return (
    <div className="z-10 mx-auto">
      {siteConfig.showAmbientVideo ? (
        <div className="mt-2 space-y-2">
          <RegisterEarlyAlertMessage />
        </div>
      ) : (
        <Alert
          hideIcon
          color="warning"
          title={
            <div className="space-y-2">
              <RegisterEarlyAlertMessage />
            </div>
          }
          variant="faded"
          radius="sm"
          classNames={{
            base: "p-2",
            mainWrapper: "ms-0 min-h-0 text-center",
            title: "font-normal",
          }}
        />
      )}
    </div>
  );
}

function SpacerforAlertMessage() {
  return <div className="sm:min-h-[5dvh]" />;
}

function AmbientVideo() {
  return (
    <div className="absolute inset-0 h-dvh w-full bg-gray-800">
      <video
        playsInline
        autoPlay
        muted
        loop
        poster="/images/woodbridge-ambient-thumbnail.jpg"
        src="/videos/woodbridge-ambient.mp4"
        className="h-full w-full object-cover opacity-60 portrait:object-[30%_center] landscape:object-center"
      >
        Browser does not support video
      </video>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <AlertMessages />

      {siteConfig.showAmbientVideo && <AmbientVideo />}

      <div className="relative flex grow flex-col items-center justify-center">
        <SpacerforAlertMessage />

        {!siteConfig.showAmbientVideo && (
          <div className="absolute h-full w-full bg-[radial-gradient(#220b592d_1px,transparent_2px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-size-[25px_25px]" />
        )}

        <div className="z-10 text-center">
          {!siteConfig.showAmbientVideo && (
            <>
              <div
                className={clsx(
                  "text-4xl font-light tracking-tight md:text-5xl",
                  fontSerif.className,
                )}
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
            </>
          )}
          <div
            className={clsx(
              "pt-2",
              fontSerif.className,
              siteConfig.showAmbientVideo
                ? "text-6xl/13 font-medium tracking-tighter text-yellow-100 md:text-7xl"
                : "text-4xl font-light tracking-tight md:text-5xl",
            )}
          >
            The road to championships
          </div>
        </div>

        <div className={clsx("z-10 mt-10", siteConfig.showAmbientVideo && "sm:mt-7")}>
          <div
            className={clsx(
              "flex flex-col items-center sm:flex-row sm:items-baseline",
              siteConfig.showAmbientVideo
                ? "text-2xl/9 font-medium tracking-tight text-white"
                : "text-xl font-light",
            )}
          >
            <div>
              {dates.meetAge}
              <sup>{dates.meetAgeOrdinal}</sup> Annual{" "}
              <span
                className={clsx(
                  "tracking-tighter",
                  siteConfig.showAmbientVideo
                    ? "text-[2.8rem] font-extrabold text-rose-300"
                    : "text-3xl font-bold text-sky-950",
                )}
              >
                {siteConfig.woodbridge}
              </span>
            </div>
            <div>
              <span className="hidden sm:inline">&nbsp;</span>Cross Country Classic
            </div>
          </div>

          <div className={siteConfig.showAmbientVideo ? "mt-10" : "mt-3"}>
            <PresentedByAsics isContrast={siteConfig.showAmbientVideo} />
          </div>
        </div>

        <div className="z-10 mt-16 flex gap-3 sm:mt-20">
          <Button
            as={Link}
            color="primary"
            radius="full"
            variant={siteConfig.showAmbientVideo ? "solid" : "shadow"}
            size="lg"
            href={pages.registration.path}
            startContent={<HowToRegIcon />}
            className={clsx(siteConfig.showAmbientVideo && "bg-primary-400")}
          >
            Register
          </Button>
          <Button
            as={Link}
            color={siteConfig.showAmbientVideo ? "default" : "secondary"}
            radius="full"
            variant={siteConfig.showAmbientVideo ? "solid" : "bordered"}
            size="lg"
            href={pages.about.path}
            startContent={<HelpClinicIcon />}
            className={clsx(siteConfig.showAmbientVideo && "bg-yellow-100 text-default-600")}
          >
            {pages.about.menuLabel}
          </Button>
        </div>

        <div
          className={clsx(
            "z-10",
            siteConfig.showAmbientVideo ? "mt-20 md:mt-20" : "mt-12 md:mt-20",
            siteConfig.showAmbientVideo ? "text-lg font-semibold text-white" : "text-default-600",
          )}
        >
          <div className="flex items-center justify-center gap-1">
            <CalendarIcon />
            <div>{dates.meetStartToEndDateShort}</div>
          </div>
        </div>
      </div>
    </>
  );
}
