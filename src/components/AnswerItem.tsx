import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from "framer-motion";

interface AnswerItemProps {
  answer: string;
}

const AnswerItem = ({ answer }: AnswerItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-full h-fit flex flex-row gap-3 py-2"
    >
      <div className="bg-primary-white shadow-custom px-4 py-2 rounded-2xl text-primary-black leading-relaxed max-w-full">

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Tùy chỉnh thẻ <ul> (Danh sách)
            ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,

            // Tùy chỉnh thẻ <li> (Mục danh sách)
            li: ({ children }) => <li className="pl-1 marker:text-primary-purple">{children}</li>,

            // Tùy chỉnh thẻ <strong> (In đậm) - Hack để làm tiêu đề màu tím
            strong: ({ children }) => {
              const text = String(children);
              // Kiểm tra nếu là mục lớn (VD: "1. Phân tích...")
              if (/^[0-9]+\./.test(text)) {
                return <span className="block text-primary-purple font-bold text-base mt-4 mb-2">{children}</span>;
              }
              return <strong className="font-bold text-gray-900">{children}</strong>;
            },

            // Tùy chỉnh thẻ <p> (Đoạn văn)
            p: ({ children }) => {
              const text = String(children);
              // Kiểm tra nếu là Disclaimer cuối cùng
              if (text.includes("Disclaimer") || text.includes("Tham khảo ý kiến bác sĩ")) {
                return <p className="text-xs text-gray-400 italic mt-4 border-t border-dashed pt-2">{children}</p>;
              }
              return <p className="mb-2 last:mb-0">{children}</p>;
            },

            // Tùy chỉnh đường kẻ ngang
            hr: () => <hr className="my-4 border-dashed border-gray-300" />
          }}
        >
          {answer}
        </ReactMarkdown>
      </div>
    </motion.div>
  )
}

export default AnswerItem