import { getAllPosts, getAllPostsBySearch } from "@/services/posts";
import { getAllUsers } from "@/services/users";
import { StageState } from "@/shared/model/types/StageState/StageState.types";
import { create } from "zustand";

interface UsePosts {
  posts: any[];
  loading: boolean;
  getAllPosts: (stage: string) => Promise<void>;
  getPostsBySearch: (value: string) => Promise<void>;
}
interface AdminState {
  admin: boolean;
  changeAdmin: (arg0: boolean) => void;
}
interface UserState {
  users: any[];
  loading: boolean;
  getAllUsers: () => Promise<void>;
}

export const usePosts = create<UsePosts>()((set) => ({
  posts: [],
  loading: false,
  getAllPosts: async (stage) => {
    set({ loading: true });
    const posts = await getAllPosts(stage);
    set({ posts, loading: false });
  },
  getPostsBySearch: async (search) => {
    set({ loading: true });
    const posts = await getAllPostsBySearch(search);
    set({ posts, loading: false });
  },
}));

export const useAdmin = create<AdminState>((set) => ({
  admin: false,
  changeAdmin: (state) =>
    set(() => ({
      admin: state,
    })),
}));

export const useUser = create<UserState>((set) => ({
  users: [],
  loading: false,
  getAllUsers: async () => {
    set({ loading: true });
    const users = await getAllUsers();
    set({ users, loading: false });
  },
}));


export const useStage = create<StageState>((set) => ({
  currentStage: 0,
  setCurrentStage: (index) => set({ currentStage: index }),
}));
