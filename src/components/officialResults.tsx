"use client";

import { useState } from "react";
import { data } from "@/config/data";
import StyledSelect from "@/components/styledSelect";
import OfficialResultsSections from "@/components/officialResultsSections";

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

export default function OfficialResults() {
  const [selectedYear, setSelectedYear] = useState(allYears[0]);

  function handleChangeSelectedYear(value: string): void {
    setSelectedYear(value);
  }

  return (
    <>
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
