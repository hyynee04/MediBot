import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Conversation, Message, MessageRequest } from "../types/chatTypes";
import { chatService } from "../services/chatService";
import { v4 as uuidv4 } from 'uuid';

interface ChatState {
  listConversations: Conversation[];
  currentConversation: Message[];
  currentConversationId: string | null;
  loading: boolean;
  sending: boolean;
  deleting: boolean;
  error: string | null;
}

const initialState: ChatState = {
  listConversations: [],
  currentConversation: [],
  currentConversationId: null,
  loading: false,
  sending: false,
  deleting: false,
  error: null,
}

export const fetchConversations = createAsyncThunk(
  "chat/fetConversations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await chatService.getConversation();

      if (res.status !== 200) {
        return rejectWithValue(res.data.message);
      }

      const data = res.data.data;

      if (Array.isArray(data)) {
        // Sử dụng slice() để tạo bản sao mảng (tránh mutate trực tiếp nếu strict mode)
        return data.slice().sort((a, b) => {
          // Chuyển string sang Date object
          const dateA = new Date(a.lastMessageAt).getTime();
          const dateB = new Date(b.lastMessageAt).getTime();

          // Trả về số dương: b lên trước a (Giảm dần - Mới nhất lên đầu), lỗi/NaN thì cho xuống cuối
          return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
        });
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch departments"
      );
    }
  }
)

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (data: MessageRequest, { rejectWithValue, dispatch }) => {
    try {
      // Gọi API như mô tả của bạn
      const res = await chatService.sendMessage(data);

      if (!res.data || !res.data.data) {
        return rejectWithValue("Phản hồi từ server không hợp lệ (data is null)");
      }

      dispatch(fetchConversations())

      return {
        botMessage: res.data.data, // Message trả về từ AI
        isNewConversation: data.idConversation === null // Flag để check xem có phải chat mới không
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to send message");
    }
  }
);

export const getConversationDetail = createAsyncThunk(
  "chat/getConversationDetail",
  async (idConversation: string, { rejectWithValue }) => {
    try {
      const res = await chatService.getMessagesByConversationId(idConversation);
      if (!res.data || !res.data.data) {
        // Nếu API trả về rỗng, có thể return mảng rỗng
        return [];
      }
      return res.data.data; // Trả về mảng Message[]
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi tải nội dung chat");
    }
  }
);

export const deleteConversation = createAsyncThunk(
  "chat/deleteConversation",
  async (idConversation: string, { rejectWithValue }) => {
    try {
      const res = await chatService.deleteConversation(idConversation);

      if (res.status === 200) {
        return idConversation;
      }

      return rejectWithValue("Xóa thất bại, trạng thái không hợp lệ");
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Lỗi xóa cuộc hội thoại");
    }
  }
)

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // Action để reset về trạng thái "New Chat"
    resetCurrentConversation: (state) => {
      state.currentConversationId = null;
      state.currentConversation = [];
      state.error = null;
    },
    // Action để chọn 1 cuộc hội thoại từ Sidebar
    setActiveConversation: (state, action: PayloadAction<string>) => {
      state.currentConversationId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // // --- fetchConversations ---
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.listConversations = action.payload || [];
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- sendMessage ---
      .addCase(sendMessage.pending, (state, action) => {
        state.sending = true;
        state.error = null;

        const { messageContent, idConversation } = action.meta.arg;

        const optimisticUserMessage: Message = {
          idMessage: uuidv4(), // Tạo ID tạm
          idConversation: idConversation || "temp_id",
          content: messageContent,
          isAiResponse: 0, // 0 là User
          createdDate: new Date().toISOString()
        };

        state.currentConversation.push(optimisticUserMessage);
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;
        const { botMessage, isNewConversation } = action.payload;

        state.currentConversation.push(botMessage);

        // 3. Nếu là cuộc trò chuyện mới -> Cập nhật listConversations và setActive
        if (isNewConversation) {
          state.currentConversationId = botMessage.idConversation;

          const firstUserMsg = state.currentConversation[0]?.content || "New Conversation";
          // Tạo một Conversation object mới để thêm vào Sidebar
          const newConversation: Conversation = {
            idConversation: botMessage.idConversation,
            title: firstUserMsg.substring(0, 30) + "...",
            lastMessageAt: botMessage.createdDate
          };
          state.listConversations.unshift(newConversation);
        } else {
          const index = state.listConversations.findIndex(c => c.idConversation === botMessage.idConversation);

          if (index !== -1) {
            // Lấy tham chiếu đến cuộc hội thoại đó (Redux Toolkit dùng Immer nên có thể mutate trực tiếp)
            const conversationToMove = state.listConversations[index];
            // Cập nhật thời gian tin nhắn cuối cùng 
            conversationToMove.lastMessageAt = botMessage.createdDate;
            // Di chuyển lên đầu danh sách
            if (index > 0) {
              // Xóa nó khỏi vị trí hiện tại
              state.listConversations.splice(index, 1);
              // Chèn nó vào đầu danh sách
              state.listConversations.unshift(conversationToMove);
            }
          }
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload as string;
      })

      // --- getConversationDetail ---
      .addCase(getConversationDetail.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        // Cập nhật ID ngay lập tức để UI Sidebar highlight item đang chọn
        state.currentConversationId = action.meta.arg;
        // Tùy chọn: Xóa tin nhắn cũ để hiện loading hoặc giữ lại
        state.currentConversation = [];
      })
      .addCase(getConversationDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConversation = action.payload; // Gán list message lấy từ API
      })
      .addCase(getConversationDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- deleteConversation --- 
      .addCase(deleteConversation.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.deleting = false;
        const deletedId = action.payload;
        // Xóa khỏi danh sách Sidebar
        state.listConversations = state.listConversations.filter(
          item => item.idConversation !== deletedId
        );
        // Nếu đang xem đúng cuộc hội thoại bị xóa -> Reset về New Chat
        if (state.currentConversationId === deletedId) {
          state.currentConversationId = null;
          state.currentConversation = [];
        }
      })
      .addCase(deleteConversation.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCurrentConversation, setActiveConversation } = chatSlice.actions;
export default chatSlice.reducer;