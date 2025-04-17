import { LoginApi, LogoutApi } from "@/apis/auth/auth";
import { ResetMessengerState } from "@/stores/messageSlice";
import { resetUserState, setUser } from "@/stores/userSlice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Token {
  tokenType: string;
  accessToken: string;
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
  token?: Token | null;
  status: string;
  statusLogout: string;
  error?: ErrorResponse[] | null;
}

let initialState: InitialState = {
  status: "idle",
  statusLogout: "idle",
  token: {
    tokenType: "",
    accessToken: "",
  },
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: Data, { rejectWithValue, dispatch }) => {
    const response = await LoginApi(data);
    if (response?.data?.error === 1) {
      return rejectWithValue(response?.data?.data as ErrorResponse[]);
    }
    dispatch(
      setUser({
        id: response.data?.data?.user?.userId,
        email: response.data?.data?.user?.email,
        fullName: response.data?.data?.user?.fullName,
        avatar: response.data?.data?.user?.avatar,
      })
    );
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    const response = await LogoutApi();
    dispatch(resetUserState());
    dispatch(ResetMessengerState());
    return response.data;
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    resetAuthState: (state) => {
      state.status = "idle";
      state.token = null;
      state.error = null;
    },
    setToken: (state, action) => {
      state.status = "idle";
      state.token = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        window.localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload?.data?.token)
        );
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as ErrorResponse[];
      })
      .addCase(logoutUser.pending, (state) => {
        state.statusLogout = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.statusLogout = "succeeded";
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.statusLogout = "failed";
        state.error = action.payload as ErrorResponse[];
      });
  },
});

export const { resetAuthState, setToken } = authSlice.actions;

export default authSlice.reducer;
