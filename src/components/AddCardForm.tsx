import { useForm } from "react-hook-form";
import { useTrelloStore } from "../stores/trello.store";


// 폼 데이터의 타입을 정의합니다.
interface IForm {
  toDo: string;
}

// 이 컴포넌트가 받을 props의  타입을 정의합니다.
interface IAddCardFormProps {
  boardId: string;
}

function AddCardForm({ boardId }: IAddCardFormProps) {
  // Zustand 스토어에서 `addToDo` 함수를 가져옵니다.
  const { addToDo } = useTrelloStore();
  const { register, handleSubmit, setValue } = useForm<IForm>();

  // 폼이 유효하게 제출되었을 때 실행될 함수입니다.
  const onValid = ({ toDo }: IForm) => {
    // 스토어의 액션을 호출하여 새로운 카드를 추가합니다.
    addToDo(boardId, toDo);
    // 제출 후 입력 필드를 비웁니다.
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="w-full">
      <input
        {...register("toDo", { required: true })}
        type="text"
        placeholder={`+ Add a card`}
        className="w-full p-2 rounded-md bg-background focus:outline-primary border border-secondary/20 placeholder:text-secondary"
      />
    </form>
  );
}

export default AddCardForm;
