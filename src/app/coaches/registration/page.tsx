import { urls } from "@/config/data";
import { dates } from "@/config/dates";
import clsx from "clsx";
import { Metadata } from "next";
import { pages, siteConfig } from "@/config/site";
import { ReactNode } from "react";
import { getParagraphStyle } from "@/styles/styles";
import PageHeader from "@/components/pageHeader";
import ParagraphLink from "@/components/paragraphLink";
import StyledAlert from "@/components/styledAlert";

export const metadata: Metadata = {
  title: pages.registration.menuLabel,
};

function RegistrationSection({
  step,
  sectionName,
  alertMessage,
  children,
}: {
  step: string;
  sectionName: string;
  alertMessage?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex-1">
      <PageHeader>
        Step {step}: <span className="font-bold">{sectionName}</span> Registration
      </PageHeader>
      <div className="space-y-6 pt-8 sm:pt-10">
        {alertMessage && (
          <div className="mx-auto max-w-md">
            <StyledAlert status="accent" includeIndicator={true} isBaseSize={true} className="py-2">
              {alertMessage}
            </StyledAlert>
          </div>
        )}
        <div className={clsx("space-y-4 text-center", getParagraphStyle(true))}>{children}</div>
      </div>
    </div>
  );
}

function TeamEntryFormLink() {
  return (
    <ParagraphLink href={urls.other.teamRegistration} isLargerOnLargerScreen isExternal>
      Team Entry Form
    </ParagraphLink>
  );
}

export default function Page() {
  return (
    <>
      <div className="flex flex-col justify-center-safe gap-x-20 gap-y-16 pt-4 sm:flex-row sm:pt-8">
        <RegistrationSection step="1" sectionName="Team">
          {new Date() >= dates.teamRegistrationWaitingListOnlyStartDateParts.date ? (
            <>
              <p>Team registration is now full.</p>
              {new Date() < dates.teamRegistrationEndDateParts.date ? (
                <p>
                  If you wish to be placed on the waiting list, please fill out the{" "}
                  <TeamEntryFormLink />.
                </p>
              ) : (
                <p>The waiting list is closed.</p>
              )}
            </>
          ) : new Date() >= dates.teamRegistrationSaturdayMorningOnlyStartDateParts.date ? (
            <>
              <p>Team registration for the Saturday morning session is still open.</p>
              <p>Friday and Saturday night are now full, but you can join their waiting lists.</p>
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
        <RegistrationSection
          step="2"
          sectionName="Athlete"
          alertMessage="You must first register your team, even if you are only running an individual."
        >
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
                  href={
                    new Date() < dates.athleteRegistrationLinkStartDateParts.date
                      ? urls.athleticNet.home
                      : urls.athleticNet.athleteRegistration
                  }
                  isLargerOnLargerScreen
                  isExternal
                >
                  {siteConfig.athleticNet}
                </ParagraphLink>
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
