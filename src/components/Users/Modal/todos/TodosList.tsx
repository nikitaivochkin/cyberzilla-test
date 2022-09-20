import React from 'react';
import { Todo as TodoType } from 'types';
import TodoItem from './TodoItem';

type TodosListProps = {
  todos: Array<TodoType>
}

const TodosList: React.FC<TodosListProps> = ({ todos }: TodosListProps) => (
  <>
    {
        todos.map((item) => (
          <TodoItem
            key={item.id}
            todo={item}
          />
        ))
      }
  </>
);

export default TodosList;
