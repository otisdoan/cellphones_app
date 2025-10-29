import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductCommitments: React.FC = () => {
  const commitments = [
    {
      icon: "phone-portrait-outline",
      content:
        "Máy mới 100%, chính hãng Apple Việt Nam. CellphoneS hiện là đại lý bán lẻ uỷ quyền iPhone chính hãng VN/A của Apple Việt Nam",
    },
    {
      icon: "shield-checkmark-outline",
      content:
        "1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo hành 12 tháng tại trung tâm bảo hành chính hãng Apple: CareS.vn",
    },
    {
      icon: "hardware-chip-outline",
      content: "iPhone sử dụng iOS 18, Cáp Sạc USB‑C (1m), Tài liệu",
    },
    {
      icon: "pricetag-outline",
      content:
        "Giá sản phẩm đã bao gồm thuế VAT, giúp bạn yên tâm và dễ dàng trong việc tính toán chi phí.",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cam kết sản phẩm</Text>
      <View style={styles.commitmentGrid}>
        {commitments.map((item, index) => (
          <View key={index} style={styles.commitmentCard}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon as any} size={20} color="#fff" />
            </View>
            <Text style={styles.commitmentText}>{item.content}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  commitmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  commitmentCard: {
    width: "48%",
    backgroundColor: "#f7f7f8",
    borderRadius: 12,
    padding: 16,
    minHeight: 140,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#d70019",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  commitmentText: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 18,
  },
});

export default ProductCommitments;
