import Link from "next/link";
import React from "react";
import Container from "../common/container/Container";
import {
  FaAngleUp,
  FaArrowUp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="max-w-[1182px] w-full mx-auto">
      <Container>
        <div className="bg-black/60 rounded-md px-5 mb-5 h-[65px] flex items-center justify-between">
          <div className="flex items-center justify-between">
            <figure className="mr-8">
              <Link href="/" title="Xem film online" rel="home">
                <p className="font-kolker text-5xl bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-sky-600">
                  Film
                </p>
              </Link>
            </figure>

            <nav className="Menu">
              <ul className="flex">
                <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-home menu-item-490">
                  <a href="https://animevietsub.fan">XEM PHIM</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-493">
                  <a href="/yeu-cau-phim.html">YÊU CẦU ANIME</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-493">
                  <a href="/pages/discord.html">Chat Anime/Discord</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-493">
                  <a href="/pages/thuat-ngu.html">THUẬT NGỮ</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-493">
                  <a href="https://fb.com/233536333844133">GROUP THẢO LUẬN</a>
                </li>
              </ul>
            </nav>
          </div>

          <ul className="flex gap-1 items-center">
            {[
              {
                label: "facebook",
                path: "https://www.facebook.com/",
                icon: <FaFacebookF className="text-xl" />,
              },
              {
                label: "instagram",
                path: "https://www.instagram.com/",
                icon: <FaInstagram className="text-xl" />,
              },
              {
                label: "twitter",
                path: "https://www.twitter.com/",
                icon: <FaTwitter className="text-xl" />,
              },
              {
                label: "youtube",
                path: "https://www.youtube.com/",
                icon: <FaYoutube className="text-xl" />,
              },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  target="_blank"
                  title={item.label}
                  className="rounded-sm opacity-50 bg-[#263238] w-10 h-10 flex items-center justify-center hover:opacity-100 transition-all duration-300"
                >
                  {item.icon}
                </Link>
              </li>
            ))}

            <li>
              <Link
                href="#header"
                className="rounded-sm bg-accent-green w-10 h-10 flex items-center justify-center"
              >
                <FaArrowUp />
              </Link>
            </li>
          </ul>
        </div>

        <p className="text-center mb-2 text-[#78909c] font-light text-xs">
          Liên Hệ Quảng Cáo: <strong>ads@filmtv</strong>
        </p>
        <p className="text-center mb-2 text-[#78909c] font-light text-xs">
          <Link target="_blank" href="/">
            © Copyright 2024. All rights reserved.
          </Link>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
