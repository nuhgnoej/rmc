# React Master Class 내용 정리

## 💻 실습 환경 셋팅

- [x] vite 프로젝트 시작하기

```
npm create vite@latest
```

- [x] 필요한 의존성 패키지 설치하기

```
npm install @tanstack/react-query @tanstack/react-query-devtools react-router-dom zustand recharts tailwindcss postcss autoprefixer
```

(참고: `react-hook-form`, `@hello-pangea/dnd`는 향후 다른 주제에서 사용 예정)\_

---

## 🎨 주제 1: UI & 스타일링 시스템 (Tailwind CSS)

- [x] **Tailwind CSS 환경 설정**
  - [x] `tailwind.config.js`, `postcss.config.js` 설정 파일 생성 및 구성
  - [x] `index.css`에 `@tailwind` 지시어 추가
- [x] **커스텀 디자인 시스템 및 테마 구현**
  - [x] `tailwind.config.js`에 커스텀 색상 팔레트(primary, secondary 등) 정의
  - [x] `index.css`에 CSS 변수를 활용하여 라이트/다크 모드 색상 관리
  - [x] `darkMode: "class"` 전략을 이용한 테마 토글 기능 구현

---

## 🔗 주제 2: 데이터 연동 및 시각화 (미세먼지 정보 앱)

- **React Router**
  - [x] 라우터 설정 및 페이지 분리 (`Home`, `Detail`)
  - [x] 동적 경로 파라미터 사용하기 (`useParams`)
  - [x] 중첩 라우팅 및 `Outlet`을 이용한 레이아웃 관리
- **React Query & API 연동 (공공데이터포털 AirKorea API)**
  - [x] `QueryClientProvider` 및 `ReactQueryDevtools` 설정
  - [x] API 호출 함수 추상화 (`api.ts`)
  - [x] `useQuery`로 시/도별 측정소 목록 및 현황 데이터 가져오기
  - [x] `useQuery`로 특정 측정소의 월간 상세 데이터 가져오기
  - [x] `enabled` 옵션을 이용한 동적/조건부 쿼리 실행
- **Data Visualization - 핵심 기술: Recharts**
  - [x] `Recharts`를 이용한 라인 차트 시각화 (시간별 트렌드)
  - [x] `ResponsiveContainer`를 이용한 반응형 차트 구현
  - [x] API 응답 데이터를 차트 형식에 맞게 가공 및 정렬

---

## 📝 주제 3: 복잡한 상태 관리 및 UI (Trello 클론)

- **전역 상태 관리 - 핵심 기술: `Zustand`**
  - [x] `create` 함수를 이용한 스토어 생성 (`theme.store.ts`)
  - [x] 컴포넌트에서 스토어 상태 구독 및 사용 (다크 모드 연동)
  - [x] `set` 함수를 이용한 상태 변경 액션 구현
- **폼 상태 관리 - 핵심 기술: `React Hook Form`**
  - [ ] `useForm`으로 폼 상태 초기화 및 제출 핸들링
  - [ ] `register`를 이용해 입력 필드 등록 및 기본 유효성 검사
- **드래그 앤 드랍 - 핵심 기술: `@hello-pangea/dnd`**
  - [ ] `DragDropContext`, `Droppable`, `Draggable` 컴포넌트로 환경 구성하기
  - [ ] `onDragEnd` 콜백 함수에서 드래그 결과를 **Zustand** 상태에 반영하기

---

## 🎨 주제 4: 인터랙티브 애니메이션 (모션 프로젝트)

- **애니메이션** - 핵심 기술: `Framer Motion`
  - [ ] `motion` 컴포넌트와 `animate`, `initial` props를 이용한 기본 애니메이션
  - [ ] `variants`를 이용해 애니메이션 상태를 선언적으로 관리하기
  - [ ] `whileHover`, `whileTap` 등 제스처를 이용한 상호작용 애니메이션
  - [ ] `AnimatePresence`를 이용해 컴포넌트가 사라질 때의 효과(exit) 구현하기

---

## 🎓 주제 5: React 심화 및 마스터 과정 (추가 제안)

- **성능 최적화**
  - [ ] `React.memo`를 이용한 컴포넌트 리렌더링 방지
  - [ ] `useMemo`, `useCallback` 훅을 이용한 연산 및 함수 메모이제이션
- **커스텀 훅 (Custom Hooks)**
  - [ ] 반복되는 로직을 커스텀 훅으로 분리하여 재사용성 높이기
- **컴포넌트 테스트**
  - [ ] `React Testing Library`와 `Vitest`를 이용한 단위/통합 테스트 작성 기초

---

## 💡 Tip

- **패키지 의존성 꼬였을 경우 리셋하기**

```
  rm -rf node_modules
  rm package-lock.json
  npm install
```

- **Vite 환경에서 React 중복 에러 발생 시 (`vite.config.ts`)**

```ts
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react-swc";
  import path from "path";

  export default defineConfig({
  plugins: [react()],
  resolve: {
  dedupe: ["react", "react-dom"],
  alias: {
  react: path.resolve(**dirname, "./node_modules/react"),
  "react-dom": path.resolve(**dirname, "./node_modules/react-dom"),
  },
  },
  });

```
