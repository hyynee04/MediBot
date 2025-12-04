import { FaExclamation } from "react-icons/fa6";
import { motion } from "framer-motion";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

const ConfirmModal = ({ message, onConfirm, onCancel, loading }: ConfirmModalProps) => {
  return (
    <div className="flex flex-col gap-6 w-[400px] items-center py-4">
      {/* Animation Icon Area */}
      <div className="flex items-center justify-center pt-2">
        <motion.div
          className="w-28 h-28 rounded-full bg-primary-purple/30 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        >
          <motion.div
            className="w-3/4 h-3/4 rounded-full bg-primary-purple/50 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
          >
            <motion.div
              className="w-2/3 h-2/3 rounded-full bg-primary-purple flex items-center justify-center text-white"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1] }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.3 }}
            >
              <FaExclamation className="text-3xl" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Message Area */}
      <div className="flex flex-col items-center max-w-[85%] gap-2">
        <span className="font-bold text-center text-xl text-primary-black">
          Xác nhận thông tin
        </span>
        <span className="font-medium text-primary-gray text-center text-sm leading-relaxed">
          {message}
        </span>
      </div>

      {/* Button Action Area */}
      <div className="flex flex-row items-center justify-center gap-4 w-full mt-2">
        <button
          className="text-primary-gray bg-primary-white border-stroke-grey px-8 py-2.5 rounded-sm text-sm border cursor-pointer leading-tight font-medium
                     hover:-translate-y-0.5 hover:translate-x-0.5 hover:bg-stroke-grey hover:text-primary-black transition-all duration-300 min-w-[120px]"
          onClick={onCancel}
        // disabled={isLoading}
        >
          Hủy
        </button>
        <button
          className={`text-primary-white bg-linear-to-r from-primary-purple to-second-purple/60 px-8 py-2.5 rounded-sm text-sm border cursor-pointer leading-tight font-medium
                     transition-all duration-300 min-w-[120px]
                     ${loading
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:-translate-y-0.5 hover:translate-x-0.5 hover:brightness-110'
            }`}
          onClick={loading ? undefined : onConfirm}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Xác nhận"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;