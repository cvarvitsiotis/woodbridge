"use client";

import { useState } from "react";
import { data } from "@/config/data";
import StyledSelect from "@/components/styledSelect";
import OfficialResultsSections from "@/components/officialResultsSections";

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
      selectClassName="w-32"
      valueClassName="text-base"
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
