import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/apiService";
import { useRecoilValue } from "recoil";
import { boardState } from "../../atoms/board";

export const useEditTasks = () => {
  const queryClient = useQueryClient();
  const currentBoard = useRecoilValue(boardState);
  const {
    isLoading,
    status,
    error,
    isError,
    isSuccess,
    reset,
    mutate: editTasks,
  } = useMutation(["editTasks", currentBoard.BoardID], api.editTasks, {
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["getTasks", currentBoard.BoardID], () =>
        variables.map((group, groupIndex) =>
          group
            .map((task) => Object.assign({}, task, { Status: groupIndex }))
            .sort((a, b) => b.TaskPriority - a.TaskPriority)
        )
      );
    },
  });

  return { isLoading, status, error, isError, isSuccess, editTasks, reset };
};
