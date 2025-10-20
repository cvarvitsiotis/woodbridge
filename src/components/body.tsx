"use client";

import { pages } from "@/config/site";
import { fontSans } from "@/styles/fonts";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Body({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isHomePage = pathname === pages.home.path;

  return (
    <body
      className={clsx(
        "bg-linear-to-br from-indigo-200 to-[#ffd1b9]",
        isHomePage ? "from-65%" : "from-50%",
        fontSans.className,
        "antialiased",
      )}
    >
      {children}
    </body>
  );
}
