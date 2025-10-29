import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { productAttributeApi } from "../../utils/api/product_attribute.api";
import type { ProductAttributeProps } from "../../types/api";
import { Ionicons } from "@expo/vector-icons";

interface AttributeProductProps {
  id_product: number | undefined;
}

const AttributeProduct: React.FC<AttributeProductProps> = ({ id_product }) => {
  const [attribute, setAttribute] = useState<ProductAttributeProps[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const getAttribute = async () => {
    try {
      const result = await productAttributeApi.getByProductId(id_product);
      if (Array.isArray(result.data)) {
        setAttribute(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttribute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_product]);

  const displayedAttributes = showAll ? attribute : attribute.slice(0, 5);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thông số kỹ thuật</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => setShowAll(!showAll)}
        >
          <Text style={styles.viewAllText}>
            {showAll ? "Thu gọn" : "Xem tất cả"}
          </Text>
          <Ionicons
            name={showAll ? "chevron-up" : "chevron-forward"}
            size={16}
            color="#4488f6"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.table}>
        {displayedAttributes.map((item, index) => (
          <View
            key={index}
            style={[
              styles.row,
              index % 2 === 0 ? styles.evenRow : styles.oddRow,
            ]}
          >
            <View style={styles.labelCell}>
              <Text style={styles.labelText}>{item.attribute_name}</Text>
            </View>
            <View style={styles.valueCell}>
              <Text style={styles.valueText}>{item.attribute_value}</Text>
            </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 12,
    color: "#4488f6",
    marginRight: 4,
  },
  table: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  evenRow: {
    backgroundColor: "#f9fafb",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  labelCell: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  labelText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#374151",
  },
  valueCell: {
    flex: 2,
    padding: 12,
  },
  valueText: {
    fontSize: 13,
    color: "#6b7280",
  },
});

export default AttributeProduct;
