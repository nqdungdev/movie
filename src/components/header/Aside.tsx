import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Button from "../common/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

type Props = {
  data: any;
};

const Aside = ({ data }: Props) => {
  const router = useRouter();
  const user = useContext(AuthContext);
  const [toggle, setToggle] = useState<boolean>(false);
  const [showCategory, setShowCategory] = useState<boolean>(false);

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };
  return (
    <div className={`transition-all duration-150`}>
      <div className="fixed w-full h-full left-0 top-0 z-40 bg-black/60"></div>

      <div className="fixed top-0 left-0 h-full opacity-90 bg-[#263238] overflow-y-auto z-50 transition-all duration-200 w-[270px] p-4">
        <div className="mb-4 p-5 bg-[#090b0c]">
          {user?.uid ? (
            <div
              className="relative flex items-center gap-1 cursor-pointer group justify-between"
              onClick={() => setToggle(!toggle)}
            >
              <div className="text-white uppercase font-semibold">
                <p>{user.displayName}</p>
              </div>
              <div className="flex items-center gap-1">
                <figure className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    fill
                    sizes="10vw"
                    src={`${
                      user?.photoURL
                        ? user?.photoURL
                        : "/images/user-image.webp"
                    }`}
                    alt="avatar"
                    title="avatar"
                    style={{ objectFit: "cover" }}
                  />
                </figure>
                <div className="w-6 h-6 bg-[#0f1416] flex justify-center items-center rounded-full">
                  <FaAngleDown
                    className={`${
                      toggle && "rotate-180"
                    } transition-all duration-300`}
                  />
                </div>

                {toggle && (
                  <ul className="w-[200px] bg-[#263238] rounded-md absolute top-full right-0 transition-all duration-200 pb-4 pt-2 mt-1 before:absolute before:-top-1 before:right-10 before:border-transparent before:h-0 before:w-0 before:border-solid before:border-l-[5px] before:border-r-[5px] before:border-b-[5px] before:border-b-[#263238] before:mx-auto before:content-center z-20">
                    <li className="hover:bg-[#374850]">
                      <Link
                        href="/info"
                        className="text-white text-xs block py-3 px-4 opacity-50"
                      >
                        Thông tin tài khoản
                      </Link>
                    </li>
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
            </div>
          ) : (
            <Button
              className="!h-10 !w-full"
              onClick={() => router.push("/login")}
            >
              Đăng nhập
            </Button>
          )}
        </div>

        <nav>
          <ul>
            {[
              { label: "trang chủ", arrow: false },
              { label: "thể loại", arrow: true },
            ].map((item, index) => (
              <li key={index} className={`text-white z-30 relative`}>
                <Link
                  href={"#"}
                  className="relative text-white uppercase text-sm leading-[40px] font-base flex justify-between items-center z-30"
                  onClick={() => item.arrow && setShowCategory(!showCategory)}
                >
                  {item.label}
                  {item.arrow && <FaAngleDown className="text-accent-green" />}
                </Link>
                {index === 1 && (
                  <div className="overflow-hidden w-[270px] -mx-4">
                    <ul
                      className={`relative flex w-[270px] bg-[#090b0c] text-white z-20 flex-wrap overflow-hidden ${
                        showCategory
                          ? "animate-slideDown"
                          : "animate-slideUp -translate-y-full opacity-0"
                      }`}
                    >
                      {data?.genres?.map((genre: any) => (
                        <li key={genre.id} className="w-1/2 text-xs py-2 ">
                          <Link
                            href={`/genre/${genre.id}?name=${genre.name}`}
                            className="text-white px-4 line-clamp-1 overflow-hidden font-semibold hover:text-[#7d7d7d]"
                            title={genre.name}
                          >
                            {genre.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Aside;
