import { AsicsLogo } from "@/components/icons";
import { urls } from "@/config/data";
import clsx from "clsx";
import BaseLink from "@/components/baseLink";

export default function PresentedByAsics({
  isBreadcrumb,
  isFooter,
  isHomePage,
  isScreenShort,
  isMenu,
}: {
  isBreadcrumb?: boolean;
  isFooter?: boolean;
  isHomePage?: boolean;
  isScreenShort?: boolean;
  isMenu?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-1",
        (isBreadcrumb || isFooter) && "text-sm text-zinc-600",
        (isBreadcrumb || isFooter) && !isMenu && "flex-col gap-0.5 sm:flex-row sm:gap-1",
        isHomePage && "text-xl tracking-tighter text-white",
        isHomePage && !isScreenShort && "md:text-2xl",
      )}
    >
      <span className={clsx(isBreadcrumb && "hidden sm:block")}>Presented by</span>
      <BaseLink isExternal href={urls.partners.asics}>
        <AsicsLogo
          color={isHomePage ? "text-white" : undefined}
          height={isHomePage ? clsx("h-12", isHomePage && !isScreenShort && "md:h-14") : undefined}
        />
      </BaseLink>
    </div>
  );
}
