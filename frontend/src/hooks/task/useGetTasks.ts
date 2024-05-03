import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/apiService";

export const useGetTasks = (boardId: number) => {
  return useQuery(["getTasks", boardId], () => api.getTasks(boardId));
};
