import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/apiService";

export const useGetBoards = (projectId: number) => {
  return useQuery(["getBoards", projectId], () => api.getBoards(projectId));
};
