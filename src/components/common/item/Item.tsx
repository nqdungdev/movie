import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { FaStar } from "react-icons/fa";

type Props = {
  movie: IMovie;
  upcoming?: boolean;
};

const Item = ({ movie, upcoming = false }: Props) => {
  const params = useParams();

  return (
    <article className="relative w-full group">
      <Link href={`/movie/${movie.id}`}>
        <div
          className={`relative mb-3 rounded-md overflow-hidden hover:opacity-60 transition-all duration-200 `}
        >
          <figure
            className={`relative w-full min-h-[245px] ${
              upcoming && "opacity-80"
            }`}
          >
            <Image
              fill
              sizes="20vw"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              title={movie.title}
              style={{ objectFit: "cover" }}
              priority
            />
          </figure>

          <div className="absolute top-0 left-0">
            <div
              className="p-2 bg-black/60 rounded-full mt-2 ml-2 text-accent-yellow text-xs font-bold flex items-center"
              title={`${
                movie.vote_average?.toFixed(1) || 0
              } trong số 10 dựa trên ${
                movie.vote_count || 0
              } thành viên đánh giá`}
            >
              <FaStar className="relative bottom-[1px]" />
              {movie.vote_average?.toFixed(1) || 0}
            </div>
          </div>

          {upcoming && (
            <>
              <div className="absolute top-0 left-0 w-full h-full text-white text-[30px] flex justify-center items-center font-bold">
                {movie.release_date.split("-")[0]}
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 text-white/80 bg-accent-red/80 text-md uppercase flex justify-center items-center py-1">
                Sắp chiếu
              </div>
            </>
          )}
        </div>
        <h2 className="text-sm text-white line-clamp-1">{movie.title}</h2>
      </Link>
      <div className="absolute top-1/2 left-[80%] w-[170%] z-10 p-5 -mt-6 -translate-y-1/2 bg-white rounded-md hidden lg:group-hover:block before:absolute before:top-1/2 before:-left-6 before:border-[12px] before:border-transparent before:border-r-[12px] before:border-r-solid before:border-r-white">
        <div className="text-[#1a2023] font-bold uppercase">{movie.title}</div>
        <div className="my-3 flex items-center">
          <span className="text-xs mr-2 text-white bg-secondary font-bold rounded-md p-1">
            HD
          </span>
          <span className="mr-2 text-xs font-bold text-accent-green flex items-center">
            <FaStar className="relative bottom-[1px]" />
            {movie.vote_average?.toFixed(1) || 0}
          </span>
          <span className="text-xs text-[#1a2023] font-light">
            {movie.release_date}
          </span>
        </div>

        <p className="text-xs text-[#1a2023]">{movie.overview}</p>
      </div>
    </article>
  );
};

export default Item;
