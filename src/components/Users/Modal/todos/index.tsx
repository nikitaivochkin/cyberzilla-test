import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from 'store';
import { getUserTodos } from 'store/slices/todos';
import FailedResult from 'components/ui/FailedResult';
import LoadingSkeleton from 'components/ui/LoadingSkeleton';
import TodoList from './TodosList';

import './styles.scss';

type UserTodosProps = {
  userId: number,
};

const UserTodos: React.FC<UserTodosProps> = ({ userId }: UserTodosProps) => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector((state) => state.todos.list[userId] || []);
  const getTodosStatus = useAppSelector((state) => state.todos.status);

  const updateRequestState = useAppSelector((state) => state.todos.updateStatus);

  const shouldMakeRequest = (getTodosStatus === 'none' || getTodosStatus === 'success') && !todos.length;
  const isRequested = getTodosStatus === 'requested';
  const isSuccess = getTodosStatus === 'success';
  const isFailed = getTodosStatus === 'failed';

  const isNoData = isSuccess && !todos.length;

  useEffect(() => {
    if (shouldMakeRequest) {
      dispatch(getUserTodos({ userId }));
    }
  }, []);

  return (
    <Grid
      container
      spacing={2}
      columns={3}
      className={cx({
        todos: true,
        requested: updateRequestState === 'requested',
      })}
    >
      {
        isRequested && (
          <LoadingSkeleton num={9} />
        )
      }

      {
        isNoData && (
          <div>
            Todo list is empty
          </div>
        )
      }

      {
        isSuccess && <TodoList todos={todos} />
      }

      {
        isFailed && <FailedResult />
      }
    </Grid>
  );
};

export default UserTodos;
