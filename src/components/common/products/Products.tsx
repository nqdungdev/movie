import React from "react";
import Item from "../item/Item";
import Link from "next/link";

type Props = {
  limit: number;
  movies: IMovie[];
  title: string;
  path: string;
};

const Products = ({ limit, movies, title, path }: Props) => {
  return (
    <section>
      <h2 className="bg-secondary p-2 my-5 uppercase w-max rounded-lg">
        {title}
      </h2>
      <ul className="w-full grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-5">
        {movies.map(
          (movie: IMovie, index: number) =>
            index < limit && (
              <li key={movie.id}>
                <Item movie={movie} />
              </li>
            )
        )}
      </ul>

      <Link
        href={`/${path}`}
        className="text-lg p-1 bg-[#161e21] uppercase text-center hover:text-[#7d7d7d] w-full block mt-5"
      >
        Xem thêm...
      </Link>
    </section>
  );
};

export default Products;
