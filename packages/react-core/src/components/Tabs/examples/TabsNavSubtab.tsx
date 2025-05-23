import { useState } from 'react';
import { Tabs, Tab, TabsComponent, TabTitleText } from '@patternfly/react-core';

export const TabsNavSubtab: React.FunctionComponent = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string | number>(0);
  const [activeTabKey2, setActiveTabKey2] = useState<string | number>(0);

  // Toggle currently active primary tab
  const handleTabClickFirst = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey1(tabIndex);
  };

  // Toggle currently active secondary tab
  const handleTabClickSecond = (
    event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey2(tabIndex);
  };

  return (
    <Tabs
      activeKey={activeTabKey1}
      onSelect={handleTabClickFirst}
      component={TabsComponent.nav}
      aria-label="Tabs in the sub tabs with nav element example"
    >
      <Tab eventKey={0} title={<TabTitleText>Users</TabTitleText>} href="#" aria-label="Subtabs with nav content users">
        <Tabs
          activeKey={activeTabKey2}
          isSubtab
          onSelect={handleTabClickSecond}
          aria-label="Local secondary"
          component={TabsComponent.nav}
        >
          <Tab eventKey={20} title={<TabTitleText>Item 1</TabTitleText>} href="#">
            Item 1 item section
          </Tab>
          <Tab eventKey={21} title={<TabTitleText>Item 2</TabTitleText>} href="#">
            Item 2 section
          </Tab>
          <Tab eventKey={22} title={<TabTitleText>Item 3</TabTitleText>} href="#">
            Item 3 section
          </Tab>
          <Tab eventKey={3} title={<TabTitleText>Disabled</TabTitleText>} isDisabled href="#">
            Disabled
          </Tab>
          <Tab eventKey={4} title={<TabTitleText>ARIA Disabled</TabTitleText>} isAriaDisabled href="#">
            ARIA Disabled
          </Tab>
          <Tab eventKey={25} title={<TabTitleText>Item 6</TabTitleText>} href="#">
            Item 6 section
          </Tab>
        </Tabs>
      </Tab>
      <Tab eventKey={1} title={<TabTitleText>Containers</TabTitleText>} href="#">
        Containers
      </Tab>
      <Tab eventKey={2} title={<TabTitleText>Database</TabTitleText>} href="#">
        Database
      </Tab>
      <Tab eventKey={3} title={<TabTitleText>Disabled</TabTitleText>} isDisabled href="#">
        Disabled
      </Tab>
      <Tab eventKey={4} title={<TabTitleText>ARIA Disabled</TabTitleText>} isAriaDisabled href="#">
        ARIA Disabled
      </Tab>
      <Tab eventKey={6} title={<TabTitleText>Network</TabTitleText>} href="#">
        Network
      </Tab>
    </Tabs>
  );
};
