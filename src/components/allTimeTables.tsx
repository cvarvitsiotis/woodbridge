"use client";

import AllTimeIndividualsTable from "@/components/allTimeIndividualsTable";
import AllTimeTeamsTable from "@/components/allTimeTeamsTable";
import { Tabs } from "@heroui/react";
import { useUserAgent } from "@/hooks/useUserAgent";
import { isFirefox } from "@/utils/userAgent";
import AlertMessageFirefox from "./alertMessageFirefox";

export default function AllTimeTables() {
  const userAgent = useUserAgent();

  if (isFirefox(userAgent)) return <AlertMessageFirefox />;

  return (
    <Tabs className="pt-10 max-w-xs mx-auto">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab id="teams">
            TEAMS
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="individuals">
            INDIVIDUALS
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel id="teams" className="pt-6">
        <AllTimeTeamsTable />
      </Tabs.Panel>
      <Tabs.Panel id="individuals" className="pt-6">
        <AllTimeIndividualsTable />
      </Tabs.Panel>
    </Tabs>
  );
}
