import { Link } from "@heroui/link";
import { AsicsLogo } from "./icons";
import { urls } from "@/config/data";
import clsx from "clsx";

export default function PresentedByAsics({
  isBreadcrumb,
  isFooter,
}: {
  isBreadcrumb?: boolean;
  isFooter?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-1",
        (isBreadcrumb || isFooter) &&
          "flex-col gap-0.5 text-sm text-default-600 sm:flex-row sm:gap-1",
      )}
    >
      <span className={clsx(isBreadcrumb && "hidden sm:block")}>Presented by</span>
      <Link isExternal href={urls.sponsors.asics}>
        <AsicsLogo />
      </Link>
    </div>
  );
}
