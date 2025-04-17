import { RefreshTokenApi } from "@/apis/auth/auth";
import { store } from "@/stores/store";
import { resetUserState } from "@/stores/userSlice";
import axios from "axios"

let axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER
});

axiosInstance.defaults.timeout = 1000 * 60 * 10;
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use((config) => {
    const accessTokenLocalStorage = window.localStorage.getItem("accessToken");
    if (accessTokenLocalStorage) {
        const parseAccessToken = JSON.parse(accessTokenLocalStorage);
        if (parseAccessToken?.tokenType && parseAccessToken?.accessToken) {
            config.headers.Authorization = `${parseAccessToken?.tokenType} ${parseAccessToken?.accessToken}`
        }
    }

    return config;
}, (error) => {
    return Promise.reject();
})

let refreshTokenPromise: any = null;

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    if (error?.response?.status === 401 && error?.config) {
        if (!refreshTokenPromise) {
            refreshTokenPromise = RefreshTokenApi().then((res: any) => {
                window.localStorage.setItem(
                    "accessToken",
                    JSON.stringify(res?.data?.data?.token)
                );
                axiosInstance.defaults.headers.Authorization = `${res?.data?.data?.tokenType} ${res?.data?.data?.accessToken}`
            }).catch((err: any) => {
                window.localStorage.setItem(
                    "accessToken",
                    JSON.stringify("")
                );
                store.dispatch(resetUserState());
                location.href = "/";
                return Promise.reject(err);
            }).finally(() => {
                refreshTokenPromise = null;
            })
        }

        return refreshTokenPromise?.then(() => {
            return axiosInstance(error?.config);
        })
    }

    return Promise.reject(error);
})



export default axiosInstance;