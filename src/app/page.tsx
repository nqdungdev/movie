"use client";

import Carousel from "@/components/carousel/Carousel";
import Products from "@/components/common/products/Products";
import useSWR, { Fetcher } from "swr";

export default function Home() {
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data: now_playing } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/now_playing?language=vi&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  const { data: upcoming } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/upcoming?language=vi&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  const { data: popular } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/popular?language=vi&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  return (
    <main className="pr-5 w-full table-cell align-top">
      <Carousel />
      {now_playing && (
        <Products
          movies={now_playing.results}
          limit={12}
          title="Mới cập nhật"
          path="now_playing"
        />
      )}
      {upcoming && (
        <Products
          movies={upcoming.results}
          limit={12}
          title="Sắp chiếu"
          path="upcoming"
        />
      )}
      {popular && (
        <Products
          movies={popular.results}
          limit={12}
          title="Đề cử"
          path="popular"
        />
      )}
    </main>
  );
}
