import { LoginFormType } from "@/types/type";
import { authApi } from "@/utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View, Alert } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";

const loginSchema = yup.object({
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc!")
    .matches(/^[0-9]{10}$/, "Số điện thoại phải có đúng 10 số!"),
  password_login: yup.string().required("Mật khẩu là bắt buộc!"),
});

export default function LoginForm() {
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormType) => {
    try {
      const result = await authApi.login(data);
      console.log("Login result:", result);
      
      if (result.status === "success" && result.data) {
        // Check if data contains user and token, or is the user itself
        const userData = (result.data as any).user || result.data;
        const token = (result.data as any).token || "temp_token";
        
        // Save to AuthContext
        await login(userData, token);
        
        Alert.alert("Thành công", "Đăng nhập thành công!", [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]);
      }
    } catch (error: any) {
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Đăng nhập thất bại"
      );
      console.log(error);
    }
  };

  return (
    <View className="flex gap-y-4">
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              mode="outlined"
              placeholder="Nhập số điện thoại"
              label="Số điện thoại"
              outlineStyle={{ borderColor: "#e0e1e2" }}
              theme={{
                colors: {
                  primary: "black",
                },
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </>
        )}
      />
      {errors.phone && (
        <View className="-mt-4">
          <HelperText type="error">{errors.phone.message}</HelperText>
        </View>
      )}
      <Controller
        control={control}
        name="password_login"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              mode="outlined"
              placeholder="Nhập mật khẩu"
              label="Mật khẩu"
              outlineStyle={{ borderColor: "#e0e1e2" }}
              theme={{
                colors: {
                  primary: "black",
                },
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              right={
                showPassword ? (
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => setShowPassword(false)}
                  />
                ) : (
                  <TextInput.Icon
                    icon="eye-off"
                    onPress={() => setShowPassword(true)}
                  />
                )
              }
            />
          </>
        )}
      />
      {errors.password_login && (
        <View className="-mt-4">
          <HelperText type="error">{errors.password_login.message}</HelperText>
        </View>
      )}

      <View className="flex items-end mb-5">
        <Link href="/(tabs)">
          <Text>Quên mật khẩu?</Text>
        </Link>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        className="rounded-sm "
        buttonColor="#d70119"
        style={{ borderRadius: 4 }}
      >
        Đăng nhập
      </Button>

      <View className="flex flex-row justify-center gap-x-4 mt-5">
        <Text>Bạn chưa có tài khoản?</Text>
        <Link href="/(auth)/register">
          <Text className="text-[#d70119]">Đăng ký ngay</Text>
        </Link>
      </View>
    </View>
  );
}
