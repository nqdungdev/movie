"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Container from "../common/container/Container";
import SearchBox from "./SearchBox";
import useSWR, { Fetcher } from "swr";
import Button from "../common/button/Button";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";

type Props = {};

const Header = (props: Props) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter();
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/genre/movie/list?language=en&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <header className="h-[60px] bg-black/60" id="header">
      <Container className="!p-0">
        <div className="flex items-center justify-between px-5">
          <div className="flex items-center">
            <div className="mr-8">
              <Link href="/">
                <p className="font-kolker text-5xl bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-sky-600">
                  Film
                </p>
              </Link>
            </div>
            <nav>
              <ul className="flex items-center">
                {["trang chủ", "thể loại"].map((item, index) => (
                  <li
                    key={index}
                    className={`relative px-2 before:absolute before:bottom-1 before:left-4 before:right-4 ${
                      index === 0 && "before:bg-accent-green before:h-[3px]"
                    } group`}
                  >
                    <Link
                      href={"/"}
                      className="text-white uppercase text-sm leading-[60px] font-base"
                    >
                      {item}
                    </Link>
                    {index === 1 && (
                      <ul className="absolute border-t-4 border-solid border-t-accent-green w-[400px] bg-white top-full left-4 z-20 flex-wrap before:absolute before:-top-2 before:left-4 before:border-transparent before:h-0 before:w-0 before:border-solid before:border-l-[5px] before:border-r-[5px] before:border-b-[5px] before:border-b-accent-green before:mx-auto before:content-center transition-all !duration-100 hidden animate-fadeOut group-hover:flex group-hover:animate-fadeIn">
                        {data?.genres?.map((genre: any) => (
                          <li key={genre.id} className="w-1/3 text-xs py-2">
                            <Link
                              href={`/genre/${genre.id}?name=${genre.name}`}
                              className="text-[#333] px-4 line-clamp-1 overflow-hidden font-semibold hover:text-[#7d7d7d]"
                              title={genre.name}
                            >
                              {genre.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <SearchBox />

            {user.uid ? (
              <div className="relative" onClick={() => setToggle(!toggle)}>
                <figure className="relative h-10 w-10">
                  <Image
                    fill
                    sizes="10vw"
                    src={`/images/user-image.webp`}
                    alt="avatar"
                    title="avatar"
                    style={{ objectFit: "cover" }}
                  />
                </figure>
                {toggle && (
                  <ul className="w-[200px] bg-[#263238] rounded-md absolute top-full right-0 transition-all duration-200 pb-4 pt-2 mt-1 before:absolute before:-top-1 before:right-4 before:border-transparent before:h-0 before:w-0 before:border-solid before:border-l-[5px] before:border-r-[5px] before:border-b-[5px] before:border-b-[#263238] before:mx-auto before:content-center z-20">
                    <li className="hover:bg-[#374850]">
                      <Link
                        href="#"
                        className="text-white text-xs block py-3 px-4 opacity-50"
                        onClick={handleLogout}
                      >
                        Thoát
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Button className="!h-10" onClick={() => router.push("/login")}>
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
