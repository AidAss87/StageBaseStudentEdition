"use client";

import { usePosts } from "@/store";
import { FormEventHandler, useState } from "react";
import { Input } from "./ui/input";

// type Props = {
//   onSearch: (value: any[]) => void;
// };

export const PostSearch = () => {
  const [search, setSearch] = useState("");
  const getPostsBySearch = usePosts((state) => state.getPostsBySearch);

  const handleInput = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const posts = await getPostsBySearch(target.value);
  };
  return (
    <form>
      <Input
        type="search"
        placeholder="search"
        // value={search}
        onInput={(event) => {
          handleInput(event);
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
};
