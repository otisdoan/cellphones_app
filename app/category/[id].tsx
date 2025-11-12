import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { productApi } from "@/utils/api/product.api";
import type { ProductProps } from "@/types/api";

type PriceRange = {
  label: string;
  min: number;
  max: number;
};

// Category name mapping
const CATEGORY_NAMES: Record<number, string> = {
  1: "Điện thoại",
  3: "Laptop",
  4: "Phụ kiện",
  5: "Tivi",
  6: "PC, Màn hình",
  7: "Âm thanh",
  8: "Gia dụng",
  9: "Đồng hồ thông minh",
  10: "Tablet",
  11: "Camera",
};

export default function CategoryProductsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"default" | "price_asc" | "price_desc">(
    "default"
  );

  // Filter states
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<PriceRange | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

  const priceRanges: PriceRange[] = [
    { label: "Dưới 2 triệu", min: 0, max: 2000000 },
    { label: "Từ 2 - 4 triệu", min: 2000000, max: 4000000 },
    { label: "Từ 4 - 7 triệu", min: 4000000, max: 7000000 },
    { label: "Từ 7 - 13 triệu", min: 7000000, max: 13000000 },
    { label: "Từ 13 - 20 triệu", min: 13000000, max: 20000000 },
    { label: "Trên 20 triệu", min: 20000000, max: Infinity },
  ];

  const fetchCategoryAndProducts = async () => {
    try {
      setLoading(true);
      const categoryId = Number(id);

      // Fetch products by category
      const productsResponse = await productApi.getByCategory(categoryId);
      if (Array.isArray(productsResponse.data)) {
        setProducts(productsResponse.data);

        // Extract unique brands
        const brands = Array.from(
          new Set(
            productsResponse.data
              .map((p: ProductProps) => p.brand_id)
              .filter(Boolean)
          )
        ) as string[];
        setAvailableBrands(brands);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryAndProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString("vi-VN");
  };

  const getSortedProducts = () => {
    let filtered = [...products];

    // Filter by price range
    if (selectedPriceRange) {
      filtered = filtered.filter((product) => {
        const price = Number(product.sale_price || product.price);
        return (
          price >= selectedPriceRange.min && price <= selectedPriceRange.max
        );
      });
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand_id)
      );
    }

    // Sort
    if (sortBy === "price_asc") {
      return filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price_desc") {
      return filtered.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return filtered;
  };

  const toggleBrand = (brandId: string) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  const clearFilters = () => {
    setSelectedPriceRange(null);
    setSelectedBrands([]);
    setShowFilterModal(false);
  };

  const applyFilters = () => {
    setShowFilterModal(false);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedPriceRange) count++;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    return count;
  };

  const navigateToProduct = (productId: number) => {
    router.push(`/product/${productId}` as any);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="bg-red-600 px-4 py-6">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold flex-1">
              Danh mục
            </Text>
          </View>
        </View>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#d70018" />
          <Text className="text-gray-600 mt-3">Đang tải sản phẩm...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-red-600 px-4 py-6">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-white text-xl font-bold">
              {CATEGORY_NAMES[Number(id)] || "Danh mục"}
            </Text>
            <Text className="text-white/80 text-sm">
              {products.length} sản phẩm
            </Text>
          </View>
        </View>
      </View>

      {/* Sort & Filter Bar */}
      <View className="bg-white px-4 py-3 flex-row items-center justify-between border-b border-gray-200">
        <TouchableOpacity
          className="flex-row items-center px-3 py-2 bg-gray-100 rounded-lg"
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="filter" size={18} color="#374151" />
          <Text className="text-gray-700 font-medium ml-2">Lọc</Text>
          {getActiveFilterCount() > 0 && (
            <View className="ml-2 bg-red-600 rounded-full px-2 py-0.5">
              <Text className="text-white text-xs font-bold">
                {getActiveFilterCount()}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View className="flex-row gap-2">
          <TouchableOpacity
            className={`px-3 py-2 rounded-lg ${
              sortBy === "default" ? "bg-red-600" : "bg-gray-100"
            }`}
            onPress={() => setSortBy("default")}
          >
            <Text
              className={`text-sm ${
                sortBy === "default"
                  ? "text-white font-semibold"
                  : "text-gray-700"
              }`}
            >
              Mặc định
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-3 py-2 rounded-lg ${
              sortBy === "price_asc" ? "bg-red-600" : "bg-gray-100"
            }`}
            onPress={() => setSortBy("price_asc")}
          >
            <Text
              className={`text-sm ${
                sortBy === "price_asc"
                  ? "text-white font-semibold"
                  : "text-gray-700"
              }`}
            >
              Giá tăng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-3 py-2 rounded-lg ${
              sortBy === "price_desc" ? "bg-red-600" : "bg-gray-100"
            }`}
            onPress={() => setSortBy("price_desc")}
          >
            <Text
              className={`text-sm ${
                sortBy === "price_desc"
                  ? "text-white font-semibold"
                  : "text-gray-700"
              }`}
            >
              Giá giảm
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {products.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="cube-outline" size={80} color="#D1D5DB" />
            <Text className="text-xl font-semibold text-gray-900 mt-6 mb-2">
              Chưa có sản phẩm
            </Text>
            <Text className="text-gray-500 text-center px-8">
              Danh mục này chưa có sản phẩm nào
            </Text>
          </View>
        ) : (
          <View className="px-4 pt-4">
            <View className="flex-row flex-wrap justify-between">
              {getSortedProducts().map((product) => (
                <Pressable
                  key={product.id}
                  className="w-[48%] bg-white rounded-lg p-3 mb-4 shadow-sm border border-gray-100"
                  onPress={() => navigateToProduct(product.id)}
                >
                  {/* Product Image */}
                  <View className="h-32 mb-2">
                    <Image
                      source={{
                        uri: product.product_image
                          ? product.product_image[0]
                          : "",
                      }}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  </View>

                  {/* Product Name */}
                  <Text
                    className="text-sm font-bold text-gray-900 mb-2"
                    numberOfLines={2}
                  >
                    {product.name}
                  </Text>

                  {/* Price */}
                  <View className="flex-row items-center mb-2">
                    <Text className="text-base font-bold text-red-600 mr-2">
                      {formatPrice(product.price)}đ
                    </Text>
                    <Text className="text-xs line-through text-gray-400">
                      {formatPrice(product.cost_price)}đ
                    </Text>
                  </View>

                  {/* Badges */}
                  <View className="mb-2">
                    <View className="bg-blue-50 px-2 py-1 rounded mb-1">
                      <Text className="text-xs text-blue-700">
                        Smember giảm đến 450.000đ
                      </Text>
                    </View>
                  </View>

                  {/* Footer */}
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <AntDesign name="star" size={12} color="#ffd531" />
                      <Text className="text-xs text-gray-600 ml-1">
                        {product.rating_average}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <AntDesign name="heart" size={12} color="#3c82f6" />
                      <Text className="text-xs text-blue-500 ml-1">
                        Yêu thích
                      </Text>
                    </View>
                  </View>

                  {/* Discount Badge */}
                  <View className="absolute top-0 left-2 bg-red-600 px-2 py-1 rounded">
                    <Text className="text-white text-xs font-bold">
                      Giảm 14%
                    </Text>
                  </View>

                  {/* Installment Badge */}
                  <View className="absolute top-0 right-0 bg-blue-500 px-2 py-1 rounded">
                    <Text className="text-white text-xs font-bold">
                      Trả góp 0%
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Bottom Spacing */}
        <View className="h-4" />
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl max-h-[80%]">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-gray-900">Bộ lọc</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <ScrollView className="px-4 py-4">
              {/* Price Range Filter */}
              <View className="mb-6">
                <Text className="text-base font-bold text-gray-900 mb-3">
                  Khoảng giá
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {priceRanges.map((range, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedPriceRange?.label === range.label
                          ? "bg-red-600 border-red-600"
                          : "bg-white border-gray-300"
                      }`}
                      onPress={() =>
                        setSelectedPriceRange(
                          selectedPriceRange?.label === range.label
                            ? null
                            : range
                        )
                      }
                    >
                      <Text
                        className={`text-sm ${
                          selectedPriceRange?.label === range.label
                            ? "text-white font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {range.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Brand Filter */}
              {availableBrands.length > 0 && (
                <View className="mb-6">
                  <Text className="text-base font-bold text-gray-900 mb-3">
                    Thương hiệu
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {availableBrands.map((brandId) => (
                      <TouchableOpacity
                        key={brandId}
                        className={`px-4 py-2 rounded-lg border ${
                          selectedBrands.includes(brandId)
                            ? "bg-red-600 border-red-600"
                            : "bg-white border-gray-300"
                        }`}
                        onPress={() => toggleBrand(brandId)}
                      >
                        <Text
                          className={`text-sm ${
                            selectedBrands.includes(brandId)
                              ? "text-white font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {brandId}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Modal Footer */}
            <View className="flex-row items-center gap-3 px-4 py-4 border-t border-gray-200">
              <TouchableOpacity
                className="flex-1 px-4 py-3 bg-gray-100 rounded-lg"
                onPress={clearFilters}
              >
                <Text className="text-center text-gray-700 font-semibold">
                  Xóa bộ lọc
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 px-4 py-3 bg-red-600 rounded-lg"
                onPress={applyFilters}
              >
                <Text className="text-center text-white font-semibold">
                  Áp dụng ({getSortedProducts().length})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
