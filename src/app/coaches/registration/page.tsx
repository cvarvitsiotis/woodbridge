import { urls } from "@/config/data";
import { dates } from "@/config/dates";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";
import { ReactNode } from "react";
import { getParagraphStyle } from "@/styles/styles";
import PageHeader from "@/components/pageHeader";

export const metadata: Metadata = {
  title: pages.registration.menuLabel,
};

function RegistrationSection({
  sectionName,
  children,
}: {
  sectionName: string;
  children: ReactNode;
}) {
  return (
    <div className="flex-1">
      <PageHeader>
        <span className="font-bold">{sectionName}</span> Registration
      </PageHeader>
      <div className={clsx("space-y-4 pt-8 text-center sm:pt-10", getParagraphStyle(true))}>
        {children}
      </div>
    </div>
  );
}

function ParagraphLink({ url, name }: { url: string; name: string }) {
  return (
    <Link isExternal href={url} className={getParagraphStyle(true)}>
      {name}
    </Link>
  );
}

function TeamEntryFormLink() {
  return <ParagraphLink url={urls.other.teamRegistration} name="Team Entry Form" />;
}

export default function Page() {
  return (
    <>
      <div className="flex flex-col justify-center-safe gap-x-20 gap-y-16 pt-4 sm:flex-row sm:pt-8">
        <RegistrationSection sectionName="Team">
          {new Date() >= dates.teamRegistrationEndDateParts.date ? (
            <>
              <p>Team registration is now full.</p>
              <p>
                If you wish to be placed on the waiting list, please fill out the{" "}
                <TeamEntryFormLink />.
              </p>
            </>
          ) : new Date() >= dates.teamRegistrationSaturdayMorningOnlyStartDateParts.date ? (
            <>
              <p>Team registration for the Saturday morning session is still open.</p>
              <p>
                Friday and Saturday night are now full, but you can request to be placed on the
                waiting list.
              </p>
              <p>
                To proceed, please fill out the <TeamEntryFormLink />.
              </p>
            </>
          ) : new Date() < dates.teamRegistrationStartDateParts.date ? (
            <>
              <p>
                Team registration opens on{" "}
                {dates.teamRegistrationStartDateParts.dayDescriptionMonthDayYearLong}.
              </p>
              <p>Return here for the link.</p>
            </>
          ) : (
            <>
              <p>Team registration is now open.</p>
              <p>
                To register, please fill out the <TeamEntryFormLink />.
              </p>
            </>
          )}
        </RegistrationSection>
        <RegistrationSection sectionName="Athlete">
          {new Date() > dates.athleteRegistrationEndDateParts.date ? (
            <>
              <p>
                Athlete registration closed on{" "}
                {dates.athleteRegistrationEndDateParts.dayDescriptionMonthDayYearLong}.
              </p>
              <p>Additional changes can be made at the meet for a fee.</p>
            </>
          ) : (
            <>
              <p>
                Athlete registration{" "}
                {new Date() < dates.athleteRegistrationStartDateParts.date
                  ? `opens on ${dates.athleteRegistrationStartDateParts.dayDescriptionMonthDayYearLong}`
                  : "is now open"}{" "}
                at{" "}
                <ParagraphLink
                  url={
                    new Date() < dates.athleteRegistrationStartDateParts.date
                      ? urls.athleticNet.home
                      : urls.athleticNet.athleteRegistration
                  }
                  name={siteConfig.athleticNet}
                />
                .
              </p>
              <p>
                You must register your athletes by{" "}
                {dates.athleteRegistrationEndDateParts.dayDescriptionMonthDayYearLong}.
              </p>
            </>
          )}
        </RegistrationSection>
      </div>
    </>
  );
}
