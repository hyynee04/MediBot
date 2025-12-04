import type { ApiResponse } from "../types/apiResponse";
import type { Conversation, Message, MessageRequest } from "../types/chatTypes";
import axiosClient from "../utils/axiosConfig";

const USER_BASE_URL = "/api/Chat";

export const chatService = {
  getConversation: () => {
    return axiosClient.get<ApiResponse<Conversation[]>>(
      `${USER_BASE_URL}/GetConversation`,
    );
  },

  getMessagesByConversationId: (idConversation: string) => {
    return axiosClient.get<ApiResponse<Message[]>>(
      `${USER_BASE_URL}/GetMessagesByConversationId`, { params: { idConversation } }
    );
  },

  sendMessage: (data: MessageRequest) => {
    return axiosClient.post<ApiResponse<Message>>(
      `${USER_BASE_URL}/SendMessage`, {
      IdConversation: data.idConversation,
      MessageContent: data.messageContent,
    }
    );
  },

  deleteConversation: (idConversation: string) => {
    return axiosClient.delete<ApiResponse<any>>(
      `${USER_BASE_URL}/DeleteConversation`, { params: { idConversation } }
    );
  },
};
