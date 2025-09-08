import React, { useState, useCallback, useMemo } from "react";

// `prop`으로 텍스트와 함수를 받는 자식 컴포넌트
function Child({ text, onClick }: { text: string; onClick: () => void }) {
  console.log(`👶 ${text} 자식이 렌더링 되었습니다!`);
  return (
    <div className="p-4 bg-secondary/20 rounded-lg">
      <p>{text}</p>
      <button onClick={onClick} className="mt-2 px-2 py-1 text-sm bg-primary/20 rounded">버튼</button>
    </div>
  );
}

const MemoizedChild = React.memo(Child);

// ------------------------------------------------------------------

function Optimization() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // '복잡한 계산'을 시뮬레이션하는 함수
  const expensiveCalculation = (num: number) => {
    console.log("⏳ 복잡한 계산 중...");
    // 실제로는 복잡한 로직이 들어갈 수 있습니다.
    for (let i = 0; i < 1000000000; i++) {}
    return num * 2;
  };

  // 1. useMemo 사용: count가 바뀔 때만 재계산됩니다.
  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);
  
  // 2. useCallback 사용: 컴포넌트가 리렌더링 되어도 함수를 새로 만들지 않습니다.
  const memoizedOnClick = useCallback(() => {
    console.log("클릭 이벤트 발생!");
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">useCallback & useMemo 실습</h1>
      
      <div className="p-4 border rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">부모 컴포넌트</h2>
        <p className="text-4xl font-mono">Count: {count}</p>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 bg-primary text-background rounded-md mr-2"
        >
          카운트 증가
        </button>
        <input 
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 border rounded-md"
          placeholder="텍스트 입력..."
        />
        <p>복잡한 계산 결과 (useMemo): {memoizedValue}</p>
      </div>
      
      <div className="p-4 border rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">useCallback 적용된 자식</h2>
        <p className="text-sm text-secondary">
          부모의 '카운트'가 바뀌어도, 이 컴포넌트는 리렌더링 되지 않습니다. (함수 prop이 메모이제이션 됨)
        </p>
        <MemoizedChild text="나는 useCallback으로 함수를 받았어" onClick={memoizedOnClick} />
      </div>
    </div>
  );
}

export default Optimization;

