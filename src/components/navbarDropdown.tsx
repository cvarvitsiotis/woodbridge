"use client";

import React from "react";
import { NavbarItem, NavbarMenuItem } from "@heroui/navbar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { usePathname } from "next/navigation";

import { ChevronDown } from "./icons";

import { PageType } from "@/types";

interface Props {
  isMenu?: boolean;
  pageParent: string;
  items: PageType[];
  onAction: () => void;
}

function NavbarDropdownTrigger({ pageParent }: { pageParent: string }) {
  return (
    <DropdownTrigger>
      <Button
        disableRipple
        className="bg-transparent p-0 text-lg data-[hover=true]:bg-transparent"
        endContent={<ChevronDown fill="currentColor" size={16} />}
        radius="sm"
        variant="light"
      >
        {pageParent}
      </Button>
    </DropdownTrigger>
  );
}

export default function NavbarDropdown({ isMenu, pageParent, items, onAction }: Props) {
  const pathname = usePathname();

  return (
    <Dropdown>
      {isMenu ? (
        <NavbarMenuItem>
          <NavbarDropdownTrigger pageParent={pageParent} />
        </NavbarMenuItem>
      ) : (
        <NavbarItem>
          <NavbarDropdownTrigger pageParent={pageParent} />
        </NavbarItem>
      )}
      <DropdownMenu onAction={onAction}>
        {items.map((item) => (
          <DropdownItem
            key={item.path}
            href={item.path}
            classNames={{
              title: `text-lg font-normal ${pathname === item.path ? "text-primary" : "text-foreground"}`,
            }}
          >
            {item.menuLabel}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
