import {
  DragDropContext,
  Droppable,
  Draggable,
  type OnDragEndResponder,
} from "@hello-pangea/dnd";
import { useTrelloStore } from "../stores/trello.store.ts";
import AddCardForm from "../components/AddCardForm";

export default function Trello() {
  const { toDos, setBoards } = useTrelloStore();

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result;

    // 1. 유효한 드롭이 아닌 경우 (밖으로 드롭 등) 함수 종료
    if (!destination) return;

    // 2. 같은 자리로 드롭한 경우 함수 종료
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 3. 드래그 앤 드랍 로직 처리
    if (source.droppableId === destination.droppableId) {
      // 3-1. 같은 보드 내에서 이동하는 경우
      const boardCopy = [...toDos[source.droppableId]];
      const [movedItem] = boardCopy.splice(source.index, 1);
      boardCopy.splice(destination.index, 0, movedItem);

      const newToDos = {
        ...toDos,
        [source.droppableId]: boardCopy,
      };
      setBoards(newToDos);
    } else {
      // 3-2. 다른 보드로 이동하는 경우
      const sourceBoardCopy = [...toDos[source.droppableId]];
      const destinationBoardCopy = [...toDos[destination.droppableId]];
      const [movedItem] = sourceBoardCopy.splice(source.index, 1);
      destinationBoardCopy.splice(destination.index, 0, movedItem);

      const newToDos = {
        ...toDos,
        [source.droppableId]: sourceBoardCopy,
        [destination.droppableId]: destinationBoardCopy,
      };
      setBoards(newToDos);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center w-full p-8 overflow-x-auto">
        <div className="flex gap-4">
          {Object.keys(toDos).map((boardId) => (
            <Droppable key={boardId} droppableId={boardId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`w-64 bg-secondary bg-opacity-10 rounded-lg p-3 flex-shrink-0 transition-colors ${
                    snapshot.isDraggingOver ? "bg-opacity-20" : ""
                  }`}
                >
                  <h2 className="font-bold text-lg mb-4 text-center">
                    {boardId}
                  </h2>

                  <div className="mb-2">
                    <AddCardForm boardId={boardId} />
                  </div>

                  <ul className="space-y-2 min-h-[100px]">
                    {toDos[boardId].map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={String(todo.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-background p-3 rounded-md shadow-sm ${
                              snapshot.isDragging ? "ring-2 ring-primary" : ""
                            }`}
                          >
                            {todo.text}
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}
