"use client";

import { Breadcrumbs } from "@heroui/react";
import { usePathname } from "next/navigation";
import { pages } from "@/config/site";
import PresentedByAsics from "@/components/presentedByAsics";

export default function BreadcrumbsAndSponsor() {
  const pathname = usePathname();

  const page = Object.values(pages).find((page) => page.path === pathname);

  if (page === pages.home) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <Breadcrumbs isDisabled className="flex-wrap">
        {page?.parent && <Breadcrumbs.Item>{page?.parent}</Breadcrumbs.Item>}
        <Breadcrumbs.Item>{page?.menuLabel}</Breadcrumbs.Item>
      </Breadcrumbs>
      <PresentedByAsics isBreadcrumb />
    </div>
  );
}
