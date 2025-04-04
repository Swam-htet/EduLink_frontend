import { AdminUser } from '@/modules/Admin/Auth/types/index.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminAuthState {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  token: string | null;
}

const initialState: AdminAuthState = {
  adminUser: null,
  isAdminAuthenticated: false,
  token: null
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ adminUser: AdminUser; token: string }>) => {
      state.adminUser = action.payload.adminUser;
      state.token = action.payload.token;
      state.isAdminAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.adminUser = null;
      state.token = null;
      state.isAdminAuthenticated = false;
    }
  }
});

export const { setCredentials, clearCredentials } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

// Selectors
export const selectCurrentAdminUser = (state: { adminAuth: AdminAuthState }) =>
  state.adminAuth.adminUser;
export const selectIsAdminAuthenticated = (state: { adminAuth: AdminAuthState }) =>
  state.adminAuth.isAdminAuthenticated;

export const adminAuthReducer = adminAuthSlice.reducer;
