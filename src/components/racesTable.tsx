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
                <Table.Column id={column.key} isRowHeader={column.key === "time"}>
                  {column.label}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={races}>
              {(item) => (
                <Table.Row id={item.num}>
                  <StyledTableCell>{item.time}</StyledTableCell>
                  {!isFeatured && (
                    <StyledTableCell>
                      <Divisions divisions={item.divisions} />
                    </StyledTableCell>
                  )}
                  <StyledTableCell>{getDescription(item)}</StyledTableCell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    );
  }
}
