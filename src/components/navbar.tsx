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

import NavbarDropdown from "./navbarDropdown";

import { pages, pageParents, siteConfig } from "@/config/site";
import ThemeSwitch from "@/components/theme-switch";
import { XIcon, InstagramIcon } from "@/components/icons";
import { urls } from "@/config/data";

function Menus({
  isMenu,
  pathname,
  handleMenuAction,
}: {
  isMenu: boolean;
  pathname: string;
  handleMenuAction: () => void;
}) {
  return (
    <>
      <NavbarDropdown
        isMenu={isMenu}
        pageParent={pageParents.coaches}
        items={[pages.coachesIntro, pages.registration, pages.entryFees, pages.raceDayInfo]}
        onAction={handleMenuAction}
      />
      <NavbarDropdown
        isMenu={isMenu}
        pageParent={pageParents.racingInfo}
        items={[
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
        items={[
          pages.welcome,
          pages.parkingAndDirections,
          pages.hotels,
          pages.sponsors,
          pages.galleries,
        ]}
        onAction={handleMenuAction}
      />
      <NavbarDropdown
        isMenu={isMenu}
        pageParent={pageParents.results}
        items={[pages.raceResults, pages.allTimeLists]}
        onAction={handleMenuAction}
      />
      <NavbarMenuItem>
        <Link
          href={pages.contact.path}
          color={pathname === pages.contact.path ? "primary" : "foreground"}
          size="lg"
          className={isMenu ? "h-10" : ""}
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
      shouldHideOnScroll={!isHomePage}
      isBordered={!isHomePage}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{ base: "bg-transparent" }}
    >
      <NavbarBrand as="li" className="max-w-fit gap-3">
        <Link
          href={pages.home.path}
          className="mb-0.5 text-xl font-bold italic text-default-700 sm:text-2xl"
        >
          {siteConfig.woodbridge}
        </Link>
      </NavbarBrand>
      <NavbarContent className="ml-2 hidden basis-1/5 lg:flex lg:basis-full" justify="start">
        <Menus isMenu={false} pathname={pathname} handleMenuAction={handleMenuAction} />
      </NavbarContent>

      <NavbarContent className="flex basis-full" justify="end">
        <NavbarItem className="flex gap-2">
          <Link isExternal aria-label="Twitter" href={urls.socials.twitter}>
            <XIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Instagram" href={urls.socials.instagram}>
            <InstagramIcon className="text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitch handleOnChange={handleMenuAction} />
        </NavbarItem>
        <NavbarMenuToggle className="basis-1 pl-4 lg:hidden" />
      </NavbarContent>

      <NavbarMenu>
        <Menus isMenu={true} pathname={pathname} handleMenuAction={handleMenuAction} />
        <NavbarMenuItem>
          <ThemeSwitch className="align-middle" handleOnChange={handleMenuAction} />
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
}
