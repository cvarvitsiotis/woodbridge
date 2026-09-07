"use client";

import { Table } from "@heroui/react";

import {
  scheduleLevelGenderToken,
  scheduleLevelSweepstakesNameToken,
  sweepstakesLevelName,
} from "@/config/races";
import { RaceType } from "@/types";
import Divisions from "@/components/divisions";
import { pages } from "@/config/site";
import StyledTableCell from "./styledTableCell";
import { ColumnProps } from "react-aria-components/Table";
import clsx from "clsx";

const columns: ColumnProps[] = [
  { id: "num", textValue: "Num", isRowHeader: true },
  { id: "time", textValue: "Time" },
  { id: "division", textValue: "Division" },
  { id: "description", textValue: "Race" },
];

const featuredColumns = columns.filter((column) => column.id !== "division");

function getColumnInlinePadding(isNum: boolean) {
  return clsx(isNum ? "px-2" : "px-3", "lg:px-4");
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
  {
    return (
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label={pages.schedule.menuLabel}>
            <Table.Header columns={isFeatured ? featuredColumns : columns}>
              {(column) => (
                <Table.Column
                  id={column.id}
                  isRowHeader={column.isRowHeader}
                  className={getColumnInlinePadding(column.id === "num")}
                >
                  {column.textValue}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={races}>
              {(item) => (
                <Table.Row id={item.num}>
                  <StyledTableCell className={getColumnInlinePadding(true)}>
                    {item.num}
                  </StyledTableCell>
                  <StyledTableCell className={getColumnInlinePadding(false)}>
                    {item.time}
                  </StyledTableCell>
                  {!isFeatured && (
                    <StyledTableCell className={getColumnInlinePadding(false)}>
                      <Divisions divisions={item.divisions} />
                    </StyledTableCell>
                  )}
                  <StyledTableCell className={getColumnInlinePadding(false)}>
                    {getDescription(item)}
                  </StyledTableCell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    );
  }
}
