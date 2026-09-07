import { Table } from "@heroui/react";
import { ReactNode } from "react";
import clsx from "clsx";

export default function StyledTableCell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <Table.Cell className={clsx("py-2", className)}>{children}</Table.Cell>;
}
