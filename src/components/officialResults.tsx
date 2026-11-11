"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { data, resultYears } from "@/config/data";
import { pages } from "@/config/site";
import StyledSelect from "@/components/styledSelect";
import OfficialResultsSections from "@/components/officialResultsSections";
import { NoResultsAlert } from "@/components/resultSection";
import { dates } from "@/config/dates";
import StyledAlert from "./styledAlert";

const allYears = [...resultYears].reverse().map((year) => year.toString());

function YearSelect({
  selectedYear,
  handleChangeSelectedYear,
}: {
  selectedYear: number;
  handleChangeSelectedYear: (value: string) => void;
}) {
  return (
    <StyledSelect
      selectedKey={selectedYear.toString()}
      onChange={handleChangeSelectedYear}
      selectClassName="w-32"
      valueClassName="text-base"
      options={allYears}
    />
  );
}

function OfficialResultsAlert() {
  return (
    <div className="mx-auto py-2">
      <StyledAlert status="warning" includeIndicator={true} isBaseSize={true} className="py-2">
        For <span className="font-extrabold">{dates.meetStartDateParts.year}</span>, until we post
        official results, use the Live Results link above
      </StyledAlert>
    </div>
  );
}

export default function OfficialResults({
  selectedYear,
  children,
}: {
  selectedYear: number;
  children?: ReactNode;
}) {
  const router = useRouter();

  function handleChangeSelectedYear(value: string): void {
    router.push(`${pages.raceResults.path}/${value}`, { scroll: false });
  }

  return (
    <>
      {new Date() >= dates.meetStartDateParts.date &&
        data.pdfResultEndYear < dates.meetStartDateParts.year && <OfficialResultsAlert />}

      <div className="flex items-center justify-center gap-3">
        <div className="text-lg font-light">YEAR</div>
        <YearSelect
          selectedYear={selectedYear}
          handleChangeSelectedYear={handleChangeSelectedYear}
        />
      </div>

      {selectedYear === 2020 ? (
        <div className="pt-8">
          <NoResultsAlert>No meet in 2020.</NoResultsAlert>
        </div>
      ) : (
        <OfficialResultsSections selectedYear={selectedYear} />
      )}

      {children}
    </>
  );
}
