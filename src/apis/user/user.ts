import axiosInstance from "@/tools/api";

export const GetStatusFriendApi = (form: any) => {
  return axiosInstance.get(
    `/api/user/get_status_friend?friendUserId=${form.userId}`
  );
};

export const PostAddFriendApi = (form: any) => {
  return axiosInstance.post(`/api/user/add_friend?friendUserId=${form.userId}`);
};

export const PutAcceptFriendApi = (form: any) => {
  return axiosInstance.put(
    `/api/user/accept_friend?userReceiveId=${form?.userReceiveId}`
  );
};

export const PutRejectFriendApi = (form: any) => {
  return axiosInstance.put(
    `/api/user/reject_friend?userReceiveId=${form?.userReceiveId}`
  );
};

export const DeleteUnfriendApi = (form: any) => {
  return axiosInstance.delete(
    `/api/user/unfriend?userReceiveId=${form?.userReceiveId}`
  );
};
