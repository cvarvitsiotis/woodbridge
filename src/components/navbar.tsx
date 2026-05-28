"use client";

import { useState, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import NavbarDropdown from "@/components/navbarDropdown";

import { pages, pageParents, siteConfig } from "@/config/site";
import { XIcon, InstagramIcon, MenuLogo } from "@/components/icons";
import { urls } from "@/config/data";
import BaseLink from "@/components/baseLink";
import { useWindowScrollPositions } from "@/hooks/useWindowScrollPositions";
import { getBaseLinkStyle } from "@/styles/styles";
import { Drawer } from "@heroui/react";
import PresentedByAsics from "@/components/presentedByAsics";

function BrandLink({ isHomePage, isMenu }: { isHomePage: boolean; isMenu: boolean }) {
  return (
    <BaseLink href={pages.home.path}>
      <Brand isHomePage={isHomePage} isMenu={isMenu} />
    </BaseLink>
  );
}
function Brand({ isHomePage, isMenu }: { isHomePage: boolean; isMenu: boolean }) {
  return (
    <div
      className={clsx(
        "mb-0.5 text-2xl font-bold tracking-tighter",
        isHomePage && siteConfig.showAmbientVideo && !isMenu ? "text-white" : "text-sky-950",
      )}
    >
      {siteConfig.woodbridge}
    </div>
  );
}

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
      <li>
        <BaseLink
          href={pages.contact.path}
          className={clsx(
            "text-lg font-normal",
            isMenu && "h-10",
            isHomePage && !isMenu && siteConfig.showAmbientVideo
              ? "text-white"
              : pathname === pages.contact.path
                ? "text-accent"
                : "text-foreground",
          )}
          accentColor={false}
          onClick={handleMenuAction}
        >
          {pages.contact.menuLabel}
        </BaseLink>
      </li>
    </>
  );
}

function SocialsLinks({ isHomePage }: { isHomePage: boolean }) {
  return (
    <div className="flex gap-6">
      <BaseLink isExternal href={urls.socials.twitter}>
        <XIcon
          className={isHomePage && siteConfig.showAmbientVideo ? "text-white" : "text-zinc-500"}
        />
      </BaseLink>
      <BaseLink isExternal href={urls.socials.instagram}>
        <InstagramIcon
          className={isHomePage && siteConfig.showAmbientVideo ? "text-white" : "text-zinc-500"}
        />
      </BaseLink>
    </div>
  );
}

function MenuToggleButton({ isHomePage, onClick }: { isHomePage: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "lg:hidden",
        isHomePage && siteConfig.showAmbientVideo ? "text-white" : "text-sky-950",
        getBaseLinkStyle(false),
      )}
    >
      <MenuLogo isWeight600={true} />
    </button>
  );
}

function Menu({
  pathname,
  isMenuOpen,
  isHomePage,
  handleMenuAction,
}: {
  pathname: string;
  isMenuOpen: boolean;
  isHomePage: boolean;
  handleMenuAction: () => void;
}) {
  return (
    <Drawer>
      <Drawer.Backdrop
        isOpen={isMenuOpen}
        onOpenChange={handleMenuAction}
        variant="blur"
        className="lg:hidden"
      >
        <Drawer.Content placement="right">
          <Drawer.Dialog className="min-w-6/7 bg-linear-to-br from-indigo-200 from-65% to-[#ffd1b9] sm:min-w-1/2">
            <Drawer.CloseTrigger className="size-7" />
            <Drawer.Header>
              <Drawer.Heading className="border-b border-neutral-900/15 pb-4">
                <Brand isHomePage={isHomePage} isMenu={true} />
              </Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <ul className="flex flex-col gap-2">
                <Menus
                  isMenu={true}
                  pathname={pathname}
                  isHomePage={isHomePage}
                  handleMenuAction={handleMenuAction}
                />
              </ul>
            </Drawer.Body>
            <Drawer.Footer className="justify-start">
              <PresentedByAsics isFooter isMenu />
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const windowScrollPositions = useWindowScrollPositions();
  // eslint-disable-next-line
  useLayoutEffect(() => setMounted(true), []);

  function handleMenuAction() {
    setIsMenuOpen(() => false);
  }

  const isHomePage = pathname === pages.home.path;
  const shouldHideOnScroll = !isHomePage || siteConfig.showAmbientVideo;
  const isBordered = !isHomePage || siteConfig.showAmbientVideo;
  const isBlurred = !isHomePage || (siteConfig.showAmbientVideo && isMenuOpen);
  const isVisible =
    !mounted ||
    !shouldHideOnScroll ||
    windowScrollPositions?.currentScrollY === undefined ||
    windowScrollPositions?.previousScrollY === undefined ||
    windowScrollPositions.currentScrollY <= windowScrollPositions.previousScrollY ||
    windowScrollPositions.currentScrollY < 10;

  return (
    <nav
      className={clsx(
        "sticky top-0 z-40 w-full bg-transparent transition-transform duration-500",
        shouldHideOnScroll && !isVisible && "-translate-y-full",
        isBordered &&
          (isHomePage && siteConfig.showAmbientVideo
            ? "border-b border-white/30"
            : "border-b border-neutral-900/15"),
      )}
    >
      <header
        className={clsx(
          "mx-auto flex h-16 max-w-384 items-center justify-between gap-4 px-6",
          isBlurred && "backdrop-blur-lg",
        )}
      >
        <BrandLink isHomePage={isHomePage} isMenu={false} />
        <ul className="ml-2 hidden basis-1/5 items-center gap-4 lg:flex lg:basis-full">
          <Menus
            isMenu={false}
            pathname={pathname}
            isHomePage={isHomePage}
            handleMenuAction={handleMenuAction}
          />
        </ul>
        <div className="flex basis-full items-center justify-end gap-10">
          <SocialsLinks isHomePage={isHomePage} />
          <MenuToggleButton isHomePage={isHomePage} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </header>
      <Menu
        pathname={pathname}
        isMenuOpen={isMenuOpen}
        isHomePage={isHomePage}
        handleMenuAction={handleMenuAction}
      />
    </nav>
  );
}
