import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import Container from "../common/container/Container";
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

        <div className="relative w-[230px] h-full flex items-center">
          <button className="absolute top-0 left-0 w-10 h-full flex justify-center items-center z-10 opacity-50">
            <FaSearch size="1em" className="text-[#78909c]" />
          </button>
          <form>
            <label className="text-[#78909c]">
              <input
                type="text"
                name="keyword"
                placeholder="Tìm kiếm"
                className="bg-black/60 border-[#263238] border-solid border rounded pl-10 text-sm font-semibold opacity-50 focus:bg-black/40 focus:opacity-100 focus:outline-none h-10"
              />
            </label>
          </form>
          <div className="search-suggest" style={{ display: "none" }}>
            <ul style={{ marginBottom: 0 }} id="search-suggest-list" />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
