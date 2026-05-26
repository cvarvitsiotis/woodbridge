import { ReactNode } from "react";

// Replacement for @heroui/react's getKeyValue which was removed in v3
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getKeyValue(item: any, columnKey: unknown): ReactNode {
  return item[String(columnKey)];
}
