import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { productApi } from "@/utils/api/product.api";
import type { ProductProps } from "@/types/api";

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const query = (params.q as string) || "";

  const [searchQuery, setSearchQuery] = useState(query);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("#d70018");
    }, [])
  );

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getAll();
      const productsData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setProducts(productsData);

      if (query) {
        const filtered = productsData.filter((product: ProductProps) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchQuery && products.length > 0) {
      filterProducts(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, products]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      filterProducts(searchQuery);
    }
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("vi-VN").format(numPrice);
  };

  const getProductImage = (product: ProductProps) => {
    if (product.product_image && product.product_image.length > 0) {
      return product.product_image[0];
    }
    return "https://via.placeholder.com/300x300?text=No+Image";
  };

  const navigateToProduct = (id: number) => {
    router.push(`/product/${id}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#d70018" />

      {/* Header with Search */}
      <View className="bg-red-600 px-4 py-4">
        <View className="flex-row items-center gap-x-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <View className="flex-1 bg-white rounded-lg flex-row items-center px-3 py-2">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2 text-gray-900 text-base"
              placeholder="Tìm kiếm sản phẩm..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={handleSearch}>
            <Text className="text-white font-medium">Tìm</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Results Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <Text className="text-lg font-bold text-gray-900">
          {searchQuery ? (
            <>
              Kết quả cho:{" "}
              <Text className="text-red-600">&quot;{searchQuery}&quot;</Text>
            </>
          ) : (
            "Tìm kiếm sản phẩm"
          )}
        </Text>
        <Text className="text-sm text-gray-600 mt-1">
          {loading
            ? "Đang tìm kiếm..."
            : `Tìm thấy ${filteredProducts.length} sản phẩm`}
        </Text>
      </View>

      {/* Content */}
      <ScrollView className="flex-1">
        {loading ? (
          // Loading State
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#d70018" />
            <Text className="text-gray-600 mt-3">Đang tải sản phẩm...</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          // Empty State
          <View className="bg-white rounded-xl mx-4 mt-4 p-12">
            <View className="items-center">
              <Ionicons name="search-outline" size={80} color="#D1D5DB" />
              <Text className="text-gray-900 text-lg font-semibold mt-6 mb-2">
                {searchQuery
                  ? "Không tìm thấy sản phẩm phù hợp"
                  : "Nhập từ khóa để tìm kiếm"}
              </Text>
              <Text className="text-gray-500 text-center">
                {searchQuery
                  ? "Vui lòng thử lại với từ khóa khác"
                  : "Tìm kiếm điện thoại, laptop, tablet..."}
              </Text>
            </View>
          </View>
        ) : (
          // Products Grid
          <View className="px-4 pt-4">
            <View className="flex-row flex-wrap justify-between">
              {filteredProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  className="w-[48%] bg-white rounded-xl mb-4 overflow-hidden border border-gray-100"
                  activeOpacity={0.7}
                  onPress={() => navigateToProduct(product.id)}
                >
                  {/* Product Image */}
                  <View className="relative bg-white p-4">
                    <View className="aspect-square items-center justify-center">
                      <Image
                        source={{ uri: getProductImage(product) }}
                        className="w-full h-full"
                        resizeMode="contain"
                        onError={(e) => {
                          // @ts-ignore
                          e.currentTarget.src =
                            "https://via.placeholder.com/300x300?text=No+Image";
                        }}
                      />
                    </View>

                    {/* Sale Badge */}
                    {product.sale_price &&
                      parseFloat(product.sale_price) <
                        parseFloat(product.price) && (
                        <View className="absolute top-2 left-2">
                          <View className="bg-red-600 px-2 py-1 rounded-md">
                            <Text className="text-white text-xs font-bold">
                              GIẢM GIÁ
                            </Text>
                          </View>
                        </View>
                      )}
                  </View>

                  {/* Product Info */}
                  <View className="p-3 border-t border-gray-100">
                    {/* Product Name */}
                    <Text
                      className="text-sm font-medium text-gray-900 mb-2"
                      numberOfLines={2}
                      style={{ height: 40 }}
                    >
                      {product.name}
                    </Text>

                    {/* Price */}
                    <View className="mb-2">
                      <Text className="text-red-600 font-bold text-base">
                        {formatPrice(product.sale_price || product.price)}đ
                      </Text>
                      {product.sale_price &&
                        parseFloat(product.sale_price) <
                          parseFloat(product.price) && (
                          <Text className="text-gray-400 text-xs line-through mt-1">
                            {formatPrice(product.price)}đ
                          </Text>
                        )}
                    </View>

                    {/* Stock Status */}
                    <View className="pt-2 border-t border-gray-100">
                      {product.status === "active" ? (
                        <Text className="text-xs text-green-600 font-medium">
                          ✓ Còn hàng
                        </Text>
                      ) : (
                        <Text className="text-xs text-red-600 font-medium">
                          ✗ Hết hàng
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Bottom Spacing */}
            <View className="h-4" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
