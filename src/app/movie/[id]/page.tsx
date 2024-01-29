"use client";

import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/common/breadcrumb/Breadcrumb";
import Skeleton from "@/components/common/skeleton/Skeleton";
import Characters from "@/components/movie/Characters";
import Information from "@/components/movie/Information";
import Similar from "@/components/movie/Similar";
import Trailer from "@/components/movie/Trailer";
import Watch from "@/components/movie/watch/Watch";
import { notFound } from "next/navigation";
import { useState } from "react";
import useSWR, { Fetcher } from "swr";
type Props = {
  params: { id: string };
};

const Movie = ({ params }: Props) => {
  const [active, setActive] = useState<number>(0);
  const [watch, setWatch] = useState<boolean>(false);
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const {
    data: movie,
    isLoading,
    error,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${params.id}?language=vi&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  console.log(movie);
  console.log(error);

  if (isLoading) return <Skeleton number={1} />;
  // if (error || !movie?.success) return notFound();
  return (
    <>
      <Breadcrumb
        genres={movie.genres}
        movie={{ id: movie.id, name: movie.title }}
        last={`${watch ? "Xem phim" : "Thông tin"}`}
      />
      {watch && <Watch id={params.id} />}
      <Banner movie={movie} watchProps={[watch, setWatch]} />
      {!watch && (
        <article>
          <ul className="pt-5 mx-3 flex items-center flex-wrap">
            {["Thông tin phim", "Nhân vật", "Trailer", "Hình ảnh"].map(
              (item, index) => (
                <li
                  key={index}
                  className={`relative text-sm px-1 transition-all duration-200 whitespace-nowrap pb-5 mr-10 hover:cursor-pointer border-b-[3px] border-solid border-transparent ${
                    active === index &&
                    "text-accent-green !border-accent-green before:absolute before:-bottom-2 before:left-0 before:right-0 before:border-transparent before:h-0 before:w-0 before:border-solid before:border-l-[5px] before:border-r-[5px] before:border-t-[5px] before:border-t-accent-green before:mx-auto before:content-center"
                  }`}
                  onClick={() => setActive(index)}
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <div className="p-5 bg-[#1f282d] rounded-b-md">
            {active === 0 && <Information movie={movie} />}
            {active === 1 && <Characters id={params.id} />}
            {active === 2 && <Trailer id={params.id} />}
            {active === 3 && (
              <div className="bg-[#fcf8e3] border-solid border border-[#fcf8e3] rounded-md text-xs p-5 font-semibold text-accent-brown">
                Phim này không có hình ảnh bổ sung nào!
              </div>
            )}
          </div>
        </article>
      )}
      <Similar id={params.id} />
    </>
  );
};

export default Movie;
