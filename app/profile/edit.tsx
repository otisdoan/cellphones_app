import React from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProfile } from "@/context/ProfileContext";
import * as Yup from "yup";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  name: Yup.string().min(2, "Quá ngắn").max(50, "Quá dài").required("Bắt buộc"),
  bio: Yup.string().max(160, "Tối đa 160 ký tự").required("Bắt buộc"),
});

export default function EditProfileScreen() {
  const { profile, setProfile } = useProfile();

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: profile.name, bio: profile.bio },
    mode: "onChange",
  });

  React.useEffect(() => {
    reset({ name: profile.name, bio: profile.bio });
  }, [profile.name, profile.bio, reset]);

  return (
    <SafeAreaView>
      <View className="p-4 gap-3">
        <Text className="text-lg font-semibold text-neutral-900 dark:text-white">
          Chỉnh sửa hồ sơ
        </Text>
        <View className="gap-1">
          <Text className="text-neutral-700 dark:text-neutral-300">Tên</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                className="border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-neutral-900 dark:text-white"
                placeholder="Tên của bạn"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {formState.errors.name ? (
            <Text className="text-red-600 text-sm">
              {formState.errors.name.message as string}
            </Text>
          ) : null}
        </View>
        <View className="gap-1">
          <Text className="text-neutral-700 dark:text-neutral-300">
            Giới thiệu
          </Text>
          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                className="border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-neutral-900 dark:text-white"
                placeholder="Mô tả ngắn"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={4}
              />
            )}
          />
          {formState.errors.bio ? (
            <Text className="text-red-600 text-sm">
              {formState.errors.bio.message as string}
            </Text>
          ) : null}
        </View>
        <View className="flex-row gap-3 mt-2">
          <Text
            onPress={handleSubmit((values) =>
              setProfile((prev) => ({ ...prev, ...values }))
            )}
            className="flex-1 text-center bg-red-600 text-white rounded-xl px-4 py-3 font-semibold"
          >
            Lưu
          </Text>
          <Link
            href="/profile"
            className="flex-1 text-center bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-3 font-semibold text-neutral-900 dark:text-white items-center"
          >
            <Text>Huỷ</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
