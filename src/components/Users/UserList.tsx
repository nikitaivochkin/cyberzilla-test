/* eslint-disable max-len */
import React from 'react';
import { User as UserType } from 'types';
import User from './User';

type UserListProps = {
  users: Array<UserType>,
  setActiveId: Function,
};

const UserList: React.FC<UserListProps> = ({ users, setActiveId }: UserListProps) => (
  <>
    {
        users.map((user) => (
          <User
            key={user.id}
            user={user}
            setActiveId={setActiveId}
          />
        ))
      }
  </>
);

export default UserList;
