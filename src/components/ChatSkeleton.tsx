const ChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 lg:w-[720px] w-full p-4 animate-pulse">
      {/* Giả lập câu hỏi user */}
      <div className="self-end bg-gray-200 h-16 w-3/4 rounded-2xl rounded-tr-none"></div>
      {/* Giả lập câu trả lời bot */}
      <div className="self-start flex gap-3 w-full">
        <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0"></div>
        <div className="bg-gray-200 h-32 w-full rounded-2xl rounded-tl-none"></div>
      </div>
      <div className="self-end bg-gray-200 h-10 w-1/2 rounded-2xl rounded-tr-none"></div>
      <div className="self-start flex gap-3 w-full">
        <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0"></div>
        <div className="bg-gray-200 h-24 w-full rounded-2xl rounded-tl-none"></div>
      </div>
    </div>
  )
}

export default ChatSkeleton;