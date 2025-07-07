"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { usePathname } from "next/navigation";
import { Link } from "@heroui/link";
import { urls } from "@/config/data";
import { AsicsLogo } from "@/components/icons";
import { pages } from "@/config/site";

export default function BreadcrumbsAndSponsor() {
  const pathname = usePathname();

  const page = Object.values(pages).find((page) => page.path === pathname);

  if (page === pages.home) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <Breadcrumbs isDisabled>
        {page?.parent && <BreadcrumbItem>{page?.parent}</BreadcrumbItem>}
        <BreadcrumbItem>{page?.menuLabel}</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex flex-col items-center justify-between text-sm text-default-600 sm:flex-row sm:gap-1">
        <span className="hidden sm:mt-1 sm:block">Presented by</span>
        <Link isExternal href={urls.sponsors.asics}>
          <AsicsLogo />
        </Link>
        <span className="hidden sm:mt-1 sm:block">AMERICA</span>
      </div>
    </div>
  );
}
