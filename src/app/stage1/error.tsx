"use client";

export default function ErrorWarning({ error }: { error: Error }) {
  return <h1>Ooops!!! {error.message}</h1>;
}
