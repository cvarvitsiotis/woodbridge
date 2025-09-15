"use client";

import AllTimeIndividualsTable from "@/components/allTimeIndividualsTable";
import AllTimeTeamsTable from "@/components/allTimeTeamsTable";
import { Tab, Tabs } from "@heroui/tabs";
import { useUserAgent } from "@/hooks/useUserAgent";
import { isFirefox } from "@/utils/userAgent";
import AlertMessageFirefox from "./alertMessageFirefox";

export default function AllTimeTables() {
  const userAgent = useUserAgent();

  if (isFirefox(userAgent)) return <AlertMessageFirefox />;

  return (
    <Tabs
      fullWidth
      size="lg"
      radius="sm"
      variant="solid"
      aria-label="Options"
      classNames={{
        base: "pt-10 max-w-xs mx-auto",
        panel: "pt-6",
        tabList: "border border-default-300",
      }}
    >
      <Tab key="teams" title="TEAMS">
        <AllTimeTeamsTable />
      </Tab>
      <Tab key="individuals" title="INDIVIDUALS">
        <AllTimeIndividualsTable />
      </Tab>
    </Tabs>
  );
}
