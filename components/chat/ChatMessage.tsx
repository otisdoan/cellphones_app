import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { ChatMessage as ChatMessageType } from "../../types/chat";

interface Props {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.assistantContainer,
      ]}
    >
      {/* AI Avatar */}
      {!isUser && (
        <View style={styles.avatar}>
          <Ionicons name="chatbubble-ellipses" size={16} color="white" />
        </View>
      )}

      {/* Message Bubble */}
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.assistantBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.assistantText,
          ]}
        >
          {message.content}
        </Text>
        <Text
          style={[
            styles.timestamp,
            isUser ? styles.userTimestamp : styles.assistantTimestamp,
          ]}
        >
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 8,
  },
  userContainer: {
    flexDirection: "row-reverse",
  },
  assistantContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
  },
  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: "#E53935",
    borderTopRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: "white",
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: "white",
  },
  assistantText: {
    color: "#212121",
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  userTimestamp: {
    color: "rgba(255,255,255,0.7)",
  },
  assistantTimestamp: {
    color: "#9E9E9E",
  },
});
