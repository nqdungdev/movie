import React from "react";
import useSWR, { Fetcher } from "swr";

type Props = {};

const Movie = (props: Props) => {
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data: movie } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/238?language=vi&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );
  console.log(movie);
  return <div>Movie</div>;
};

export default Movie;
