"use client";

import { Link, Button, Alert } from "@heroui/react";

import clsx from "clsx";
import { pages, siteConfig } from "@/config/site";
import { CalendarIcon, HelpClinicIcon, HowToRegIcon } from "@/components/icons";
import { dates } from "@/config/dates";
import { fontSerif } from "@/styles/fonts";
import PresentedByAsics from "@/components/presentedByAsics";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

function RegisterEarlyAlertMessage({ isScreenShort }: { isScreenShort: boolean }) {
  return (
    <p
      className={clsx(
        siteConfig.showAmbientVideo && "text-white",
        siteConfig.showAmbientVideo && !isScreenShort && "md:text-lg",
      )}
    >
      <Link
        href={pages.registration.path}
        className={clsx(
          "font-semibold",
          siteConfig.showAmbientVideo ? "text-white" : "text-sm text-warning",
          siteConfig.showAmbientVideo && !isScreenShort && "md:text-lg",
        )}
      >
        Register
      </Link>{" "}
      early (starting {dates.teamRegistrationStartDateParts.monthDayShort}) as space is limited.
    </p>
  );
}

function AlertMessages({ isScreenShort }: { isScreenShort: boolean }) {
  return (
    <div className="z-10 mx-auto">
      {siteConfig.showAmbientVideo ? (
        <div className="mt-2 space-y-2">
          <RegisterEarlyAlertMessage isScreenShort={isScreenShort} />
        </div>
      ) : (
        <Alert className="rounded-sm p-2">
          <Alert.Content className="ms-0 min-h-0 text-center">
            <Alert.Title className="font-normal">
              <div className="space-y-2">
                <RegisterEarlyAlertMessage isScreenShort={isScreenShort} />
              </div>
            </Alert.Title>
          </Alert.Content>
        </Alert>
      )}
    </div>
  );
}

function SpacerforAlertMessage() {
  return <div className="sm:min-h-[5dvh]" />;
}

function AmbientVideo() {
  return (
    <div className="absolute inset-0 h-full w-full bg-gray-600">
      <video
        playsInline
        autoPlay
        muted
        loop
        poster="/images/woodbridge-ambient-thumbnail.jpg"
        src="/videos/woodbridge-ambient.mp4"
        className="h-full w-full object-cover opacity-70 portrait:object-[30%_center] landscape:object-center"
      >
        Browser does not support video
      </video>
    </div>
  );
}

function CamelCapClassic({
  isScreenShort,
  children,
}: {
  isScreenShort: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={clsx(
        "inline-block",
        siteConfig.showAmbientVideo
          ? "text-2xl font-semibold tracking-tighter text-white first-letter:text-3xl"
          : "text-xl font-light first-letter:text-2xl",
        siteConfig.showAmbientVideo && !isScreenShort && "md:text-3xl md:first-letter:text-4xl",
      )}
    >
      {children}
    </span>
  );
}

export default function Page() {
  const windowDimensions = useWindowDimensions();
  const isScreenShort = windowDimensions.height !== undefined && windowDimensions.height <= 768;

  return (
    <>
      <AlertMessages isScreenShort={isScreenShort} />

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
              fontSerif.className,
              siteConfig.showAmbientVideo
                ? "text-6xl/12 font-medium tracking-tighter text-yellow-100"
                : "pt-2 text-4xl font-light tracking-tight md:text-5xl",
              siteConfig.showAmbientVideo && !isScreenShort && "md:text-7xl/14",
            )}
          >
            The road to championships
          </div>
        </div>

        <div
          className={clsx(
            "z-10",
            siteConfig.showAmbientVideo ? "mt-20" : "mt-10 space-y-1",
            siteConfig.showAmbientVideo && !isScreenShort && "sm:mt-30",
          )}
        >
          <div
            className={clsx(
              "flex flex-col items-center -space-y-1",
              siteConfig.showAmbientVideo &&
                (isScreenShort ? "md:flex-row md:items-baseline" : "lg:flex-row lg:items-baseline"),
            )}
          >
            <div
              className={clsx(
                siteConfig.showAmbientVideo
                  ? "text-5xl font-black tracking-tight text-rose-300"
                  : "text-3xl font-bold tracking-tighter text-sky-950",
                siteConfig.showAmbientVideo && !isScreenShort && "md:text-6xl",
              )}
            >
              {siteConfig.woodbridge}
            </div>
            <div>
              <span className="hidden sm:inline">&nbsp;</span>
              <CamelCapClassic isScreenShort={isScreenShort}>CROSS</CamelCapClassic>{" "}
              <CamelCapClassic isScreenShort={isScreenShort}>COUNTRY</CamelCapClassic>{" "}
              <CamelCapClassic isScreenShort={isScreenShort}>CLASSIC</CamelCapClassic>
            </div>
          </div>

          <div className={clsx(!siteConfig.showAmbientVideo && "mt-3")}>
            <PresentedByAsics
              isHomePage={siteConfig.showAmbientVideo}
              isScreenShort={isScreenShort}
            />
          </div>
        </div>

        <div
          className={clsx(
            "z-10 flex gap-3",
            siteConfig.showAmbientVideo ? (isScreenShort ? "mt-20" : "mt-30") : "mt-16 sm:mt-20",
          )}
        >
          <a href={pages.registration.path}>
            <Button
              variant="primary"
              size="lg"
              className={clsx("rounded-full", siteConfig.showAmbientVideo && "bg-accent")}
            >
              <HowToRegIcon />
              Register
            </Button>
          </a>
          <a href={pages.about.path}>
            <Button
              variant="secondary"
              size="lg"
              className={clsx("rounded-full", siteConfig.showAmbientVideo && "bg-yellow-100 text-default-600")}
            >
              <HelpClinicIcon />
              {pages.about.menuLabel}
            </Button>
          </a>
        </div>

        <div
          className={clsx(
            "flex flex-col items-center",
            siteConfig.showAmbientVideo
              ? "mt-8 text-lg font-semibold text-white"
              : "mt-12 text-default-600 md:mt-20",
            siteConfig.showAmbientVideo && !isScreenShort && "md:text-xl",
            siteConfig.showAmbientVideo && isScreenShort && "mb-8",
          )}
        >
          <p>
            {dates.meetAge}
            <sup>{dates.meetAgeOrdinal}</sup> Annual{" "}
          </p>
          <div className="-mt-2 flex items-center justify-center gap-1">
            <CalendarIcon />
            <div>{dates.meetStartToEndDateShort}</div>
          </div>
        </div>
      </div>
    </>
  );
}
