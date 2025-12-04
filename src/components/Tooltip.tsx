// Tooltip.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  className?: string;
}

const Tooltip = ({ content, position = "bottom", children, className }: TooltipProps) => {
  const [isHover, setIsHover] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHover && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = rect.top + scrollY - 5;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + scrollY + 5;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case "left":
          top = rect.top + scrollY + rect.height / 2;
          left = rect.left + scrollX - 5;
          break;
        case "right":
          top = rect.top + scrollY + rect.height / 2;
          left = rect.right + scrollX + 5;
          break;
      }

      setCoords({ top, left });
    }
  }, [isHover, position]);

  if (!content) {
    return null;
  }
  return (
    <div
      ref={ref}
      className={`relative cursor-pointer group ${className || ""}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}

      {isHover &&
        createPortal(
          <AnimatePresence>
            <motion.span
              key="tooltip"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "absolute",
                top: position === "top" ? coords.top - 0 : coords.top,
                left: coords.left,
                transform: "translate(-50%, -100%)", // điều chỉnh vị trí
              }}
              className="bg-primary-black text-primary-white text-[10px] p-1.5 whitespace-nowrap rounded-sm z-50"
            >
              {content}
            </motion.span>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
