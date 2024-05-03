import { useToggle } from "react-use";
import { Task } from "../../../data/types";
import { EditTaskModal } from "../EditTaskModal";
import { ChatBubbleLeftIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useEditTask } from "../../../hooks/task/useEditTask";
import { CheckIcon } from "@heroicons/react/24/solid";

const priorityColors = [
  "",
  "border-positive-400",
  "border-primary-400",
  "border-negative-400",
];

interface TaskCardProps {
  task: Task;
  draggable?: boolean;
  dragging?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const TaskCard = ({
  task,
  draggable,
  dragging,
  onDragEnter,
  onDragEnd,
  onDragStart,
  onDrop,
}: TaskCardProps) => {
  const [isEditModalVisible, toggleEditModal] = useToggle(false);
  const { editTask, isLoading } = useEditTask();

  const onComplete = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e) e.stopPropagation();
    // TODO: more logic so that on unclick it sets back to previous state
    let newStatus = task.Status === 2 ? 1 : 2;

    editTask(
      Object.assign({}, task, {
        Status: newStatus,
      })
    );
  };

  return (
    <>
      <div
        className={`flex items-center gap-1 p-2 rounded border-l-4 cursor-pointer ${
          isLoading ? "animate-pulse" : ""
        } ${priorityColors[task.TaskPriority]} ${
          dragging ? "bg-icon-100 dragging" : "draggable bg-white"
        }`}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        onClick={toggleEditModal}
      >
        <div className="flex flex-col flex-1">
          <div className="flex-col text-ellipsis line-clamp-2">
            {task.Title}
          </div>
          {!!task.DueDate && (
            <div className="flex">
              <div
                className={`flex items-center gap-1 p-1 text-xs cursor-pointer rounded hover:text-positive-500 group transition-all ${
                  task.Status === 2
                    ? "text-positive-400 hover:text-text-500 transition-all"
                    : ""
                }`}
                onClick={onComplete}
              >
                <ClockIcon
                  height={14}
                  width={14}
                  className="block group-hover:hidden"
                />
                <input
                  checked={task.Status === 2}
                  type="checkbox"
                  className="hidden cursor-pointer group-hover:block"
                  onChange={() => onComplete()}
                />
                {new Date(task.DueDate).toDateString()}
              </div>
            </div>
          )}
          {!task.DueDate && (task.Status === 2 && (
            <div className="flex">
              <div
                className={`flex items-center gap-1 p-1 text-xs cursor-pointer rounded hover:text-positive-500 group transition-all ${
                  task.Status === 2
                    ? "text-positive-400 hover:text-text-500 transition-all"
                    : ""
                }`}
                onClick={onComplete}
              >
                <CheckIcon
                  height={14}
                  width={14}
                  className="block group-hover:hidden"
                />
                <input
                  checked={task.Status === 2}
                  type="checkbox"
                  className="hidden cursor-pointer group-hover:block transition-all"
                  onChange={() => onComplete()}
                />
                Completed
              </div>
            </div>
          )
          )}
        </div>

        <ChatBubbleLeftIcon
          className="text-icon-500 hover:text-primary-500"
          height={16}
          width={16}
        />
      </div>
      <EditTaskModal
        Task={task}
        isVisible={isEditModalVisible}
        toggleVisible={toggleEditModal}
      />
    </>
  );
};
