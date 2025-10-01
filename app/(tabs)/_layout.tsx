import { Tabs } from "expo-router";
import React, { useRef, useState } from "react";

import { HapticTab } from "@/components/haptic-tab";
import PriceAddress from "@/components/home/PriceAddress";
import SvgLogo from "@/components/svg/SvgLogo";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, Text, View } from "react-native";
import { Modal, Portal, TextInput } from "react-native-paper";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const inputRef = useRef(null);

  return (
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
            <View className="p-1 -mt-5 flex-row items-center gap-2 h-10">
              <SvgLogo />
              <View className="">
                <TextInput
                  ref={inputRef}
                  mode="outlined"
                  placeholder="Bạn muốn mu..."
                  style={{ height: 38, width: 160 }}
                  left={<TextInput.Icon icon="magnify" size={25} />}
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
            <Pressable className="p-2 -mt-5 ">
              <FontAwesome name="bell" size={24} color="white" />
              <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full items-center justify-center">
                <Text className="text-white">3</Text>
              </View>
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: "#d70119",
          },

          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="tag.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Danh mục",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
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
            <IconSymbol size={28} name="cart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
