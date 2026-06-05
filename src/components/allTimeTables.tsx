import AllTimeIndividualsTable from "@/components/allTimeIndividualsTable";
import AllTimeTeamsTable from "@/components/allTimeTeamsTable";
import { TabProps, Tabs } from "@heroui/react";

function Tab({ id, children }: TabProps) {
  return (
    <Tabs.Tab id={id} className="h-10 text-base">
      {children}
    </Tabs.Tab>
  );
}

export default function AllTimeTables() {
  return (
    <Tabs className="pt-6">
      <Tabs.ListContainer className="mx-auto w-full max-w-xs">
        <Tabs.List className="max-w-xs" aria-label="Options">
          <Tab id="teams">
            TEAMS
            <Tabs.Indicator />
          </Tab>
          <Tab id="individuals">
            INDIVIDUALS
            <Tabs.Indicator />
          </Tab>
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
