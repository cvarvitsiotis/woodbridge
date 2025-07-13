"use client";

import { useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { getKeyValue } from "@heroui/table";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { pages } from "@/config/site";
import { allTimeTeams } from "@/config/allTimeTeams";
import StyledSelect from "./styledSelect";
import StyledInput from "./styledInput";

const columns = [
  { key: "place", label: "Place" },
  { key: "team", label: "School" },
  { key: "time", label: "Time" },
  { key: "year", label: "Year" },
  { key: "course", label: "Course" },
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

  const windowDimensions = useWindowDimensions();
  const maxTableHeight =
    windowDimensions.height !== undefined ? windowDimensions.height * 0.7 : 300;

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
      function onGenderFilterChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        setGenderFilter(() => event.target.value);
      }

      function onCourseFilterChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        setCourseFilter(() => event.target.value);
      }

      return (
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <StyledInput
            placeholder="Search by school..."
            value={teamFilter}
            onValueChange={setTeamFilter}
            className="basis-2/5"
          />
          <div className="flex basis-3/5 gap-3">
            <StyledSelect
              selectedKey={genderFilter}
              onChange={onGenderFilterChange}
              label="Gender"
              className="basis-1/3"
              options={genderOptions}
            />
            <StyledSelect
              selectedKey={courseFilter}
              onChange={onCourseFilterChange}
              label="Course"
              className="basis-2/3"
              options={courseOptions}
            />
          </div>
        </div>
      );
    },
    [genderFilter, courseFilter, teamFilter],
  );

  return (
    <Table
      isCompact
      isHeaderSticky
      isVirtualized
      maxTableHeight={maxTableHeight}
      aria-label={`${pages.allTimeLists.menuLabel} - Teams`}
      topContent={topContent}
      topContentPlacement="outside"
      classNames={{ wrapper: "p-2", td: "px-1" }}
      key={tableKey} //to force rerender - bug was preventing
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} align={column.key === "year" ? "center" : "start"}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={filteredItems}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
