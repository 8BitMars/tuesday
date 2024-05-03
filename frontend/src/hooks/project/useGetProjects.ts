import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/apiService";

export const useGetProjects = () => {
  return useQuery(["getProjects"], api.getProjects);
};
