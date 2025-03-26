import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';
const initialState = { tenantId: null };

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setTenantId: (state, action) => {
      state.tenantId = action.payload;
    }
  }
});

export const { setTenantId } = tenantSlice.actions;
export const selectTenantId = (state: RootState) => state.tenant.tenantId;
export default tenantSlice.reducer;
