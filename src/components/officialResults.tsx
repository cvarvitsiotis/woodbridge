"use client";

import { useState } from "react";
import { data } from "@/config/data";
import StyledSelect from "./styledSelect";
import OfficialResultsSections from "./officialResultsSections";

const allYears = Array.from(
  { length: data.pdfResultEndYear - data.pdfResultStartYear + 1 },
  (_, i) => data.pdfResultStartYear + i,
)
  .sort((a, b) => b - a)
  .map((year) => year.toString());

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
      label="YEAR"
      className="w-48"
      options={allYears}
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
      <div className="flex justify-center">
        <YearSelect
          selectedYear={selectedYear}
          handleChangeSelectedYear={handleChangeSelectedYear}
        />
      </div>

      <OfficialResultsSections selectedYear={selectedYear} />
    </>
  );
}
