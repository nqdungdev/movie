import React from "react";
import useSWR, { Fetcher } from "swr";
import Skeleton from "../common/skeleton/Skeleton";

type Props = {
  id: string | string[];
};

const Trailer = ({ id }: Props) => {
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data: videos, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${id}/videos?language=vi&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  if (isLoading) return <Skeleton number={1} />;
  return (
    <div className="flex justify-center w-full">
      <iframe
        width={560}
        height={315}
        src={`https://www.youtube.com/embed/${videos?.results[0]?.key}`}
        allowFullScreen
      />
    </div>
  );
};

export default Trailer;
