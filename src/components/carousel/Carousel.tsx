"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import useSWR, { Fetcher } from "swr";
import Button from "../common/button/Button";

const Carousel = () => {
  const LIMIT = 9;
  const [current, setCurrent] = useState(0);
  const moviesRef = useRef<HTMLDivElement>(null);
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data: popular } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/popular?language=vi&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  useEffect(() => {
    const next = (current + 1) % LIMIT;
    const id = setTimeout(() => handleShowSlides(next), 5000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const handleShowSlides = (index: number) => {
    (moviesRef.current as HTMLDivElement).children[current].classList.add(
      "animate-fadeOut"
    );
    setTimeout(() => setCurrent(index), 900);
  };

  return (
    <div className="relative w-full">
      <div
        ref={moviesRef}
        className="relative h-56 overflow-hidden rounded-lg md:h-96"
      >
        {popular?.results.map(
          (movie: any, index: number) =>
            index <= LIMIT && (
              <div
                key={movie.id}
                className={`relative w-full h-full duration-700 ease-in-out ${
                  current === index
                    ? "block animate-fadeIn"
                    : "hidden animate-fadeOut"
                }`}
              >
                <figure className="relative w-full h-full">
                  <Image
                    fill
                    sizes="80vw"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                    title={movie.title}
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </figure>
                <div className="absolute top-0 left-0 w-1/2 min-w-[450px] h-full p-5 bg-black/40">
                  <Link
                    href={`/movie/${movie.id}`}
                    className="mb-3 font-semibold text-white text-3xl"
                  >
                    {movie.title}
                  </Link>
                  <p className="my-3">
                    <span className="text-xs mr-2 text-white bg-accent-red font-bold rounded-xl p-2">
                      HD
                    </span>
                    <span className="mr-2 text-xs font-bold text-[#b5e745]">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-xs text-white font-light">
                      {movie.release_date}
                    </span>
                  </p>
                  <p className="text-xs text-white line-lamp-2 mb-3">
                    {movie.overview}
                  </p>

                  <Button>
                    <p>
                      Xem <strong>Phim</strong>
                    </p>
                  </Button>
                </div>
              </div>
            )
        )}
      </div>

      <div className="absolute z-30 flex bottom-5 right-5 space-x-3">
        {popular?.results.map(
          (movie: any, index: number) =>
            index <= LIMIT && (
              <button
                key={movie.id}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  current === index
                    ? "bg-accent-red opacity-100"
                    : "bg-white opacity-20"
                }`}
                onClick={() => handleShowSlides(index)}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Carousel;
