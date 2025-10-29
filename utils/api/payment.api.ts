import { API_URL } from "../../constants/API_URL";
import axiosInstance from "../axios";

export interface PaymentProps {
  orderCode: number;
  amount: number;
  description: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface PaymentResponse {
  checkoutUrl?: string;
  status?: string;
  message?: string;
}

export const paymentApi = {
  checkout: async (payload: PaymentProps) => {
    const response = await axiosInstance.post<PaymentResponse>(
      API_URL.PAYMENT,
      payload
    );
    return response.data;
  },
};
