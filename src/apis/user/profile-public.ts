import axiosInstance from "@/tools/api";

export const GetProfilePublicApi = (form: any) => {
  return axiosInstance.get(
    `/api/profile/get_profile_public?userId=${form.userId}`
  );
};

export const GetNumbersOfFriendApi = (form: any) => {
  return axiosInstance.get(
    `/api/profile/get_numbers_friend?userId=${form.userId}`
  );
};

export const GetNineImagesApi = (form: any) => {
  return axiosInstance.get(
    `/api/profile/get_nine_images?userId=${form.userId}`
  );
};

export const GetNineFriendsApi = (form: any) => {
  return axiosInstance.get(
    `/api/profile/get_nine_friends?userId=${form.userId}`
  );
};