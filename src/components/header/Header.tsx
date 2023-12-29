import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import Container from "../common/container/Container";
import SearchBox from "./SearchBox";
type Props = {};

const Header = (props: Props) => {
  return (
    <header className="h-[60px] bg-black/60">
      <Container className="flex items-center justify-between py-0">
        <div className="flex items-center">
          <div className="mr-8">Logo</div>
          <nav>
            <ul className="flex items-center">
              {["trang chủ", "movie", "tivi show"].map((item, index) => (
                <li
                  key={index}
                  className="relative text-white px-2 uppercase text-sm leading-[60px] font-base before:absolute before:bottom-1 before:left-4 before:right-4 before:bg-accent-green before:h-[3px]"
                >
                  <Link href="/">{item}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <SearchBox />
      </Container>
    </header>
  );
};

export default Header;
