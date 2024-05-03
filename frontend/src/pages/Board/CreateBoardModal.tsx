import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal, ModalProps } from "../../components/Modal";
import { useCreateBoard } from "../../hooks/board/useCreateBoard";
import { useRecoilValue } from "recoil";
import { projectState } from "../../atoms/project";

export const CreateBoardModal = ({ isVisible, toggleVisible }: ModalProps) => {
  const currentProject = useRecoilValue(projectState);
  const {
    isLoading,
    createBoard,
    isError: createError,
    reset,
    isSuccess,
  } = useCreateBoard();
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    if (isVisible && isSuccess) {
      onClose();
    }
  });

  const onClose = () => {
    reset();
    setName("");
    setPriority(1);
    toggleVisible();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createBoard({
      BoardName: name,
      BoardPriority: priority,
      ProjectID: currentProject.ProjectID,
    });
  };
  return (
    <Modal isVisible={isVisible} toggleVisible={onClose}>
      <form className="flex flex-col w-full gap-2" onSubmit={onSubmit}>
        <div>Create a New Board</div>
        <Input
          label="Board Name"
          value={name}
          placeholder="Board Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Board Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.valueAsNumber)}
          type="number"
          min={1}
          max={3}
          required
        />
        {createError && (
          <div className="text-negative-500">Error creating project!</div>
        )}
        <Button type="submit" isLoading={isLoading} disabled={!name}>
          Create Board
        </Button>
      </form>
    </Modal>
  );
};
