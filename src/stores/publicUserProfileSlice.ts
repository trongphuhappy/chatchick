import {
  GetNineFriendsApi,
  GetNineImagesApi,
  GetNumbersOfFriendApi,
  GetProfilePublicApi,
} from "@/apis/user/profile-public";
import {
  GetStatusFriendApi,
  PutAcceptFriendApi,
  PostAddFriendApi,
  PutRejectFriendApi,
  DeleteUnfriendApi,
} from "@/apis/user/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface GetProfileUserData {
  userId: string;
}
export interface GetStatusFriendData {
  userId: string;
}
export interface GetNumbersOfFriendData {
  userId: string;
}
export interface GetNineImagesData {
  userId: string;
}
export interface GetNineFriendsData {
  userId: string;
}
export interface PostStatusFriendData {
  userId: string;
}
export interface PostAcceptFriendData {
  userReceiveId: string;
}

export interface DataProfile {
  userId: string;
  fullName: string;
  cropCoverPhoto?: string;
  cropAvatar?: string;
  numbersOfFriend?: number;
}

export interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
  data?: DataProfile;
}

export interface InitialState {
  status: string;
  statusAddFriendStatus?: string;
  statusGetFriendStatus?: string;
  statusGetNumbersOfFriend?: string;
  statusGetNineImages?: string;
  statusGetNineFriends?: string;
  statusAcceptFriend?: string;
  statusRejectFriend?: string;
  statusDeleteFriend?: string;
  error?: ErrorResponse[] | null;
  data: DataProfile;
}

let initialState: InitialState = {
  status: "idle",
  statusAddFriendStatus: "idle",
  statusGetFriendStatus: "idle",
  statusGetNumbersOfFriend: "idle",
  statusGetNineImages: "idle",
  statusGetNineFriends: "idle",
  statusAcceptFriend: "idle",
  statusRejectFriend: "idle",
  statusDeleteFriend: "idle",
  error: null,
  data: {
    userId: "",
    fullName: "",
    cropCoverPhoto: "",
    cropAvatar: "",
    numbersOfFriend: 0,
  },
};

export const getProfileUserThunk = createAsyncThunk(
  "user/getProfileUser",
  async (data: GetProfileUserData, { rejectWithValue }) => {
    try {
      const response = await GetProfilePublicApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const getStatusFriendThunk = createAsyncThunk(
  "user/getStatusFriend",
  async (data: GetStatusFriendData, { rejectWithValue }) => {
    try {
      const response = await GetStatusFriendApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const getNumbersOfFriendThunk = createAsyncThunk(
  "user/getNumbersOfFriend",
  async (data: GetNumbersOfFriendData, { rejectWithValue }) => {
    try {
      const response = await GetNumbersOfFriendApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const getNineImagesThunk = createAsyncThunk(
  "user/getNineImages",
  async (data: GetNineImagesData, { rejectWithValue }) => {
    try {
      const response = await GetNineImagesApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const getNineFriendsThunk = createAsyncThunk(
  "user/GetNineFriends",
  async (data: GetNineFriendsData, { rejectWithValue }) => {
    try {
      const response = await GetNineFriendsApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const postAddFriendThunk = createAsyncThunk(
  "user/postAddFriend",
  async (data: PostStatusFriendData, { rejectWithValue }) => {
    try {
      const response = await PostAddFriendApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const putAcceptFriendThunk = createAsyncThunk(
  "user/postAcceptFriend",
  async (data: PostAcceptFriendData, { rejectWithValue }) => {
    try {
      const response = await PutAcceptFriendApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const putRejectFriendThunk = createAsyncThunk(
  "user/postRejectFriend",
  async (data: PostAcceptFriendData, { rejectWithValue }) => {
    try {
      const response = await PutRejectFriendApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const deleteUnfriendThunk = createAsyncThunk(
  "user/deleteUnfriend",
  async (data: PostAcceptFriendData, { rejectWithValue }) => {
    try {
      const response = await DeleteUnfriendApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

const publicUserProfileSlice = createSlice({
  name: "publicUserProfileSlice",
  initialState: initialState,
  reducers: {
    clearCoverPhotoUser: (state) => {
      if (state.data) {
        state.data.cropCoverPhoto = "";
      }
    },
    setCoverPhotoUser: (state, action) => {
      if (state.data) {
        state.data.cropCoverPhoto =
          action.payload &&
          `${process.env.NEXT_PUBLIC_SERVER}/${process.env.NEXT_PUBLIC_SERVER_GET_IMAGE}${action.payload}`;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfileUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.data) {
          const { cropCoverPhoto, cropAvatar, userId, fullName } =
            action.payload.data;
          state.data.userId = userId;
          state.data.fullName = fullName;
          state.data.cropCoverPhoto = `${process.env.NEXT_PUBLIC_SERVER}/${process.env.NEXT_PUBLIC_SERVER_GET_IMAGE}${cropCoverPhoto}`;
          state.data.cropAvatar = `${process.env.NEXT_PUBLIC_SERVER}/${process.env.NEXT_PUBLIC_SERVER_GET_IMAGE}${cropAvatar}`;
          state.error = null;
        }
      })
      .addCase(getProfileUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as ErrorResponse[];
      })
      //  ======================
      .addCase(getStatusFriendThunk.pending, (state) => {
        state.statusGetFriendStatus = "loading";
      })
      .addCase(getStatusFriendThunk.fulfilled, (state, action) => {
        state.statusGetFriendStatus = "succeeded";
      })
      .addCase(getStatusFriendThunk.rejected, (state, action) => {
        state.statusGetFriendStatus = "failed";
        state.error = action.payload as ErrorResponse[];
      })
      //  ======================
      .addCase(getNumbersOfFriendThunk.pending, (state) => {
        state.statusGetNumbersOfFriend = "loading";
      })
      .addCase(getNumbersOfFriendThunk.fulfilled, (state, action) => {
        state.statusGetNumbersOfFriend = "succeeded";
        state.data.numbersOfFriend = action.payload?.data;
      })
      .addCase(getNumbersOfFriendThunk.rejected, (state, action) => {
        state.statusGetNumbersOfFriend = "failed";
        state.error = action.payload as ErrorResponse[];
      })
      //  ======================
      .addCase(postAddFriendThunk.pending, (state) => {
        state.statusAddFriendStatus = "loading";
      })
      .addCase(postAddFriendThunk.fulfilled, (state, action) => {
        state.statusAddFriendStatus = "succeeded";
      })
      .addCase(postAddFriendThunk.rejected, (state, action) => {
        state.statusAddFriendStatus = "failed";
        state.error = action.payload as ErrorResponse[];
      })
      //  ======================
      .addCase(putAcceptFriendThunk.pending, (state) => {
        state.statusAcceptFriend = "loading";
      })
      .addCase(putAcceptFriendThunk.fulfilled, (state) => {
        state.statusAcceptFriend = "succeeded";
      })
      .addCase(putAcceptFriendThunk.rejected, (state, action) => {
        state.statusAcceptFriend = "failed";
        state.error = action.payload as ErrorResponse[];
      })
      //  ======================
      .addCase(putRejectFriendThunk.pending, (state) => {
        state.statusRejectFriend = "loading";
      })
      .addCase(putRejectFriendThunk.fulfilled, (state) => {
        state.statusRejectFriend = "succeeded";
      })
      .addCase(putRejectFriendThunk.rejected, (state, action) => {
        state.statusRejectFriend = "failed";
        state.error = action.payload as ErrorResponse[];
      })
      //  ======================
      .addCase(deleteUnfriendThunk.pending, (state) => {
        state.statusDeleteFriend = "loading";
      })
      .addCase(deleteUnfriendThunk.fulfilled, (state) => {
        state.statusDeleteFriend = "succeeded";
      })
      .addCase(deleteUnfriendThunk.rejected, (state, action) => {
        state.statusDeleteFriend = "failed";
        state.error = action.payload as ErrorResponse[];
      })
      //  ======================
      .addCase(getNineImagesThunk.pending, (state) => {
        state.statusGetNineImages = "loading";
      })
      .addCase(getNineImagesThunk.fulfilled, (state) => {
        state.statusGetNineImages = "succeeded";
      })
      .addCase(getNineImagesThunk.rejected, (state, action) => {
        state.statusGetNineImages = "failed";
        state.error = action.payload as ErrorResponse[];
      })
      //  ======================
      .addCase(getNineFriendsThunk.pending, (state) => {
        state.statusGetNineFriends = "loading";
      })
      .addCase(getNineFriendsThunk.fulfilled, (state) => {
        state.statusGetNineFriends = "succeeded";
      })
      .addCase(getNineFriendsThunk.rejected, (state, action) => {
        state.statusGetNineFriends = "failed";
        state.error = action.payload as ErrorResponse[];
      });
  },
});

export const { clearCoverPhotoUser, setCoverPhotoUser } =
  publicUserProfileSlice.actions;

export default publicUserProfileSlice.reducer;
