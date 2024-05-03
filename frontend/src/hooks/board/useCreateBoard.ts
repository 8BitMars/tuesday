import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/apiService";
import { Board } from "../../data/types";

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    status,
    error,
    isError,
    isSuccess,
    reset,
    mutate: createBoard,
  } = useMutation(["createBoard"], api.createBoard, {
    onSuccess: (data, variables) => {
      const newBoard = { ...variables, BoardID: data.insertId } as Board;
      queryClient.setQueryData(
        ["getBoards", variables.ProjectID],
        (boards: Board[] | undefined) => {
          return boards ? [...boards, newBoard] : [newBoard];
        }
      );
    },
  });

  return { isLoading, status, error, isError, isSuccess, createBoard, reset };
};
