import jwtDcode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { LOGIN_URI } from "../../constants/navigation";
import { useResetRecoilState } from "recoil";
import { projectState } from "../../atoms/project";
import { boardState } from "../../atoms/board";

export function getCookie(name: string) {
  const nameEQ = name + "=";
  const cookieArray = document.cookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ")
      cookie = cookie.substring(1, cookie.length);
    if (cookie.indexOf(nameEQ) === 0)
      return cookie.substring(nameEQ.length, cookie.length);
  }
  return "";
}

function deleteCookie(name: string) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

interface UserInfo {
  userId: number;
  email: string;
  displayName: string;
}
export const useUserInfo = () => {
  const decodedToken: any = jwtDcode(getCookie("tuesday"));
  const { userId, email, displayName }: UserInfo = decodedToken;
  return { userId, email, displayName };
};

export const useIsAuthenticated = () => {
  try {
    const decodedToken: any = jwtDcode(document.cookie);
    return decodedToken?.exp && Date.now() < decodedToken.exp * 1000;
  } catch {
    return false;
  }
};

export const useLogout = () => {
  const navigate = useNavigate();
  const resetProjectState = useResetRecoilState(projectState);
  const resetBoardState = useResetRecoilState(boardState);

  return () => {
    resetProjectState();
    resetBoardState();
    deleteCookie("tuesday");
    navigate(LOGIN_URI);
  };
};
