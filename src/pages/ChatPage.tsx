import QuestionItem from "../components/QuestionItem";
import AnswerItem from "../components/AnswerItem";
import { useEffect, useRef, useState } from "react";
import SideBar from "../components/SideBar";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";
import { deleteConversation, fetchConversations, resetCurrentConversation } from "../stores/chatSlice";
import ChatInput from "../components/ChatInput";
import type { Message } from "../types/chatTypes";
import ChatSkeleton from "../components/ChatSkeleton";
import ConfirmModal from "../components/ConfirmModal";
import { LuCircleAlert } from "react-icons/lu";
import { fetchCurrentUserInfo } from "../stores/userSlice";

const ChatPage = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(window.innerWidth >= 768);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.authen);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { listConversations, currentConversation, currentConversationId, sending, loading, deleting, sendingError } = useSelector((state: RootState) => state.chat);

  const isInputCentered = currentConversationId === null && currentConversation.length === 0;

  useEffect(() => {
    const initData = async () => {
      // Chỉ fetch nếu chưa có dữ liệu
      const promises = [];
      if (token && !currentUser) {
        promises.push(dispatch(fetchCurrentUserInfo()).unwrap());
      }
      if (token && listConversations.length === 0) {
        promises.push(dispatch(fetchConversations()).unwrap());
      }
      // Đợi tất cả fetch xong (hoặc lỗi cũng cho qua để vào trang)
      await Promise.allSettled(promises);
      // Tắt màn hình loading
      setIsInitialLoading(false);
    };

    initData();
  }, [token, dispatch]);

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
    if (window.innerWidth < 768) {
      setIsOpenMenu(false);
    }
  }

  const handleDeleteRequest = (id: string) => {
    setDeletingId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingId) {
      await dispatch(deleteConversation(deletingId));
    }
    setShowConfirm(false);
    setDeletingId(null);
  };

  const renderContent = () => {
    // 1. Loading
    if (loading) {
      return (
        <motion.div
          className="absolute inset-0 w-full h-full flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ChatSkeleton />
        </motion.div>
      );
    }

    // 2. New Chat
    if (isInputCentered) {
      return (
        <motion.div
          key="welcome"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full flex flex-col justify-center items-center pb-25"
        >
          <div className="text-center text-lg">
            <p>Chào bạn mình là <span className="font-bold">MediBot</span></p>
            <p>Hãy nói với mình triệu chứng hoặc bệnh bạn muốn tìm hiểu nhé!</p>
          </div>
        </motion.div>
      );
    }

    // 3. Conversation List
    return (
      <motion.div
        key={currentConversationId || "active-chat"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 w-full h-full overflow-y-hidden hover:overflow-y-auto [scrollbar-gutter:stable_both-edges]
        transition-all duration-300"
      >
        <div className="flex flex-col gap-6 lg:w-[720px] w-full mx-auto p-4 pb-25">
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
            <div className="w-full self-start flex flex-row items-end gap-1 min-h-6">
              <p className="text-sm text-primary-grey italic leading-none">MediBot đang trả lời</p>
              <div className="flex flex-row gap-1 mb-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] h-[3px] bg-primary-grey rounded-full shrink-0"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          )}

          {sendingError !== null && (
            <div className="w-full self-start flex flex-col gap-1 mt-2 animate-fadeIn">
              {/* Dòng thông báo lỗi */}
              <div className="flex flex-row items-center gap-2 text-primary-red p-2 rounded-lg w-fit">
                <LuCircleAlert size={16} className="shrink-0" />
                <p className="text-sm italic">{sendingError}</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  if (isInitialLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-background-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-purple border-t-transparent rounded-full animate-spin"></div>
          <p className="text-primary-grey animate-pulse">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-screen h-dvh flex flex-row bg-background-white overflow-hidden">
        <SideBar
          isOpenMenu={isOpenMenu}
          setIsOpenMenu={setIsOpenMenu}
          onNewChat={handleNewChat}
          onDeleteConversation={handleDeleteRequest}
        />
        {isOpenMenu &&
          <span className="fixed inset-0 bg-primary-white opacity-80 z-40 md:hidden" onClick={() => setIsOpenMenu(false)} />
        }

        {/* MAIN CONTAINER: Relative để chứa các lớp con Absolute */}
        {/* MAIN CONTAINER: Relative để chứa các lớp con Absolute */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 h-full relative flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-hidden relative z-0">
            <AnimatePresence mode='popLayout'>
              {renderContent()}
            </AnimatePresence>
          </div>

          {!isInputCentered && (
            <div className="absolute bottom-20 w-full h-12 bg-linear-to-t from-background-white via-background-white/90 to-transparent pointer-events-none z-10" />
          )}

          <motion.div
            className="w-full z-20 flex justify-center shrink-0 bg-background-white"
            animate={{
              y: isInputCentered ? "-40vh" : "0px"
            }}
            transition={{ type: "tween", stiffness: 300, damping: 35 }}
          >
            <div className="w-full flex justify-center">
              <ChatInput />
            </div>
          </motion.div>

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