import { urls } from "@/config/data";
import { dates } from "@/config/dates";
import { fontSerif } from "@/styles/fonts";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: pages.registration.menuLabel,
};

function RegistrationSection({
  sectionName,
  children,
}: {
  sectionName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1">
      <h1 className="pt-4 text-center text-2xl font-extralight sm:pt-8 sm:text-3xl">
        <span className="font-bold">{sectionName}</span> Registration
      </h1>
      <div
        className={clsx(
          "space-y-4 pt-8 text-center text-xl font-light sm:pt-10 sm:text-2xl",
          fontSerif.className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ParagraphLink({ url, name }: { url: string; name: string }) {
  return (
    <Link isExternal href={url} className="text-xl sm:text-2xl">
      {name}
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <div className="justify-center-safe flex flex-col gap-x-20 gap-y-16 pt-4 sm:flex-row sm:pt-8">
        <RegistrationSection sectionName="Team">
          <p>Team registration is now full.</p>
          <p>
            If you wish to be placed on the waiting list, please fill out the{" "}
            <ParagraphLink url={urls.other.teamRegistration} name="Team Entry Form" />.
          </p>
        </RegistrationSection>
        <RegistrationSection sectionName="Athlete">
          <p>
            Athlete registration opens on{" "}
            {dates.athleteRegistrationStartDateParts.dayDescriptionMonthDayYearLong} at{" "}
            <ParagraphLink url={urls.athleticNet.athleticNet} name={siteConfig.athleticNet} />.
          </p>
          <p>
            You must register your athletes before{" "}
            {dates.athleteRegistrationEndDateParts.dayDescriptionMonthDayYearLong}.
          </p>
        </RegistrationSection>
      </div>
    </>
  );
}
