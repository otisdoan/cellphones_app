import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type PaymentMethod = "cod" | "transfer" | "wallet" | "card";

interface OptionPaymentProps {
  selectedMethod?: PaymentMethod;
  onMethodChange?: (method: PaymentMethod) => void;
}

const OptionPayment: React.FC<OptionPaymentProps> = ({
  selectedMethod: externalMethod,
  onMethodChange,
}) => {
  const [internalMethod, setInternalMethod] = useState<PaymentMethod>("cod");
  
  const selectedMethod = externalMethod !== undefined ? externalMethod : internalMethod;

  const handleSelect = (method: PaymentMethod) => {
    if (onMethodChange) {
      onMethodChange(method);
    } else {
      setInternalMethod(method);
    }
  };

  const paymentMethods = [
    {
      id: "cod" as PaymentMethod,
      label: "Thanh toán khi nhận hàng (COD)",
      icon: "cash-outline" as const,
      desc: "Thanh toán bằng tiền mặt khi nhận hàng",
    },
    {
      id: "transfer" as PaymentMethod,
      label: "Chuyển khoản ngân hàng",
      icon: "card-outline" as const,
      desc: "Chuyển khoản qua ATM/Internet Banking",
    },
    {
      id: "wallet" as PaymentMethod,
      label: "Ví điện tử",
      icon: "wallet-outline" as const,
      desc: "MoMo, ZaloPay, VNPay",
    },
    {
      id: "card" as PaymentMethod,
      label: "Thẻ tín dụng/ghi nợ",
      icon: "card" as const,
      desc: "Visa, Mastercard, JCB",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PHƯƠNG THỨC THANH TOÁN</Text>
      <View style={styles.card}>
        {paymentMethods.map((method, index) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.option,
              selectedMethod === method.id && styles.optionActive,
              index < paymentMethods.length - 1 && styles.optionBorder,
            ]}
            onPress={() => handleSelect(method.id)}
          >
            <Ionicons
              name={
                selectedMethod === method.id
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={selectedMethod === method.id ? "#d70019" : "#9ca3af"}
            />
            <View style={styles.iconContainer}>
              <Ionicons
                name={method.icon}
                size={24}
                color={selectedMethod === method.id ? "#d70019" : "#6b7280"}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>{method.label}</Text>
              <Text style={styles.desc}>{method.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1f2937",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  optionActive: {
    backgroundColor: "#fef2f2",
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 2,
  },
  desc: {
    fontSize: 12,
    color: "#6b7280",
  },
});

export default OptionPayment;
