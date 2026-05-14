"use client";

import { useEffect, useState } from "react";
import { User } from "../types/user";
import { motion } from "framer-motion";

interface Props {
  users: User[];
}

export default function ClientComp({ users }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔥 Fake loading delay (simulate)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 🔍 Filter users
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // ⭐ Toggle favorite
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="🔍 Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full text-white bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
      />

      {/* 👥 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 🔥 Skeleton Loader */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-2xl h-32"
            />
          ))}

        {/* ✅ Users */}
        {!loading &&
          filteredUsers.map((user, index) => {
            const isFav = favorites.includes(user.id);

            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full text-white bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
              >
                {/* 🖼️ Avatar */}
                <img
                  src={`https://i.pravatar.cc/150?img=${user.id}`}
                  alt={user.name}
                  className="w-14 h-14 rounded-full mb-3"
                />

                {/* 👤 Info */}
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-300">{user.email}</p>

                {/* ⭐ Favorite Button */}
                <button
                  onClick={() => toggleFavorite(user.id)}
                  className={`mt-3 text-sm px-3 py-1 rounded-full ${
                    isFav
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {isFav ? "★ Favorite" : "☆ Add to Favorite"}
                </button>
              </motion.div>
            );
          })}

        {/* ❌ Empty State */}
        {!loading && filteredUsers.length === 0 && (
          <div className="col-span-full text-center text-gray-500 text-lg">
            😕 No users found
          </div>
        )}

      </div>
    </div>
  );
}