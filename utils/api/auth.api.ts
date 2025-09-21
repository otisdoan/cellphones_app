import { TokenResponse } from "expo-auth-session/build/TokenRequest";
import { API_URL } from "../../constants/API_URL";
import type {
  LoginFormType,
  LoginResponse,
  RegisterFormType,
  RegisterResponse,
  UserProps,
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
  loginByGoogle: async (token: TokenResponse) => {
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
