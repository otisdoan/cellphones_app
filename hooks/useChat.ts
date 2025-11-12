import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ChatMessage } from "../types/chat";
import { chatApi } from "../utils/api/chat.api";

const STORAGE_KEY = "@cellphones_chat_session";

interface SessionState {
  sessionId: string | null;
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const useChat = () => {
  const [session, setSession] = useState<SessionState>({
    sessionId: null,
    messages: [],
    isOpen: false,
    isTyping: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Load session from AsyncStorage
  const loadSession = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSession({
          ...parsed,
          messages: parsed.messages.map((msg: ChatMessage) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
          isOpen: false,
          isTyping: false,
        });
      }
    } catch (error) {
      console.error("Error loading chat session:", error);
    }
  }, []);

  const saveSession = useCallback(async () => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          sessionId: session.sessionId,
          messages: session.messages,
          createdAt: session.createdAt,
          updatedAt: new Date(),
        })
      );
    } catch (error) {
      console.error("Error saving chat session:", error);
    }
  }, [session.sessionId, session.messages, session.createdAt]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // Save session to AsyncStorage
  useEffect(() => {
    if (session.messages.length > 0) {
      saveSession();
    }
  }, [session.messages, session.sessionId, saveSession]);

  const sendMessage = useCallback(
    async (text: string, userId?: number) => {
      if (!text.trim()) return;

      console.log("📤 Sending message:", text);

      // Add user message
      const userMessage: ChatMessage = {
        id: `user_${Date.now()}`,
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      console.log("👤 User message added:", userMessage);

      setSession((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isTyping: true,
      }));

      try {
        // Call API
        const response = await chatApi.sendMessage(
          session.sessionId || undefined,
          text,
          userId
        );

        console.log("🔍 Chat API Response:", response);

        if (response.success && response.data) {
          console.log("✅ Success! Adding assistant message:", response.data);

          // Add assistant message
          const assistantMessage: ChatMessage = {
            id: response.data.message_id,
            role: "assistant",
            content: response.data.text,
            products: response.data.products,
            quickReplies: response.data.quick_replies,
            actions: response.data.actions,
            timestamp: new Date(),
          };

          console.log("📝 Assistant message created:", assistantMessage);

          setSession((prev) => ({
            ...prev,
            sessionId: response.data!.session_id,
            messages: [...prev.messages, assistantMessage],
            isTyping: false,
            updatedAt: new Date(),
          }));
        } else {
          console.error("❌ API returned error:", response.error);

          // Error message
          const errorMessage: ChatMessage = {
            id: `error_${Date.now()}`,
            role: "assistant",
            content:
              response.error || "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại sau.",
            timestamp: new Date(),
          };

          setSession((prev) => ({
            ...prev,
            messages: [...prev.messages, errorMessage],
            isTyping: false,
          }));
        }
      } catch (error) {
        console.error("Chat error:", error);

        const errorMessage: ChatMessage = {
          id: `error_${Date.now()}`,
          role: "assistant",
          content:
            "Xin lỗi, không thể kết nối với server. Vui lòng thử lại sau.",
          timestamp: new Date(),
        };

        setSession((prev) => ({
          ...prev,
          messages: [...prev.messages, errorMessage],
          isTyping: false,
        }));
      }
    },
    [session.sessionId]
  );

  const toggleChat = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  }, []);

  const clearChat = useCallback(async () => {
    if (session.sessionId) {
      await chatApi.endSession(session.sessionId);
    }

    await AsyncStorage.removeItem(STORAGE_KEY);
    setSession({
      sessionId: null,
      messages: [],
      isOpen: false,
      isTyping: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }, [session.sessionId]);

  return {
    messages: session.messages,
    isOpen: session.isOpen,
    isTyping: session.isTyping,
    sessionId: session.sessionId,
    sendMessage,
    toggleChat,
    clearChat,
  };
};
