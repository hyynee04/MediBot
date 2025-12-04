import { motion } from "framer-motion";

interface QuestionItemProps {
  question: string;
}

const QuestionItem = ({ question }: QuestionItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-fit flex justify-end"
    >
      <p className="bg-primary-purple/30 shadow-basic px-4 py-2 rounded-2xl max-w-2/3">{question}</p>
    </motion.div>
  )
}

export default QuestionItem