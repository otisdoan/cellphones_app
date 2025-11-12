import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useChat } from "../../hooks/useChat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ProductCard } from "./ProductCard";
import { QuickReplies } from "./QuickReplies";

export const ChatWidget: React.FC = () => {
  const { messages, isOpen, isTyping, sendMessage, toggleChat, clearChat } =
    useChat();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation for floating button
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isTyping]);

  const handleClearChat = () => {
    clearChat();
    setShowClearConfirm(false);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Animated.View
          style={[
            styles.floatingButton,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <TouchableOpacity
            onPress={toggleChat}
            style={styles.floatingButtonInner}
            activeOpacity={0.8}
          >
            <Ionicons name="chatbubble-ellipses" size={28} color="white" />
            {messages.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{messages.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Chat Modal */}
      <Modal visible={isOpen} animationType="slide" onRequestClose={toggleChat}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.avatar}>
                <Ionicons name="chatbubble-ellipses" size={24} color="white" />
              </View>
              <View>
                <Text style={styles.headerTitle}>CellphoneS AI</Text>
                <Text style={styles.headerSubtitle}>
                  Hỗ trợ tư vấn sản phẩm
                </Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              {messages.length > 0 && (
                <TouchableOpacity
                  onPress={() => setShowClearConfirm(true)}
                  style={styles.headerButton}
                >
                  <Ionicons name="trash-outline" size={20} color="white" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={toggleChat}
                style={styles.headerButton}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Messages Area */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            keyboardShouldPersistTaps="handled"
          >
            {messages.length === 0 ? (
              <View style={styles.welcomeContainer}>
                <View style={styles.welcomeIcon}>
                  <Ionicons
                    name="chatbubble-ellipses"
                    size={40}
                    color="white"
                  />
                </View>
                <Text style={styles.welcomeTitle}>Xin chào! 👋</Text>
                <Text style={styles.welcomeText}>
                  Tôi là trợ lý AI của CellphoneS. Bạn cần tư vấn sản phẩm gì
                  hôm nay?
                </Text>
                <View style={styles.quickStartButtons}>
                  <TouchableOpacity
                    onPress={() => sendMessage("Tôi muốn mua iPhone")}
                    style={styles.quickStartButton}
                  >
                    <Text style={styles.quickStartButtonText}>
                      📱 Tôi muốn mua iPhone
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => sendMessage("Laptop gaming tốt nhất")}
                    style={styles.quickStartButton}
                  >
                    <Text style={styles.quickStartButtonText}>
                      💻 Laptop gaming tốt nhất
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => sendMessage("So sánh Samsung và iPhone")}
                    style={styles.quickStartButton}
                  >
                    <Text style={styles.quickStartButtonText}>
                      ⚖️ So sánh Samsung và iPhone
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                {messages.map((message, index) => (
                  <View key={index}>
                    <ChatMessage message={message} />
                    {message.products && message.products.length > 0 && (
                      <View style={styles.productsContainer}>
                        {message.products.map((product, pIndex) => (
                          <ProductCard key={pIndex} product={product} />
                        ))}
                      </View>
                    )}
                    {message.quickReplies &&
                      message.quickReplies.length > 0 && (
                        <QuickReplies
                          replies={message.quickReplies}
                          onReplyClick={handleQuickReply}
                        />
                      )}
                  </View>
                ))}
                {isTyping && (
                  <View style={styles.typingIndicator}>
                    <View style={styles.typingDot} />
                    <View style={[styles.typingDot, styles.typingDotDelay1]} />
                    <View style={[styles.typingDot, styles.typingDotDelay2]} />
                  </View>
                )}
              </>
            )}
          </ScrollView>

          {/* Input Area */}
          <ChatInput onSend={sendMessage} disabled={isTyping} />

          {/* Clear Chat Confirmation Modal */}
          <Modal
            visible={showClearConfirm}
            transparent
            animationType="fade"
            onRequestClose={() => setShowClearConfirm(false)}
          >
            <View style={styles.confirmOverlay}>
              <View style={styles.confirmDialog}>
                <Text style={styles.confirmTitle}>Xóa lịch sử chat?</Text>
                <Text style={styles.confirmText}>
                  Bạn có chắc muốn xóa toàn bộ lịch sử chat không?
                </Text>
                <View style={styles.confirmButtons}>
                  <TouchableOpacity
                    onPress={() => setShowClearConfirm(false)}
                    style={[styles.confirmButton, styles.cancelButton]}
                  >
                    <Text style={styles.cancelButtonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleClearChat}
                    style={[styles.confirmButton, styles.deleteButton]}
                  >
                    <Text style={styles.deleteButtonText}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 80,
    right: 16,
    zIndex: 1000,
  },
  floatingButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FFC107",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#B71C1C",
    fontSize: 12,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#E53935",
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  welcomeContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  welcomeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  quickStartButtons: {
    width: "100%",
    gap: 8,
  },
  quickStartButton: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  quickStartButtonText: {
    fontSize: 14,
    color: "#424242",
    textAlign: "left",
  },
  productsContainer: {
    marginTop: 12,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "flex-start",
    gap: 4,
    marginTop: 12,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E53935",
  },
  typingDotDelay1: {
    opacity: 0.6,
  },
  typingDotDelay2: {
    opacity: 0.3,
  },
  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  confirmDialog: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 8,
  },
  confirmText: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 24,
  },
  confirmButtons: {
    flexDirection: "row",
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
  },
  deleteButton: {
    backgroundColor: "#E53935",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#424242",
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
});
