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
            Athlete registration{" "}
            {new Date() < dates.athleteRegistrationStartDateParts.date
              ? `opens on ${dates.athleteRegistrationStartDateParts.dayDescriptionMonthDayYearLong}`
              : "is now open"}{" "}
            at{" "}
            <ParagraphLink
              url={urls.athleticNet.athleteRegistration}
              name={siteConfig.athleticNet}
            />
            .
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
