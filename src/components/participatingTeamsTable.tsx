"use client";

import { participatingTeams } from "@/config/participatingTeams";
import { Table } from "@heroui/react";
import Divisions from "@/components/divisions";
import { divisions, heats } from "@/config/races";
import { useMemo, useState } from "react";
import { pages } from "@/config/site";
import StyledSelect from "@/components/styledSelect";
import StyledInput from "@/components/styledInput";
import StyledTableCell from "./styledTableCell";
import DynamicTable, { TableEmptyState } from "./dynamicTable";

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

  const topContent = useMemo(
    function () {
      function onDivisionFilterChange(value: string): void {
        setDivisionFilter(value);
      }
      function onVarsityHeatFilterChange(value: string): void {
        setVarsityHeatFilter(value);
      }
      return (
        <div className="flex flex-col justify-between gap-2 pt-3 sm:flex-row">
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
              selectedKey={divisionFilter}
              onChange={onDivisionFilterChange}
              label="Division"
              options={divisionOptions.map((division) => division.name)}
              isPrimary={false}
            />
            <StyledSelect
              selectedKey={varsityHeatFilter}
              onChange={onVarsityHeatFilterChange}
              label="Varsity Heat"
              options={heatOptions}
              isPrimary={false}
            />
          </div>
        </div>
      );
    },
    [teamFilter, divisionFilter, varsityHeatFilter],
  );

  return (
    <DynamicTable
      tableKey={tableKey}
      topContent={topContent}
      columns={columns}
      isRowHeaderColumn="name"
      ariaLabel={pages.participatingTeams.menuLabel}
    >
      <Table.Body items={filteredItems} renderEmptyState={() => <TableEmptyState />}>
        {(item) => (
          <Table.Row id={item.id}>
            <StyledTableCell>{item.name}</StyledTableCell>
            <StyledTableCell>{item.raceDay}</StyledTableCell>
            <StyledTableCell>
              <Divisions divisions={item.division ? [item.division] : []} />
            </StyledTableCell>
            <StyledTableCell>{item.varsityHeat}</StyledTableCell>
            <StyledTableCell>{item.city}</StyledTableCell>
            <StyledTableCell>{item.state}</StyledTableCell>
          </Table.Row>
        )}
      </Table.Body>
    </DynamicTable>
  );
}
