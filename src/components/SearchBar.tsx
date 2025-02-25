"use client";

import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const openSearchPage = () => {
    router.push("/search"); // Переход на страницу поиска
  };
  

  return (
    <button
      onClick={openSearchPage}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      Поиск
    </button>
    
  );
}
