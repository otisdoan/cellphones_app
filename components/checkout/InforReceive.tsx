import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InforReceiveProps {
  onSubmit: (data: {
    name: string;
    phone: string;
    address: string;
    note: string;
    delivery_method: "home" | "store";
  }) => void;
}

const InforReceive: React.FC<InforReceiveProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    delivery_method: "home" as "home" | "store",
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    // Auto submit on change
    onSubmit(newData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>THÔNG TIN NHẬN HÀNG</Text>
      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tên người nhận *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên người nhận"
            value={formData.name}
            onChangeText={(value) => handleChange("name", value)}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Số điện thoại *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại"
            value={formData.phone}
            onChangeText={(value) => handleChange("phone", value)}
            keyboardType="phone-pad"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Địa chỉ nhận hàng *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Nhập địa chỉ chi tiết"
            value={formData.address}
            onChangeText={(value) => handleChange("address", value)}
            multiline
            numberOfLines={3}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ghi chú đơn hàng</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Nhập ghi chú (nếu có)"
            value={formData.note}
            onChangeText={(value) => handleChange("note", value)}
            multiline
            numberOfLines={2}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <Text style={styles.deliveryTitle}>Phương thức nhận hàng</Text>
        <View style={styles.deliveryOptions}>
          <TouchableOpacity
            style={[
              styles.deliveryOption,
              formData.delivery_method === "home" && styles.deliveryOptionActive,
            ]}
            onPress={() => handleChange("delivery_method", "home")}
          >
            <Ionicons
              name={
                formData.delivery_method === "home"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={formData.delivery_method === "home" ? "#d70019" : "#9ca3af"}
            />
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryLabel}>Giao tận nơi</Text>
              <Text style={styles.deliveryDesc}>Miễn phí vận chuyển</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.deliveryOption,
              formData.delivery_method === "store" && styles.deliveryOptionActive,
            ]}
            onPress={() => handleChange("delivery_method", "store")}
          >
            <Ionicons
              name={
                formData.delivery_method === "store"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={formData.delivery_method === "store" ? "#d70019" : "#9ca3af"}
            />
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryLabel}>Nhận tại cửa hàng</Text>
              <Text style={styles.deliveryDesc}>Miễn phí</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1f2937",
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  deliveryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 8,
    marginBottom: 12,
  },
  deliveryOptions: {
    gap: 12,
  },
  deliveryOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
  },
  deliveryOptionActive: {
    borderColor: "#d70019",
    backgroundColor: "#fef2f2",
  },
  deliveryTextContainer: {
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 2,
  },
  deliveryDesc: {
    fontSize: 12,
    color: "#6b7280",
  },
});

export default InforReceive;
