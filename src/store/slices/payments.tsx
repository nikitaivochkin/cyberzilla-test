/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payment as PaymentType, Status as StatusType } from 'types';
import { getRequest } from 'utils/api';

interface PaymentsInitialState {
  list: Array<PaymentType>,
  status: StatusType,
}

const initialState: PaymentsInitialState = {
  list: [],
  status: 'none',
};

export const getPayments = createAsyncThunk(
  'payments/getPayments',
  async () => {
    const res = await getRequest('/posts');

    return res.data.slice(0, 19);
  },
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPayments.pending, (state) => {
        state.status = 'requested';
      })
      .addCase(getPayments.fulfilled, (state, action: PayloadAction<Array<PaymentType>>) => {
        state.status = 'success';

        state.list = action.payload;
      })
      .addCase(getPayments.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default paymentsSlice.reducer;
