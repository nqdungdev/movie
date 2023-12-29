"use client";

import Item from "@/components/common/item/Item";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR, { Fetcher } from "swr";

type Props = {};

const Search = (props: Props) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());

  const {
    data: movies,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/search/movie?include_adult=false&query=${keyword}&language=vi&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  console.log(movies);
  return (
    <main className="pr-5 w-full table-cell align-top">
      <section>
        <ul className="w-full grid grid-cols-4 gap-5">
          {movies?.results.map((movie: any) => (
            <li key={movie.id}>
              <Item movie={movie} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Search;
