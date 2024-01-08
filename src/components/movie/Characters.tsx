import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR, { Fetcher } from "swr";

type Props = {
  id: string | string[];
};

const Characters = ({ id }: Props) => {
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data: credits } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${id}/credits?language=vi&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  console.log(credits);
  return (
    <ul className="min-h-[320px] h-max w-full flex flex-wrap">
      {credits?.cast.map(
        (actor: any, index: number) =>
          index < 10 && (
            <li key={actor.id} className="w-1/5">
              <Link
                href="/"
                title={actor.name}
                className="flex flex-col items-center w-full"
              >
                <figure className="relative rounded-full overflow-hidden max-auto w-[80%] max-w-[100px] h-[100px]">
                  <Image
                    fill
                    sizes="20vw"
                    src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                    alt={actor.character}
                    title={actor.character}
                    style={{ objectFit: "cover" }}
                  />
                </figure>
                <p className="text-md text-center line-clamp-1 overflow-hidden mt-1">
                  {actor.name}
                </p>
                <p className="opacity-50 text-sm text-center mb-5">
                  {actor.character}
                </p>
              </Link>
            </li>
          )
      )}
    </ul>
  );
};

export default Characters;
