"use client";

import { useMemo, useState } from "react";
import { Table } from "@heroui/react";
import { allTimeIndividuals } from "@/config/allTimeIndividuals";
import { pages } from "@/config/site";
import StyledSelect from "@/components/styledSelect";
import StyledInput from "@/components/styledInput";
import StyledTableCell from "@/components/styledTableCell";
import DynamicTable, { TableEmptyState } from "@/components/dynamicTable";
import { ColumnProps } from "react-aria-components/Table";

const columns: ColumnProps[] = [
  { id: "place", textValue: "Place", defaultWidth: "1fr", isRowHeader: true },
  { id: "name", textValue: "Name", defaultWidth: "3fr" },
  { id: "team", textValue: "School", defaultWidth: "3fr" },
  { id: "time", textValue: "Time", defaultWidth: "1fr" },
  { id: "grade", textValue: "Grade", defaultWidth: "1fr" },
  { id: "year", textValue: "Year", defaultWidth: "1fr" },
  { id: "course", textValue: "Course", defaultWidth: "2fr" },
];

const genderOptions = ["M", "F"];

const gradeOptions = ["All", "12", "11", "10", "9"];

const courseOptions = ["All", "Great Park", "SilverLakes", "Estancia", "Woodbridge"];

const cutoffTimes = new Map([
  [
    "Great Park",
    new Map([
      [
        "M",
        new Map([
          ["All", "14:30.0"],
          ["12", "14:30.0"],
          ["11", "14:49.0"],
          ["10", "15:13.0"],
          ["9", "15:58.0"],
        ]),
      ],
      [
        "F",
        new Map([
          ["All", "17:13.0"],
          ["12", "17:13.0"],
          ["11", "17:21.0"],
          ["10", "17:37.0"],
          ["9", "18:07.0"],
        ]),
      ],
    ]),
  ],
  [
    "SilverLakes",
    new Map([
      [
        "M",
        new Map([
          ["All", "14:52.0"],
          ["12", "14:52.0"],
          ["11", "15:01.0"],
          ["10", "15:25.0"],
          ["9", "16:08.0"],
        ]),
      ],
      [
        "F",
        new Map([
          ["All", "17:38.0"],
          ["12", "17:38.0"],
          ["11", "17:50.0"],
          ["10", "17:52.0"],
          ["9", "18:07.0"],
        ]),
      ],
    ]),
  ],
  [
    "Estancia",
    new Map([
      [
        "M",
        new Map([
          ["All", "15:00.0"],
          ["12", "15:00.0"],
          ["11", "15:13.0"],
          ["10", "15:42.0"],
          ["9", "16:29.0"],
        ]),
      ],
      [
        "F",
        new Map([
          ["All", "17:46.0"],
          ["12", "17:46.0"],
          ["11", "17:51.0"],
          ["10", "18:07.0"],
          ["9", "18:30.0"],
        ]),
      ],
    ]),
  ],
  [
    "Woodbridge",
    new Map([
      [
        "M",
        new Map([
          ["All", "15:09.0"],
          ["12", "15:09.0"],
          ["11", "15:25.0"],
          ["10", "15:50.0"],
          ["9", "16:32.0"],
        ]),
      ],
      [
        "F",
        new Map([
          ["All", "18:22.0"],
          ["12", "18:22.0"],
          ["11", "18:25.0"],
          ["10", "18:38.0"],
          ["9", "19:00.0"],
        ]),
      ],
    ]),
  ],
  [
    "All",
    new Map([
      [
        "M",
        new Map([
          ["All", "14:30.0"],
          ["12", "14:30.0"],
          ["11", "14:49.0"],
          ["10", "15:13.0"],
          ["9", "15:58.0"],
        ]),
      ],
      [
        "F",
        new Map([
          ["All", "17:13.0"],
          ["12", "17:13.0"],
          ["11", "17:21.0"],
          ["10", "17:37.0"],
          ["9", "18:07.0"],
        ]),
      ],
    ]),
  ],
]);

export default function AllTimeIndividualsTable() {
  const [genderFilter, setGenderFilter] = useState("M");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [nameFilter, setNameFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");

  const tableKey = `${genderFilter}_${gradeFilter}_${courseFilter}`;

  const filteredItems = useMemo(
    function () {
      let filteredIndividuals = [...allTimeIndividuals];

      filteredIndividuals = filteredIndividuals.filter(
        (individual) => individual.gender === genderFilter,
      );

      if (gradeFilter !== "All") {
        filteredIndividuals = filteredIndividuals.filter(
          (individual) => individual.grade === gradeFilter,
        );
      }

      if (courseFilter !== "All") {
        filteredIndividuals = filteredIndividuals.filter(
          (individual) => individual.course === courseFilter,
        );
      }

      const cutoffTime = cutoffTimes.get(courseFilter)?.get(genderFilter)?.get(gradeFilter);
      filteredIndividuals = filteredIndividuals.filter(
        (individual) => cutoffTime && individual.normalizedTime < cutoffTime,
      );

      let previousPlace = 1;
      let previousNormalizedTime = "";

      filteredIndividuals.forEach((individual, index) => {
        individual.key = `${individual.id}-${tableKey}`;
        individual.place =
          individual.normalizedTime === previousNormalizedTime ? previousPlace : index + 1;

        previousPlace = individual.place;
        previousNormalizedTime = individual.normalizedTime;
      });

      if (nameFilter) {
        filteredIndividuals = filteredIndividuals.filter((individual) =>
          individual.name.toLowerCase().includes(nameFilter.toLowerCase()),
        );
      }

      if (teamFilter) {
        filteredIndividuals = filteredIndividuals.filter((individual) =>
          individual.team.toLowerCase().includes(teamFilter.toLowerCase()),
        );
      }

      return filteredIndividuals;
    },
    [genderFilter, gradeFilter, courseFilter, nameFilter, teamFilter, tableKey],
  );

  const topContent = useMemo(
    function () {
      function onGenderFilterChange(value: string): void {
        setGenderFilter(value);
      }

      function onGradeFilterChange(value: string): void {
        setGradeFilter(value);
      }

      function onCourseFilterChange(value: string): void {
        setCourseFilter(value);
      }

      return (
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <div className="flex min-w-0 shrink basis-1/2 gap-2">
            <StyledInput
              placeholder="Filter name..."
              value={nameFilter}
              onValueChange={setNameFilter}
              textFieldClassName="basis-1/2 min-w-0"
              fillVertically={true}
              isPrimary={false}
            />
            <StyledInput
              placeholder="Filter school..."
              value={teamFilter}
              onValueChange={setTeamFilter}
              textFieldClassName="basis-1/2 min-w-0"
              fillVertically={true}
              isPrimary={false}
            />
          </div>
          <div className="flex basis-1/2 gap-2">
            <div className="flex basis-1/2 gap-2">
              <StyledSelect
                selectedKey={genderFilter}
                onChange={onGenderFilterChange}
                label="Gender"
                selectClassName="basis-1/2"
                options={genderOptions}
                isPrimary={false}
              />
              <StyledSelect
                selectedKey={gradeFilter}
                onChange={onGradeFilterChange}
                label="Grade"
                selectClassName="basis-1/2"
                options={gradeOptions}
                isPrimary={false}
              />
            </div>
            <StyledSelect
              selectedKey={courseFilter}
              onChange={onCourseFilterChange}
              label="Course"
              selectClassName="basis-1/2"
              options={courseOptions}
              isPrimary={false}
            />
          </div>
        </div>
      );
    },
    [genderFilter, gradeFilter, courseFilter, nameFilter, teamFilter],
  );

  return (
    <DynamicTable
      tableKey={tableKey}
      topContent={topContent}
      columns={columns}
      ariaLabel={`${pages.allTimeLists.menuLabel} - Individuals`}
    >
      <Table.Body items={filteredItems} renderEmptyState={() => <TableEmptyState />}>
        {(item) => (
          <Table.Row id={item.id}>
            <StyledTableCell>{item.place}</StyledTableCell>
            <StyledTableCell>{item.name}</StyledTableCell>
            <StyledTableCell>{item.team}</StyledTableCell>
            <StyledTableCell>{item.time}</StyledTableCell>
            <StyledTableCell>{item.grade}</StyledTableCell>
            <StyledTableCell>{item.year}</StyledTableCell>
            <StyledTableCell>{item.course}</StyledTableCell>
          </Table.Row>
        )}
      </Table.Body>
    </DynamicTable>
  );
}
