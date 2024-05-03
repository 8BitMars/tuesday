import {
  ChevronRightIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import { useRecoilValue } from "recoil";
import { projectState } from "../atoms/project";
import { boardState } from "../atoms/board";

export const BreadCrumb = () => {
  const currentProject = useRecoilValue(projectState);
  const currentBoard = useRecoilValue(boardState);
  const aPath = window.location.pathname.split("/");
  const currentPage = aPath[aPath.length - 1];

  return (
    <div className="flex items-center gap-1 pb-4 text-xl font-semibold cursor-default text-icon-500">
      {currentPage === "board" && (
        <>
          <a
            href="/"
            className="flex items-center gap-1 cursor-pointer hover:text-icon-600"
          >
            <HomeIcon height={20} width={20} />
            Home
          </a>
          <ChevronRightIcon height={15} width={15} />
          {currentProject.ProjectName} - Boards
        </>
      )}
      {currentPage === "tasks" && (
        <>
        <a
            href="/"
            className="flex items-center gap-1 cursor-pointer hover:text-icon-600"
          >
            <HomeIcon height={15} width={15} />
            Home
          </a>
          <ChevronRightIcon height={15} width={15} />
          <a
          href={"/project/" + currentProject.ProjectID + "/board"}
          className="flex items-center gap-1 cursor-pointer hover:text-icon-600"
          
          >
            <WrenchScrewdriverIcon height={15} width={15} />
            {currentProject.ProjectName}
          </a>
          <ChevronRightIcon height={15} width={15} />
          {currentBoard.BoardName} - Tasks
        </>
      )}
    </div>
  );
};
