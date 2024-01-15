"use client";

import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import Item from "@/components/common/item/Item";
import Pagination from "@/components/common/pagination/Pagination";
import Skeleton from "@/components/common/skeleton/Skeleton";
import { Slug } from "@/types/const";
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

  function isInstance<T extends object>(
    value: string | string[] | number,
    type: T
  ): type is T {
    return Object.values(type).includes(value);
  }
  if (!isInstance(params.slug, Slug)) return;

  const title =
    isInstance(params.slug, Slug) && params.slug === "now_playing"
      ? "Danh sách film mới cập nhật"
      : params.slug === "upcoming"
      ? "Danh sách film sắp chiếu"
      : params.slug === "popular"
      ? "Danh sách film phổ biến"
      : "";

  if (isLoading) return <Skeleton number={20} />;

  return (
    <>
      {title !== "" && <Breadcrumb last={title} />}
      {title !== "" && (
        <div className="mb-12">
          <span className="flex items-center justify-center text-base uppercase font-medium py-0 px-5 h-10 w-max bg-accent-green text-[#333] rounded-md mb-2">
            {title}
          </span>
        </div>
      )}
      <ul className="w-full grid grid-cols-4 gap-5">
        {movies?.results.map((movie: IMovie, index: number) => (
          <li key={movie.id}>
            <Item
              movie={movie}
              upcoming={params.slug === Slug.UPCOMING ? true : false}
            />
          </li>
        ))}
      </ul>
      {movies && <Pagination totalPage={movies.total_pages} />}
    </>
  );
};

export default SeeMore;
