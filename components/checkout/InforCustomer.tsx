import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const InforCustomer = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>THÔNG TIN KHÁCH HÀNG</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user?.full_name?.toUpperCase()}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>S-MEM</Text>
            </View>
          </View>
          <Text style={styles.phone}>{user?.phone}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={user?.email}
            editable={false}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <Text style={styles.note}>
          (*) Hóa đơn VAT sẽ được gửi qua email này
        </Text>

        <View style={styles.checkboxContainer}>
          <Ionicons name="checkbox" size={20} color="#d70019" />
          <Text style={styles.checkboxLabel}>
            Nhận email thông báo và ưu đãi từ CellphoneS
          </Text>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  badge: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4dccad",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#4dccad",
    fontSize: 10,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 14,
    color: "#6b7280",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 10,
    color: "#9ca3af",
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
    fontSize: 14,
    color: "#1f2937",
  },
  note: {
    fontSize: 11,
    color: "#9ca3af",
    fontStyle: "italic",
    marginVertical: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#1f2937",
    flex: 1,
  },
});

export default InforCustomer;
