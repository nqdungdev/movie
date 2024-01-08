import Link from "next/link";
import React from "react";

type Props = { movie: IMovie };

const Information = ({ movie }: Props) => {
  return (
    <ul className="flex w-full flex-wrap text-sm">
      <li className="w-1/2 pl-2 py-1">
        <strong>Trạng thái: </strong>
        {movie.status}
      </li>
      <li className="w-1/2 pl-2 py-1">
        <strong>Thời lượng: </strong>
        {movie.runtime} phút
      </li>
      <li className="w-1/2 pl-2 py-1">
        <strong>Thể loại: </strong>
        {movie.genres.map((genre: any) => (
          <Link href={`/genre/${genre.id}?name=${genre.name}`} key={genre.id}>
            {genre.name},&nbsp;
          </Link>
        ))}
      </li>
      <li className="w-1/2 pl-2 py-1">
        <strong>Chất lượng:</strong> <span className="Qlty">HD</span>
      </li>
      <li className="w-1/2 pl-2 py-1">
        <strong>Quốc gia: </strong>
        {movie.production_countries.map((country: any, index: number) => (
          <span key={index}>{country.name},&nbsp;</span>
        ))}
      </li>
      <li className="w-1/2 pl-2 py-1">
        <strong>Số người theo dõi: </strong>
        {movie.popularity}
      </li>
      <li className="w-1/2 pl-2 py-1">
        <strong>Ngôn ngữ: </strong>
        {movie.spoken_languages.map((language: any, index: number) => (
          <span key={index}>{language.name},&nbsp;</span>
        ))}
      </li>
      <li className="w-1/2 pl-2 py-1">
        <strong>Studio: </strong>
        {movie.production_companies.map((company: any) => (
          <span key={company.id}>{company.name},&nbsp;</span>
        ))}
      </li>
    </ul>
  );
};

export default Information;
