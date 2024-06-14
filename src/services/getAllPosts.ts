export const getAllPosts = async () => {
  const response = await fetch("/api/posts");
  if (!response.ok) throw new Error("unable to fetch");
  return response.json();
};

export const getAllPostsBySearch = async (search: string) => {
  const response = await fetch(`/api/posts?q=${search}`);
  if (!response.ok) throw new Error("unable to fetch");
  return response.json();
};
