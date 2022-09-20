import React from 'react';
import {
  Card, CardActions, CardContent, Grid, Switch, Typography,
} from '@mui/material';
import { useAppDispatch } from 'store';
import { updateStateUserTodo } from 'store/slices/todos';
import { Todo as TodoType } from 'types';

type TodoItemProps = {
  todo: TodoType,
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }: TodoItemProps) => {
  const {
    userId, title, completed,
  } = todo;

  const dispatch = useAppDispatch();

  // eslint-disable-next-line no-unused-vars
  const handleToggleTodo = (_e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateStateUserTodo({ todo, userId }));
  };

  return (
    <Grid
      item
      xs={1}
    >
      <Card
        className="todos__item todo"
        variant="outlined"
      >
        <CardContent className="todo__title">
          <Typography sx={{ fontSize: 14 }}>
            { title }
          </Typography>
        </CardContent>
        <CardActions>
          <Switch
            checked={completed}
            onChange={handleToggleTodo}
          />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TodoItem;
