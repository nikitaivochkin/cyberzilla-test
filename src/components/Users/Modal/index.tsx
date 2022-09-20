import React, { useState } from 'react';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@mui/lab';
import { Tab } from '@mui/material';

import { User as UserType } from 'types';
import ModalForm from './UpdateUserForm';
import UserTodos from './todos';

type MotalTabsProps = {
  users: Array<UserType>
  activeCardId: number | null,
  setActiveCardId: Function,
};

const ModalTabs: React.FC<MotalTabsProps> = ({
  users,
  activeCardId,
  setActiveCardId,
}: MotalTabsProps) => {
  const [value, setValue] = useState<string>('1');

  const defaultFromValues = {
    id: 0, name: '', email: '', phone: '',
  };

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: string): void => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChangeTab}
        className="todo-tabs"
      >
        <Tab label="Change user data" value="1" />
        <Tab label="Todos" value="2" />
      </TabList>

      <TabPanel value="1">
        <ModalForm
          values={
            users.find((user) => user.id === activeCardId) || defaultFromValues
          }
          setActiveId={setActiveCardId}
        />
      </TabPanel>
      <TabPanel value="2">
        <UserTodos userId={activeCardId ?? 0} />
      </TabPanel>
    </TabContext>
  );
};

export default ModalTabs;
