import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthDataState {
  userName: string;
  email: string;
}

const initialState: AuthDataState = {
  userName: "",
  email: "",
};

const authDataSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<AuthDataState>) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
  },
});

export const { setData } = authDataSlice.actions;
export default authDataSlice.reducer;
