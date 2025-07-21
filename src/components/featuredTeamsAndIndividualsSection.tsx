"use client";

import { getSubheaderStyle } from "@/styles/styles";
import { FeaturedIndividualType, FeaturedTeamType } from "@/types";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import clsx from "clsx";

const teamColumns = [
  {
    key: "name",
    label: "School",
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

const individualColumns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "grade",
    label: "Grade",
  },
  {
    key: "teamName",
    label: "School",
  },
  {
    key: "teamCity",
    label: "City",
  },
  {
    key: "teamState",
    label: "State",
  },
];

function TeamsSection({
  sectionDescription,
  teams,
}: {
  sectionDescription: string;
  teams: FeaturedTeamType[];
}) {
  const header = "TEAMS";
  return (
    <div className="min-w-[40%] space-y-3">
      <div className="text-center text-sm font-light sm:text-base">{header}</div>
      <Table
        isCompact
        classNames={{ wrapper: "p-2", td: "px-1" }}
        aria-label={`${sectionDescription} ${header}`}
      >
        <TableHeader columns={teamColumns}>
          {(column) => (
            <TableColumn key={column.key} align={column.key === "state" ? "center" : "start"}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={teams}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function IndividualsSection({
  sectionDescription,
  individuals,
}: {
  sectionDescription: string;
  individuals: FeaturedIndividualType[];
}) {
  const header = "INDIVIDUALS";
  return (
    <div className="min-w-[55%] space-y-3">
      <div className="text-center text-sm font-light sm:text-base">INDIVIDUALS</div>
      <Table
        isCompact
        classNames={{ wrapper: "p-2", td: "px-1" }}
        aria-label={`${sectionDescription} ${header}`}
      >
        <TableHeader columns={individualColumns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "grade" || column.key === "schoolState" ? "center" : "start"}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={individuals}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function FeaturedTeamsAndIndividualsSection({
  sectionDescription,
  teams,
  individuals,
}: {
  sectionDescription: string;
  teams: FeaturedTeamType[];
  individuals: FeaturedIndividualType[];
}) {
  return (
    <>
      <h1 className={clsx("pt-10", getSubheaderStyle())}>{sectionDescription}</h1>
      <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-8">
        <TeamsSection sectionDescription={sectionDescription} teams={teams} />
        <IndividualsSection sectionDescription={sectionDescription} individuals={individuals} />
      </div>
    </>
  );
}
