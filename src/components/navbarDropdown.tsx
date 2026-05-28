"use client";

import { Dropdown, Button, Label } from "@heroui/react";
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
    <Button
      className={clsx(
        "bg-transparent p-0 text-lg font-normal",
        isHomePage && !isMenu && siteConfig.showAmbientVideo && "text-white",
      )}
      variant="ghost"
    >
      {pageParent}
      <ChevronDown fill="currentColor" size={16} />
    </Button>
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
    <li>
      <Dropdown>
        <NavbarDropdownTrigger isMenu={isMenu} pageParent={pageParent} isHomePage={isHomePage} />
        <Dropdown.Popover className="max-w-full">
          <Dropdown.Menu onAction={onAction}>
            {pageItems.map((page) => (
              <Dropdown.Item
                key={page.path}
                id={page.path}
                href={page.path}
                textValue={page.menuLabel}
              >
                <div className={clsx(pathname === page.path && "text-accent")}>
                  <DropdownItemIcon page={page} />
                </div>
                <Label
                  className={clsx("text-lg font-normal", pathname === page.path && "text-accent")}
                >
                  {page.menuLabel}
                </Label>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </li>
  );
}
