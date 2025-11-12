import { API_URL } from "../../constants/API_URL";
import type { OrderProps, OrderResponse } from "../../types/api";
import axiosInstance from "../axios";

export interface CreateOrderPayload {
  order_number: string;
  user_id: string;
  guest_email: string;
  guest_phone: string;
  status: string;
  payment_status: string;
  payment_method: string;
  subtotal: string;
  discount_amount: string;
  shipping_fee: string;
  tax_amount: string;
  total_amount: string;
  currency: string;
  notes: string;
  items: {
    product_id: number;
    variant_id: number | null;
    product_name: string;
    variant_name: string | null;
    sku: string;
    price: number;
    sale_price: number;
    quantity: number;
    image_url: string | null;
  }[];
}

export const orderApi = {
  getAll: async () => {
    const response = await axiosInstance.get<OrderResponse<OrderProps>>(
      API_URL.ORDER
    );
    return response.data;
  },
  getById: async (id: number | string) => {
    const response = await axiosInstance.get<OrderResponse<OrderProps>>(
      `${API_URL.ORDER}/${id}`
    );
    return response.data;
  },
  create: async (payload: CreateOrderPayload | OrderProps) => {
    const response = await axiosInstance.post<OrderResponse<OrderProps>>(
      API_URL.ORDER,
      payload
    );
    return response.data;
  },
  update: async (id: number | string, payload: Partial<OrderProps>) => {
    const response = await axiosInstance.put<OrderResponse<OrderProps>>(
      `${API_URL.ORDER}/${id}`,
      payload
    );
    return response.data;
  },
  delete: async (id: number | string) => {
    const response = await axiosInstance.delete<OrderResponse<OrderProps>>(
      `${API_URL.ORDER}/${id}`
    );
    return response.data;
  },
};
