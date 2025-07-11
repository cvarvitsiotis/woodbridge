import React from "react";
import { Link } from "@heroui/link";

import { AsicsLogo } from "@/components/icons";
import { urls } from "@/config/data";
import { siteConfig } from "@/config/site";

function FooterLink({ url, name }: { url: string; name: string }) {
  return (
    <Link isExternal href={url} className="text-sm">
      {name}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="z-10 flex w-full max-w-screen-2xl items-start justify-between gap-24 p-3 text-sm text-default-600">
      <div className="flex flex-col items-center justify-between gap-0.5 sm:flex-row sm:gap-1">
        <span className="sm:mt-1">Presented by</span>
        <Link isExternal href={urls.sponsors.asics}>
          <AsicsLogo />
        </Link>
        <span className="hidden sm:mt-1 sm:block">AMERICA</span>
      </div>

      <div className="space-y-1 text-left sm:text-left">
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
