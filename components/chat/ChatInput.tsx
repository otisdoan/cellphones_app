import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<Props> = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={styles.container}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Nhập câu hỏi của bạn..."
          placeholderTextColor="#9E9E9E"
          multiline
          maxLength={500}
          editable={!disabled}
          style={[styles.input, disabled && styles.inputDisabled]}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!input.trim() || disabled}
          style={[
            styles.sendButton,
            (!input.trim() || disabled) && styles.sendButtonDisabled,
          ]}
          activeOpacity={0.7}
        >
          <Ionicons
            name="send"
            size={20}
            color={input.trim() && !disabled ? "white" : "#BDBDBD"}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    alignItems: "flex-end",
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: "#F5F5F5",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#212121",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputDisabled: {
    backgroundColor: "#FAFAFA",
    color: "#BDBDBD",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#F5F5F5",
  },
});
