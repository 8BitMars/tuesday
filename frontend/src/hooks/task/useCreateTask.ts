import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/apiService";
import { Task } from "../../data/types";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    status,
    error,
    isError,
    isSuccess,
    reset,
    mutate: createTask,
  } = useMutation(["createTask"], api.createTask, {
    onSuccess: (data, variables) => {
      const newTask = { ...variables, TaskID: data.insertId } as Task;
      queryClient.setQueryData(
        ["getTasks", variables.BoardID],
        (tasks: Task[][] | undefined) => {
          if (!tasks) {
            let list: Task[][] = [[],[],[]];
            list[newTask.Status].push(newTask);
            return list;
          }
          let todos = [...tasks[0]];
          let doing = [...tasks[1]];
          let done = [...tasks[2]];
          let newList = [todos, doing, done];
          newList[newTask.Status].push(newTask);

          return newList;
        }
      );
    },
  });

  return { isLoading, status, error, isError, isSuccess, createTask, reset };
};
