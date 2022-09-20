/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import pick from 'lodash.pick';
import {
  Status as StatusType,
  User as UserType,
} from 'types';
import { getRequest, postRequest } from 'utils/api';

interface InitialState {
  list: Array<UserType>,
  status: StatusType,
  updateStatus: StatusType,
  getTodosStatus: StatusType,
}

const initialState: InitialState = {
  list: [],
  status: 'none',
  updateStatus: 'none',
  getTodosStatus: 'none',
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    const res = await getRequest('/users');
    return res.data.map((user: UserType) => pick(user, ['id', 'name', 'email', 'phone']));
  },
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData: UserType) => {
    const res = await postRequest(`/users/${userData.id}`, { data: userData, method: 'put' });

    return res.data;
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUserUpdate: (state) => {
      state.updateStatus = 'none';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'requested';
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<Array<UserType>>) => {
        state.status = 'success';
        state.list = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(updateUser.pending, (state) => {
        state.updateStatus = 'requested';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.updateStatus = 'success';

        const updatedUserIndex = state.list.findIndex((user) => user.id === action.payload.id);
        state.list = update(
          state.list,
          {
            [updatedUserIndex]: {
              $set: action.payload,
            },
          },
        );
      })
      .addCase(updateUser.rejected, (state) => {
        state.updateStatus = 'failed';
      });
  },
});

export const { resetUserUpdate } = userSlice.actions;

export default userSlice.reducer;
