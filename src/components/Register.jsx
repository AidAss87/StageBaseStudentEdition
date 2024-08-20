// pages/register.tsx
"use client";
import { useState } from "react";
import { createUser } from "@/app/api/user/user";

export default function Register() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createUser(new FormData(e.target));
    // const res = await fetch("/api/user", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, role, password }),
    // });

    if (res.ok) {
      alert("User created successfully");
    } else {
      const error = await res.json();
      alert(error.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        name="name"
      />
      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="role"
        required
        name="role"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        name="pass"
      />
      <button type="submit">Register</button>
    </form>
  );
}
