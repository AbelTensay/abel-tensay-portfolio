"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-neutral-950 text-neutral-100">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-sm text-neutral-400">An unforeseen error occurred.</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium hover:bg-neutral-700 transition"
      >
        Try again
      </button>
    </main>
  );
}
