"use client";

import { usePosts } from "@/store";
import { FormEventHandler, useState } from "react";

// type Props = {
//   onSearch: (value: any[]) => void;
// };

export const PostSearch = () => {
  const [search, setSearch] = useState("");
  const getPostsBySearch = usePosts((state) => state.getPostsBySearch);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const posts = await getPostsBySearch(search);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className=" border-blue-900 border-2"
        type="search"
        placeholder="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};
