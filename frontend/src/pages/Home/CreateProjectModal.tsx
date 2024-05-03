import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Modal, ModalProps } from "../../components/Modal";
import { useCreateProject } from "../../hooks/project/useCreateProject";
import { Button } from "../../components/Button";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

export const CreateProjectModal = ({
  isVisible,
  toggleVisible,
}: ModalProps) => {
  const {
    isLoading,
    createProject,
    isError: createError,
    reset,
    isSuccess,
  } = useCreateProject();
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

    createProject({ ProjectName: name, ProjectPriority: priority });
  };
  return (
    <Modal isVisible={isVisible} toggleVisible={onClose}>
      <form className="flex flex-col w-full gap-2" onSubmit={onSubmit}>
        <div className="flex items-center font-semibold text-xl mb-4">
        <WrenchScrewdriverIcon
          className="flex mr-2 transition-all"
          height={24}
          width={24}
        />
          Create Project
        </div>
        <Input
          label="Project Name"
          value={name}
          placeholder="Project Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Project Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.valueAsNumber)}
          type="number"
          min={1}
          max={3}
          required
          className="mb-4"
        />
        {createError && (
          <div className="text-negative-500">Error creating project!</div>
        )}
        <Button type="submit" isLoading={isLoading} disabled={!name}>
          Create Project
        </Button>
      </form>
    </Modal>
  );
};
