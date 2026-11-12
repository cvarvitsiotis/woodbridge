"use client";

import { useLinkStatus } from "next/link";
import { Spinner } from "@heroui/react";

export default function LinkPendingSpinner() {
  const { pending } = useLinkStatus();
  if (!pending) return null;

  return (
    <span className="absolute inset-y-0 left-full ml-1.5 flex animate-in items-center delay-150 fill-mode-backwards fade-in">
      <Spinner size="sm" />
    </span>
  );
}
