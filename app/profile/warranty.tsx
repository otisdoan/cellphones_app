import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

interface WarrantyResult {
  serial: string;
  product: string;
  status: "active" | "expired" | "not_found";
  startDate?: string;
  endDate?: string;
  months?: number;
}

export default function WarrantyCheck() {
  const [serial, setSerial] = useState("");
  const [result, setResult] = useState<WarrantyResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!serial.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setResult({
        serial: serial,
        product: "iPhone 15 Pro Max 256GB",
        status: "active",
        startDate: "2024-01-15",
        endDate: "2025-01-15",
        months: 12,
      });
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status: WarrantyResult["status"]) => {
    const badges = {
      active: { text: "Còn bảo hành", color: "bg-green-100 text-green-800" },
      expired: { text: "Hết bảo hành", color: "bg-red-100 text-red-800" },
      not_found: {
        text: "Không tìm thấy",
        color: "bg-gray-100 text-gray-800",
      },
    };
    return badges[status];
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="bg-red-600 px-4 py-6">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold flex-1">
              Tra cứu bảo hành
            </Text>
          </View>
        </View>

        <View className="p-4 space-y-4">
          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-sm text-gray-600">
              Nhập số Serial/IMEI để kiểm tra thông tin bảo hành sản phẩm
            </Text>
          </View>

          <View className="bg-white rounded-lg shadow-sm p-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Số Serial/IMEI <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              value={serial}
              onChangeText={setSerial}
              placeholder="Nhập số Serial hoặc IMEI"
              className="border border-gray-300 rounded-lg px-4 py-3 mb-3 text-sm"
              onSubmitEditing={handleCheck}
            />
            <Text className="text-xs text-gray-500 mb-3">
              Số Serial/IMEI thường có 15 ký tự, bạn có thể tìm ở mặt sau máy
              hoặc trong hộp sản phẩm
            </Text>
            <TouchableOpacity
              onPress={handleCheck}
              disabled={loading || !serial.trim()}
              className={`rounded-lg py-3 items-center ${
                loading || !serial.trim() ? "bg-gray-300" : "bg-red-600"
              }`}
            >
              <Text className="text-white font-semibold">
                {loading ? "Đang kiểm tra..." : "Tra cứu"}
              </Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View className="bg-white rounded-lg shadow-sm p-4">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Kết quả tra cứu
              </Text>

              <View className="border border-gray-200 rounded-lg p-4 space-y-4">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className="text-sm text-gray-500">
                      Số Serial/IMEI
                    </Text>
                    <Text className="text-base font-semibold text-gray-900 mt-1">
                      {result.serial}
                    </Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      getStatusBadge(result.status).color
                    }`}
                  >
                    <Text className="text-xs font-medium">
                      {getStatusBadge(result.status).text}
                    </Text>
                  </View>
                </View>

                <View className="border-t border-gray-100 pt-4">
                  <Text className="text-sm text-gray-500">Sản phẩm</Text>
                  <Text className="text-base font-medium text-gray-900 mt-1">
                    {result.product}
                  </Text>
                </View>

                {result.status === "active" && (
                  <>
                    <View className="flex-row gap-4 border-t border-gray-100 pt-4">
                      <View className="flex-1">
                        <Text className="text-sm text-gray-500">
                          Ngày kích hoạt
                        </Text>
                        <Text className="text-base font-medium text-gray-900 mt-1">
                          {new Date(result.startDate!).toLocaleDateString(
                            "vi-VN"
                          )}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm text-gray-500">
                          Ngày hết hạn
                        </Text>
                        <Text className="text-base font-medium text-gray-900 mt-1">
                          {new Date(result.endDate!).toLocaleDateString(
                            "vi-VN"
                          )}
                        </Text>
                      </View>
                    </View>

                    <View className="border-t border-gray-100 pt-4">
                      <Text className="text-sm text-gray-500">
                        Thời gian bảo hành
                      </Text>
                      <Text className="text-base font-medium text-red-600 mt-1">
                        {result.months} tháng
                      </Text>
                    </View>

                    <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <View className="flex-row gap-3">
                        <Ionicons
                          name="information-circle"
                          size={20}
                          color="#2563eb"
                        />
                        <View className="flex-1">
                          <Text className="text-sm font-medium text-blue-900">
                            Lưu ý về bảo hành
                          </Text>
                          <Text className="text-xs text-blue-700 mt-1">
                            Vui lòng mang theo hóa đơn mua hàng và sản phẩm đến
                            trung tâm bảo hành gần nhất để được hỗ trợ.
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
