"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Добавляем импорт Link
import axios from "axios";
import { Modal } from "@/components/ui/Modal";

interface Post {
  id: string;
  title: string;
  body: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Блокируем прокрутку
    return () => {
      document.body.style.overflow = "auto"; // Разблокируем при выходе
    };
  }, []);

  const closeModal = () => {
    router.back(); // Возвращаемся назад
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await fetchResults(searchQuery);
    }
  };

  const fetchResults = async (value: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/search", { value });
      setResults(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Ошибка при выполнении поиска");
    } finally {
      setLoading(false);
    }
  };

  console.log("🔵 Отправка запроса на API:", `/api/search?q=${searchQuery}`);

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <h2 className="text-xl font-semibold mb-4">Поиск по статьям</h2>

      {/* Поле ввода и кнопка поиска */}
      <form onSubmit={handleSearch} className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Введите запрос..."
          className="px-4 py-2 border rounded-l-md flex-grow focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
        >
          Искать
        </button>
      </form>

      {/* Результаты поиска */}
      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          {results.map((post) => (
            <div key={post.id} className="border p-4 rounded-lg shadow-sm">
              {/* Добавляем ссылку */}
              <Link
                href={`/post/${post.id}`}
                className="text-lg font-semibold hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-gray-700">{post.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Ничего не найдено.</p>
      )}
    </Modal>
  );
}
