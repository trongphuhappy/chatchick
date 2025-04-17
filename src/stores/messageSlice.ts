import {
  getMessageHistoryApi,
  getTheseFriendsMessagedApi,
} from "@/apis/user/message";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Stethoscope } from "lucide-react";

export interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
}

export interface ContentDataProps {
  senderId: string;
  receiverId: string;
  content: string;
}

// export interface MessageProps {
//   items: Array<ContentDataProps>;
//   next: boolean;
//   pageIndex: number;
//   pageSize: number;
//   previous: boolean;
//   totalItemsCount: number;
//   totalPagesCount: number;
// }

export interface BoxMessage {
  userId: string;
  avatar: string;
  fullName: string;
  active: boolean;
  messages: Array<ContentDataProps>;
}

export interface GetMessageHistoryUserThunkData {
  userReceiveId: string;
}

export interface InitialState {
  status: string;
  statusGetTheseFriend: string;
  boxMessages: Array<BoxMessage>;
  error?: ErrorResponse[] | null;
}

let initialState: InitialState = {
  status: "idle",
  statusGetTheseFriend: "idle",
  boxMessages: [],
  error: null,
};

export const getMessageHistoryUserThunk = createAsyncThunk(
  "auth/getMessageHistoryUser",
  async (
    data: GetMessageHistoryUserThunkData,
    { dispatch, rejectWithValue }
  ) => {
    const response = await getMessageHistoryApi(data);
    if (response?.data?.error === 1) {
      return rejectWithValue(response?.data?.data as ErrorResponse[]);
    }
    dispatch(
      PushMessage({
        userId: data.userReceiveId,
        data: response.data?.data,
      })
    );
  }
);

export const getTheseFriendsMessagedThunk = createAsyncThunk(
  "auth/getTheseFriendsMessaged",
  async (_, {}) => {
    const response = await getTheseFriendsMessagedApi();
    return response?.data;
  }
);

const messageSlice = createSlice({
  name: "messageSlice",
  initialState: initialState,
  reducers: {
    OpenMessage: (state, action) => {
      const { userId, fullName, avatar } = action?.payload;
      const index = state.boxMessages.findIndex(
        (state: BoxMessage) => state?.userId === userId
      );
      if (index === -1) {
        state.boxMessages.unshift({
          userId: userId,
          avatar: avatar,
          fullName: fullName,
          active: true,
          messages: [],
        });
      } else {
        state.boxMessages[index].active = true;
      }
    },
    CloseMessage: (state, action) => {
      const { userId } = action.payload;
      const index = state.boxMessages.findIndex(
        (state: BoxMessage) => state?.userId === userId
      );
      state.boxMessages.splice(index, 1);
    },
    HideMessage: (state, action) => {
      const { userId } = action.payload;
      const index = state.boxMessages.findIndex(
        (state: BoxMessage) => state?.userId === userId
      );
      state.boxMessages[index].active = false;
    },
    UnHideMessage: (state, action) => {
      const { userId } = action.payload;
      const index = state.boxMessages.findIndex(
        (state: BoxMessage) => state?.userId === userId
      );
      state.boxMessages[index].active = true;
    },
    PushMessage: (state, action) => {
      const { userId, data } = action.payload;
      if (data?.length > 0) {
        const index = state.boxMessages.findIndex(
          (state: BoxMessage) => state?.userId === userId
        );
        if (index !== -1) {
          state.boxMessages[index].messages = data;
        }
      }
    },
    GetMessage: (state, action) => {
      const { userId, data } = action.payload;
      const index = state.boxMessages.findIndex(
        (state: BoxMessage) => state?.userId === userId
      );
      if (index !== -1) {
        state.boxMessages[index].messages.push(data);
      } else {
        getMessageHistoryUserThunk({
          userReceiveId: userId,
        });
      }
    },
    ResetMessengerState: (state) => {
      state.status = "idle";
      state.boxMessages = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessageHistoryUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMessageHistoryUserThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getMessageHistoryUserThunk.rejected, (state) => {
        state.status = "failed";
      })
      // ================
      .addCase(getTheseFriendsMessagedThunk.pending, (state) => {
        state.statusGetTheseFriend = "loading";
      })
      .addCase(getTheseFriendsMessagedThunk.fulfilled, (state) => {
        state.statusGetTheseFriend = "succeeded";
      })
      .addCase(getTheseFriendsMessagedThunk.rejected, (state) => {
        state.statusGetTheseFriend = "failed";
      });
  },
});

export const {
  OpenMessage,
  CloseMessage,
  HideMessage,
  UnHideMessage,
  PushMessage,
  GetMessage,
  ResetMessengerState,
} = messageSlice.actions;

export default messageSlice.reducer;
