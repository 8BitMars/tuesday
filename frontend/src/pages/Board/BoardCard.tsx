import
{
  FlagIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { boardState } from "../../atoms/board";
import { useDeleteBoard } from "../../hooks/board/useDeleteBoard";
import { useToggle } from "react-use";
import { EditBoardModal } from "./EditBoardModal";
import { projectState } from "../../atoms/project";

interface BoardCardProps
{
  id: number;
  name: string;
  priority: number;
  index?: number;
  projectId: number;
  projectName: string;
  projectPriority: number;
}

const borderColors = [
  "border-primary-500",
  "border-positive-500",
  "border-warning-500",
  "border-negative-500",
  "border-sharable-500",
  "border-secret-500",
  "border-primary-300",
  "border-positive-300",
  "border-warning-300",
  "border-negative-300",
  "border-sharable-300",
  "border-secret-300",
];

export const BoardCard = ({ id, name, priority, index, projectId, projectName, projectPriority }: BoardCardProps) =>
{
  const navigate = useNavigate();
  const setCurrentBoard = useSetRecoilState(boardState);
  const setCurrentProject = useSetRecoilState(projectState);
  const { isLoading: isDeleting, deleteBoard } = useDeleteBoard();
  const [isEditModalVisible, toggleEditModal] = useToggle(false);
  const border =
    index !== undefined
      ? borderColors[index % borderColors.length]
      : "bg-white";
  const priorityColor = [
    "text-sharable-400",
    "text-warning-500",
    "text-negative-500",
  ].at(priority - 1);

  const onSelect = () =>
  {
    if (isDeleting) return;
    console.log("selected!");
    setCurrentProject({
      ProjectID: projectId,
      ProjectName: projectName,
      ProjectPriority: projectPriority,
    });
    setCurrentBoard({
      BoardID: id,
      BoardName: name,
      BoardPriority: priority,
    });
    navigate("/board/" + id + "/tasks");
  };

  const onEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
  {
    e.stopPropagation();
    if (isDeleting) return;
    toggleEditModal();
  };

  const onDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
  {
    e.stopPropagation();
    if (isDeleting) return;
    deleteBoard(id);
  };

  return (
    <>
      <div
        className={`flex flex-shrink-0 flex-col w-64 p-4 border-l-4 ${border} bg-white rounded shadow-xl h-44 ${isDeleting ? "animate-pulse" : "cursor-pointer hover:bg-gray-50"
          }`}
        onClick={onSelect}
      >
        <div className="flex justify-between w-full text-icon-500">
          <FlagIcon height={20} width={20} className={priorityColor} />
          <div className="flex gap-2">
            <div
              className={`${isDeleting
                ? "animate-pulse"
                : "cursor-pointer hover:text-primary-500"
                }`}
              onClick={onEdit}
            >
              <PencilSquareIcon height={20} width={20} />
            </div>
            <div
              className={`${isDeleting
                ? "animate-pulse"
                : "cursor-pointer hover:text-negative-500"
                }`}
              onClick={onDelete}
            >
              <TrashIcon height={20} width={20} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-grow p-4 text-2xl font-semibold">
          {name}
        </div>
      </div>
      <EditBoardModal
        toggleVisible={toggleEditModal}
        isVisible={isEditModalVisible}
        Board={{
          BoardID: id,
          BoardName: name,
          BoardPriority: priority,
        }}
      />
    </>
  );
};
