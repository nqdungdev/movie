import React from "react";
import AsideTitle from "../aside/AsideTitle";
import Item from "../common/item/Item";
import useSWR, { Fetcher } from "swr";
import Skeleton from "../common/skeleton/Skeleton";

type Props = { id: string[] | string };

const Similar = ({ id }: Props) => {
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data: similar, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${id}/similar?language=vi&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  if (isLoading) return <Skeleton number={1} />;
  return (
    <section className="p-3 mt-5 mb-5 bg-[#696969]/10 rounded-md">
      <AsideTitle>Phim liên quan</AsideTitle>
      <ul className="w-full grid grid-cols-2 xs:grid-cols-4 gap-5">
        {similar.results.map(
          (movie: IMovie, index: number) =>
            index < 4 && (
              <li key={movie.id}>
                <Item movie={movie} />
              </li>
            )
        )}
      </ul>
    </section>
  );
};

export default Similar;
