"use client";

import Carousel from "@/components/carousel/Carousel";

import Item from "@/components/common/item/Item";

import useSWR, { Fetcher } from "swr";
export default function Home() {
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/now_playing?language=vi&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  return (
    <main className="pr-5 w-full table-cell align-top">
      <Carousel />

      <section>
        <h2 className="bg-accent-red p-2 my-5 uppercase w-max rounded-lg">
          Mới cập nhật
        </h2>
        <ul className="w-full grid grid-cols-4 gap-5">
          {data?.results.map((movie: any) => (
            <li key={movie.id}>
              <Item movie={movie} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
