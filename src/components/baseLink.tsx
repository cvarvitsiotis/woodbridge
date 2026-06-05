import clsx from "clsx";
import NextLink from "next/link";
import { MouseEventHandler, ReactNode } from "react";
import { getBaseLinkStyle } from "@/styles/styles";

export default function BaseLink({
  href,
  isExternal = false,
  className,
  accentColor,
  onClick,
  children,
}: {
  href: string;
  isExternal?: boolean;
  className?: string;
  accentColor?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}) {
  return (
    <NextLink
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className={clsx(getBaseLinkStyle(accentColor), className)}
      onClick={onClick}
    >
      {children}
    </NextLink>
  );
}
