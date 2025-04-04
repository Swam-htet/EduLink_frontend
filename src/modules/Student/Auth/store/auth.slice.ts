import { StudentUser } from '@/modules/Student/Auth/types/index.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StudentAuthState {
  studentUser: StudentUser | null;
  isStudentAuthenticated: boolean;
  token: string | null;
}

const initialState: StudentAuthState = {
  studentUser: null,
  isStudentAuthenticated: false,
  token: null
};

const studentAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ studentUser: StudentUser; token: string }>) => {
      state.studentUser = action.payload.studentUser;
      state.token = action.payload.token;
      state.isStudentAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.studentUser = null;
      state.token = null;
      state.isStudentAuthenticated = false;
    }
  }
});

export const { setCredentials, clearCredentials } = studentAuthSlice.actions;
export default studentAuthSlice.reducer;

// Selectors
export const selectCurrentStudentUser = (state: { studentAuth: StudentAuthState }) =>
  state.studentAuth.studentUser;
export const selectIsStudentAuthenticated = (state: { studentAuth: StudentAuthState }) =>
  state.studentAuth.isStudentAuthenticated;

export const studentAuthReducer = studentAuthSlice.reducer;
