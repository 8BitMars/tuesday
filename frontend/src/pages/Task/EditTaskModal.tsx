import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal, ModalProps } from "../../components/Modal";
import { Task } from "../../data/types";
import { useEditTask } from "../../hooks/task/useEditTask";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon, WindowIcon } from "@heroicons/react/24/solid";

interface EditTaskModalProps extends ModalProps {
  Task: Task;
  labelClassName?: string;
}

export const EditTaskModal = ({
  isVisible,
  toggleVisible,
  Task,
}: EditTaskModalProps) => {
  const { isLoading, editTask, isError, reset, isSuccess } = useEditTask();
  const [taskValues, setTaskValues] = useState(Task);

  useEffect(() => {
    if (isVisible && isSuccess) {
      onClose();
    }
  });

  const onClose = () => {
    reset();
    setTaskValues(Task);
    toggleVisible();
  };

  const onTextChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskValues((oldValues) =>
      Object.assign({}, oldValues, { [e.target.name]: [e.target.value] })
    );
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskValues((oldValues) =>
      Object.assign({}, oldValues, {
        [e.target.name]: [e.target.valueAsNumber],
      })
    );
  };

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = !!e.target.value ? e.target.value : Task.DueDate;
    setTaskValues((oldValues) =>
      Object.assign({}, oldValues, {
        [e.target.name]: value ? new Date(value) : undefined,
      })
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTask(taskValues);
  };
  return (
    <Modal isVisible={isVisible} toggleVisible={onClose}>
      <form className="flex flex-col w-full gap-2" onSubmit={onSubmit}>
        <div className="flex items-center font-semibold text-xl mb-6">
          <WindowIcon
            className="flex mr-2 transition-all"
            height={24}
            width={24}
          />
          {taskValues.Title}
        </div>
        <label className="font-semibold">
        <Bars3BottomLeftIcon
          className="flex mr-2 transition-all"
          height={24}
          width={24}
        />
          Description
        </label>
        <textarea
          name="TaskDescription"
          value={taskValues.TaskDescription}
          onChange={onTextChange}
          placeholder="Add a more detailed description..."
          className="w-full p-2 border border-gray-400 rounded"
        />
        <Input
          labelClassName="flex items-center my-1 font-semibold"
          labelIcon={
            <CalendarDaysIcon
              className="flex mr-2 transition-all"
              height={24}
              width={24}
            />
          }
          label="Due Date"
          name="DueDate"
          value={
            !!taskValues.DueDate
              ? new Date(taskValues.DueDate).toISOString().split("T")[0]
              : ""
          }
          onChange={onDateChange}
          type="date"
          pattern="\d{4}-\d{2}-\d{2}"
        />
        <Input
          labelClassName="font-semibold my-1"
          label="Priority"
          name="TaskPriority"
          value={taskValues.TaskPriority}
          onChange={onNumberChange}
          placeholder="Add a more detailed description..."
          type="number"
          min={1}
          max={3}
          className="mb-4"
        />
        {isError && (
          <div className="text-negative-500">Error editing task!</div>
        )}
        {!Task.TaskID && (
          <div className="text-warning-500">
            This task is still being created on the server... Please try editing
            again later
          </div>
        )}
        <Button type="submit" isLoading={isLoading} disabled={!Task.TaskID}>
          Save
        </Button>
      </form>
    </Modal>
  );
};
