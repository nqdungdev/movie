import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../common/button/Button";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

type Props = {
  movie: IMovie;
  watchProps: [boolean, Dispatch<SetStateAction<boolean>>];
};

const Banner = ({ movie, watchProps }: Props) => {
  const [, setWatch] = watchProps;

  return (
    <article className="relative w-full">
      <figure className="relative w-full h-[720px] lg:h-[350px]">
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

      <div className="absolute top-0 left-0 w-full p-5 flex flex-col lg:flex-row gap-5 z-10">
        <Link
          href="#watch"
          className="relative group"
          onClick={() => setWatch(true)}
        >
          <figure className="relative w-[180px] h-[260px]  rounded-md overflow-hidden hover:cursor-pointer">
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
            <div className="absolute top-0 left-0 w-full h-full group-hover:bg-black/50 transition-all duration-300"></div>
          </figure>
        </Link>

        <div>
          <div className="min-h-[200px]">
            <h1
              className="text-accent-green pt-2 mb-2 text-3xl font-medium line-clamp-1"
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
  );
};

export default Banner;
