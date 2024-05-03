import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { HOME_URI } from "../../constants/navigation";
import { useResetRecoilState } from "recoil";
import { boardState } from "../../atoms/board";
import { projectState } from "../../atoms/project";

export const useLogin = () => {
  const navigate = useNavigate();
  const resetCurrentBoard = useResetRecoilState(boardState);
  const resetCurrentProject = useResetRecoilState(projectState);

  const {
    isLoading,
    status,
    error,
    isError,
    mutate: login,
  } = useMutation(["login"], api.login, {
    onSuccess: (data) => {
      document.cookie = "tuesday=" + data;
      navigate("/" + HOME_URI);
      resetCurrentBoard();
      resetCurrentProject();
    },
  });

  return { isLoading, status, error, isError, login };
};
