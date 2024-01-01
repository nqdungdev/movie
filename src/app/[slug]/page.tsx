"use client";

import Item from "@/components/common/item/Item";
import Pagination from "@/components/common/panigation/Pagination";
import Skeleton from "@/components/common/skeleton/Skeleton";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React from "react";
import useSWR, { Fetcher } from "swr";

type Props = {};

const SeeMore = (props: Props) => {
  const params = useParams();
  const searchParams = useSearchParams();

  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());

  const { data: movies, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${
      params.slug
    }?language=vi&page=${Number(searchParams.get("page")) || 1}&api_key=${
      process.env.NEXT_PUBLIC_TMDB_API_KEY
    }`,
    fetcher
  );

  if (
    params.slug !== "now_playing" &&
    params.slug !== "upcoming" &&
    params.slug !== "popular"
  )
    return;

  console.log(isLoading);

  if (isLoading) return <Skeleton number={20} />;
  return (
    <main className="pr-5 w-full table-cell align-top">
      <ul className="w-full grid grid-cols-4 gap-5">
        {movies?.results.map((movie: IMovie, index: number) => (
          <li key={movie.id}>
            <Item movie={movie} />
          </li>
        ))}
      </ul>
      {movies && <Pagination totalPage={movies.total_pages} />}
    </main>
  );
};

export default SeeMore;
