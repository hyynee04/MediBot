import { LuTrash2 } from "react-icons/lu";
import type { Conversation } from "../types/chatTypes";

interface HistoryItemProps {
  isActive: boolean;
  conversation: Conversation;
  onSelectConversation: () => void;
  onDelete: () => void;
}

const HistoryItem = ({ conversation, isActive, onSelectConversation, onDelete }: HistoryItemProps) => {
  return (
    <div
      className={`group h-10.5 p-2 flex flex-row items-center justify-between gap-2 rounded-lg cursor-pointer transition-colors duration-200
          ${isActive ? "bg-background-white hover:bg-background-white" : "bg-transparent hover:bg-stroke-grey"}`}
      onClick={onSelectConversation}
    >
      <p className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-200">
        {conversation.title}
      </p>

      <button
        className="hidden group-hover:flex p-1.5 text-primary-grey rounded-lg cursor-pointer transition-all duration-200 
        hover:text-primary-red hover:bg-background-red "
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <LuTrash2 size={18} />
      </button>
    </div>
  )
}
export default HistoryItem