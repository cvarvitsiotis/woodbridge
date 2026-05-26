import clsx from "clsx";
import { fontSerif } from "@/styles/fonts";
import { linkVariants } from "@heroui/styles";

export function getParagraphStyle(
  isLargerOnLargerScreen: boolean = false,
  isSerif: boolean = true,
) {
  const sizeOnSmallerScreen = isSerif ? "text-xl" : "text-lg";
  const sizeOnLargerScreen = !isLargerOnLargerScreen
    ? null
    : isSerif
      ? "sm:text-2xl"
      : "sm:text-xl";

  return clsx(
    isSerif ? "font-normal" : "font-light",
    sizeOnSmallerScreen,
    sizeOnLargerScreen,
    isSerif && fontSerif.className,
  );
}

export function getSubheaderStyle() {
  return "text-xl sm:text-2xl";
}

export function getBaseLinkStyle(accentColor: boolean = true) {
  const linkSlots = linkVariants();

  return clsx(linkSlots.base(), "no-underline hover:opacity-80", accentColor && "text-accent");
}
