import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/apiService";
import { Project } from "../../data/types";

export const useEditProject = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    status,
    error,
    isError,
    isSuccess,
    reset,
    mutate: editProject,
  } = useMutation(["editProject"], api.editProject, {
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ["getProjects"],
        (projects: Project[] | undefined) => {
          return projects
            ? projects.map((project) => {
                if (project.ProjectID === variables.ProjectID)
                  return variables as Project;
                return project;
              })
            : [];
        }
      );
    },
  });

  return { isLoading, status, error, isError, isSuccess, editProject, reset };
};
