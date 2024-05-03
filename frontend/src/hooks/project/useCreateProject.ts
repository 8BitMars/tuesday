import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/apiService";
import { Project } from "../../data/types";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    status,
    error,
    isError,
    isSuccess,
    reset,
    mutate: createProject,
  } = useMutation(["createProject"], api.createProject, {
    onSuccess: (data, variables) => {
      const newProject = { ...variables, ProjectID: data.insertId } as Project;
      queryClient.setQueryData(
        ["getProjects"],
        (projects: Project[] | undefined) => {
          return projects ? [...projects, newProject] : [newProject];
        }
      );
    },
  });

  return { isLoading, status, error, isError, isSuccess, createProject, reset };
};
