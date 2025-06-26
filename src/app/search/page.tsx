"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Modal } from "@/components/ui/Modal";

interface Post {
  id: string;
  title: string;
  body: string;
  stage: string;
  contextTitle?: string;
  contextBody?: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Дебаунс-переменная
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Дебаунсер: обновляем `debouncedQuery` после задержки
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Задержка 500 мс

    return () => clearTimeout(handler); // Очищаем таймер при изменении `searchQuery`
  }, [searchQuery]);

  // Автоматический поиск при изменении `debouncedQuery`
  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchResults(debouncedQuery);
    } else {
      setResults([]); // Очищаем результаты, если строка пустая
    }
  }, [debouncedQuery]);

  const closeModal = () => {
    router.back();
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

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <h2 className="text-xl font-semibold mb-4">Поиск по статьям</h2>

      {/* Поле ввода */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Введите запрос..."
          className="px-4 py-2 border rounded-md flex-grow focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Результаты поиска */}
      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : results.length > 0 ? (
        <div className="space-y-4 overflow-y-auto max-h-[600px]">
          {results.map((post) => (
            <div key={post.id} className="border p-4 rounded-lg shadow-sm">
              <p>- Stage {post.stage}</p>
              <Link
                href={`/post/${post.id}`}
                className="text-lg font-semibold hover:underline"
              >
                {post.title}
              </Link>
              {post.contextBody && (
                <p className="text-sm text-gray-600 mt-2">
                  <span className="bg-yellow-200 px-1 rounded">
                    {post.contextBody}
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Ничего не найдено.</p>
      )}
    </Modal>
  );
}
