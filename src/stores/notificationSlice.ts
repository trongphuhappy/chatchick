import { GetTwoNotificationFriendApi } from "@/apis/user/notification";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
}

export interface InitialNotificationFriendProps {
  userId: string;
  fullName: string;
  cropAvatar: string;
}

export interface InitialState {
  status: string;
  statusNotificationFriend: string;
  error?: ErrorResponse[] | null;
  countNotification: number;
  initialNotificationFriend?: InitialNotificationFriendProps | null;
}

let initialState: InitialState = {
  status: "idle",
  statusNotificationFriend: "idle",
  error: null,
  countNotification: 0,
  initialNotificationFriend: {
    userId: "",
    fullName: "",
    cropAvatar: "",
  },
};

export const GetTwoNotificationFriendThunk = createAsyncThunk(
  "auth/GetFourNotificationFriend",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetTwoNotificationFriendApi();
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: initialState,
  reducers: {
    setCountNotification: (state, action) => {
      state.countNotification = action.payload.countNotification;
    },
    setNotificationFriend: (state, action) => {
      if (state.initialNotificationFriend) {
        (state.initialNotificationFriend.userId = action.payload.userId),
          (state.initialNotificationFriend.fullName = action.payload.fullName);
        state.initialNotificationFriend.cropAvatar = `${process.env.NEXT_PUBLIC_SERVER}/${process.env.NEXT_PUBLIC_SERVER_GET_IMAGE}${action.payload.cropAvatar}`;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTwoNotificationFriendThunk.pending, (state) => {
        state.statusNotificationFriend = "loading";
      })
      .addCase(GetTwoNotificationFriendThunk.fulfilled, (state) => {
        state.statusNotificationFriend = "succeeded";
        state.error = null;
      })
      .addCase(GetTwoNotificationFriendThunk.rejected, (state) => {
        state.statusNotificationFriend = "failed";
      });
  },
});

export const { setCountNotification, setNotificationFriend } =
  notificationSlice.actions;

export default notificationSlice.reducer;
