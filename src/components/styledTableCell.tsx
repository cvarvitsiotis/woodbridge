import { Table } from "@heroui/react";
import { ReactNode } from "react";

export default function StyledTableCell({ children }: { children: ReactNode }) {
  return <Table.Cell className="py-2">{children}</Table.Cell>;
}
