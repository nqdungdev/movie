"use client";

import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import Item from "@/components/common/item/Item";
import Pagination from "@/components/common/pagination/Pagination";
import Skeleton from "@/components/common/skeleton/Skeleton";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import useSWR, { Fetcher } from "swr";

const Genre = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());

  const { data: movies, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/discover/movie?with_genres=${
      params.id
    }&language=vi&page=${Number(searchParams.get("page")) || 1}&api_key=${
      process.env.NEXT_PUBLIC_TMDB_API_KEY
    }`,
    fetcher
  );

  console.log(searchParams.get("name"));

  if (isLoading) return <Skeleton number={20} />;
  return (
    <>
      {<Breadcrumb last={searchParams.get("name") || "Action"} />}
      {
        <div className="mb-12">
          <span className="flex items-center justify-center text-base uppercase font-medium py-0 px-5 h-10 w-max bg-accent-green text-[#333] rounded-md mb-2">
            Danh sách tất cả film theo thể loại:&nbsp;
            <span>{searchParams.get("name") || "Action"}</span>
          </span>
        </div>
      }
      <ul className="w-full grid grid-cols-4 gap-5">
        {movies?.results.map((movie: IMovie, index: number) => (
          <li key={movie.id}>
            <Item movie={movie} />
          </li>
        ))}
      </ul>
      {movies && <Pagination totalPage={movies.total_pages} />}
    </>
  );
};

export default Genre;
