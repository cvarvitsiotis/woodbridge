"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@heroui/react";
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
      <li>
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
      </li>
    </>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  function handleMenuAction() {
    setIsMenuOpen(() => false);
  }

  const isHomePage = pathname === pages.home.path;
  const shouldHideOnScroll = !isHomePage || siteConfig.showAmbientVideo;
  const isBordered = !isHomePage || siteConfig.showAmbientVideo;
  const isBlurred = !isHomePage || (siteConfig.showAmbientVideo && isMenuOpen);

  useEffect(() => {
    if (!shouldHideOnScroll) {
      setIsVisible(true);
      return;
    }

    function handleScroll() {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY.current || currentScrollY < 10);
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldHideOnScroll]);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-40 w-full bg-transparent transition-transform duration-300",
        shouldHideOnScroll && !isVisible && "-translate-y-full",
        isBlurred && "backdrop-blur-lg",
        isBordered &&
          (isHomePage && siteConfig.showAmbientVideo
            ? "border-b border-white/30"
            : "border-b border-separator"),
      )}
    >
      <header className="mx-auto flex h-16 max-w-[1536px] items-center justify-between px-6">
        <div className="max-w-fit gap-3">
          <Link
            href={pages.home.path}
            className={clsx(
              "mb-0.5 text-2xl font-bold tracking-tighter",
              isHomePage && siteConfig.showAmbientVideo ? "text-white" : "text-sky-950",
            )}
          >
            {siteConfig.woodbridge}
          </Link>
        </div>
        <ul className="ml-2 hidden basis-1/5 items-center lg:flex lg:basis-full">
          <Menus
            isMenu={false}
            pathname={pathname}
            isHomePage={isHomePage}
            handleMenuAction={handleMenuAction}
          />
        </ul>
        <div className="flex basis-full items-center justify-end gap-10">
          <div className="flex gap-6">
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
          </div>
          <button
            className={clsx(
              "lg:hidden",
              isHomePage && siteConfig.showAmbientVideo && "text-white",
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator lg:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <Menus
              isMenu={true}
              pathname={pathname}
              isHomePage={isHomePage}
              handleMenuAction={handleMenuAction}
            />
          </ul>
        </div>
      )}
    </nav>
  );
}
