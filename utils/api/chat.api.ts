import { API_URL } from "../../constants/API_URL";
import type { ChatResponse } from "../../types/chat";
import axiosInstance from "../axios";

export const chatApi = {
  /**
   * Send message to AI chatbot
   */
  async sendMessage(
    sessionId: string | undefined,
    message: string,
    userId?: number
  ): Promise<ChatResponse> {
    try {
      const response = await axiosInstance.post<ChatResponse>(
        API_URL.CHAT.SEND_MESSAGE,
        {
          message,
          session_id: sessionId,
          user_id: userId,
        },
        {
          timeout: 30000, // 30 second timeout
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("Chat API error:", error);
      return {
        success: false,
        error: error.response?.data?.error || "Không thể kết nối với server",
      };
    }
  },

  /**
   * Get chat history
   */
  async getChatHistory(sessionId: string, limit = 20) {
    try {
      const response = await axiosInstance.get(
        `${API_URL.CHAT.GET_HISTORY}/${sessionId}`,
        { params: { limit } }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get chat history:", error);
      return null;
    }
  },

  /**
   * Submit feedback
   */
  async submitFeedback(
    messageId: number,
    sessionId: string,
    feedback: "positive" | "negative" | "neutral",
    comment?: string
  ): Promise<boolean> {
    try {
      await axiosInstance.post(API_URL.CHAT.SUBMIT_FEEDBACK, {
        message_id: messageId,
        session_id: sessionId,
        feedback,
        comment,
      });
      return true;
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      return false;
    }
  },

  /**
   * End chat session
   */
  async endSession(sessionId: string): Promise<boolean> {
    try {
      await axiosInstance.post(`${API_URL.CHAT.END_SESSION}`, {
        session_id: sessionId,
      });
      return true;
    } catch (error) {
      console.error("Failed to end session:", error);
      return false;
    }
  },

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axiosInstance.get(`${API_URL.CHAT.HEALTH_CHECK}`);
      return response.data.success;
    } catch {
      return false;
    }
  },
};
