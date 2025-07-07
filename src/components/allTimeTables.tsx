"use client";

import AllTimeIndividualsTable from "@/components/allTimeIndividualsTable";
import AllTimeTeamsTable from "@/components/allTimeTeamsTable";
import { Tab, Tabs } from "@heroui/tabs";

export default function AllTimeTables() {
  return (
    <Tabs
      fullWidth
      size="lg"
      radius="sm"
      aria-label="Options"
      classNames={{ base: "pt-10 max-w-xs mx-auto", panel: "pt-6" }}
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
