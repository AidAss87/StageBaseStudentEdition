import { getAllPosts, getAllPostsBySearch } from "@/services/posts";
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
