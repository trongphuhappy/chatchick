import { ActiveAccountApi, RegisterApi } from "@/apis/auth/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Data {
  email: string;
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

export const activeAccount = createAsyncThunk(
  "auth/activeAccount",
  async (data: Data, { rejectWithValue }) => {
    const response = await ActiveAccountApi(data);
    if (response?.data?.error === 1) {
      return rejectWithValue(response?.data?.data as ErrorResponse[]);
    }
    return response.data;
  }
);

const activeAccountSlice = createSlice({
  name: "activeAccountSlice",
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(activeAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(activeAccount.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(activeAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as ErrorResponse[];
      });
  },
});

export const { resetState } = activeAccountSlice.actions;

export default activeAccountSlice.reducer;
