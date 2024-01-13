"use client";

import { auth } from "@/firebase/config";
import {
  confirmPasswordReset,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/common/button/Button";
import Link from "next/link";
// import { passwordReset } from "../firebase/firebase";

type Props = {};

export interface ForgotPasswordValues {
  email: string;
}

const ForgotPassword = (props: Props) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async ({ email }) => {
    console.log(email);
    try {
      // const result = await fetchSignInMethodsForEmail(auth, email);
      await sendPasswordResetEmail(auth, email).then(() => setIsSuccess(true));
    } catch (error: any) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        console.log("User not found, try again!");
      }
    }
  };

  return (
    <>
      <h1 className="text-white text-[30px] font-bold text-center mb-10">
        Quên mật khẩu!
      </h1>
      {isSuccess ? (
        <p className="w-full bg-[#07bc0c]/80 text-center text-sm text-white px-5 py-3 rounded-md">
          Mã xác nhận đã được gửi thành công, vui lòng kiểm tra hòm thư!
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5 w-[400px]"
        >
          <label key="email" htmlFor="email" className="w-full">
            {errors.email && (
              <div className="text-red-500 ml-2 mt-2 text-xs">
                {errors.email?.message}
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              className="text-white text-sm border-b border-solid border-[#3f4a50] shadow-none w-full h-11 font-semibold bg-transparent focus:outline-none pl-6"
              {...register("email")}
              required
            />
          </label>
          <div className="w-full flex justify-between items-center">
            <Link href="/login" className="text-xs text-[#999] font-semibold">
              Quay lại
            </Link>
            <Button
              className="!bg-accent-yellow !text-black !font-semibold !uppercase"
              type="submit"
            >
              Gửi
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default ForgotPassword;
