import { PlusIcon } from "@heroicons/react/24/solid";
import { useToggle } from "react-use";
import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { useCreateTask } from "../../../hooks/task/useCreateTask";
import { useRecoilValue } from "recoil";
import { boardState } from "../../../atoms/board";

export enum Status {
  "To Do",
  "Doing",
  "Done",
}

interface CardContainerProps {
  id: Status;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter?: (e: React.DragEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}
export const CardContainer = ({
  id,
  children,
  onDrop,
  onDragOver,
  onDragEnter,
}: CardContainerProps) => {
  const currentBoard = useRecoilValue(boardState);
  const [newTask, setNewTask] = useState("");
  const [showNewTask, toggleShowNewTask] = useToggle(false);
  const { isLoading, isSuccess, reset, createTask } = useCreateTask();

  useEffect(() => {
    if (showNewTask && isSuccess) {
      reset();
      onCloseNewTask();
    }
  });

  const onShowNewTask = () => {
    if (isLoading) return;
    toggleShowNewTask();
  };

  const onCloseNewTask = () => {
    if (isLoading) return;
    setNewTask("");
    toggleShowNewTask();
  };

  const onCreateTask = () => {
    createTask({
      Title: newTask,
      TaskDescription: "",
      TaskPriority: 1,
      DateCreated: new Date(),
      BoardID: currentBoard.BoardID,
      Status: id,
    });
  };

  return (
    <div
      id={id.toString()}
      className="flex flex-col w-full gap-4 p-4 bg-gray-50 rounded shadow-xl"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
    >
      <div className="px-2 text-lg font-semibold">{Status[id]}</div>
      {children}
      {showNewTask && (
        <input
          className={`flex flex-col h-12 px-4 py-2 rounded ${
            isLoading ? "animate-pulse" : ""
          }`}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a title for this card..."
          maxLength={255}
          autoFocus
        />
      )}
      <div className="flex w-full gap-1">
        {!showNewTask && (
          <div
            onClick={onShowNewTask}
            className={`flex items-center w-full gap-1 text-text-400 rounded ${
              isLoading ? "" : "cursor-pointer hover:bg-gray-200"
            }`}
          >
            <PlusIcon height={20} width={20} />
            Add task
          </div>
        )}
        {showNewTask && (
          <>
            <div
              onClick={onCloseNewTask}
              className={`flex items-center px-2 py-1 mr-1 text-sm text-text-600 rounded ${
                isLoading
                  ? ""
                  : "cursor-pointer hover:text-negative-600 hover:bg-red-50"
              }`}
            >
              {/* <XMarkIcon height={20} width={20} onClick={toggleShowNewTask} /> */}
              Cancel
            </div>
            <Button onClick={onCreateTask} small disabled={isLoading}>
              Create
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
