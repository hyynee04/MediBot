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
            // --- CẤU HÌNH MỚI CHO LINK (THẺ a) ---
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"             // Mở tab mới
                rel="noopener noreferrer"   // Bảo mật khi mở tab mới
                className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200 cursor-pointer"
                onClick={(e) => e.stopPropagation()} // Ngăn click lan ra ngoài nếu cần
              >
                {children}
              </a>
            ),

            // Tùy chỉnh thẻ <ul>
            ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,

            // Tùy chỉnh thẻ <li>
            li: ({ children }) => <li className="pl-1 marker:text-primary-purple">{children}</li>,

            // Tùy chỉnh thẻ <strong>
            strong: ({ children }) => {
              const text = String(children);
              if (/^[0-9]+\./.test(text)) {
                return <span className="block text-primary-black font-semibold text-base mt-4 mb-2">{children}</span>;
              }
              return <strong className="font-semibold text-gray-900">{children}</strong>;
            },

            // Xử lý thêm thẻ H3 (###) vì trong ví dụ data của bạn có dùng "### 1. Kết luận..."
            h3: ({ children }) => (
              <h3 className="block text-primary-black font-bold text-base mt-4 mb-2">{children}</h3>
            ),

            // Tùy chỉnh thẻ <p>
            p: ({ children }) => {
              const text = String(children);
              if (text.includes("Disclaimer") || text.includes("Tham khảo ý kiến bác sĩ")) {
                return <p className="text-xs text-gray-400 italic mt-4 border-t border-dashed pt-2">{children}</p>;
              }
              return <p className="mb-2 last:mb-0">{children}</p>;
            },

            // Tùy chỉnh thẻ <hr>
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