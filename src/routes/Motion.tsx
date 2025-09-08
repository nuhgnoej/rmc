import { motion } from "framer-motion";

function Motion() {
  return (
    // 애니메이션 요소들을 중앙에 배치하기 위한 컨테이너
    <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center">
      {/* 1. motion 컴포넌트:
        HTML 태그(div, button 등) 앞에 motion.을 붙이면 애니메이션 속성을 추가할 수 있습니다.
      */}
      <motion.div
        className="w-40 h-40 bg-primary rounded-2xl shadow-lg"
        // 2. initial: 애니메이션의 시작 상태를 정의합니다. (처음엔 0.5배 크기)
        initial={{ scale: 0.5, opacity: 0 }}
        // 3. animate: 애니메이션의 최종 상태를 정의합니다. (1배 크기로 커지며 360도 회전)
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        // 4. transition: 애니메이션이 어떻게 움직일지 상세 설정을 합니다. (2초 동안)
        transition={{ duration: 2, type: "spring", stiffness: 120 }}
        // 5. whileHover: 마우스를 올렸을 때의 애니메이션을 정의합니다. (1.2배 커짐)
        whileHover={{ scale: 1.2, rotate: 0 }}
        // 6. whileTap: 클릭(탭)했을 때의 애니메이션을 정의합니다. (0.8배로 작아짐)
        whileTap={{ scale: 0.8, borderRadius: "100%" }}
      />
    </div>
  );
}

export default Motion;
