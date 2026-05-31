"use client";

import { useMemo, useState } from "react";
import { Table } from "@heroui/react";
import { pages } from "@/config/site";
import { allTimeTeams } from "@/config/allTimeTeams";
import StyledSelect from "@/components/styledSelect";
import StyledInput from "@/components/styledInput";
import StyledTableCell from "@/components/styledTableCell";
import DynamicTable, { TableEmptyState } from "@/components/dynamicTable";
import { ColumnProps } from "react-aria-components/Table";

const columns: ColumnProps[] = [
  { id: "place", textValue: "Place", defaultWidth: "1fr", isRowHeader: true },
  { id: "team", textValue: "School", defaultWidth: "3fr" },
  { id: "time", textValue: "Time", defaultWidth: "1fr" },
  { id: "year", textValue: "Year", defaultWidth: "1fr" },
  { id: "course", textValue: "Course", defaultWidth: "2fr" },
];

const genderOptions = ["M", "F"];

const courseOptions = ["All", "Great Park", "SilverLakes", "Estancia", "Woodbridge"];

const cutoffTimes = new Map([
  [
    "Great Park",
    new Map([
      ["M", "1:16:14.0"],
      ["F", "1:30:42.0"],
    ]),
  ],
  [
    "SilverLakes",
    new Map([
      ["M", "1:18:11.0"],
      ["F", "1:33:26.0"],
    ]),
  ],
  [
    "Estancia",
    new Map([
      ["M", "1:17:34.0"],
      ["F", "1:31:24.0"],
    ]),
  ],
  [
    "Woodbridge",
    new Map([
      ["M", "1:19:13.0"],
      ["F", "1:35:00.0"],
    ]),
  ],
  [
    "All",
    new Map([
      ["M", "1:16:14.0"],
      ["F", "1:30:42.0"],
    ]),
  ],
]);

export default function AllTimeTeamsTable() {
  const [genderFilter, setGenderFilter] = useState("M");
  const [courseFilter, setCourseFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("");

  const tableKey = `${genderFilter}_${courseFilter}`;

  const filteredItems = useMemo(
    function () {
      let filteredTeams = [...allTimeTeams];

      filteredTeams = filteredTeams.filter((team) => team.gender === genderFilter);

      if (courseFilter !== "All") {
        filteredTeams = filteredTeams.filter((team) => team.course === courseFilter);
      }

      const cutoffTime = cutoffTimes.get(courseFilter)?.get(genderFilter);
      filteredTeams = filteredTeams.filter(
        (team) => cutoffTime && team.normalizedTime < cutoffTime,
      );

      let previousPlace = 1;
      let previousNormalizedTime = "";

      filteredTeams.forEach((team, index) => {
        team.key = `${team.id}-${tableKey}`;
        team.place = team.normalizedTime === previousNormalizedTime ? previousPlace : index + 1;

        previousPlace = team.place;
        previousNormalizedTime = team.normalizedTime;
      });

      if (teamFilter) {
        filteredTeams = filteredTeams.filter((team) =>
          team.team.toLowerCase().includes(teamFilter.toLowerCase()),
        );
      }

      return filteredTeams;
    },
    [genderFilter, courseFilter, teamFilter, tableKey],
  );

  const topContent = useMemo(
    function () {
      function onGenderFilterChange(value: string): void {
        setGenderFilter(value);
      }

      function onCourseFilterChange(value: string): void {
        setCourseFilter(value);
      }

      return (
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <StyledInput
            placeholder="Filter school..."
            value={teamFilter}
            onValueChange={setTeamFilter}
            textFieldClassName="basis-2/5"
            fillVertically={true}
            isPrimary={false}
          />
          <div className="flex basis-3/5 gap-2">
            <StyledSelect
              selectedKey={genderFilter}
              onChange={onGenderFilterChange}
              label="Gender"
              selectClassName="basis-1/3"
              options={genderOptions}
              isPrimary={false}
            />
            <StyledSelect
              selectedKey={courseFilter}
              onChange={onCourseFilterChange}
              label="Course"
              selectClassName="basis-2/3"
              options={courseOptions}
              isPrimary={false}
            />
          </div>
        </div>
      );
    },
    [genderFilter, courseFilter, teamFilter],
  );

  return (
    <DynamicTable
      tableKey={tableKey}
      topContent={topContent}
      columns={columns}
      ariaLabel={`${pages.allTimeLists.menuLabel} - Teams`}
    >
      <Table.Body items={filteredItems} renderEmptyState={() => <TableEmptyState />}>
        {(item) => (
          <Table.Row id={item.key}>
            <StyledTableCell>{item.place}</StyledTableCell>
            <StyledTableCell>{item.team}</StyledTableCell>
            <StyledTableCell>{item.time}</StyledTableCell>
            <StyledTableCell>{item.year}</StyledTableCell>
            <StyledTableCell>{item.course}</StyledTableCell>
          </Table.Row>
        )}
      </Table.Body>
    </DynamicTable>
  );
}
