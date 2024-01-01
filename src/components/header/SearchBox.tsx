"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import useSWR, { Fetcher } from "swr";
import Button from "../common/button/Button";

type Props = {};

const SearchBox = (props: Props) => {
  const [search, setSearch] = React.useState<string>("");

  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());

  const {
    data: movies,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/search/movie?include_adult=false&query=${search}&language=vi&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  const { push } = useRouter();

  return (
    <div className="relative w-[230px] h-full flex items-center">
      <Link
        href={{
          pathname: "/search",
          query: { keyword: search },
        }}
        className={`absolute top-0 left-0 w-10 h-full flex justify-center items-center z-10 opacity-50 ${
          search.trim() === "" && "pointer-events-none"
        }`}
        onClick={() => setSearch("")}
      >
        <FaSearch size="1em" className="text-[#78909c]" />
      </Link>
      <form>
        <label className="text-[#78909c]">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={search}
            className="bg-black/60 border-[#263238] border-solid border rounded pl-10 text-sm font-semibold opacity-50 focus:bg-black/40 focus:opacity-100 focus:outline-none h-10 w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </form>

      {movies && movies.results.length > 0 && (
        <div className="absolute top-full left-0 w-full z-20 rounded-md bg-[#263238] overflow-hidden">
          <ul>
            {movies.results.map(
              (movie: any, index: number) =>
                index < 5 && (
                  <li
                    key={index}
                    className="border-b border-solid border-[#222e33] text-[#888] px-3 py-1 flex gap-1"
                  >
                    <Link
                      href={`/movie/${movie.id}`}
                      onClick={() => setSearch("")}
                    >
                      <figure className="relative w-[40px] h-[60px] block shrink-0">
                        <Image
                          fill
                          sizes="20vw"
                          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                          alt={movie.title}
                          title={movie.title}
                          style={{ objectFit: "cover" }}
                        />
                      </figure>
                    </Link>

                    <div className="pl-3">
                      <Link
                        href={`/movie/${movie.id}`}
                        onClick={() => setSearch("")}
                      >
                        <h4
                          className="text-accent-green font-light text-sm line-clamp-2"
                          title={movie.title}
                        >
                          {movie.title}
                        </h4>
                      </Link>

                      <p
                        className="text-xs line-clamp-1"
                        title={movie.original_title}
                      >
                        {movie.original_title}
                      </p>
                    </div>
                  </li>
                )
            )}

            <li>
              <Button
                className="w-full rounded-none hover:bg-secondary hover:opacity-70"
                onClick={() => {
                  push(`/search?keyword=${search}`);
                  setSearch("");
                }}
              >
                Tìm kiếm
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
