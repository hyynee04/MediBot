export interface Conversation {
  idConversation: string;
  title: string;
  lastMessageAt: string;
}

export interface Message {
  idMessage: string | null,
  idConversation: string,
  content: string,
  isAiResponse: 0 | 1,
  createdDate: string;
}

export interface MessageRequest {
  idConversation: string | null;
  messageContent: string;
}