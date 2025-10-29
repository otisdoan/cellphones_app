import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

interface LoginPromptModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoginPromptModal: React.FC<LoginPromptModalProps> = ({
  visible,
  onClose,
}) => {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    router.push("/(auth)/login");
  };

  const handleRegister = () => {
    onClose();
    router.push("/(auth)/register");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          <View style={styles.content}>
            {/* Logo Smember */}
            <Text style={styles.logo}>Smember</Text>

            {/* Chibi Image */}
            <Image
              source={require("@/assets/empty.f8088c4d.png")}
              style={styles.chibiImage}
              resizeMode="contain"
            />

            {/* Message */}
            <Text style={styles.message}>
              Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh toán
              dễ dàng hơn.
            </Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
              >
                <Text style={styles.registerButtonText}>Đăng ký</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    maxWidth: 400,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#d70019",
    marginBottom: 16,
  },
  chibiImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#4b5563",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
  registerButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#d70019",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#d70019",
    fontSize: 14,
    fontWeight: "bold",
  },
  loginButton: {
    flex: 1,
    backgroundColor: "#d70019",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LoginPromptModal;
