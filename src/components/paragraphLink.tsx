import clsx from "clsx";
import { getParagraphStyle } from "@/styles/styles";
import { ReactNode } from "react";
import BaseLink from "@/components/baseLink";

export default function ParagraphLink({
  href,
  isExternal = false,
  isLargerOnLargerScreen = false,
  isSerif = true,
  children,
}: {
  href: string;
  isExternal?: boolean;
  isLargerOnLargerScreen?: boolean;
  isSerif?: boolean;
  children: ReactNode;
}) {
  return (
    <BaseLink
      href={href}
      isExternal={isExternal}
      className={clsx(getParagraphStyle(isLargerOnLargerScreen, isSerif))}
    >
      {children}
    </BaseLink>
  );
}
