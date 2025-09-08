import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useThemeStore } from "./stores/theme.store";

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    // 변경: flex-col 제거하여 자식 요소의 레이아웃 유연성 확보
    <div className="min-h-screen w-full bg-background text-text transition-colors duration-500">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
