"use client";

import { useMemo, useState } from "react";
import { getKeyValue, Table } from "@heroui/react";
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
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <StyledInput
            placeholder="Filter school..."
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
    <Table key={tableKey}>
      {topContent}
      <Table.ScrollContainer>
        <Table.Content aria-label={`${pages.allTimeLists.menuLabel} - Teams`}>
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.key} align={column.key === "year" ? "center" : "start"}>
                {column.label}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={filteredItems}>
            {(item) => (
              <Table.Row key={item.key}>
                {(columnKey) => <Table.Cell>{getKeyValue(item, columnKey)}</Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
