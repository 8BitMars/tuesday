import { useUserInfo } from "../../hooks/auth/useAuth";
import { Projects } from "./Projects";

export const Home = () => {
  const { displayName } = useUserInfo();
  console.log(window.location.href);

  return (
    <div className="flex flex-col w-full gap-2 p-4">
      <div className="pb-4 text-2xl font-semibold border-b border-gray-300 text-primary-500">
        <span className="text-text-500">
          Welcome {" "}
        </span>
        {displayName}!
      </div>
      <Projects />
    </div>
  );
};
