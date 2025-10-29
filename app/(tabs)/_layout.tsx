import { Tabs } from "expo-router";
import React, { useRef, useState } from "react";

import { HapticTab } from "@/components/haptic-tab";
import PriceAddress from "@/components/home/PriceAddress";
import SvgLogo from "@/components/svg/SvgLogo";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useCart } from "@/context/CartContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";
import { Modal, Portal, TextInput } from "react-native-paper";

export default function TabLayout() {
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const inputRef = useRef(null);
  const { totalCart } = useCart();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#d70119",
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Trang chủ",
            headerShown: true,
            headerTitle: "",
            headerLeft: () => (
              <View className="p-1 flex-row items-center gap-2 h-10">
                <SvgLogo />
                <View className="">
                  <TextInput
                    ref={inputRef}
                    mode="outlined"
                    placeholder="Bạn muốn mu..."
                    style={{ height: 38, width: 160, fontSize: 12 }}
                    left={<TextInput.Icon icon="magnify" size={20} />}
                    autoCapitalize="none"
                    theme={{ roundness: 7 }}
                  />
                </View>
                <Pressable onPress={() => setVisible(!visible)}>
                  <PriceAddress />
                </Pressable>
                <Portal>
                  <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={{
                      backgroundColor: "white",
                      padding: 20,
                      margin: 20,
                      borderRadius: 10,
                    }}
                  >
                    <Text>
                      Example Modal. Click outside this area to dismiss.
                    </Text>
                  </Modal>
                </Portal>
              </View>
            ),
            headerRight: () => (
              <Pressable className="p-2">
                <FontAwesome name="bell" size={24} color="white" />
                <View className="absolute -top-1 right-1 bg-orange-600 w-5 h-5 rounded-full items-center justify-center">
                  <Text className="text-white text-sm font-bold">4</Text>
                </View>
              </Pressable>
            ),
            headerStyle: {
              backgroundColor: "#d70119",
            },

            tabBarIcon: ({ color }) => (
              <AntDesign name="tags" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="category"
          options={{
            title: "Danh mục",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="category" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="store"
          options={{
            title: "Cửa hàng",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Giỏ hàng",
            tabBarIcon: ({ color }) => (
              <View>
                <AntDesign name="shopping-cart" size={24} color={color} />
                {totalCart > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -10,
                      backgroundColor: "#d70019",
                      borderRadius: 10,
                      minWidth: 20,
                      height: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 11,
                        fontWeight: "bold",
                      }}
                    >
                      {totalCart > 99 ? "99+" : totalCart}
                    </Text>
                  </View>
                )}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Tài khoản",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Cài đặt",
            tabBarIcon: ({ color }) => (
              <AntDesign name="setting" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
