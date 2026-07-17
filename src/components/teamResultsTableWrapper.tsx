import { ColumnProps } from "react-aria-components/Table";
import { TeamResultType } from "@/types";
import StyledTableCell from "./styledTableCell";
import { ReactNode } from "react";
import { Table } from "@heroui/react";
import { pages } from "@/config/site";

const teamResultsColumns: ColumnProps[] = [
  { id: "rank", textValue: "Rank" },
  { id: "team", textValue: "Team", isRowHeader: true },
  { id: "score", textValue: "Score" },
  { id: "scoringTime", textValue: "Time" },
  { id: "averageTime", textValue: "Average Time" },
  { id: "spread", textValue: "Spread" },
  { id: "individualActualPlaces", textValue: "Actual Order" },
  { id: "individualScoringPlaces", textValue: "Scoring Order" },
];

function TeamResultsTable({ teamResults }: { teamResults: TeamResultType[] }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label={pages.timing.menuLabel}>
          <Table.Header columns={teamResultsColumns}>
            {(column) => (
              <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                {column.textValue}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={teamResults}>
            {(teamResult) => (
              <Table.Row id={teamResult.team}>
                <StyledTableCell>{teamResult.rank}</StyledTableCell>
                <StyledTableCell>{teamResult.team}</StyledTableCell>
                <StyledTableCell>{teamResult.score}</StyledTableCell>
                <StyledTableCell>{teamResult.scoringTimeStr}</StyledTableCell>
                <StyledTableCell>{teamResult.averageTimeStr}</StyledTableCell>
                <StyledTableCell>{teamResult.spreadTimeStr}</StyledTableCell>
                <TeamResultIndividualPlacesTableCell
                  teamResult={teamResult}
                  useScoringPlace={false}
                />
                <TeamResultIndividualPlacesTableCell
                  teamResult={teamResult}
                  useScoringPlace={true}
                />
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
  return (
    <StyledTableCell>
      <div className="flex">
        {teamResult.individualResults.map((individualResult) => {
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
      </div>
    </StyledTableCell>
  );
}

function TeamResultIndividualsTableCellItem({ children }: { children: ReactNode }) {
  return <div className="-me-px w-9 border-r border-l text-center">{children}</div>;
}

export default function TeamResultsTableWrapper({
  teamResults,
}: {
  teamResults: TeamResultType[];
}) {
  if (!teamResults || teamResults.length === 0) return null;
  return (
    <div className="space-y-2">
      <p>Team Results:</p>
      <TeamResultsTable teamResults={teamResults} />
    </div>
  );
}
