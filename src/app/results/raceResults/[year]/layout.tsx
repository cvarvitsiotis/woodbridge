import { ReactNode } from "react";
import OfficialResults from "@/components/officialResults";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  return <OfficialResults selectedYear={Number(year)}>{children}</OfficialResults>;
}
