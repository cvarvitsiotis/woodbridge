"use client";

import React from "react";
import { NavbarItem, NavbarMenuItem } from "@heroui/navbar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { usePathname } from "next/navigation";

import {
  ChevronDown,
  CrownIcon,
  HandshakeIcon,
  FormatListBulletedIcon,
  HotelIcon,
  MapIcon,
  VideoLibraryIcon,
  WavingHandIcon,
  OverviewIcon,
  RouteIcon,
  LiveTvIcon,
  GroupIcon,
  VerifiedIcon,
  StepIcon,
  LocalAtmIcon,
  ChatInfoIcon,
  HowToRegIcon,
  ApparelIcon,
} from "./icons";

import { PageType } from "@/types";
import { pages } from "@/config/site";
import clsx from "clsx";

function DropdownItemIcon({ page }: { page: PageType }) {
  return page === pages.coachesIntro ? (
    <StepIcon />
  ) : page === pages.registration ? (
    <HowToRegIcon />
  ) : page === pages.entryFees ? (
    <LocalAtmIcon />
  ) : page === pages.raceDayInfo ? (
    <ChatInfoIcon />
  ) : page === pages.preOrderTShirts ? (
    <ApparelIcon />
  ) : page === pages.schedule ? (
    <OverviewIcon />
  ) : page === pages.courseAndVenueMap ? (
    <RouteIcon />
  ) : page === pages.courseAerialTour ? (
    <LiveTvIcon />
  ) : page === pages.participatingTeams ? (
    <GroupIcon />
  ) : page === pages.featuredEntries ? (
    <VerifiedIcon />
  ) : page === pages.welcome ? (
    <WavingHandIcon />
  ) : page === pages.sponsors ? (
    <HandshakeIcon />
  ) : page === pages.galleries ? (
    <VideoLibraryIcon />
  ) : page === pages.hotels ? (
    <HotelIcon />
  ) : page === pages.parkingAndDirections ? (
    <MapIcon />
  ) : page === pages.raceResults ? (
    <FormatListBulletedIcon />
  ) : page === pages.allTimeLists ? (
    <CrownIcon />
  ) : null;
}

function NavbarDropdownTrigger({ pageParent }: { pageParent: string }) {
  return (
    <DropdownTrigger>
      <Button
        disableRipple
        className="bg-transparent p-0 text-lg data-[hover=true]:bg-transparent"
        endContent={<ChevronDown fill="currentColor" size={16} />}
        radius="sm"
        variant="light"
      >
        {pageParent}
      </Button>
    </DropdownTrigger>
  );
}

export default function NavbarDropdown({
  isMenu,
  pageParent,
  pages,
  onAction,
}: {
  isMenu?: boolean;
  pageParent: string;
  pages: PageType[];
  onAction: () => void;
}) {
  const pathname = usePathname();

  return (
    <Dropdown>
      {isMenu ? (
        <NavbarMenuItem>
          <NavbarDropdownTrigger pageParent={pageParent} />
        </NavbarMenuItem>
      ) : (
        <NavbarItem>
          <NavbarDropdownTrigger pageParent={pageParent} />
        </NavbarItem>
      )}
      <DropdownMenu onAction={onAction}>
        {pages.map((page) => (
          <DropdownItem
            key={page.path}
            href={page.path}
            startContent={
              <div className={clsx(pathname === page.path && "text-primary")}>
                <DropdownItemIcon page={page} />
              </div>
            }
            classNames={{
              title: clsx("text-lg font-normal", pathname === page.path && "text-primary"),
            }}
          >
            {page.menuLabel}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
