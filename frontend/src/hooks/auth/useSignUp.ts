import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { HOME_URI } from "../../constants/navigation";

export const useSignUp = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    status,
    error,
    isError,
    mutate: signUp,
  } = useMutation(["signUp"], api.signUp, {
    onSuccess: (data) => {
      document.cookie = "tuesday=" + data;
      navigate("/" + HOME_URI);
    },
  });

  return { isLoading, status, error, isError, signUp };
};
