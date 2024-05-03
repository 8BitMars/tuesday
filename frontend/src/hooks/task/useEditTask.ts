import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/apiService";
import { Task } from "../../data/types";
import { useRecoilValue } from "recoil";
import { boardState } from "../../atoms/board";

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const currentBoard = useRecoilValue(boardState);
  const {
    isLoading,
    status,
    error,
    isError,
    isSuccess,
    reset,
    mutate: editTask,
  } = useMutation(["editTask"], api.editTask, {
    onSuccess: (_data, variables) => {
      let shouldChangeLocation = false;
      let oldIndex = [0, 0];
      queryClient.setQueryData(
        ["getTasks", currentBoard.BoardID],
        (tasks: Task[][] | undefined) => {
          let newTasks: Task[][] = [[], [], []];
          if (tasks) {
            newTasks = [...tasks].map((group, groupIndex) =>
              group.map((task, taskIndex) => {
                if (task.TaskID === variables.TaskID) {
                  if (task.Status === variables.Status) {
                    return variables;
                  } else {
                    shouldChangeLocation = true;
                    oldIndex[0] = groupIndex;
                    oldIndex[1] = taskIndex;
                  }
                }
                return task;
              })
            );
            if (shouldChangeLocation) {
              newTasks[oldIndex[0]].splice(oldIndex[1], 1);
              newTasks[variables.Status].push(variables);
            }
          } else newTasks[variables.Status].push(variables);
          return newTasks.map((group) =>
            group.sort((a, b) => b.TaskPriority - a.TaskPriority)
          );
        }
      );
    },
  });

  return { isLoading, status, error, isError, isSuccess, editTask, reset };
};
