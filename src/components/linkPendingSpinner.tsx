"use client";

import { useLinkStatus } from "next/link";
import DelayedSpinner from "@/components/delayedSpinner";

export default function LinkPendingSpinner() {
  const { pending } = useLinkStatus();
  if (!pending) return null;

  return <DelayedSpinner className="absolute inset-y-0 left-full ml-1.5 items-center" />;
}
