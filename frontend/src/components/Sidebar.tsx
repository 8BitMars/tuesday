import {
  ChevronDownIcon,
  ChevronLeftIcon,
  UserIcon,
  ViewColumnsIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import { useToggle } from "react-use";
import { useGetProjects } from "../hooks/project/useGetProjects";
import { useRecoilState, useSetRecoilState } from "recoil";
import { projectState } from "../atoms/project";
import { useNavigate } from "react-router-dom";
import { Board, Project } from "../data/types";
import { useGetBoards } from "../hooks/board/useGetBoards";
import { boardState } from "../atoms/board";
import { useUserInfo } from "../hooks/auth/useAuth";
import { PROFILE_URI } from "../constants/navigation";

export const Sidebar = () => {
  const userInfo = useUserInfo();
  const [currentProject, setCurrentProject] = useRecoilState(projectState);
  const setCurrentBoard = useSetRecoilState(boardState);
  const { data: projects } = useGetProjects();
  const { data: boards } = useGetBoards(currentProject.ProjectID);
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [isProjectsExpanded, toggleIsProjectsExpanded] = useToggle(false);
  const [isBoardsExpanded, toggleIsBoardsExpanded] = useToggle(false);
  const navigate = useNavigate();

  const dropdownProjects = projects ?? [];
  const dropdownBoards = boards ?? [];

  const onProjectClick = (project: Project) => {
    setCurrentProject(project);
    navigate("/project/" + project.ProjectID + "/board");
  };

  const onBoardClick = (board: Board) => {
    setCurrentBoard(board);
    navigate("/board/" + board.BoardID + "/tasks");
  };

  return (
    <div
      className={`fixed transition-all left-0 duration-300 flex-grow h-screen p-4 border-r border-gray-300 shadow-2xl bg-gray-50 ${
        isOpen ? "w-72" : "w-4"
      }`}
    >
      <ChevronLeftIcon
        height={24}
        width={24}
        className={`absolute transition-transform duration-500 text-icon-500 p-1 border border-gray-300 hover:drop-shadow rounded-full cursor-pointer top-3 -right-3 bg-gray-50 ${
          isOpen ? "border-none right-2" : "rotate-180"
        }`}
        onClick={toggleIsOpen}
      />
      {isOpen && (
        <div className="flex flex-col gap-4 text-text-500">
          <div className="flex items-center w-full gap-2 px-2 pb-4 text-lg font-semibold border-b border-gray-300 cursor-pointer" onClick={()=>navigate(PROFILE_URI)}>
            <UserIcon width={32} height={32} className="text-icon-500" />
            <div className="flex flex-col gap-1">
              {userInfo.displayName}
              <div className="text-xs text-text-300">{userInfo.email}</div>
            </div>
          </div>
          <div className="w-full px-2">
            <div
              className="flex items-center text-lg font-semibold cursor-pointer"
              onClick={() => toggleIsProjectsExpanded()}
            >
              <WrenchScrewdriverIcon
                height={16}
                width={16}
                className="text-icon-500"
              />
              <div className="flex-grow pl-2">Projects</div>
              <ChevronDownIcon
                height={16}
                width={16}
                className={`transition-transform justify-self-end text-icon-500 ${
                  isProjectsExpanded ? "" : "rotate-180"
                }`}
              />
            </div>
            {isProjectsExpanded &&
              dropdownProjects.map((project, i) => (
                <div
                  key={"project " + project.ProjectID}
                  className="ml-8 border-b border-transparent cursor-pointer hover:text-primary-500 transition-all"
                  onClick={() => onProjectClick(project)}
                >
                  {project.ProjectName}
                </div>
              ))}
          </div>

          {currentProject.ProjectID !== 0 && (
            <div className="w-full px-2">
              <div
                className="flex items-center text-lg font-semibold cursor-pointer"
                onClick={() => toggleIsBoardsExpanded()}
              >
                <ViewColumnsIcon
                  height={16}
                  width={16}
                  className="text-icon-500"
                />
                <div className="flex-grow pl-2">
                  {currentProject.ProjectName} Boards
                </div>
                <ChevronDownIcon
                  height={16}
                  width={16}
                  className={`transition-transform justify-self-end text-icon-500 ${
                    isBoardsExpanded ? "" : "rotate-180"
                  }`}
                />
              </div>
              {isBoardsExpanded &&
                dropdownBoards.map((board, i) => (
                  <div
                    key={"board " + board.BoardID}
                    className="pl-8 border-b border-transparent cursor-pointer hover:text-primary-500 transition-all"
                    onClick={() => onBoardClick(board)}
                  >
                    {board.BoardName}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
