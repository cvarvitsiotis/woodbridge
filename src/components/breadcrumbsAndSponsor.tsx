"use client";

import { Breadcrumbs, BreadcrumbsItem } from "@heroui/react";
import { usePathname } from "next/navigation";
import { pages } from "@/config/site";
import PresentedByAsics from "./presentedByAsics";

export default function BreadcrumbsAndSponsor() {
  const pathname = usePathname();

  const page = Object.values(pages).find((page) => page.path === pathname);

  if (page === pages.home) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <Breadcrumbs isDisabled>
        {page?.parent && <BreadcrumbsItem>{page?.parent}</BreadcrumbsItem>}
        <BreadcrumbsItem>{page?.menuLabel}</BreadcrumbsItem>
      </Breadcrumbs>
      <PresentedByAsics isBreadcrumb />
    </div>
  );
}
