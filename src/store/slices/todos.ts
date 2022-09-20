/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { Status as StatusType, Todo as TodoType } from 'types';
import { getRequest, postRequest } from 'utils/api';

interface TodosState {
  [prop: string]: Array<TodoType>,
}

interface InitialState {
  list: TodosState,
  status: StatusType,
  updateStatus: StatusType,
}

const initialState: InitialState = {
  list: {},
  status: 'none',
  updateStatus: 'none',
};

export const getUserTodos = createAsyncThunk(
  'todos/getUserTodos',
  async ({ userId }: { userId: number }) => {
    const res = await getRequest(`/users/${userId}/todos`);
    return res.data;
  },
);

export const updateStateUserTodo = createAsyncThunk(
  'todos/updateStateUserTodo',
  async ({ todo }: { userId: number, todo: TodoType }) => {
    const res = await postRequest(`/todos/${todo.id}`, { data: todo, method: 'put' });
    return res.data;
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUserTodos.pending, (state) => {
        state.status = 'requested';
      })
      .addCase(getUserTodos.fulfilled, (state, action: PayloadAction<TodosState>) => {
        state.status = 'success';

        const { meta: { arg: { userId } } }: any = action;
        state.list = {
          ...state.list,
          [userId]: action.payload,
        };
      })
      .addCase(getUserTodos.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(updateStateUserTodo.pending, (state) => {
        state.updateStatus = 'requested';
      })
      .addCase(updateStateUserTodo.fulfilled, (state, action: PayloadAction<TodosState>) => {
        state.updateStatus = 'none';

        const { meta: { arg: { userId, todo: { id } } } }: any = action;

        const updatedTodoItemId = state.list[userId].findIndex((item) => item.id === id);

        const updatedTodoItem = state.list[userId][updatedTodoItemId];

        state.list[userId] = update(
          state.list[userId],
          {
            [updatedTodoItemId]: {
              $set: { ...updatedTodoItem, completed: !updatedTodoItem.completed },
            },
          },
        );
      })
      .addCase(updateStateUserTodo.rejected, (state) => {
        state.updateStatus = 'failed';
      });
  },
});

export default todosSlice.reducer;
