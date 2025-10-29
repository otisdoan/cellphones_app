import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItemWithVariant } from "../types/api";

interface OrderAddress {
  name: string;
  phone: string;
  address: string;
  note?: string;
  delivery_method: "home" | "store";
}

interface OrderContextValue {
  orderItems: CartItemWithVariant[];
  orderAddress: OrderAddress | null;
  setOrderItems: (items: CartItemWithVariant[]) => Promise<void>;
  setOrderAddress: (address: OrderAddress) => Promise<void>;
  clearOrder: () => Promise<void>;
  getTotalAmount: () => number;
  getSavedAmount: () => number;
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orderItems, setOrderItemsState] = useState<CartItemWithVariant[]>([]);
  const [orderAddress, setOrderAddressState] = useState<OrderAddress | null>(
    null
  );

  // Load order data from AsyncStorage on mount
  useEffect(() => {
    loadOrderData();
  }, []);

  const loadOrderData = async () => {
    try {
      const [itemsJson, addressJson] = await Promise.all([
        AsyncStorage.getItem("orderItems"),
        AsyncStorage.getItem("orderAddress"),
      ]);

      if (itemsJson) {
        setOrderItemsState(JSON.parse(itemsJson));
      }
      if (addressJson) {
        setOrderAddressState(JSON.parse(addressJson));
      }
    } catch (error) {
      console.error("Error loading order data:", error);
    }
  };

  const setOrderItems = async (items: CartItemWithVariant[]) => {
    try {
      await AsyncStorage.setItem("orderItems", JSON.stringify(items));
      setOrderItemsState(items);
    } catch (error) {
      console.error("Error saving order items:", error);
    }
  };

  const setOrderAddress = async (address: OrderAddress) => {
    try {
      await AsyncStorage.setItem("orderAddress", JSON.stringify(address));
      setOrderAddressState(address);
    } catch (error) {
      console.error("Error saving order address:", error);
    }
  };

  const clearOrder = async () => {
    try {
      await AsyncStorage.multiRemove(["orderItems", "orderAddress"]);
      setOrderItemsState([]);
      setOrderAddressState(null);
    } catch (error) {
      console.error("Error clearing order:", error);
    }
  };

  const getTotalAmount = (): number => {
    return orderItems.reduce((total, item) => {
      return total + Number(item.sale_price) * item.quantity;
    }, 0);
  };

  const getSavedAmount = (): number => {
    return orderItems.reduce((total, item) => {
      const saved = (Number(item.price) - Number(item.sale_price)) * item.quantity;
      return total + saved;
    }, 0);
  };

  const value: OrderContextValue = {
    orderItems,
    orderAddress,
    setOrderItems,
    setOrderAddress,
    clearOrder,
    getTotalAmount,
    getSavedAmount,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
}
