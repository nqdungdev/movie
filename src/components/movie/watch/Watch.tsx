import React, { MouseEventHandler, useState, MouseEvent } from "react";
import {
  FaBookmark,
  FaCamera,
  FaComment,
  FaDownload,
  FaExclamationCircle,
  FaExpandArrowsAlt,
  FaForward,
  FaHistory,
  FaLightbulb,
} from "react-icons/fa";
import useSWR, { Fetcher } from "swr";
import Video from "./Video";

type Props = {
  id: string | string[];
};

const Watch = ({ id }: Props) => {
  const [active, setActive] = useState<number>(0);
  const [turnLight, setTurnLight] = useState<boolean>(true);
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data: videos, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${id}/videos?language=vi&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    fetcher
  );

  const handleClick = (e: MouseEvent) => {
    console.log([e.target]);
    if (
      ((e.target as HTMLElement).id === "continue" ||
        ((e.target as HTMLElement).parentNode as HTMLElement).id ===
          "continue") &&
      active + 1 < videos.results.length
    )
      return setActive((prev) => prev + 1);

    if (
      (e.target as HTMLElement).id === "toggle" ||
      ((e.target as HTMLElement).parentNode as HTMLElement).id === "toggle"
    )
      return setTurnLight((prev) => !prev);

    return;
  };

  console.log(active);

  if (isLoading) return <></>;
  return (
    <>
      <div id="watch">
        <Video embed={videos.results[active]?.key || ""} />

        <ul className="relative flex items-center justify-center flex-wrap bg-[#0f1416] z-[100]">
          {[
            { id: "continue", label: "Tập tiếp", icon: <FaForward /> },
            { id: "comment", label: "Bình luận", icon: <FaComment /> },
            { id: "toggle", label: "Tắt đèn", icon: <FaLightbulb /> },
            { id: "follow", label: "Theo dõi", icon: <FaBookmark /> },
            { id: "enlarge", label: "Phóng to", icon: <FaExpandArrowsAlt /> },
            { id: "error", label: "Báo lỗi", icon: <FaExclamationCircle /> },
            { id: "camera", label: "Chụp ảnh", icon: <FaCamera /> },
            { id: "download", label: "Tải về", icon: <FaDownload /> },
            { id: "history", label: "Lịch sử xem", icon: <FaHistory /> },
          ].map((item, index) => (
            <li
              key={item.id}
              id={item.id}
              className={`text-[#dadada] p-3 mr-1 text-sm font-medium cursor-pointer hover:bg-[#292f31] flex items-center gap-1 ${""}`}
              title={item.label}
              onClick={(event: MouseEvent) => handleClick(event)}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="my-3 p-3 bg-[#181d1f]">
        <ul className="max-h-[300px] overflow-y-scroll w-full flex gap-1">
          {videos.results.length === 0 ? (
            <div className="bg-[#fcf8e3] border-solid border border-[#fcf8e3] rounded-md text-xs p-5 font-semibold text-accent-brown w-full">
              Film đang được cập nhật!
            </div>
          ) : (
            videos.results.map((video: any, index: number) => (
              <li key={index}>
                <p
                  title={video.name}
                  className={`w-10 h-9 font-bold text-sm rounded-md flex items-center justify-center  transition-all duration-150 cursor-pointer ${
                    active === index
                      ? "text-white bg-accent-red"
                      : "text-white bg-[#4f4f4f] hover:text-accent-darkRed hover:bg-accent-pink"
                  }`}
                  onClick={() => setActive(index)}
                >
                  {index + 1}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>

      <div
        className={`fixed top-0 left-0 z-[99] w-full h-full bg-black transition-all duration-200  ${
          !turnLight ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      ></div>
    </>
  );
};

export default Watch;
