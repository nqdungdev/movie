"use client";

import AsideTitle from "@/components/aside/AsideTitle";
import Button from "@/components/common/button/Button";
import Item from "@/components/common/item/Item";
import Skeleton from "@/components/common/skeleton/Skeleton";
import Characters from "@/components/movie/Characters";
import Information from "@/components/movie/Information";
import Similar from "@/components/movie/Similar";
import Trailer from "@/components/movie/Trailer";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import useSWR, { Fetcher } from "swr";

type Props = {};

const Movie = (props: Props) => {
  const [active, setActive] = useState<number>(0);
  const { id } = useParams();
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data: movie, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${id}?language=vi&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  console.log(movie);
  if (isLoading) return <Skeleton number={1} />;
  return (
    <>
      <article className="relative w-full h-56 md:h-96">
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

        <div className="absolute top-0 left-0 w-full p-5 flex gap-5 z-10">
          <div className="relative">
            <figure className="relative w-[180px] h-[260px]  rounded-md overflow-hidden">
              <Image
                fill
                sizes="20vw"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                title={movie.title}
                style={{ objectFit: "cover" }}
              />

              <Button className="absolute bottom-5 left-0 w-full rounded-none uppercase text-3xl hover:bg-secondary opacity-80">
                Xem phim
              </Button>
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/50 transition-all duration-300"></div>
            </figure>
          </div>

          <div>
            <div className="min-h-[200px]">
              <h1
                className="text-accent-green pt-2 mb-2 font-light text-3xl line-clamp-1"
                title={movie.title}
              >
                {movie.title}
              </h1>
              <h2 className="mb-3 line-clamp-1" title={movie.original_title}>
                {movie.original_title}
              </h2>

              <div
                className="text-white/70 line-clamp-[7] mb-5 text-xs font-semibold"
                title={movie.overview}
              >
                {movie.overview}
              </div>
            </div>

            <div className="flex items-center pt-5 border-t border-solid border-[#696969]">
              <span className="mr-2 text-md font-bold text-accent-green border-2 border-solid border-accent-green rounded-full p-2">
                {movie.vote_average.toFixed(1)}
              </span>

              <div>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, index: number) =>
                    index < Math.round(movie.vote_average) ? (
                      <FaStar className="text-yellow-500 w-3" key={index} />
                    ) : (
                      <FaStar className="text-white/50 w-3" key={index} />
                    )
                  )}
                </div>

                <p className="text-xs">
                  (Đánh giá <strong>{movie.vote_average.toFixed(1)}/</strong>
                  10 từ <strong>{movie.vote_count}</strong> thành viên)
                </p>
              </div>
            </div>

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
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      </article>

      <article>
        <ul className="pt-5 mx-3 flex items-center">
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
          {active === 1 && <Characters id={id} />}
          {active === 2 && <Trailer id={id} />}
          {active === 3 && (
            <div className="bg-[#fcf8e3] border-solid border border-[#fcf8e3] rounded-md text-xs p-5 font-semibold text-accent-brown">
              Phim này không có hình ảnh bổ sung nào!
            </div>
          )}
        </div>
        <Similar id={id} />
      </article>
    </>
  );
};

export default Movie;
