import clsx from "clsx";
import { fontSerif } from "./fonts";

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
    "font-light",
    sizeOnSmallerScreen,
    sizeOnLargerScreen,
    isSerif && fontSerif.className,
  );
}

export function getSubheaderStyle() {
  return "text-xl font-light sm:text-2xl";
}
