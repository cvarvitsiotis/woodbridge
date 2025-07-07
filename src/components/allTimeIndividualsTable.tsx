"use client";

import { useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { getKeyValue } from "@heroui/table";
import { Input } from "@heroui/input";
import { allTimeIndividuals } from "@/config/allTimeIndividuals";
import { Select, SelectItem } from "@heroui/select";
import { SearchIcon } from "@/components/icons";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { pages } from "@/config/site";

const columns = [
  { key: "place", label: "Place" },
  { key: "name", label: "Name" },
  { key: "team", label: "School" },
  { key: "time", label: "Time" },
  { key: "grade", label: "Grade" },
  { key: "year", label: "Year" },
  { key: "course", label: "Course" },
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

  const windowDimensions = useWindowDimensions();
  const maxTableHeight =
    windowDimensions.height !== undefined ? windowDimensions.height * 0.7 : 300;

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

      return filteredIndividuals;
    },
    [genderFilter, gradeFilter, courseFilter, nameFilter, tableKey],
  );

  const topContent = useMemo(
    function () {
      function onGenderFilterChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        setGenderFilter(() => event.target.value);
      }

      function onGradeFilterChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        setGradeFilter(() => event.target.value);
      }

      function onCourseFilterChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        setCourseFilter(() => event.target.value);
      }

      return (
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <Input
            isClearable
            placeholder="Search by name..."
            startContent={<SearchIcon className="text-default-400" />}
            variant="faded"
            radius="sm"
            value={nameFilter}
            onClear={() => setNameFilter("")}
            onValueChange={setNameFilter}
            className="basis-2/5"
            classNames={{
              inputWrapper: "min-h-12 h-12",
            }}
          />
          <div className="flex basis-3/5 gap-3">
            <Select
              selectedKeys={[genderFilter]}
              size="sm"
              onChange={onGenderFilterChange}
              label="Gender"
              variant="faded"
            >
              {genderOptions.map((gender) => (
                <SelectItem key={gender}>{gender}</SelectItem>
              ))}
            </Select>
            <Select
              selectedKeys={[gradeFilter]}
              size="sm"
              onChange={onGradeFilterChange}
              label="Grade"
              variant="faded"
            >
              {gradeOptions.map((grade) => (
                <SelectItem key={grade}>{grade}</SelectItem>
              ))}
            </Select>
            <Select
              selectedKeys={[courseFilter]}
              size="sm"
              onChange={onCourseFilterChange}
              label="Course"
              variant="faded"
            >
              {courseOptions.map((course) => (
                <SelectItem key={course}>{course}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      );
    },
    [genderFilter, gradeFilter, courseFilter, nameFilter],
  );

  return (
    <Table
      isCompact
      isHeaderSticky
      isVirtualized
      maxTableHeight={maxTableHeight}
      aria-label={`${pages.allTimeLists.menuLabel} - Individuals`}
      topContent={topContent}
      topContentPlacement="outside"
      classNames={{ wrapper: "p-2", td: "px-1" }}
      key={tableKey} //to force rerender - bug was preventing
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "grade" || column.key === "year" ? "center" : "start"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={filteredItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
