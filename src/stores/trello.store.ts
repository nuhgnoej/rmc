// src/stores/trello.store.ts

import { create } from "zustand";

// 하나의 할 일(카드)에 대한 타입
interface IToDo {
  id: number;
  text: string;
}

// 스토어의 전체 상태에 대한 타입
interface IToDoState {
  // toDos는 객체이며, key는 보드(리스트)의 이름, value는 IToDo 객체들의 배열입니다.
  toDos: {
    [key: string]: IToDo[];
  };
  // 할 일을 추가하는 함수
  addToDo: (boardId: string, text: string) => void;
  // 드래그 앤 드랍 시 전체 보드 상태를 업데이트하는 함수
  setBoards: (newBoards: { [key: string]: IToDo[] }) => void;
}

export const useTrelloStore = create<IToDoState>((set) => ({
  // 초기 상태: 'To Do', 'Doing', 'Done' 세 개의 보드를 만듭니다.
  toDos: {
    "To Do": [
      { id: 1, text: "React Query 공부하기" },
      { id: 2, text: "Zustand 공부하기" },
    ],
    Doing: [
      { id: 3, text: "미세먼지 앱 만들기" },
    ],
    Done: [
      { id: 4, text: "Tailwind CSS 설정하기" },
    ],
  },

  // 'addToDo' 액션: 특정 보드에 새로운 할 일을 추가합니다.
  addToDo: (boardId, text) =>
    set((state) => ({
      toDos: {
        ...state.toDos,
        [boardId]: [
          ...state.toDos[boardId],
          { id: Date.now(), text }, // id는 현재 시간으로 고유하게 설정
        ],
      },
    })),

  // 'setBoards' 액션: 드래그 앤 드랍이 끝났을 때, 변경된 보드 전체를 받아와 상태를 업데이트합니다.
  setBoards: (newBoards) =>
    set(() => ({
      toDos: newBoards,
    })),
}));