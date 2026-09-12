import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-neutral-200">404</h1>
      <h2 className="mt-4 text-xl font-semibold text-neutral-300">Page Not Found</h2>
      <p className="mt-2 text-neutral-400">The page you are looking for does not exist or has been moved.</p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-700 transition"
      >
        Return Home
      </Link>
    </main>
  );
}
