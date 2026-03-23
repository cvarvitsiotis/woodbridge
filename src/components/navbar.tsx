"use client";

import { useState } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import NavbarDropdown from "./navbarDropdown";

import { pages, pageParents, siteConfig } from "@/config/site";
import { XIcon, InstagramIcon } from "@/components/icons";
import { urls } from "@/config/data";

function Menus({
  isMenu,
  pathname,
  isHomePage,
  handleMenuAction,
}: {
  isMenu: boolean;
  pathname: string;
  isHomePage: boolean;
  handleMenuAction: () => void;
}) {
  return (
    <>
      <NavbarDropdown
        isMenu={isMenu}
        pageParent={pageParents.coaches}
        pageItems={[
          pages.coachesIntro,
          pages.registration,
          pages.entryFees,
          pages.preOrderTShirts,
          pages.raceDayInfo,
        ]}
        onAction={handleMenuAction}
      />
      <NavbarDropdown
        isMenu={isMenu}
        pageParent={pageParents.racingInfo}
        pageItems={[
          pages.schedule,
          pages.courseAndVenueMap,
          pages.courseAerialTour,
          pages.participatingTeams,
          pages.featuredEntries,
        ]}
        onAction={handleMenuAction}
      />
      <NavbarDropdown
        isMenu={isMenu}
        pageParent={pageParents.generalInfo}
        pageItems={[
          pages.about,
          pages.parkingAndDirections,
          pages.hotels,
          pages.partners,
          pages.galleries,
        ]}
        onAction={handleMenuAction}
      />
      <NavbarDropdown
        isMenu={isMenu}
        pageParent={pageParents.results}
        pageItems={[pages.raceResults, pages.allTimeLists]}
        onAction={handleMenuAction}
      />
      <NavbarMenuItem>
        <Link
          href={pages.contact.path}
          size="lg"
          className={clsx(
            isMenu && "h-10",
            isHomePage && !isMenu && siteConfig.showAmbientVideo
              ? "text-white"
              : pathname === pages.contact.path
                ? "text-primary"
                : "text-foreground",
          )}
          onClick={handleMenuAction}
        >
          {pages.contact.menuLabel}
        </Link>
      </NavbarMenuItem>
    </>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  function handleMenuAction() {
    setIsMenuOpen(() => false);
  }

  const isHomePage = pathname === pages.home.path;

  return (
    <HeroUINavbar
      isMenuOpen={isMenuOpen}
      maxWidth="2xl"
      shouldHideOnScroll={!isHomePage || siteConfig.showAmbientVideo}
      isBordered={!isHomePage || siteConfig.showAmbientVideo}
      isBlurred={!isHomePage || (siteConfig.showAmbientVideo && isMenuOpen)}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: clsx(
          "bg-transparent",
          isHomePage && siteConfig.showAmbientVideo && "border-white/30",
        ),
        toggle: clsx(isHomePage && siteConfig.showAmbientVideo && "text-white"),
      }}
    >
      <NavbarBrand as="li" className="max-w-fit gap-3">
        <Link
          href={pages.home.path}
          className={clsx(
            "mb-0.5 text-2xl font-bold tracking-tighter",
            isHomePage && siteConfig.showAmbientVideo ? "text-white" : "text-sky-950",
          )}
        >
          {siteConfig.woodbridge}
        </Link>
      </NavbarBrand>
      <NavbarContent className="ml-2 hidden basis-1/5 lg:flex lg:basis-full" justify="start">
        <Menus
          isMenu={false}
          pathname={pathname}
          isHomePage={isHomePage}
          handleMenuAction={handleMenuAction}
        />
      </NavbarContent>

      <NavbarContent className="flex basis-full gap-10" justify="end">
        <NavbarItem className="flex gap-6">
          <Link isExternal href={urls.socials.twitter}>
            <XIcon
              className={
                isHomePage && siteConfig.showAmbientVideo ? "text-white" : "text-default-500"
              }
            />
          </Link>
          <Link isExternal href={urls.socials.instagram}>
            <InstagramIcon
              className={
                isHomePage && siteConfig.showAmbientVideo ? "text-white" : "text-default-500"
              }
            />
          </Link>
        </NavbarItem>
        <NavbarMenuToggle className="lg:hidden" />
      </NavbarContent>

      <NavbarMenu>
        <Menus
          isMenu={true}
          pathname={pathname}
          isHomePage={isHomePage}
          handleMenuAction={handleMenuAction}
        />
      </NavbarMenu>
    </HeroUINavbar>
  );
}
