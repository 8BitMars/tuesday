import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal, ModalProps } from "../../components/Modal";
import { useEditProject } from "../../hooks/project/useEditProject";

interface EditProjectModalProps extends ModalProps {
  Project: {
    ProjectName: string;
    ProjectPriority: number;
    ProjectID: number;
  };
}
export const EditProjectModal = ({
  isVisible,
  toggleVisible,
  Project,
}: EditProjectModalProps) => {
  const { isLoading, editProject, isError, reset, isSuccess } =
    useEditProject();
  const [name, setName] = useState(Project.ProjectName);
  const [priority, setPriority] = useState(Project.ProjectPriority);

  useEffect(() => {
    if (isVisible && isSuccess) {
      reset();
      toggleVisible();
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    editProject({
      ProjectName: name,
      ProjectPriority: priority,
      ProjectID: Project.ProjectID,
    });
  };
  return (
    <Modal isVisible={isVisible} toggleVisible={toggleVisible}>
      <form className="flex flex-col w-full gap-2" onSubmit={onSubmit}>
        <div>Edit Project</div>
        <Input
          label="Project Name"
          value={name}
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
        />
        {isError && (
          <div className="text-negative-500">Error editing project!</div>
        )}
        <Button type="submit" isLoading={isLoading} disabled={!name}>
          Save
        </Button>
      </form>
    </Modal>
  );
};
