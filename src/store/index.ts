import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from 'store/slices/users';
import todosReducer from 'store/slices/todos';
import paymentsReducer from 'store/slices/payments';

const store = configureStore({
  reducer: {
    users: userReducer,
    todos: todosReducer,
    payments: paymentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
