"use client";

import { Table } from "@heroui/react";
import { getKeyValue } from "@/utils/table";

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
    <Table>
      {isFeatured && <FeaturedTableHeader />}
      <Table.ScrollContainer>
        <Table.Content aria-label={pages.schedule.menuLabel}>
          {!isFeatured && (
            <Table.Header columns={columns}>
              {(column) => <Table.Column key={column.key}>{column.label}</Table.Column>}
            </Table.Header>
          )}
          {isFeatured && (
            <Table.Header columns={featuredColumns}>
              {(column) => <Table.Column key={column.key}>{column.label}</Table.Column>}
            </Table.Header>
          )}
          <Table.Body items={races}>
            {(item) => (
              <Table.Row key={item.num}>
                {(columnKey) => (
                  <Table.Cell>
                    {String(columnKey) === "division" ? (
                      <Divisions divisions={item.divisions} />
                    ) : String(columnKey) === "description" ? (
                      getDescription(item)
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
