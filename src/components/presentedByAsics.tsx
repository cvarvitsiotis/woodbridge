import { Link } from "@heroui/link";
import { AsicsLogo } from "./icons";
import { urls } from "@/config/data";
import clsx from "clsx";

export default function PresentedByAsics({
  isBreadcrumb,
  isFooter,
  isHomePage,
  isScreenShort,
}: {
  isBreadcrumb?: boolean;
  isFooter?: boolean;
  isHomePage?: boolean;
  isScreenShort?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-1",
        (isBreadcrumb || isFooter) &&
          "flex-col gap-0.5 text-sm text-default-600 sm:flex-row sm:gap-1",
        isHomePage && "text-xl tracking-tighter text-white",
        isHomePage && !isScreenShort && "md:text-2xl",
      )}
    >
      <span className={clsx(isBreadcrumb && "hidden sm:block")}>Presented by</span>
      <Link isExternal href={urls.sponsors.asics}>
        <AsicsLogo
          color={isHomePage ? "text-white" : undefined}
          height={isHomePage ? clsx("h-12", isHomePage && !isScreenShort && "md:h-14") : undefined}
        />
      </Link>
    </div>
  );
}
