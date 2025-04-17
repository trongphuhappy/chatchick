import axiosInstance from "@/tools/api";

export const GetTwoNotificationFriendApi = () => {
  return axiosInstance.get("/api/notification/get_two_notification_friend");
};
