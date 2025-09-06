import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface DivisionType {
  num: number;
  numRoman: string;
  name: string;
}

export interface DivisionsType {
  [key: string]: DivisionType;
}

export interface RaceType {
  num: number;
  time: string;
  divisions?: DivisionType[];
  level: LevelType;
  heat?: string;
  gender: string;
}

export interface LevelType {
  level: string;
  scheduleFormat?: string;
  resultSpan2?: boolean;
  isIndivOnly?: boolean;
  resultLink: string;
  resultOrder: number;
}

export interface LevelsType {
  [key: string]: LevelType;
}

export interface PageType {
  menuLabel: string;
  pageLabel?: string;
  path: string;
  parent?: string;
}

export interface PagesType {
  [key: string]: PageType;
}

export interface ParticipatingTeamType {
  id: number;
  name: string;
  raceDay: string;
  division?: DivisionType;
  varsityHeat?: string;
  city: string;
  state: string;
}

export interface FeaturedTeamType {
  id: number;
  name: string;
  city: string;
  state: string;
  level: LevelType;
  gender: string;
}

export interface FeaturedIndividualType {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  teamName: string;
  teamCity: string;
  teamState: string;
  level: LevelType;
  gender: string;
}

export interface AllTimeIndividualType {
  id: number;
  key?: string;
  place?: number;
  name: string;
  normalizedTime: string;
  firstName: string;
  lastName: string;
  gender: string;
  grade: string;
  team: string;
  time: string;
  year: string;
  course: string;
}

export interface AllTimeTeamType {
  id: number;
  key?: string;
  place?: number;
  normalizedTime: string;
  gender: string;
  team: string;
  time: string;
  year: string;
  course: string;
}

export interface LinkType {
  url: string;
  description: string;
}

export interface ParkingInstructionType {
  accordionTitle?: string;
  description: string;
  location: string;
  includeWaypoint: boolean;
  modalLinkLabel: string;
  modalTitle: string;
}

export interface ParkingInstructionTypes {
  [key: string]: ParkingInstructionType;
}
