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
  HelpClinicIcon,
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
import { pages, siteConfig } from "@/config/site";
import clsx from "clsx";

function DropdownItemIcon({ page }: { page: PageType }) {
  return page === pages.coachesIntro ? (
    <StepIcon />
  ) : page === pages.registration ? (
    <HowToRegIcon />
  ) : page === pages.entryFees ? (
    <LocalAtmIcon />
  ) : page === pages.preOrderTShirts ? (
    <ApparelIcon />
  ) : page === pages.raceDayInfo ? (
    <ChatInfoIcon />
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
  ) : page === pages.about ? (
    <HelpClinicIcon />
  ) : page === pages.partners ? (
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

function NavbarDropdownTrigger({
  isMenu,
  pageParent,
  isHomePage,
}: {
  isMenu: boolean;
  pageParent: string;
  isHomePage: boolean;
}) {
  return (
    <DropdownTrigger>
      <Button
        disableRipple
        className={clsx(
          "bg-transparent p-0 text-lg data-[hover=true]:bg-transparent",
          isHomePage && !isMenu && siteConfig.showAmbientVideo && "text-white",
        )}
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
  pageItems,
  onAction,
}: {
  isMenu: boolean;
  pageParent: string;
  pageItems: PageType[];
  onAction: () => void;
}) {
  const pathname = usePathname();

  const isHomePage = pathname === pages.home.path;

  return (
    <Dropdown>
      {isMenu ? (
        <NavbarMenuItem>
          <NavbarDropdownTrigger isMenu={isMenu} pageParent={pageParent} isHomePage={isHomePage} />
        </NavbarMenuItem>
      ) : (
        <NavbarItem>
          <NavbarDropdownTrigger isMenu={isMenu} pageParent={pageParent} isHomePage={isHomePage} />
        </NavbarItem>
      )}
      <DropdownMenu onAction={onAction}>
        {pageItems.map((page) => (
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
