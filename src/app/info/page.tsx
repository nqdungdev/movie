"use client";

import { AuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";
import Image from "next/image";
import { useContext, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import ChangeInfo from "./components/ChangeInfo";
import ChangePassword from "./components/ChangePassword";

const Info = () => {
  const user = useContext<User | null>(AuthContext);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

  return (
    <>
      <h1 className="text-white text-[30px] font-bold text-center mb-10 uppercase">
        Thông tin tài khoản
      </h1>

      <section className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-3 mb-5">
          <div className="p-5 flex items-center justify-center flex-col">
            <figure className="relative h-auto w-1/2 md:w-full rounded-full overflow-hidden pt-[50%] md:pt-[100%]">
              <Image
                fill
                sizes="50vw"
                src={`${
                  user?.photoURL ? user?.photoURL : "/images/user-image.webp"
                }`}
                alt="avatar"
                title="avatar"
                style={{
                  objectFit: "cover",
                }}
                priority
              />
              {user?.emailVerified && (
                <MdVerifiedUser className="text-accent-green absolute right-0 bottom-0" />
              )}
            </figure>

            <div className="text-center mt-5">
              <div className="text-white font-semibold whitespace-nowrap line-clamp-1 mb-2">
                {user && user.displayName}
              </div>
              <div className="text-accent-yellow uppercase text-lg font-semibold">
                <p>Tham gia: 11/01/2024</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 py-5 flex justify-center">
          {isChangePassword ? (
            <ChangePassword
              onChangePassword={[isChangePassword, setIsChangePassword]}
            />
          ) : (
            <ChangeInfo
              onChangePassword={[isChangePassword, setIsChangePassword]}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Info;
