import { useState, useRef, useEffect } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import type { AppDispatch, RootState } from "../stores/store";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../stores/chatSlice";

const ChatInput = () => {
  const [inputVal, setInputVal] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  // Lấy ID cuộc trò chuyện hiện tại (null nếu là New Chat)
  const { currentConversationId, sending } = useSelector((state: RootState) => state.chat);

  // Hàm tự động chỉnh chiều cao
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset để tính toán lại
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // Giới hạn max-height thủ công nếu cần
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(e.target.value);
    adjustHeight();
  };

  // 2. Reset chiều cao khi inputVal rỗng (tức là sau khi gửi)
  useEffect(() => {
    if (inputVal === "" && textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Về mặc định 1 dòng
    }
  }, [inputVal]);

  const handleSend = () => {
    if (!inputVal.trim() || sending) return;

    const messageContent = inputVal;
    setInputVal(""); // Clear input ngay lập tức để UX mượt hơn

    dispatch(sendMessage({
      idConversation: currentConversationId, // Sẽ là null nếu là cuộc mới
      messageContent: messageContent
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="lg:w-[720px] w-full p-4 bg-transparent backdrop-blur-md">
      <div
        className="rounded-3xl bg-background-white/50 backdrop-blur-md flex flex-row items-end p-2 gap-2 border border-stroke-grey shadow-sm
      transition-all duration-200 ease-in-out focus-within:shadow-basic"
      >
        <textarea
          ref={textareaRef}
          value={inputVal}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1} // Mặc định 1 dòng
          placeholder="Hỏi MediBot..."
          className="
            text-primary-black text-sm w-full bg-transparent
            resize-none 
            overflow-y-auto 
            max-h-[120px]
            py-3 px-4 
            scrollbar-hide 
            focus:outline-none
          "
          style={{
            scrollbarWidth: "none", /* Firefox */
            msOverflowStyle: "none", /* IE/Edge */
          }}
          disabled={sending}
        />

        <div
          className={`p-2 rounded-full cursor-pointer transition-all flex items-center justify-center
            ${sending || !inputVal.trim() ? 'text-gray-400' : 'hover:bg-stroke-grey text-primary-purple'}`}
          onClick={handleSend}
        >
          <LuSendHorizontal size={24} />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;