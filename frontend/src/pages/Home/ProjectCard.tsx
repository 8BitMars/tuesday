import { useSetRecoilState } from "recoil";
import { projectState } from "../../atoms/project";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useDeleteProject } from "../../hooks/project/useDeleteProject";
import { useToggle } from "react-use";
import { EditProjectModal } from "./EditProjectModal";
import { useGetBoards } from "./../../hooks/board/useGetBoards";
import { BoardCard } from "../Board/BoardCard";
import { LoadingCard } from "../../components/LoadingCard";
import { CreateNewCard } from "../../components/CreateNewCard";
const projectColors = [
  "bg-primary-500",
  "bg-positive-500",
  "bg-warning-500",
  "bg-negative-500",
  "bg-sharable-500",
  "bg-secret-500",
  "bg-primary-300",
  "bg-positive-300",
  "bg-warning-300",
  "bg-negative-300",
  "bg-sharable-300",
  "bg-secret-300",
];

const projectColorOnes = [
  "bg-primary",
  "bg-positive",
  "bg-warning",
  "bg-negative",
  "bg-sharable",
  "bg-secret",
  "bg-primary",
  "bg-positive",
  "bg-warning",
  "bg-negative",
  "bg-sharable",
  "bg-secret",
];

interface ProjectCardProps
{
  id: number;
  name: string;
  priority: number;
  index?: number;
}

export const ProjectCard = ({
  id,
  name,
  priority,
  index = 0,
}: ProjectCardProps) =>
{
  const setCurrentProject = useSetRecoilState(projectState);
  const navigate = useNavigate();
  const { isLoading: isDeleting, deleteProject } = useDeleteProject();
  const [isEditModalVisible, toggleEditModal] = useToggle(false);
  const { data, isLoading } = useGetBoards(id);
  const projectColor = projectColors[index % projectColors.length];
  const projectColorOne = projectColorOnes[index % projectColorOnes.length];
  const projectColorWeight = 300;



  const onSelect = () =>
  {
    if (isDeleting) return;
    setCurrentProject({
      ProjectID: id,
      ProjectName: name,
      ProjectPriority: priority,
    });

    navigate("/project/" + id + "/board");
  };

  const onEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
  {
    e.stopPropagation();
    if (isDeleting) return;
    toggleEditModal();
  };

  const onDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
  {
    if (isDeleting) return;
    deleteProject(id);
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={`flex flex-col w-full gap-2 ${isDeleting ? "animate-pulse" : ""
          }`}
      >
        <div className="flex items-center w-full gap-2">
          <div
            className={`flex items-center gap-2 rounded cursor-pointer hover:${projectColorOne}-${projectColorWeight} hover:bg-opacity-75 hover:text-white transition-all`}
            onClick={onSelect}
          >
            <div
              className={`rounded text-white font-bold text-2xl px-4 py-2 cursor-pointer ${projectColor}`}
            >
              {name[0]}
            </div>
            <div className="pl-2 pr-5 text-xl font-semibold rounded">
              {name}
            </div>
          </div>
          <div
            className="flex items-center gap-1 p-1 rounded cursor-pointer bg-icon-100 text-icon-500 hover:bg-primary-200 hover:bg-opacity-50 hover:text-primary-500"
            onClick={onEdit}
          >
            <PencilSquareIcon height={16} width={16} />
          </div>
          <div
            className="flex items-center gap-1 p-1 rounded cursor-pointer bg-icon-100 text-icon-500 hover:text-negative-500 hover:bg-negative-100"
            onClick={onDelete}
          >
            <TrashIcon height={16} width={16} />
          </div>
        </div>
        <div className="flex w-full gap-4 py-2 overflow-x-auto flex-nowrap">
          {data &&
            data.map((board, i) => (
              <BoardCard
                key={i}
                id={board.BoardID}
                priority={board.BoardPriority}
                name={board.BoardName}
                index={i}
                projectId={id}
                projectName={name}
                projectPriority={priority}
              />
            ))}
          {isLoading && <LoadingCard />}
          {!isLoading && data?.length === 0 && (
            <CreateNewCard onCreate={onSelect}>View Project</CreateNewCard>
          )}
        </div>
        {/* <div className="flex gap-2 text-icon-500 place-self-end">
          <div
            className={`${
              isDeleting
                ? "animate-pulse"
                : "cursor-pointer hover:text-primaryhover-500"
            }`}
            onClick={onEdit}
          >
            <PencilSquareIcon height={20} width={20} />
          </div>
          <div
            className={`${
              isDeleting
                ? "animate-pulse"
                : "cursor-pointer hover:text-negative-500"
            }`}
            onClick={onDelete}
          >
            <TrashIcon height={20} width={20} />
          </div>
        </div>
        <div className="flex items-center justify-center flex-grow p-4 text-2xl font-semibold">
          {name}
        </div>
        <div className="place-self-end">Priority: {priority}</div> */}
      </div>

      <EditProjectModal
        isVisible={isEditModalVisible}
        toggleVisible={toggleEditModal}
        Project={{
          ProjectID: id,
          ProjectName: name,
          ProjectPriority: priority,
        }}
      />
    </>
  );
};
