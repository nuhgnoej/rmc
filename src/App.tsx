import { useEffect } from "react";
import { useThemeStore } from "./store";

export default function App() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    // 1. 하드코딩된 색상들을 새로운 시맨틱 클래스로 교체합니다.
    <div className="h-screen w-screen bg-background text-text transition-colors duration-500">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">React Master Class</h1>
        <p className="mb-8 text-secondary">
          {" "}
          {/* 보조 텍스트 색상 적용 */}
          Theme: {isDarkMode ? "🌙 Dark" : "☀️ Light"}
        </p>

        <button
          onClick={toggleDarkMode}
          // 2. 버튼 색상도 교체합니다.
          className="px-4 py-2 bg-primary text-background rounded-md transition-colors"
        >
          Toggle Mode
        </button>
      </div>
    </div>
  );
}
