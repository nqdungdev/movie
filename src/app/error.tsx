"use client";

import Button from "@/components/common/button/Button";
import { useEffect, useRef } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const errorMessage = useRef<HTMLHeadingElement>(null);
  let i = 0;
  let txt = "Oops! Something went wrong! ";

  let idTimeout: NodeJS.Timeout;
  const typeWriter = () => {
    if (i < txt.length) {
      (errorMessage.current as HTMLHeadingElement).innerHTML += txt.charAt(i);
      i++;
      idTimeout = setTimeout(typeWriter, 100);
    }
  };

  useEffect(() => {
    typeWriter();

    return () => {
      clearTimeout(idTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="bg-[#263238] flex flex-col items-center p-5">
      <div className="h-[15rem]">
        <div className="lamp relative w-3 h-40 before:absolute before:w-16 before:h-16 before:rounded-full before:animate-flickerLamp before:shadow-sm before:top-40 before:-left-[1.6rem]">
          <div className="absolute h-6 w-1 bg-white/10 top-40 left-1 before:absolute before:w-[0.9rem] before:h-[0.9rem] before:rounded-full before:border-[0.2rem] before:border-white/10 before:top-6 before:-left-[0.35rem]" />
        </div>
      </div>

      <div className="flex items-center mb-5">
        <h2 ref={errorMessage} className="text-lg"></h2>
        <div className="block w-1 h-[1.125rem] animate-flicker"></div>
      </div>

      <Button
        className="hover:text-black/60 transition-all duration-300"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </main>
  );
}
