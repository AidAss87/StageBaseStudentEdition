"use client";
import UserCard from "@/components/UserCard";
import { useUser } from "@/store";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";
export default function users() {
  const [users, loading, getAllUsers] = useUser(
    (state) => [state.users, state.loading, state.getAllUsers],
    shallow
  );
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  console.log(users);
  return (
    <div className="container flex flex-col gap-3 pt-4">
      {loading ? (
        <p>Loading</p>
      ) : (
        users.map((e) => (
          <UserCard {...e} getAllUsers={getAllUsers} key={e.id} />
        ))
      )}
    </div>
  );
}
