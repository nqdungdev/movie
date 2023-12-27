import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="max-w-[1182px] w-full mx-auto">
      <div className="bg-black/60 rounded-md px-5 mb-5 h-[65px] flex items-center justify-between">
        <div className="flex items-center justify-between">
          <figure className="mr-8">
            <Link href="/" title="Xem film online" rel="home">
              <img
                src="https://cdn.animevietsub.fan/data/logo/logoz.png"
                alt="logo"
              />
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

        <ul className="ListSocial">
          <li>
            <a
              target="_blank"
              href="https://www.facebook.com/animevsub/"
              className="fa fa-facebook"
            />
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.instagram.com/animevsub/"
              className="fa fa-instagram"
            />
          </li>
          <li>
            <a
              target="_blank"
              href="https://twitter.com/AnimeVsub"
              className="fa-twitter"
            />
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UCtpcar8l0Tv51xlpwwGVpvA"
              className="fa-youtube-play"
            />
          </li>
          <li>
            <a href="#Tp-Wp" className="Up AAIco-arrow_upward" />
          </li>
        </ul>
      </div>

      <div className="WebDescription">
        <p>
          <a
            href="http://www.kanefusafs.net/"
            rel="dofollow"
            target="_blank"
            title="Kanefusa Fansub"
          >
            Kanefusa Fansub{" "}
          </a>
          &nbsp;
          <a
            href="https://animevietsub.fan/phim/dao-hai-tac-a1/"
            target="_blank"
            title="One Piece - Đảo Hải Tặc"
          >
            One Piece, Vua Hải Tặc&nbsp;Đảo Hải Tặc
          </a>
          &nbsp;
          <a
            href="https://animevietsub.fan/phim/tham-tu-lung-danh-conan-a3/"
            target="_blank"
            title="Thám Tử Lừng Danh Conan"
          >
            Thám Tử Lừng Danh Conan
          </a>
          &nbsp;
          <a
            href="https://animevietsub.fan/hoat-hinh-trung-quoc/"
            target="_blank"
            title="Hoạt Hình Trung Quốc"
          >
            Hoạt Hình Trung Quốc
          </a>
        </p>
      </div>
      <div className="WebDescription">
        Liên Hệ Quảng Cáo: <b>ads@animevietsub.tv</b>
      </div>
      <p className="Copy">
        <a target="_blank" href="https://animevietsub.fan">
          © Copyright 2023 AnimeVietSub.TV. All rights reserved.
        </a>
      </p>
    </footer>
  );
};

export default Footer;
