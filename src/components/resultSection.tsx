import { ReactNode } from "react";
import clsx from "clsx";
import BackToTopButton from "@/components/backToTopButton";
import { Subtitle } from "@/components/officialResultsSections";
import ScrollIntoViewOnMount from "@/components/scrollIntoViewOnMount";
import StyledAlert from "@/components/styledAlert";
import { getParagraphStyle } from "@/styles/styles";

export function NoResultsAlert({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-fit md:mx-0">
      <StyledAlert status="accent" includeIndicator={true} isBaseSize={true} className="py-2">
        {children}
      </StyledAlert>
    </div>
  );
}

export function ResultDescription({ info, children }: { info: string; children: ReactNode }) {
  return (
    <div
      className={clsx(
        "flex flex-col text-center md:flex-row md:justify-start md:gap-x-1.25 md:text-left",
        getParagraphStyle(false, false),
      )}
    >
      <div>{info}</div>
      <span className="hidden md:block">·</span>
      <div>{children}</div>
    </div>
  );
}

export default function ResultSection({ children }: { children: ReactNode }) {
  return (
    <ScrollIntoViewOnMount>
      <div className="min-h-screen space-y-4">
        <Subtitle>Result</Subtitle>
        <div className="space-y-4 md:pl-5">{children}</div>
      </div>
      <BackToTopButton />
    </ScrollIntoViewOnMount>
  );
}
