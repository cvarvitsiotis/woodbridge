import React from "react";
import { Link } from "@heroui/link";

import { AsicsLogo } from "@/components/icons";
import { urls } from "@/config/data";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="z-10 flex w-full max-w-screen-2xl items-start justify-between gap-4 px-3 py-6 text-sm text-default-600">
      <div className="flex flex-col items-center justify-between sm:flex-row sm:gap-1">
        <span className="sm:mt-1">Presented by</span>
        <Link isExternal href={urls.sponsors.asics}>
          <AsicsLogo />
        </Link>
        <span className="sm:mt-1">AMERICA</span>
      </div>

      <div>
        <div>
          Hosted by{" "}
          <Link
            isExternal
            href={urls.schools.woodbridgeHighSchool}
            className="text-sm text-primary"
          >
            {siteConfig.woodbridge}
          </Link>{" "}
          and{" "}
          <Link isExternal href={urls.schools.northwoodHighSchool} className="text-sm text-primary">
            {siteConfig.northwood}
          </Link>{" "}
          High Schools
        </div>
        <div>
          Results by{" "}
          <Link isExternal href={urls.athleticNet.irvineTiming} className="text-sm text-primary">
            Irvine Timing
          </Link>
        </div>
      </div>
    </footer>
  );
}
