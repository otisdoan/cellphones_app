import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import LoginPromptModal from "@/components/modals/LoginPromptModal";
import CartItemCard from "@/components/cart/CartItemCard";
import CartEmptyState from "@/components/cart/CartEmptyState";
import CartBottomBar from "@/components/cart/CartBottomBar";

export default function CartScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    cartItems,
    totalCart,
    isLoading,
    updateQuantity,
    deleteItem,
    toggleItemCheck,
    toggleAllCheck,
    getCheckedItems,
    getTotalPrice,
    getSavedAmount,
  } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  const handleIncrease = async (item: any) => {
    try {
      await updateQuantity(item.cart_item_id, item.quantity + 1);
    } catch {
      Alert.alert("Lỗi", "Không thể cập nhật số lượng");
    }
  };

  const handleDecrease = async (item: any) => {
    if (item.quantity <= 1) return;
    try {
      await updateQuantity(item.cart_item_id, item.quantity - 1);
    } catch {
      Alert.alert("Lỗi", "Không thể cập nhật số lượng");
    }
  };

  const handleDelete = (item: any) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteItem(item.cart_item_id);
            } catch {
              Alert.alert("Lỗi", "Không thể xóa sản phẩm");
            }
          },
        },
      ]
    );
  };

  const handleCheckout = () => {
    const checkedItems = getCheckedItems();
    if (checkedItems.length === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn sản phẩm để thanh toán");
      return;
    }
    // TODO: Navigate to checkout page
    Alert.alert("Thông báo", "Chức năng thanh toán đang được phát triển");
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <LoginPromptModal
          visible={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
            router.push("/(tabs)");
          }}
        />
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d70019" />
        </View>
      </SafeAreaView>
    );
  }

  if (totalCart === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <CartEmptyState />
      </SafeAreaView>
    );
  }

  const allChecked = cartItems.every((item) => item.checked);
  const checkedItems = getCheckedItems();
  const totalPrice = getTotalPrice();
  const savedAmount = getSavedAmount();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng của bạn</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Select All */}
        <View style={styles.selectAllContainer}>
          <TouchableOpacity
            onPress={toggleAllCheck}
            style={[styles.checkbox, allChecked && styles.checkboxChecked]}
          >
            {allChecked && <Ionicons name="checkmark" size={16} color="#fff" />}
          </TouchableOpacity>
          <Text style={styles.selectAllText}>Chọn tất cả</Text>
        </View>

        {/* Cart Items */}
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onToggleCheck={() => toggleItemCheck(item.id)}
            onIncrease={() => handleIncrease(item)}
            onDecrease={() => handleDecrease(item)}
            onDelete={() => handleDelete(item)}
          />
        ))}

        {/* Bottom Spacing for Bottom Bar */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <CartBottomBar
        totalPrice={totalPrice}
        savedAmount={savedAmount}
        checkedCount={checkedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        )}
        hasCheckedItems={checkedItems.length > 0}
        onCheckout={handleCheckout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#d70019",
    borderColor: "#d70019",
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
    marginLeft: 8,
  },
});
