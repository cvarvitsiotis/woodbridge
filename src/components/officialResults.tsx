"use client";

import { useState } from "react";
import { data } from "@/config/data";
import StyledSelect from "@/components/styledSelect";
import OfficialResultsSections from "@/components/officialResultsSections";
import { dates } from "@/config/dates";
import StyledAlert from "./styledAlert";

const allYears = Array.from(
  { length: data.pdfResultEndYear - data.htmlResultStartYear + 1 },
  (_, i) => data.htmlResultStartYear + i,
)
  .sort((a, b) => b - a)
  .map((year) => GetYearOption(year));

const disabledYears = Array.from(
  { length: data.pdfResultStartYear - data.htmlResultStartYear },
  (_, i) => data.htmlResultStartYear + i,
)
  .sort((a, b) => b - a)
  .map((year) => GetYearOption(year));

function GetYearOption(year: number) {
  return year.toString() + (year < data.pdfResultStartYear ? " (coming soon)" : "");
}

function YearSelect({
  selectedYear,
  handleChangeSelectedYear,
}: {
  selectedYear: string;
  handleChangeSelectedYear: (value: string) => void;
}) {
  return (
    <StyledSelect
      selectedKey={selectedYear}
      onChange={handleChangeSelectedYear}
      selectClassName="w-32"
      valueClassName="text-base"
      options={allYears}
      disabledKeys={disabledYears}
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

export default function OfficialResults() {
  const [selectedYear, setSelectedYear] = useState(allYears[0]);

  function handleChangeSelectedYear(value: string): void {
    setSelectedYear(value);
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

      <OfficialResultsSections selectedYear={selectedYear} />
    </>
  );
}
