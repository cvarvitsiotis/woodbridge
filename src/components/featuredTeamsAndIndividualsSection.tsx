"use client";

import { getParagraphStyle, getSubheaderStyle } from "@/styles/styles";
import { FeaturedIndividualType, FeaturedTeamType } from "@/types";
import { getKeyValue, Table } from "@heroui/react";
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
                <Table.Column key={column.key} align={column.key === "state" ? "center" : "start"}>
                  {column.label}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={teams}>
              {(item) => (
                <Table.Row key={item.id}>
                  {(columnKey) => <Table.Cell>{getKeyValue(item, columnKey)}</Table.Cell>}
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
                <Table.Column key={column.key} align={column.key === "teamState" ? "center" : "start"}>
                  {column.label}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={individuals}>
              {(item) => (
                <Table.Row key={item.id}>
                  {(columnKey) => <Table.Cell>{getKeyValue(item, columnKey)}</Table.Cell>}
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
          <p>Entries coming soon. Check back on Tuesday, September 2.</p>
        </div>
      )}
    </>
  );
}
