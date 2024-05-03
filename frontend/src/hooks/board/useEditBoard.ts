import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/apiService";
import { Board } from "../../data/types";
import { useRecoilValue } from "recoil";
import { projectState } from "../../atoms/project";

export const useEditBoard = () => {
  const queryClient = useQueryClient();
  const currentProject = useRecoilValue(projectState);
  const {
    isLoading,
    status,
    error,
    isError,
    isSuccess,
    reset,
    mutate: editBoard,
  } = useMutation(["editBoard"], api.editBoard, {
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ["getBoards", currentProject.ProjectID],
        (boards: Board[] | undefined) => {
          return boards
            ? boards.map((board) => {
                if (board.BoardID === variables.BoardID)
                  return variables as Board;
                return board;
              })
            : [];
        }
      );
    },
  });

  return { isLoading, status, error, isError, isSuccess, editBoard, reset };
};
