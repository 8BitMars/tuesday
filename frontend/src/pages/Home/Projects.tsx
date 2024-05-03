import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { CreateNewCard } from "../../components/CreateNewCard";
import { useGetProjects } from "../../hooks/project/useGetProjects";
import { ProjectCard } from "./ProjectCard";
import { useToggle } from "react-use";
import { CreateProjectModal } from "./CreateProjectModal";

export const Projects = () => {
  const { data, isError } = useGetProjects();
  const [isVisible, toggleVisible] = useToggle(false);

  return (
    <>
      <div className="flex items-center gap-1 text-xl font-semibold text-text-500">
        <WrenchScrewdriverIcon
          className="text-icon-500"
          height={20}
          width={20}
        />{" "}
        Your Projects
      </div>
      <CreateNewCard onCreate={toggleVisible}>Create New Project</CreateNewCard>
      <br />
      {isError && (
        <div className="text-negative-600">Error retrieving projects</div>
      )}
      <div className="flex flex-col gap-8">
        {data &&
          data.map((project, i) => (
            <ProjectCard
              key={i}
              id={project.ProjectID}
              priority={project.ProjectPriority}
              name={project.ProjectName}
              index={i}
            />
          ))}
      </div>

      <CreateProjectModal isVisible={isVisible} toggleVisible={toggleVisible} />
    </>
  );
};
