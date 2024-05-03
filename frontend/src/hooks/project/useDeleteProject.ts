import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/apiService";
import { Project } from "../../data/types";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    status,
    error,
    isError,
    isSuccess,
    reset,
    mutate: deleteProject,
  } = useMutation(["deleteProject"], api.deleteProject, {
    onSuccess: (_data, ProjectID) => {
      queryClient.setQueryData(
        ["getProjects"],
        (projects: Project[] | undefined) => {
          return projects
            ? projects.filter((project) => project.ProjectID !== ProjectID)
            : [];
        }
      );
    },
  });

  return { isLoading, status, error, isError, isSuccess, deleteProject, reset };
};
