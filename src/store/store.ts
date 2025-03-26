import { authReducer } from '@/modules/Auth/store/auth.slice';
import { configureStore } from '@reduxjs/toolkit';
import tenantReducer from './tenant.slice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tenant: tenantReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
