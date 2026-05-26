"use client";

import { getParagraphStyle, getSubheaderStyle } from "@/styles/styles";
import { FeaturedIndividualType, FeaturedTeamType } from "@/types";
import { Table } from "@heroui/react";
import clsx from "clsx";
import StyledTableCell from "./styledTableCell";

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
      <div className="text-center">{header}</div>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label={`${sectionDescription} ${header}`}>
            <Table.Header columns={teamColumns}>
              {(column) => (
                <Table.Column id={column.key} isRowHeader={column.key === "name"}>
                  {column.label}
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
                <Table.Column id={column.key} isRowHeader={column.key === "name"}>
                  {column.label}
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
