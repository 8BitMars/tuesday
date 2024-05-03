import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/apiService";
import { Board } from "../../data/types";
import { useRecoilValue } from "recoil";
import { projectState } from "../../atoms/project";

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const currentProject = useRecoilValue(projectState);
  const {
    isLoading,
    status,
    error,
    isError,
    isSuccess,
    reset,
    mutate: deleteBoard,
  } = useMutation(["deleteBoard"], api.deleteBoard, {
    onSuccess: (_data, BoardID) => {
      queryClient.setQueryData(
        ["getBoards", currentProject.ProjectID],
        (boards: Board[] | undefined) => {
          return boards
            ? boards.filter((board) => board.BoardID !== BoardID)
            : [];
        }
      );
    },
  });

  return { isLoading, status, error, isError, isSuccess, deleteBoard, reset };
};
