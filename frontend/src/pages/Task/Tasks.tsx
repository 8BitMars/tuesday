import { useRecoilValue } from "recoil";
import { boardState } from "../../atoms/board";
import { CardContainer } from "./Draggable/CardContainer";
import { TaskCard } from "./Draggable/TaskCard";
import { useEffect, useRef, useState } from "react";
import { useToggle } from "react-use";
import { Task } from "../../data/types";
import { useGetTasks } from "../../hooks/task/useGetTasks";
import { useEditTasks } from "../../hooks/task/useEditTasks";
import { BreadCrumb } from "../../components/BreadCrumb";

export const Tasks = () => {
  const currentBoard = useRecoilValue(boardState);
  const { data } = useGetTasks(currentBoard.BoardID);
  const { editTasks } = useEditTasks();
  const [tasks, setTasks] = useState<Task[][]>([]);
  const [dragging, toggleDragging] = useToggle(false);
  const dragItem = useRef<{ groupIndex: number; taskIndex: number }>();
  const dragItemNode = useRef<EventTarget>();

  useEffect(() => {
    if (data) setTasks(data);
  }, [data]);

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: { groupIndex: number; taskIndex: number }
  ) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", onDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      toggleDragging();
    }, 0);
  };

  const onDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    targetItem: { groupIndex: number; taskIndex: number }
  ) => {
    setTasks((oldList) => {
      let newList = [...oldList];
      if (
        dragItem.current &&
        dragItem.current.groupIndex !== undefined &&
        dragItem.current.taskIndex !== undefined
      ) {
        newList[targetItem.groupIndex].splice(
          targetItem.taskIndex,
          0,
          newList[dragItem.current.groupIndex].splice(
            dragItem.current.taskIndex,
            1
          )[0]
        );
        dragItem.current = targetItem;
      }
      return newList;
    });
  };

  const onDragEnd = (e: Event) => {
    toggleDragging();
    dragItem.current = undefined;
    if (dragItemNode.current) {
      dragItemNode.current.removeEventListener("dragend", onDragEnd);
      dragItemNode.current = undefined;
    }
    editTasks(tasks);
  };
  return (
    <div className="flex flex-col w-full p-4 overflow-auto">
      <BreadCrumb />
      <div className="flex flex-row flex-grow w-auto gap-4 overflow-x-auto pb-8">
        {tasks.map((group, groupIndex) => (
          <div
            key={"group-" + groupIndex}
            className="flex-none w-full max-w-md"
          >
            <CardContainer
              id={groupIndex}
              key={"container-" + groupIndex}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={
                dragging && !group.length
                  ? (e) => onDragEnter(e, { groupIndex, taskIndex: 0 })
                  : undefined
              }
            >
              {group.map((task, taskIndex) => (
                <TaskCard
                  draggable
                  dragging={
                    dragging &&
                    dragItem.current &&
                    dragItem.current.groupIndex === groupIndex &&
                    dragItem.current.taskIndex === taskIndex
                  }
                  onDragStart={(e) => onDragStart(e, { groupIndex, taskIndex })}
                  onDragEnter={
                    dragging
                      ? (e) => onDragEnter(e, { groupIndex, taskIndex })
                      : undefined
                  }
                  task={task}
                  key={"task-" + taskIndex}
                />
              ))}
            </CardContainer>
          </div>
        ))}
      </div>
    </div>
  );
};
