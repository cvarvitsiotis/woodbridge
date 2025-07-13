"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";

import {
  scheduleLevelGenderToken,
  scheduleLevelSweepstakesNameToken,
  sweepstakesLevelName,
} from "@/config/races";
import { RaceType } from "@/types";
import Divisions from "@/components/divisions";
import { pages } from "@/config/site";
import { fontSerif } from "@/styles/fonts";
import clsx from "clsx";

const columns = [
  {
    key: "time",
    label: "Time",
  },
  {
    key: "division",
    label: "Division",
  },
  {
    key: "description",
    label: "Race",
  },
];

const featuredColumns = columns.filter((column) => column.key !== "division");

function FeaturedTableHeader() {
  return (
    <div className={clsx("text-center text-2xl font-medium", fontSerif.className)}>
      Featured Races
    </div>
  );
}

function getDescription(race: RaceType): string {
  if (race.level.scheduleFormat) {
    return race.level.scheduleFormat
      .replace(scheduleLevelGenderToken, race.gender)
      .replace(scheduleLevelSweepstakesNameToken, sweepstakesLevelName[race.gender]);
  }

  const heat = race.heat ? ` - ${race.heat}` : "";
  return `${race.level.level} ${race.gender}${heat}`;
}

export default function RacesTable({
  races,
  isFeatured,
}: {
  races: RaceType[];
  isFeatured?: boolean;
}) {
  return (
    <Table
      isCompact
      hideHeader={isFeatured}
      topContent={isFeatured && <FeaturedTableHeader />}
      topContentPlacement={isFeatured ? "inside" : "outside"}
      aria-label={pages.schedule.menuLabel}
    >
      <TableHeader columns={isFeatured ? featuredColumns : columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={races}>
        {(item) => (
          <TableRow key={item.num}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "division" ? (
                  <Divisions divisions={item.divisions} />
                ) : columnKey === "description" ? (
                  getDescription(item)
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
