import Link from "next/link";
import React from "react";

type Props = {
  genres?: any;
  movie?: { id: string; name: string };
  last: string;
};

const Breadcrumb = ({ genres, movie, last }: Props) => {
  return (
    <div className="mb-5">
      <div className="py-3 px-4 text-white text-xs font-semibold flex flex-wrap">
        <Link
          title="Trang chủ"
          href="/"
          className="hover:text-[#7d7d7d] whitespace-nowrap"
        >
          <span>Trang chủ</span>
        </Link>
        {genres?.map((genre: any) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}?name=${genre.name}`}
            title={genre.name}
            className="before:px-2 before:content-['/'] before:text-white text-white hover:text-[#7d7d7d] whitespace-nowrap"
          >
            <span>{genre.name}</span>
          </Link>
        ))}
        {movie && (
          <Link
            title={movie.name}
            href={`/movie/${movie.id}`}
            className="text-white hover:text-[#7d7d7d] before:px-1 before:content-['/'] before:text-white whitespace-nowrap"
          >
            <span>{movie.name}</span>
          </Link>
        )}
        <Link
          title={last}
          href="/"
          className="text-[#7d7d7d] before:px-1 before:content-['/'] before:text-white cursor-default whitespace-nowrap"
        >
          <span>{last}</span>
        </Link>
      </div>
    </div>
  );
};

export default Breadcrumb;
