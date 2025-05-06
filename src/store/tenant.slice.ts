import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';
const initialState = { tenantId: null, title: null };

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenantId: (state, action) => {
      state.tenantId = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    }
  }
});

export const { setTenantId, setTitle } = tenantSlice.actions;
export const selectTenantId = (state: RootState) => state.tenant.tenantId;
export const selectTitle = (state: RootState) => state.tenant.title;
export default tenantSlice.reducer;
