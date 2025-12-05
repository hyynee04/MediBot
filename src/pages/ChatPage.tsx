import { LuSquarePen, LuMenu } from "react-icons/lu";
import QuestionItem from "../components/QuestionItem";
import AnswerItem from "../components/AnswerItem";
import { useEffect, useRef, useState } from "react";
import SideBar from "../components/SideBar";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";
import { deleteConversation, fetchConversations, resetCurrentConversation } from "../stores/chatSlice";
import ChatInput from "../components/ChatInput";
import type { Message } from "../types/chatTypes";
import ChatSkeleton from "../components/ChatSkeleton";
import ConfirmModal from "../components/ConfirmModal";

const ChatPage = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { listConversations, currentConversation, currentConversationId, sending, loading, deleting } = useSelector((state: RootState) => state.chat);

  const isNewChat = currentConversationId === null && currentConversation.length === 0 && !loading;

  useEffect(() => {
    if (listConversations?.length <= 0) {
      dispatch(fetchConversations());
    }
  }, [dispatch]);


  const lastQuestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [currentConversation, sending, loading]);

  const handleNewChat = () => {
    dispatch(resetCurrentConversation());
  }

  const handleDeleteRequest = (id: string) => {
    setDeletingId(id); // Lưu ID cần xóa
    setShowConfirm(true); // Mở Modal
  };

  const handleConfirmDelete = async () => {
    if (deletingId) {
      await dispatch(deleteConversation(deletingId));
    }
    setShowConfirm(false);
    setDeletingId(null);
  };

  const renderContent = () => {
    // Nếu đang loading (khi switch chat) -> Hiện Skeleton
    if (loading) {
      return (
        <div className="w-full flex justify-center">
          <ChatSkeleton />
        </div>
      );
    }

    // Nếu không loading mà danh sách rỗng -> Hiện Welcome (New Chat)
    if (currentConversation.length === 0) {
      return (
        <motion.div
          key="welcome"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-fit overflow-y-scroll flex justify-center overflow-x-hidden"
        >
          <div className="text-center text-lg mt-10">
            <p>Chào bạn mình là <span className="font-bold">MediBot</span></p>
            <p>Hãy nói với mình triệu chứng hoặc bệnh bạn muốn tìm hiểu nhé!</p>
          </div>
        </motion.div>
      );
    }

    // Có dữ liệu -> Hiện list tin nhắn
    return (
      <motion.div
        key={currentConversationId || "new-chat"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full h-full overflow-y-scroll flex justify-center overflow-x-hidden"
      >
        <div className="flex flex-col gap-6 lg:w-[720px] w-full p-4 pb-24">
          {currentConversation.map((msg: Message, index: number) => {
            const targetIndex = sending
              ? currentConversation.length - 1
              : Math.max(0, currentConversation.length - 2);

            const isTargetScroll = index === targetIndex;
            return (
              <div
                key={msg.idMessage}
                ref={isTargetScroll ? lastQuestionRef : null}
              >
                {msg.isAiResponse === 0 ? (
                  <QuestionItem question={msg.content} />
                ) : (
                  <AnswerItem answer={msg.content} />
                )}
              </div>

            )
          })}

          {sending && (
            <div className="self-start flex flex-row items-end gap-1 min-h-6">
              <p className="text-sm text-primary-grey italic leading-none">MediBot đang trả lời</p>

              {/* Container chứa 3 dấu chấm động */}
              <div className="flex flex-row gap-1 mb-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] h-[3px] bg-primary-grey rounded-full"
                    animate={{ y: [0, -2, 0] }} // Di chuyển: Gốc -> Lên 4px -> Về Gốc
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-row bg-background-white">
        <SideBar
          isOpenMenu={isOpenMenu}
          setIsOpenMenu={setIsOpenMenu}
          onNewChat={handleNewChat}
          onDeleteConversation={handleDeleteRequest}
        />
        {isOpenMenu &&
          <span className="fixed inset-0 bg-primary-white opacity-80 z-40 md:hidden" onClick={() => setIsOpenMenu(false)} />
        }
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-screen flex flex-col items-center justify-end">
          {/*  */}
          {/* <div className="w-full p-4 text-lg font-bold text-primary-black md:hidden flex flex-row justify-between items-center">
            <div className="w-fit p-2 hover:bg-stroke-grey rounded-lg cursor-pointer" onClick={() => setIsOpenMenu(true)}>
              <LuMenu size={18} />
            </div>
            <div className="w-fit p-2 hover:bg-stroke-grey rounded-lg cursor-pointer" onClick={handleNewChat}>
              <LuSquarePen size={18} />
            </div>
          </div> */}

          {/*  */}
          <div className={`w-full h-full flex flex-col items-center transition-all duration-300 overflow-hidden
              ${isNewChat ? "justify-center gap-4" : "justify-end"}`}>
            <AnimatePresence mode='popLayout'>
              {renderContent()}
            </AnimatePresence>
            <motion.div
              layout
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className={`w-full flex justify-center bg-transparent backdrop-blur-md z-10 shrink-0`}
            >
              <ChatInput />
            </motion.div>
          </div>

        </motion.div>
      </div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-primary-white p-4 rounded shadow-lg w-auto">
              <ConfirmModal
                message="Bạn có chắc muốn xóa cuộc hội thoại này không?"
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleConfirmDelete}
                loading={deleting}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>

  )
}
export default ChatPage