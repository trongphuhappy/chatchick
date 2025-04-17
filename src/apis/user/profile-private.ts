import {
  DataUpdateBiography,
  DataUpdateEmail,
  DataUpdateFullName,
} from "@/stores/userProfileSlice";
import axiosInstance from "@/tools/api";

export const GetProfilePrivateApi = () => {
  return axiosInstance.get("/api/profile/get_profile_private");
};

export const UpdateEmailUserApi = (form: DataUpdateEmail) => {
  return axiosInstance.post("/api/profile/update_email", form);
};

export const ActiveUpdateEmailUserApi = (form: DataUpdateEmail) => {
  return axiosInstance.get(
    `/api/profile/active_update_email?email=${form.email}`
  );
};

export const UpdateFullNameUserApi = (form: DataUpdateFullName) => {
  return axiosInstance.post(`/api/profile/update_fullname`, form);
};

export const UpdateBiographyUserApi = (form: DataUpdateBiography) => {
  return axiosInstance.post(`/api/profile/update_biography`, form);
};

export const UpdateAvatarUserApi = (form: any) => {
  return axiosInstance.post(`/api/profile/update_avatar`, form);
};

export const UpdateCoverPhotoUserApi = (form: any) => {
  return axiosInstance.post(`/api/profile/update_cover_photo`, form);
};