import { Spinner } from "@heroui/react";
import clsx from "clsx";

export default function DelayedSpinner({ className }: { className?: string }) {
  return (
    <span className={clsx("flex animate-in delay-150 fill-mode-backwards fade-in", className)}>
      <Spinner size="sm" />
    </span>
  );
}
