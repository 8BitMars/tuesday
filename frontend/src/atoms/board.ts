import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface Board {
  BoardID: number;
  BoardName: string;
  BoardPriority: number;
}

export const boardState = atom<Board>({
  key: "boardState",
  default: {
    BoardID: 0,
    BoardName: "No Boards",
    BoardPriority: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
