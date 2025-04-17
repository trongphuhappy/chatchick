import axiosInstance from "@/tools/api";

export const RegisterApi = async (form: object) => {
  return axiosInstance.post("/api/auth/register", form);
};

export const ActiveAccountApi = async (form: { email: string }) => {
  return axiosInstance.get(`/api/auth/active_account?email=${form.email}`);
};

export const LoginApi = async (form: object) => {
  return axiosInstance.post("/api/auth/login", form);
};

export const LogoutApi = async () => {
  return axiosInstance.delete("/api/auth/logout");
};

export const RefreshTokenApi = async () => {
  return axiosInstance.put("/api/auth/refresh_token");
};
