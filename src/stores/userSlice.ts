import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  email: string | null;
  fullName: string | null;
  avatar: string;
}

export interface Data {
  email: string;
  password: string;
}

export interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
}

export interface InitialState {
  user?: UserState | null;
  status: string;
  error?: ErrorResponse[] | null;
}

let initialState: InitialState = { user: null, status: "idle", error: null };

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      if (!state.user) {
        state.user = {
          id: null,
          email: null,
          fullName: null,
          avatar: "",
        };
      }
      state.user.id = action.payload.id;
      state.user.email = action.payload.email;
      state.user.fullName = action.payload.fullName;
      state.user.avatar =
        action.payload.avatar &&
        `${process.env.NEXT_PUBLIC_SERVER}/${process.env.NEXT_PUBLIC_SERVER_GET_IMAGE}${action.payload.avatar}`;
    },
    clearAvatarUser: (state) => {
      if (state.user) {
        state.user.avatar = "";
      }
    },
    setAvatarUser: (state, action) => {
      if (state.user) {
        state.user.avatar =
          action.payload &&
          `${process.env.NEXT_PUBLIC_SERVER}/${process.env.NEXT_PUBLIC_SERVER_GET_IMAGE}${action.payload}`;
      }
    },
    setFullNameUser: (state, action) => {
      if (state.user) {
        state.user.fullName = action.payload;
      }
    },
    resetUserState: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  setUser,
  clearAvatarUser,
  setAvatarUser,
  setFullNameUser,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
