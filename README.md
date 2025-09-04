# React Master Class 내용 정리

## 💻 실습 환경 셋팅 (Completed)

- [x] vite 프로젝트 시작하기
- [x] 필요한 의존성 패키지 설치하기

```npm
npm create vite@latest
<!-- styled-components 사용 시 -->
npm install @tanstack/react-query styled-components apexcharts react-apexcharts react-router-dom
<!-- tailwindCSS 사용 시-->
npm install @tanstack/react-query apexcharts react-apexcharts react-router-dom zustand @hello-pangea/dnd react-hook-form tailwindcss postcss autoprefixer
npm install zustand @hello-pangea/dnd react-hook-form
```

---

## 🎨 주제 1: UI & 스타일링 시스템

- Styled Components 기초

  - [x] 컴포넌트에 스타일 입히기 (`styled.div`)
  - [x] `props`를 이용해 동적으로 스타일 변경하기 (Primary/Secondary 버튼)

- 디자인 시스템 및 테마 구현

  - [x] `theme.ts` 파일에 디자인 토큰(색상) 중앙 관리하기
  - [x] `ThemeProvider`를 사용해 앱 전체에 테마 적용하기
  - [x] 테마를 활용한 다크/라이트 모드 토글 기능 구현

- TypeScript 연동

  - [x] `styled.d.ts` 파일을 생성하여 `styled-components` 테마 타입 정의하기
  - [x] 타입 경고를 해결하고 타입 안정성 확보하기

---

## 🔗 주제 2: 데이터 연동 및 시각화 (암호화폐 트래커)

- React Router

  - [x] 라우터 설정 및 페이지 분리 (`Home`, `Detail`)
  - [x] 동적 경로 파라미터 사용하기 (`useParams`)
  - [x] 중첩 라우팅 및 `Outlet`을 이용한 레이아웃 관리
  - [ ] **(추가 제안)** `Link` 컴포넌트의 `state`를 이용한 데이터 전달

- React Query & API 연동

  - [x] `QueryClientProvider` 설정
  - [x] API 호출 함수 추상화 (`api.ts`)
  - [x] `useQuery`로 목록 데이터 가져오기 (코인 목록)
  - [x] `useQuery`로 상세 데이터 가져오기 (코인 정보, 가격)
  - [x] 개발 환경을 위한 동적 더미 데이터베이스 구축
  - [ ] **(추가 제안)** `ReactQueryDevtools`를 이용한 캐시 상태 디버깅

- Data Visualization - 핵심 기술: ApexCharts

  - [x] `ApexCharts`를 이용한 데이터 시각화 (기본 렌더링 및 데이터 매핑 완료)
  - [x] `Outlet context`를 이용해 테마 정보 전달 및 차트 연동
  - [ ] **(추가 제안)** 차트 커스터마이징: 차트의 색상, 축(axis), 툴팁(tooltip) 등을 프로젝트 디자인에 맞게 수정하기
  - [ ] **(추가 제안)** 인터랙션: 차트의 특정 데이터 포인트에 마우스를 올렸을 때 상세 정보를 보여주는 등 사용자 상호작용 추가하기

---

## 📝 주제 3: 복잡한 상태 관리 및 UI (트렐로 클론)

- 전역 상태 관리 - 핵심 기술: `Zustand`

  - [x] `create` 함수를 이용한 스토어 생성
  - [x] 컴포넌트에서 스토어 상태 구독 및 사용
  - [x] `set` 함수를 이용한 상태 변경 액션 구현 (카드 추가, 이동)

- 폼 상태 관리 - 핵심 기술: `React Hook Form`

  - [x] `useForm`으로 폼 상태 초기화 및 제출 핸들링
  - [x] `register`를 이용해 입력 필드 등록 및 기본 유효성 검사
  - [ ] `watch`, `setError` 등 다양한 API를 활용한 동적 폼 제어
  - [ ] **(추가 제안)** `Controller` 컴포넌트를 이용해 외부 UI 라이브러리 연동하기

- 드래그 앤 드랍 - 핵심 기술: `React Beautiful DnD`

  - [x] `DragDropContext`, `Droppable`, `Draggable` 컴포넌트로 환경 구성하기
  - [x] `onDragEnd` 콜백 함수에서 드래그 결과를 **Zustand** 상태에 반영하기
  - [x] **(추가 제안)** 드래그 중인 아이템에 따라 다른 스타일 적용하기 (`snapshot` 사용)

---

## 🎨 주제 4: 인터랙티브 애니메이션 (모션 프로젝트)

- **애니메이션** - 핵심 기술: `Framer Motion`
  - [ ] `motion` 컴포넌트와 `animate`, `initial` props를 이용한 기본 애니메이션
  - [ ] `variants`를 이용해 애니메이션 상태를 선언적으로 관리하기
  - [ ] `whileHover`, `whileTap` 등 제스처를 이용한 상호작용 애니메이션
  - [ ] `AnimatePresence`를 이용해 컴포넌트가 사라질 때의 효과(exit) 구현하기
  - [ ] **(추가 제안)** `layoutId`를 이용해 여러 컴포넌트에 걸친 애니메이션 공유하기 (매직 모션)
  - [ ] **(추가 제안)** `useScroll`, `useTransform` 훅을 이용한 스크롤 연동 애니메이션

---

## 🎓 주제 5: React 심화 및 마스터 과정 (추가 제안)

- **성능 최적화**
  - [ ] `React.memo`를 이용한 컴포넌트 리렌더링 방지
  - [ ] `useMemo`, `useCallback` 훅을 이용한 연산 및 함수 메모이제이션
  - [ ] **(추가 제안)** React Profiler를 이용한 렌더링 병목 현상 분석
- **커스텀 훅 (Custom Hooks)**
  - [ ] **(추가 제안)** 반복되는 로직을 커스텀 훅으로 분리하여 재사용성 높이기 (예: `useToggle`, `useLocalStorage`)
- **컴포넌트 테스트**
  - [ ] **(추가 제안)** `React Testing Library`와 `Vitest`를 이용한 단위/통합 테스트 작성 기초

## 💡 Tip

- **패키지 의존성 꼬였을 경우 리셋하기**

```terminal
  rm -rf node_modules
  rm package-lock.json
  npm install
```

- **Vite 환경에서 React 중복 에러 발생 시 (`vite.config.ts`)**

  ```typescript
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react-swc";
  import path from "path";

  export default defineConfig({
    plugins: [react()],
    resolve: {
      dedupe: ["react", "react-dom"],
      alias: {
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      },
    },
  });
  ```
