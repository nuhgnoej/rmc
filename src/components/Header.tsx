import { Link, NavLink } from "react-router-dom";
// import 경로를 올바르게 수정합니다.
import { useThemeStore } from "../stores/theme.store";

function Header() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  // NavLink의 활성/비활성 스타일에 대한 공통 클래스
  const navLinkClass =
    "px-1 py-4 text-lg font-medium transition-colors border-b-2";

  return (
    // 변경: 배경색을 제거하고 하단에 얇은 경계선 추가
    <header className="border-b border-secondary/20 sticky top-0 bg-background z-10">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          RMC
        </Link>

        <nav className="flex gap-8 h-full">
          {/* 변경: 활성 탭에 하단 보더를 추가하여 명확하게 구분 */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkClass} ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent hover:text-primary"
              }`
            }
          >
            미세먼지 앱
          </NavLink>
          <NavLink
            to="/trello"
            className={({ isActive }) =>
              `${navLinkClass} ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent hover:text-primary"
              }`
            }
          >
            Trello 클론
          </NavLink>
          <NavLink
            to="/motion"
            className={({ isActive }) =>
              `${navLinkClass} ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent hover:text-primary"
              }`
            }
          >
            Motion
          </NavLink>
        </nav>

        <button
          onClick={toggleDarkMode}
          className="w-10 h-10 flex items-center justify-center bg-secondary/10 hover:bg-secondary/20 rounded-full transition-colors"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Header;
