import { ReactNode } from "react";
import clsx from "clsx";

export default function List({ isOrdered, children }: { isOrdered: boolean; children: ReactNode }) {
  const styling = clsx("list-outside space-y-4 pl-10", isOrdered ? "list-decimal" : "list-disc");
  return isOrdered ? (
    <ol className={styling}>{children}</ol>
  ) : (
    <ul className={styling}>{children}</ul>
  );
}
