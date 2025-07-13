"use client";

import React from "react";
import { Link } from "@heroui/link";

import { urls } from "@/config/data";
import { pages, siteConfig } from "@/config/site";
import PresentedByAsics from "./presentedByAsics";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function FooterLink({ url, name }: { url: string; name: string }) {
  return (
    <Link isExternal href={url} className="text-sm">
      {name}
    </Link>
  );
}

export default function Footer() {
  const pathname = usePathname();

  const isHomePage = pathname === pages.home.path;

  return (
    <footer
      className={clsx(
        "z-10 flex w-full max-w-screen-2xl items-start justify-between gap-24 p-3",
        !isHomePage && "pt-20",
      )}
    >
      <PresentedByAsics isFooter />
      <div className="space-y-1 text-left text-sm text-default-600 sm:text-left">
        <div>
          Hosted by{" "}
          <FooterLink url={urls.schools.woodbridgeHighSchool} name={siteConfig.woodbridge} /> and{" "}
          <FooterLink url={urls.schools.northwoodHighSchool} name={siteConfig.northwood} /> High
          Schools
        </div>
        <div>
          Results by <FooterLink url={urls.athleticNet.irvineTiming} name="Irvine Timing" />
        </div>
      </div>
    </footer>
  );
}
