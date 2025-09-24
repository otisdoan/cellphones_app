import { RegisterFormType } from "@/types/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import * as yup from "yup";

const registerSchema = yup.object({
  phone: yup
    .string()
    .required("Số điện thoại là bắt buộc!")
    .matches(/^[0-9]{10}$/, "Số điện thoại phải có đúng 10 số!"),
  full_name: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be at most 50 characters"),
  date_of_birth: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password_hash: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password_hash")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = (data: RegisterFormType) => console.log(data);

  return (
    <>
      <View className="flex gap-y-4">
        <Controller
          control={control}
          name="full_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Nhập họ và tên"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              mode="outlined"
              label={"Họ và tên (*)"}
              outlineStyle={{ borderColor: "#e0e1e2" }}
            />
          )}
        />
        {errors.full_name && (
          <View className="">
            <HelperText type="error">{errors.full_name.message}</HelperText>
          </View>
        )}

        <Controller
          control={control}
          name="date_of_birth"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Chọn ngày sinh"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value ? value.toString() : ""}
              mode="outlined"
              label={"Ngày sinh (*)"}
              outlineStyle={{ borderColor: "#e0e1e2" }}
            />
          )}
        />
        {errors.date_of_birth && (
          <View className="">
            <HelperText type="error">{errors.date_of_birth.message}</HelperText>
          </View>
        )}

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Nhập số điện thoại"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              mode="outlined"
              label={"Số điện thoại (*)"}
              outlineStyle={{ borderColor: "#e0e1e2" }}
            />
          )}
        />
        {errors.phone && (
          <View className="">
            <HelperText type="error">{errors.phone.message}</HelperText>
          </View>
        )}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Nhập email"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              mode="outlined"
              label={"Email (*)"}
              outlineStyle={{ borderColor: "#e0e1e2" }}
            />
          )}
        />
        {errors.email && (
          <View className="">
            <HelperText type="error">{errors.email.message}</HelperText>
          </View>
        )}
        <Controller
          control={control}
          name="password_hash"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Nhập mật khẩu"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              mode="outlined"
              label={"Mật khẩu (*)"}
              outlineStyle={{ borderColor: "#e0e1e2" }}
              secureTextEntry
            />
          )}
        />
        {errors.password_hash && (
          <View className="">
            <HelperText type="error">{errors.password_hash.message}</HelperText>
          </View>
        )}
        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Xác nhận mật khẩu"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              mode="outlined"
              label={"Xác nhận mật khẩu (*)"}
              outlineStyle={{ borderColor: "#e0e1e2" }}
              secureTextEntry
            />
          )}
        />
        {errors.confirm_password && (
          <View className="">
            <HelperText type="error">
              {errors.confirm_password.message}
            </HelperText>
          </View>
        )}
        <View className="mt-4">
          <Button
            mode="contained"
            buttonColor="#d70119"
            textColor="white"
            onPress={handleSubmit(onSubmit)}
            style={{ borderRadius: 4 }}
          >
            Đăng ký
          </Button>
        </View>
      </View>
    </>
  );
}
