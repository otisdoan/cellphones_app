import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { productVariantApi } from "../../utils/api/product_variant.api";
import type {
  ProductVariantCapacity,
  ProductVatiantProp,
} from "../../types/api";
import { Ionicons } from "@expo/vector-icons";

interface OptionProductProps {
  group_name: string;
  onVariantChange?: (variantId: number, variantImage: string) => void;
}

const OptionProduct: React.FC<OptionProductProps> = ({
  group_name,
  onVariantChange,
}) => {
  const [capacity, setCapacity] = useState<ProductVariantCapacity[]>([]);
  const [variant, setVariant] = useState<ProductVatiantProp[]>([]);
  const [currentCapacity, setCurrentCapacity] = useState<number>(0);
  const [currentVariant, setCurrentVariant] = useState<number>(0);

  const getVariant = async () => {
    try {
      const result = await productVariantApi.getCapacity(group_name);
      if (Array.isArray(result.data)) {
        setCapacity(result.data);
        if (result.data.length > 0) {
          handleCapacity(result.data[0].capacity, 0);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCapacity = async (capacity: string, index: number) => {
    try {
      setCurrentCapacity(index);
      const result = await productVariantApi.getVariantByCapacity(
        capacity,
        group_name
      );
      if (Array.isArray(result.data)) {
        setVariant(result.data);
        setCurrentVariant(0);
        // Auto select first variant
        if (result.data.length > 0 && onVariantChange) {
          onVariantChange(result.data[0].id, result.data[0].image_url);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVariant = (
    index: number,
    variantId: number,
    image_url: string
  ) => {
    setCurrentVariant(index);
    if (onVariantChange) {
      onVariantChange(variantId, image_url);
    }
  };

  useEffect(() => {
    getVariant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group_name]);

  return (
    <View style={styles.container}>
      {/* Capacity Selection */}
      <Text style={styles.sectionTitle}>Phiên bản</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.capacityContainer}
      >
        {capacity.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.capacityButton,
              currentCapacity === index && styles.capacityButtonActive,
            ]}
            onPress={() => handleCapacity(item.capacity, index)}
          >
            <Text
              style={[
                styles.capacityText,
                currentCapacity === index && styles.capacityTextActive,
              ]}
            >
              {item.capacity}
            </Text>
            {currentCapacity === index && (
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark" size={14} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Color/Variant Selection */}
      <Text style={[styles.sectionTitle, styles.colorTitle]}>Màu sắc</Text>
      <View style={styles.variantContainer}>
        {variant.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.variantCard,
              currentVariant === index && styles.variantCardActive,
            ]}
            onPress={() => handleVariant(index, item.id, item.image_url)}
          >
            <Image
              source={{ uri: item.image_url }}
              style={styles.variantImage}
              resizeMode="contain"
            />
            <View style={styles.variantInfo}>
              <Text style={styles.variantName} numberOfLines={1}>
                {item.variant_name}
              </Text>
              <Text style={styles.variantPrice}>
                {Number(item.price).toLocaleString("vi-VN")}đ
              </Text>
            </View>
            {currentVariant === index && (
              <View style={styles.checkIconVariant}>
                <Ionicons name="checkmark" size={14} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  colorTitle: {
    marginTop: 20,
  },
  capacityContainer: {
    flexDirection: "row",
  },
  capacityButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginRight: 12,
    position: "relative",
  },
  capacityButtonActive: {
    borderWidth: 2,
    borderColor: "#d70019",
  },
  capacityText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  capacityTextActive: {
    color: "#d70019",
  },
  checkIcon: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#d70019",
    borderRadius: 6,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  variantContainer: {
    gap: 12,
  },
  variantCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    position: "relative",
  },
  variantCardActive: {
    borderWidth: 2,
    borderColor: "#d70019",
  },
  variantImage: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  variantInfo: {
    flex: 1,
  },
  variantName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  variantPrice: {
    fontSize: 12,
    color: "#6b7280",
  },
  checkIconVariant: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#d70019",
    borderRadius: 6,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OptionProduct;
