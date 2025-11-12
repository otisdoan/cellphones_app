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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categoryApi } from "@/utils/api/category.api";

type CategoryMobileType = {
  title: string;
  brand: { name: string; logo_url: string }[];
} & {
  title: string;
  price: { content: string }[];
} & {
  title: string;
  products: { name: string }[];
};

export default function CategoryScreen() {
  const [activeTab, setActiveTab] = useState<"smartphone" | "tablet">(
    "smartphone"
  );
  const [smartphoneCategory, setSmartphoneCategory] = useState<
    CategoryMobileType[]
  >([]);
  const [tabletCategory, setTabletCategory] = useState<CategoryMobileType[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("#d70018");
    }, [])
  );

  const fetchCategories = async () => {
    try {
      setLoading(true);

      // Fetch smartphone categories
      const smartphoneResponse = await categoryApi.getCategoryMobile();
      if (Array.isArray(smartphoneResponse.data)) {
        setSmartphoneCategory(
          smartphoneResponse.data as unknown as CategoryMobileType[]
        );
      }

      // Fetch tablet categories
      const tabletResponse = await categoryApi.getCategoryTabletMobile();
      if (Array.isArray(tabletResponse.data)) {
        setTabletCategory(
          tabletResponse.data as unknown as CategoryMobileType[]
        );
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCategory = (categories: CategoryMobileType[]) => {
    return (
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-900">
            {activeTab === "smartphone" ? "Điện thoại" : "Tablet"}
          </Text>
          <Text className="text-sm text-gray-600">Xem tất cả</Text>
        </View>

        <View className="gap-y-6">
          {categories.map((item, index) => {
            // Section 1: Brands với logo
            if (index === 0 && item.brand) {
              return (
                <View key={index}>
                  <Text className="font-bold text-base mb-3 text-gray-900">
                    {item.title}
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12 }}
                  >
                    {item.brand.map((brand, brandIndex) => (
                      <TouchableOpacity
                        key={brandIndex}
                        className="border border-gray-200 rounded-lg p-3 h-12 min-w-[80px] items-center justify-center"
                        activeOpacity={0.7}
                      >
                        {brand.logo_url ? (
                          <Image
                            source={{ uri: brand.logo_url }}
                            className="w-full h-full"
                            resizeMode="contain"
                          />
                        ) : (
                          <Text className="text-xs text-gray-700">
                            {brand.name}
                          </Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              );
            }

            // Section 2: Price ranges
            if (index === 1 && item.price) {
              return (
                <View key={index}>
                  <Text className="font-bold text-base mb-3 text-gray-900">
                    {item.title}
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8 }}
                  >
                    {item.price.map((price, priceIndex) => (
                      <TouchableOpacity
                        key={priceIndex}
                        className="border border-gray-200 rounded-lg px-4 py-2 h-10 items-center justify-center"
                        activeOpacity={0.7}
                      >
                        <Text className="text-xs text-gray-700 whitespace-nowrap">
                          {price.content}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              );
            }

            // Section 3: Products
            if (index === 2 && item.products) {
              return (
                <View key={index}>
                  <Text className="font-bold text-base mb-3 text-gray-900">
                    {item.title}
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8 }}
                  >
                    {item.products.map((product, productIndex) => (
                      <TouchableOpacity
                        key={productIndex}
                        className="border border-gray-200 rounded-lg px-4 py-2 h-10 items-center justify-center"
                        activeOpacity={0.7}
                      >
                        <Text className="text-xs text-gray-700 whitespace-nowrap">
                          {product.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              );
            }

            return null;
          })}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="light-content" backgroundColor="#d70018" />
        <View className="bg-red-600 px-4 py-6">
          <Text className="text-white text-xl font-bold">Danh mục</Text>
          <Text className="text-white/80 text-sm mt-1">
            Khám phá sản phẩm theo danh mục
          </Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#d70018" />
          <Text className="text-gray-600 mt-3">Đang tải danh mục...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#d70018" />

      {/* Header */}
      <View className="bg-red-600 px-4 py-6">
        <Text className="text-white text-xl font-bold">Danh mục</Text>
        <Text className="text-white/80 text-sm mt-1">
          Khám phá sản phẩm theo danh mục
        </Text>
      </View>

      {/* Tabs */}
      <View className="bg-white border-b border-gray-200">
        <View className="flex-row px-4">
          <TouchableOpacity
            className={`py-4 px-4 border-b-2 ${
              activeTab === "smartphone"
                ? "border-red-600"
                : "border-transparent"
            }`}
            onPress={() => setActiveTab("smartphone")}
          >
            <Text
              className={`font-medium text-sm ${
                activeTab === "smartphone" ? "text-red-600" : "text-gray-500"
              }`}
            >
              Điện thoại
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-4 px-4 border-b-2 ${
              activeTab === "tablet" ? "border-red-600" : "border-transparent"
            }`}
            onPress={() => setActiveTab("tablet")}
          >
            <Text
              className={`font-medium text-sm ${
                activeTab === "tablet" ? "text-red-600" : "text-gray-500"
              }`}
            >
              Tablet
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 bg-white">
        {activeTab === "smartphone" && renderCategory(smartphoneCategory)}
        {activeTab === "tablet" && renderCategory(tabletCategory)}
      </ScrollView>
    </SafeAreaView>
  );
}
