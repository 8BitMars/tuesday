import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal, ModalProps } from "../../components/Modal";
import { useEditBoard } from "../../hooks/board/useEditBoard";

interface EditBoardModalProps extends ModalProps {
  Board: {
    BoardName: string;
    BoardPriority: number;
    BoardID: number;
  };
}
export const EditBoardModal = ({
  isVisible,
  toggleVisible,
  Board,
}: EditBoardModalProps) => {
  const { isLoading, editBoard, isError, reset, isSuccess } = useEditBoard();
  const [name, setName] = useState(Board.BoardName);
  const [priority, setPriority] = useState(Board.BoardPriority);

  useEffect(() => {
    if (isVisible && isSuccess) {
      reset();
      toggleVisible();
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editBoard({
      BoardName: name,
      BoardPriority: priority,
      BoardID: Board.BoardID,
    });
  };
  return (
    <Modal isVisible={isVisible} toggleVisible={toggleVisible}>
      <form className="flex flex-col w-full gap-2" onSubmit={onSubmit}>
        <div>Edit Board</div>
        <Input
          label="Board Name"
          value={name}
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
        {isError && (
          <div className="text-negative-500">Error editing board!</div>
        )}
        <Button type="submit" isLoading={isLoading} disabled={!name}>
          Save
        </Button>
      </form>
    </Modal>
  );
};
