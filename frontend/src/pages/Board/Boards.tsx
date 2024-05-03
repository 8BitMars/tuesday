import { useToggle } from "react-use";
import { CreateNewCard } from "../../components/CreateNewCard";
import { useGetBoards } from "../../hooks/board/useGetBoards";
import { useRecoilValue } from "recoil";
import { projectState } from "../../atoms/project";
import { BoardCard } from "./BoardCard";
import { CreateBoardModal } from "./CreateBoardModal";
import { BreadCrumb } from "../../components/BreadCrumb";

export const Boards = () =>
{
  const currentProject = useRecoilValue(projectState);
  const { data: boards, isError } = useGetBoards(currentProject.ProjectID);
  const [isCreateModalVisible, toggleCreateModal] = useToggle(false);

  return (
    <div className="flex flex-col w-full gap-2 p-4 text-text-500">
      <BreadCrumb />
      {isError && (
        <div className="text-negative-600">Error retrieving project boards</div>
      )}
      <div className="flex flex-wrap gap-2">
        {boards &&
          boards.map((board, i) => (
            <BoardCard
              key={i}
              id={board.BoardID}
              priority={board.BoardPriority}
              name={board.BoardName}
              index={i}
              projectId={currentProject.ProjectID}
              projectName={currentProject.ProjectName}
              projectPriority={currentProject.ProjectPriority}
            />
          ))}
        <CreateNewCard onCreate={toggleCreateModal}>
          Create New Board
        </CreateNewCard>
      </div>

      <CreateBoardModal
        isVisible={isCreateModalVisible}
        toggleVisible={toggleCreateModal}
      />
    </div>
  );
};
