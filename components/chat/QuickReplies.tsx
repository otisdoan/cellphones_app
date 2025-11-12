import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  replies: string[];
  onReplyClick: (reply: string) => void;
}

export const QuickReplies: React.FC<Props> = ({ replies, onReplyClick }) => {
  if (!replies || replies.length === 0) return null;

  return (
    <View style={styles.container}>
      {replies.map((reply, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onReplyClick(reply)}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{reply}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E53935",
  },
  buttonText: {
    fontSize: 13,
    color: "#E53935",
    fontWeight: "500",
  },
});
