"use client";

import { ColumnProps } from "react-aria-components/Table";
import { TeamResultType } from "@/types";
import StyledTableCell from "./styledTableCell";
import { ReactNode } from "react";
import { Table } from "@heroui/react";
import { pages } from "@/config/site";

const teamResultsColumns: ColumnProps[] = [
  { id: "place", textValue: "Place" },
  { id: "team", textValue: "Team", isRowHeader: true },
  { id: "score", textValue: "Score" },
  { id: "scoringTime", textValue: "Time" },
  { id: "averageTime", textValue: "Average Time" },
  { id: "spread", textValue: "Spread" },
  { id: "individualActualPlaces", textValue: "Actual Order" },
  { id: "individualScoringPlaces", textValue: "Scoring Order" },
];

const scoreColumnIds = ["score", "individualActualPlaces", "individualScoringPlaces"];

function TeamResultsTable({
  teamResults,
  isOverall,
  isRaceResults,
}: {
  teamResults: TeamResultType[];
  isOverall: boolean;
  isRaceResults: boolean;
}) {
  const columns = teamResultsColumns.filter(
    (column) => !isOverall || !scoreColumnIds.includes(String(column.id)),
  );

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label={isRaceResults ? pages.raceResults.menuLabel : pages.timing.menuLabel}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                {isRaceResults && column.id === "team" ? "School" : column.textValue}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={teamResults}>
            {(teamResult) => (
              <Table.Row id={teamResult.team}>
                <StyledTableCell>{teamResult.place}</StyledTableCell>
                <StyledTableCell>{teamResult.team}</StyledTableCell>
                {!isOverall && <StyledTableCell>{teamResult.score}</StyledTableCell>}
                <StyledTableCell>{teamResult.scoringTimeStr}</StyledTableCell>
                <StyledTableCell>{teamResult.averageTimeStr}</StyledTableCell>
                <StyledTableCell>{teamResult.spreadTimeStr}</StyledTableCell>
                {!isOverall && (
                  <TeamResultIndividualPlacesTableCell
                    teamResult={teamResult}
                    useScoringPlace={false}
                  />
                )}
                {!isOverall && (
                  <TeamResultIndividualPlacesTableCell
                    teamResult={teamResult}
                    useScoringPlace={true}
                  />
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

function TeamResultIndividualPlacesTableCell({
  teamResult,
  useScoringPlace,
}: {
  teamResult: TeamResultType;
  useScoringPlace: boolean;
}) {
  const isScoringTeam = teamResult.score !== undefined;
  const shownIndividualResults = isScoringTeam
    ? teamResult.individualResults.filter(
        (individualResult) => individualResult.scoringPlace !== undefined,
      )
    : teamResult.individualResults;
  const hasCollapsedRunners =
    !useScoringPlace && shownIndividualResults.length < teamResult.individualResults.length;

  return (
    <StyledTableCell>
      <div className="flex">
        {shownIndividualResults.map((individualResult) => {
          const place = useScoringPlace ? individualResult.scoringPlace : individualResult.place;
          if (!place) return null;
          return (
            <TeamResultIndividualsTableCellItem
              key={`${teamResult.team}-${useScoringPlace}-${place}`}
            >
              {place}
            </TeamResultIndividualsTableCellItem>
          );
        })}
        {hasCollapsedRunners && (
          <TeamResultIndividualsTableCellItem>...</TeamResultIndividualsTableCellItem>
        )}
      </div>
    </StyledTableCell>
  );
}

function TeamResultIndividualsTableCellItem({ children }: { children: ReactNode }) {
  return <div className="-me-px w-9 border-r border-l text-center">{children}</div>;
}

export default function TeamResultsTableWrapper({
  teamResults,
  isOverall = false,
  isRaceResults = false,
}: {
  teamResults: TeamResultType[];
  isOverall?: boolean;
  isRaceResults?: boolean;
}) {
  if (!teamResults || teamResults.length === 0) return null;
  return (
    <TeamResultsTable
      teamResults={teamResults}
      isOverall={isOverall}
      isRaceResults={isRaceResults}
    />
  );
}
