import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface Project {
  ProjectID: number;
  ProjectName: string;
  ProjectPriority: number;
}

export const projectState = atom<Project>({
  key: "projectState",
  default: {
    ProjectID: 0,
    ProjectName: "No Projects",
    ProjectPriority: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const projectNameState = selector({
  key: "projectNameState",
  get: ({ get }) => {
    const projectName = get(projectState).ProjectName;

    return projectName;
  },
});
