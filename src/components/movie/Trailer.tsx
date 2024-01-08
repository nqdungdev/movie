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
  console.log(videos);
  if (isLoading) return <Skeleton number={1} />;
  return (
    <div className="flex justify-center w-full">
      {videos.results.length === 0 ? (
        <div className="bg-[#fcf8e3] border-solid border border-[#fcf8e3] rounded-md text-xs p-5 font-semibold text-accent-brown w-full">
          Trailer đang được cập nhật!
        </div>
      ) : (
        <iframe
          width={560}
          height={315}
          src={`https://www.youtube.com/embed/${videos?.results[0]?.key}`}
          allowFullScreen
        />
      )}
    </div>
  );
};

export default Trailer;
