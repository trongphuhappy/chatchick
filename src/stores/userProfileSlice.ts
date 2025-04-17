import {
  ActiveUpdateEmailUserApi,
  GetProfilePrivateApi,
  UpdateAvatarUserApi,
  UpdateBiographyUserApi,
  UpdateCoverPhotoUserApi,
  UpdateEmailUserApi,
  UpdateFullNameUserApi,
} from "@/apis/user/profile-private";
import {
  clearCoverPhotoUser,
  setCoverPhotoUser,
} from "@/stores/publicUserProfileSlice";
import {
  clearAvatarUser,
  setAvatarUser,
  setFullNameUser,
} from "@/stores/userSlice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface DataProfilePrivate {
  userId: string;
  fullName: string;
  email: string;
  biography?: string | null;
  cropAvatar?: string;
  fullAvatar?: string;
}

export interface DataUpdateEmail {
  email: string;
}

export interface DataUpdateFullName {
  fullName: string;
}

export interface DataUpdateBiography {
  biography: string;
}

export interface DataUpdateAvatar {
  oldFileName: string;
  fileName: string;
  cropFileAvatar: File;
  fullFileAvatar: File;
}

export interface DataUpdateCoverPhoto {
  oldFileName: string;
  cropFileCoverPhoto: File;
  fullFileCoverPhoto: File;
}

export interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
}

export interface InitialState {
  profilePrivate: {
    status: string;
    statusUpdateEmail?: string;
    statusActiveUpdateEmail?: string;
    statusUpdateFullName?: string;
    statusUpdateBiography?: string;
    statusUpdateAvatar?: string;
    statusUpdateCoverPhoto?: string;
    data?: DataProfilePrivate;
    error?: ErrorResponse[] | null;
  };
}

let initialState: InitialState = {
  profilePrivate: {
    status: "idle",
    statusUpdateEmail: "idle",
    statusActiveUpdateEmail: "idle",
    statusUpdateFullName: "idle",
    statusUpdateBiography: "idle",
    statusUpdateAvatar: "idle",
    statusUpdateCoverPhoto: "idle",
    error: null,
    data: {
      userId: "",
      fullName: "",
      email: "",
      biography: null,
      cropAvatar: "",
      fullAvatar: "",
    },
  },
};

export const getProfilePrivateThunk = createAsyncThunk(
  "user/getProfilePrivate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetProfilePrivateApi();
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const updateEmailThunk = createAsyncThunk(
  "user/updateEmail",
  async (data: DataUpdateEmail, { rejectWithValue }) => {
    try {
      const response = await UpdateEmailUserApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const activeUpdateEmailThunk = createAsyncThunk(
  "user/activeUpdateEmail",
  async (data: DataUpdateEmail, { rejectWithValue }) => {
    try {
      const response = await ActiveUpdateEmailUserApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const UpdateFullNameThunk = createAsyncThunk(
  "user/updateFullName",
  async (data: DataUpdateFullName, { rejectWithValue, dispatch }) => {
    try {
      const response = await UpdateFullNameUserApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      dispatch(setFullNameUser(response?.data?.data));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const UpdateBiographyThunk = createAsyncThunk(
  "user/updateBiography",
  async (data: DataUpdateBiography, { rejectWithValue }) => {
    try {
      const response = await UpdateBiographyUserApi(data);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const updateAvatarThunk = createAsyncThunk(
  "user/updateAvatar",
  async (data: DataUpdateAvatar, { rejectWithValue, dispatch }) => {
    dispatch(clearAvatarUser());
    try {
      let formData = new FormData();
      formData.append("fileName", data.fileName);
      formData.append("cropFileAvatar", data.cropFileAvatar);
      formData.append("fullFileAvatar", data.fullFileAvatar);

      const response = await UpdateAvatarUserApi(formData);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      dispatch(setAvatarUser(response.data?.data));
      return response.data;
    } catch (err: any) {
      dispatch(setAvatarUser(data.oldFileName));
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

export const updateCoverPhotoThunk = createAsyncThunk(
  "user/updateCoverPhoto",
  async (data: DataUpdateCoverPhoto, { rejectWithValue, dispatch }) => {
    dispatch(clearCoverPhotoUser());
    try {
      let formData = new FormData();
      formData.append("cropFileCoverPhoto", data.cropFileCoverPhoto);
      formData.append("fullFileCoverPhoto", data.fullFileCoverPhoto);

      const response = await UpdateCoverPhotoUserApi(formData);
      if (response?.data?.error === 1) {
        return rejectWithValue(response?.data?.data as ErrorResponse[]);
      }
      dispatch(setCoverPhotoUser(response.data?.data));
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.data as ErrorResponse[]);
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfileSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfilePrivateThunk.pending, (state) => {
        state.profilePrivate.status = "loading";
      })
      .addCase(getProfilePrivateThunk.fulfilled, (state, action) => {
        state.profilePrivate.status = "succeeded";
        state.profilePrivate.data = action.payload.data;
        state.profilePrivate.error = null;
      })
      .addCase(getProfilePrivateThunk.rejected, (state, action) => {
        state.profilePrivate.status = "failed";
        state.profilePrivate.error = action.payload as ErrorResponse[];
      })
      .addCase(updateEmailThunk.pending, (state) => {
        state.profilePrivate.statusUpdateEmail = "loading";
      })
      .addCase(updateEmailThunk.fulfilled, (state) => {
        state.profilePrivate.statusUpdateEmail = "succeeded";
        state.profilePrivate.error = null;
      })
      .addCase(updateEmailThunk.rejected, (state) => {
        state.profilePrivate.statusUpdateEmail = "failed";
      })
      .addCase(activeUpdateEmailThunk.pending, (state) => {
        state.profilePrivate.statusActiveUpdateEmail = "loading";
      })
      .addCase(activeUpdateEmailThunk.fulfilled, (state) => {
        state.profilePrivate.statusActiveUpdateEmail = "succeeded";
        state.profilePrivate.error = null;
      })
      .addCase(activeUpdateEmailThunk.rejected, (state) => {
        state.profilePrivate.statusActiveUpdateEmail = "failed";
      })
      .addCase(UpdateFullNameThunk.pending, (state) => {
        state.profilePrivate.statusUpdateFullName = "loading";
      })
      .addCase(UpdateFullNameThunk.fulfilled, (state) => {
        state.profilePrivate.statusUpdateFullName = "succeeded";
        state.profilePrivate.error = null;
      })
      .addCase(UpdateFullNameThunk.rejected, (state) => {
        state.profilePrivate.statusUpdateFullName = "failed";
      })
      .addCase(UpdateBiographyThunk.pending, (state) => {
        state.profilePrivate.statusUpdateBiography = "loading";
      })
      .addCase(UpdateBiographyThunk.fulfilled, (state) => {
        state.profilePrivate.statusUpdateBiography = "succeeded";
        state.profilePrivate.error = null;
      })
      .addCase(UpdateBiographyThunk.rejected, (state) => {
        state.profilePrivate.statusUpdateBiography = "failed";
      })
      .addCase(updateAvatarThunk.pending, (state) => {
        state.profilePrivate.statusUpdateAvatar = "loading";
      })
      .addCase(updateAvatarThunk.fulfilled, (state) => {
        state.profilePrivate.statusUpdateAvatar = "succeeded";
        state.profilePrivate.error = null;
      })
      .addCase(updateAvatarThunk.rejected, (state) => {
        state.profilePrivate.statusUpdateAvatar = "failed";
      })
      .addCase(updateCoverPhotoThunk.pending, (state) => {
        state.profilePrivate.statusUpdateCoverPhoto = "loading";
      })
      .addCase(updateCoverPhotoThunk.fulfilled, (state) => {
        state.profilePrivate.statusUpdateCoverPhoto = "succeeded";
        state.profilePrivate.error = null;
      })
      .addCase(updateCoverPhotoThunk.rejected, (state) => {
        state.profilePrivate.statusUpdateCoverPhoto = "failed";
      });
  },
});

export const {} = userProfileSlice.actions;

export default userProfileSlice.reducer;
