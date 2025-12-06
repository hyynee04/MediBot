import { LuPanelLeftClose, LuPanelLeftOpen, LuSquarePen, LuLogOut, LuUser } from "react-icons/lu";
import HistoryItem from "./HistoryItem";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes/paths";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";
import { logout } from "../stores/authenSlice";
import { fetchCurrentUserInfo } from "../stores/userSlice";
import { useEffect } from "react";
import Tooltip from "./Tooltip";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { Conversation } from "../types/chatTypes";
import { getConversationDetail } from "../stores/chatSlice";

interface SidebarProps {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
};

const SideBar = ({ isOpenMenu, setIsOpenMenu, onNewChat, onDeleteConversation }: SidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { listConversations, currentConversationId } = useSelector((state: RootState) => state.chat);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate(paths.root);
  };

  const handleSelectConversation = (id: string) => {
    // Nếu đang ở cuộc trò chuyện này rồi thì không load lại
    if (currentConversationId !== id)
      dispatch(getConversationDetail(id));

    if (window.innerWidth < 768) {
      setIsOpenMenu(false);
    }
  };

  const sidebarVariants: Variants = {
    open: {
      width: "300px",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      width: "50px",
      transition: { type: "spring", stiffness: 300, damping: 30, delay: 0.1 }
    }
  };

  const textVariants: Variants = {
    open: {
      opacity: 1,
      display: "block",
      x: 0,
      transition: { duration: 0.3, delay: 0.2 }
    },
    closed: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.05 },
      transitionEnd: { display: "none" }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`h-screen py-4 px-2 flex-col justify-between z-50 flex md:relative fixed overflow-hidden whitespace-nowrap transition-colors duration-300
          ${isOpenMenu ? "bg-linear-to-t from-primary-white to-primary-purple" : "bg-transparent"} `}
        initial={false}
        animate={isOpenMenu ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex flex-col gap-4">
          <div className={`flex flex-row items-center h-10 ${isOpenMenu ? "justify-between" : "justify-center"}`}>
            {isOpenMenu && (
              <motion.p
                variants={textVariants}
                initial="closed"
                animate="open"
                className="px-2 text-lg font-bold whitespace-nowrap"
              >
                MediBot
              </motion.p>
            )}
            <div
              className="p-2 hover:bg-stroke-grey rounded-lg cursor-pointer transition-colors duration-200 shrink-0"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              {isOpenMenu ? (
                <LuPanelLeftClose size={18} />
              ) : (
                <LuPanelLeftOpen size={18} />
              )}
            </div>
          </div>
          <div
            className={`p-2 flex-row items-center gap-2 hover:bg-stroke-grey rounded-lg cursor-pointer transition-colors duration-200
            ${!isOpenMenu ? "hidden md:flex" : "flex"} 
            `}
            onClick={onNewChat}
          >
            <LuSquarePen size={18} />
            <motion.p
              variants={textVariants}
              animate={isOpenMenu ? "open" : "closed"}
              className="text-sm leading-tight"
            >Cuộc trò chuyện mới</motion.p>
          </div>
          <motion.div
            variants={textVariants}
            animate={isOpenMenu ? "open" : "closed"}
            className="flex flex-col h-full"
          >
            <p className="px-2 font-bold text-primary-black pb-2">Lịch sử</p>
            <div className="flex flex-col gap-1">
              {listConversations.map((item: Conversation, index: number) => (
                <motion.div
                  key={item.idConversation}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut", delay: index * 0.1 }}
                >
                  <HistoryItem
                    conversation={item}
                    isActive={item.idConversation === currentConversationId}
                    onSelectConversation={() => handleSelectConversation(item.idConversation)}
                    onDelete={() => onDeleteConversation(item.idConversation)}
                  />
                </motion.div>

              ))}
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col gap-4">
          <motion.hr
            layout
            className={`w-full border ${isOpenMenu ? "border-stroke-grey block" : "border-second-purple hidden md:block"}`}
          />
          <div className="flex flex-row justify-between items-center gap-2 w-full overflow-hidden">
            <motion.div
              variants={textVariants}
              animate={isOpenMenu ? "open" : "closed"}
              className="w-full flex-1 min-w-0"
            >
              <div className="flex flex-row items-center gap-2 w-full">
                <span className="p-2 bg-stroke-grey rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  <LuUser />
                </span>
                <div className="flex-1 min-w-0">
                  <Tooltip content={currentUser?.fullName} position="top">
                    <p className="text-sm truncate">{currentUser?.fullName}</p>
                  </Tooltip>
                </div>
              </div>
            </motion.div>
            <div
              className={`w-fit p-2 hover:bg-stroke-grey rounded-lg cursor-pointer transition-colors duration-200 shrink-0
              ${!isOpenMenu ? "hidden md:block" : "block"}
              `}
              onClick={handleLogout}
            >
              <LuLogOut size={18} />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence >
  )
}
export default SideBar