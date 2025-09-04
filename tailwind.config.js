// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    // 1. theme 객체 안에 colors를 추가합니다.
    colors: {
      // 2. CSS 변수를 사용하여 시맨틱(의미론적)인 이름을 정의합니다.
      //    '--color-text-base'는 CSS 변수의 이름입니다.
      text: "var(--color-text-base)",
      background: "var(--color-background)",
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
    },
    extend: {},
  },
  plugins: [],
};