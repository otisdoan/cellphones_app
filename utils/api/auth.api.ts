import { API_URL } from "../../constants/API_URL";
import type {
  LoginResponse,
  RegisterResponse,
  UserProps,
  LoginFormType,
  RegisterFormType,
} from "../../types/api";
import axiosInstance from "../axios";

export const authApi = {
  login: async (payload: LoginFormType) => {
    const response = await axiosInstance.post<LoginResponse<UserProps>>(
      API_URL.LOGIN,
      payload,
      { withCredentials: true }
    );
    return response.data;
  },
  register: async (payload: RegisterFormType) => {
    const response = await axiosInstance.post<RegisterResponse>(
      API_URL.REGISTER,
      payload
    );
    return response.data;
  },
  loginByGoogle: async (token: string | undefined) => {
    const response = await axiosInstance.post<LoginResponse<UserProps>>(
      API_URL.GOOGLE,
      {
        token,
      },
      { withCredentials: true }
    );
    return response.data;
  },
};
