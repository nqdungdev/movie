"use client";
import React from "react";
import Button from "../common/button/Button";
import AsideTitle from "./AsideTitle";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

const Aside = (props: Props) => {
  const LIMIT = 9;

  const router = useRouter();

  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data: now_playing } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/now_playing?language=vi&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  const { data: top_rated } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/top_rated?language=vi&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  return (
    <>
      <section className="p-3 mb-5 bg-[#696969]/10 rounded-md">
        <AsideTitle>Hôm nay xem gì?</AsideTitle>
        <p className="text-sm mb-4">
          Nếu bạn buồn phiền không biết xem gì hôm nay. Hãy để chúng tôi chọn
          cho bạn
        </p>
        <Button
          onClick={() =>
            router.push(
              `/movie/${
                now_playing?.results[Math.floor(Math.random() * 20) + 1].id
              }`
            )
          }
        >
          <p>
            Xem Film <strong>Ngẫu Nhiên</strong>
          </p>
        </Button>
      </section>
      <section className="p-3 mb-5 bg-[#696969]/10 rounded-md">
        <AsideTitle className="uppercase">Film mới cập nhật</AsideTitle>
        <ul>
          {now_playing?.results.map(
            (movie: any, index: number) =>
              index <= LIMIT && (
                <li
                  key={movie.id}
                  className="hover:border-l-[#be3232] hover:border-l-4 border-solid group border-b border-b-[#171515] p-1"
                >
                  <Link
                    href={`/movie/${movie.id}`}
                    title={movie.title}
                    className="flex justify-between items-center"
                  >
                    <span className="text-[#ce9090] text-sm w-[70%] text-ellipsis overflow-hidden whitespace-nowrap group-hover:text-white p-1">
                      {movie.title}
                    </span>
                    <span className="text-[#5f5f5f] italic text-right w-1/4 text-xs text-nowrap">
                      {movie.release_date}
                    </span>
                  </Link>
                </li>
              )
          )}

          <li className="hover:border-l-[#be3232] hover:border-l-4 border-solid group p-1">
            <Link
              className="flex justify-between items-center"
              href="/now_playing"
            >
              <span className="text-white italic text-left w-1/4 text-xs text-nowrap">
                Xem thêm...
              </span>
            </Link>
          </li>
        </ul>
      </section>
      <section className="p-3 mb-5">
        <AsideTitle className="uppercase">Hot tuần</AsideTitle>

        <ul>
          {top_rated?.results.map(
            (movie: IMovie, index: number) =>
              index <= LIMIT / 2 && (
                <li key={movie.id} className="relative mb-5 group">
                  <div className="min-h-[85px] flex items-center">
                    <span className="absolute min-w-6 text-[#333] -top-1 -left-1 bg-[#b5e745] py-1 px-1 text-xs rounded-tl-md before:absolute before:w-1/2 before:h-2 before:-bottom-1 before:left-0 before:bg-[#b5e745] before:-skew-y-12 after:absolute after:w-1/2 after:h-2 after:-bottom-1 after:right-0 after:bg-[#b5e745] after:skew-y-12 z-[2]">
                      <strong className="relative ring-zinc-100">
                        #{index + 1}
                      </strong>
                    </span>
                    <Link href={`/movie/${movie.id}`}>
                      <div className="relative w-[55px] h-[85px]">
                        <Image
                          fill
                          sizes="20vw"
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          alt={movie.title}
                          title={movie.title}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </Link>
                    <div className="flex flex-col ml-3">
                      <Link href={`/movie/${movie.id}`}>
                        <div className="text-sm font-normal text-white group-hover:text-[7d7d7d]">
                          {movie.title}
                        </div>
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
                    </div>
                  </div>
                </li>
              )
          )}
        </ul>
      </section>
    </>
  );
};

export default Aside;
