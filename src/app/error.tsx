"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-black/60 p-5 lg:table lg:rounded-md w-full">
      <main className="bg-[#263238] flex flex-col items-center p-5">
        <h2 className="text-lg mb-5">Oops! Something went wrong!</h2>
        <button
          className="hover:text-black/60 transition-all duration-300"
          onClick={() => reset()}
        >
          Try again
        </button>
      </main>
    </div>
  );
}
