import { RegisterApi } from "@/apis/auth/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Data {
  fullName: string;
  email: string;
  password: string;
}

export interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
}

export interface InitialState {
  status: string;
  error?: ErrorResponse[] | null;
}

let initialState: InitialState = { status: "idle", error: null };

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: Data, { rejectWithValue }) => {
    const response = await RegisterApi(data);
    if (response?.data?.error === 1) {
      return rejectWithValue(response?.data?.data as ErrorResponse[]);
    }
    return response.data;
  }
);

const registerSlice = createSlice({
  name: "registerSlice",
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as ErrorResponse[];
      });
  },
});

export const { resetState } = registerSlice.actions;

export default registerSlice.reducer;
