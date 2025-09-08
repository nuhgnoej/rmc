import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// AnimatePresence와 함께 사용할 variants
const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  // exit: 컴포넌트가 사라질 때 실행될 애니메이션 상태
  exit: {
    opacity: 0,
    scale: 0,
    y: 50,
  },
};

function Motion() {
  const [showing, setShowing] = useState(true);
  const toggleShowing = () => setShowing((prev) => !prev);

  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-10">
      <button
        onClick={toggleShowing}
        className="px-4 py-2 bg-primary text-background rounded-md"
      >
        Toggle
      </button>

      {/* 1. AnimatePresence: 이 컴포넌트의 자식이 사라지거나 나타날 때 애니메이션을 활성화합니다. */}
      <AnimatePresence>
        {showing ? (
          <motion.div
            className="w-40 h-40 bg-primary rounded-2xl shadow-lg"
            variants={boxVariants}
            initial="initial"
            animate="visible"
            // 2. exit prop: AnimatePresence 안에서만 작동하며, 사라질 때의 애니메이션을 지정합니다.
            exit="exit"
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default Motion;
