"use client";

import { getParagraphStyle, getSubheaderStyle } from "@/styles/styles";
import { FeaturedIndividualType, FeaturedTeamType } from "@/types";
import { Table } from "@heroui/react";
import clsx from "clsx";
import StyledTableCell from "./styledTableCell";
import { ColumnProps } from "react-aria-components/Table";

const teamColumns: ColumnProps[] = [
  { id: "name", textValue: "School", isRowHeader: true },
  { id: "city", textValue: "City" },
  { id: "state", textValue: "State" },
];

const individualColumns: ColumnProps[] = [
  { id: "name", textValue: "Name", isRowHeader: true },
  { id: "teamName", textValue: "School" },
  { id: "teamCity", textValue: "City" },
  { id: "teamState", textValue: "State" },
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
      <div className="text-center">{header}</div>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label={`${sectionDescription} ${header}`}>
            <Table.Header columns={teamColumns}>
              {(column) => (
                <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                  {column.textValue}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={teams}>
              {(item) => (
                <Table.Row id={item.id}>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>{item.city}</StyledTableCell>
                  <StyledTableCell>{item.state}</StyledTableCell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
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
      <div className="text-center">INDIVIDUALS</div>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label={`${sectionDescription} ${header}`}>
            <Table.Header columns={individualColumns}>
              {(column) => (
                <Table.Column id={column.id} isRowHeader={column.isRowHeader}>
                  {column.textValue}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={individuals}>
              {(item) => (
                <Table.Row id={item.id}>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>{item.teamName}</StyledTableCell>
                  <StyledTableCell>{item.teamCity}</StyledTableCell>
                  <StyledTableCell>{item.teamState}</StyledTableCell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
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
  individuals?: FeaturedIndividualType[];
}) {
  return (
    <>
      <h1 className={clsx("pt-10", getSubheaderStyle())}>{sectionDescription}</h1>
      {teams?.length ? (
        <div
          className={clsx(
            "flex flex-wrap items-start justify-center gap-x-5 gap-y-8 sm:justify-start sm:pl-8",
          )}
        >
          <TeamsSection sectionDescription={sectionDescription} teams={teams} />
          {individuals && (
            <IndividualsSection sectionDescription={sectionDescription} individuals={individuals} />
          )}
        </div>
      ) : (
        <div className={clsx("pl-8", getParagraphStyle(true))}>
          <p>Entries coming soon</p>
        </div>
      )}
    </>
  );
}
