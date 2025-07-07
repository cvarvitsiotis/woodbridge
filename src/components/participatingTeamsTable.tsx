"use client";

import { participatingTeams } from "@/config/participatingTeams";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import Divisions, { Division } from "@/components/divisions";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { divisions, heats } from "@/config/races";
import { Select, SelectItem } from "@heroui/select";
import { SearchIcon } from "@/components/icons";
import { Input } from "@heroui/input";
import { useMemo, useState } from "react";
import { pages } from "@/config/site";

const columns = [
  {
    key: "name",
    label: "School",
  },
  {
    key: "raceDay",
    label: "Race Day",
  },
  {
    key: "division",
    label: "Division",
  },
  {
    key: "varsityHeat",
    label: "Varsity Heat",
  },
  {
    key: "city",
    label: "City",
  },
  {
    key: "state",
    label: "State",
  },
];

const divisionOptions = [{ num: 0, numRoman: "0", name: "All" }, ...Object.values(divisions)];
const heatOptions = ["All", ...Object.values(heats)];

export default function ParticipatingTeamsTable() {
  const [divisionFilter, setDivisionFilter] = useState("All");
  const [varsityHeatFilter, setVarsityHeatFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("");

  const windowDimensions = useWindowDimensions();
  const maxTableHeight =
    windowDimensions.height !== undefined ? windowDimensions.height * 0.7 : 300;

  const tableKey = `${divisionFilter}_${varsityHeatFilter}`;

  const filteredItems = useMemo(
    function () {
      let filteredTeams = [...participatingTeams];

      if (divisionFilter !== "All") {
        filteredTeams = filteredTeams.filter((team) => team.division?.name === divisionFilter);
      }

      if (varsityHeatFilter !== "All") {
        filteredTeams = filteredTeams.filter((team) => team.varsityHeat === varsityHeatFilter);
      }

      if (teamFilter) {
        filteredTeams = filteredTeams.filter((team) =>
          team.name.toLowerCase().includes(teamFilter.toLowerCase()),
        );
      }

      return filteredTeams;
    },
    [divisionFilter, varsityHeatFilter, teamFilter],
  );

  const getTopContent = useMemo(
    function () {
      function onDivisionFilterChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        setDivisionFilter(() => event.target.value);
      }
      function onVarsityHeatFilterChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        setVarsityHeatFilter(() => event.target.value);
      }
      return (
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <Input
            isClearable
            placeholder="Search by school..."
            startContent={<SearchIcon className="text-default-400" />}
            variant="faded"
            radius="sm"
            value={teamFilter}
            onClear={() => setTeamFilter("")}
            onValueChange={setTeamFilter}
            className="basis-2/5"
            classNames={{
              inputWrapper: "min-h-12 h-12",
            }}
          />
          <div className="flex basis-3/5 gap-3">
            <Select
              selectedKeys={[divisionFilter]}
              size="sm"
              onChange={onDivisionFilterChange}
              label="Division"
              variant="faded"
            >
              {divisionOptions.map((division) => (
                <SelectItem key={division.name} textValue={division.name}>
                  <Division division={division} />
                </SelectItem>
              ))}
            </Select>
            <Select
              selectedKeys={[varsityHeatFilter]}
              size="sm"
              onChange={onVarsityHeatFilterChange}
              label="Varsity Heat"
              variant="faded"
            >
              {heatOptions.map((heat) => (
                <SelectItem key={heat}>{heat}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      );
    },
    [teamFilter, divisionFilter, varsityHeatFilter],
  );

  return (
    <Table
      isCompact
      isHeaderSticky
      isVirtualized
      maxTableHeight={maxTableHeight}
      aria-label={pages.participatingTeams.menuLabel}
      topContent={getTopContent}
      topContentPlacement="outside"
      classNames={{ base: "pt-10", wrapper: "p-2", td: "px-1" }}
      key={tableKey} //to force rerender - bug was preventing
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "varsityHeat" || column.key === "state" ? "center" : "start"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={filteredItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "division" ? (
                  <Divisions divisions={item.division ? [item.division] : []} />
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
