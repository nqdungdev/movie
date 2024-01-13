"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useState } from "react";

type Props = {};

export interface RegisterValues {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

const Register = (props: Props) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();

  const validationSchema = yup.object().shape({
    username: yup.string().required("User Name is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is too short."),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords do not match."),
    email: yup.string().required("Email is required").email("Email is invalid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<RegisterValues> = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (error: any) {
      console.log(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          console.log(`Email address ${values.email} already in use.`);
          break;
        case "auth/invalid-email":
          console.log(`Email address ${values.email} is invalid.`);
          break;
        case "auth/operation-not-allowed":
          console.log(`Error during sign up.`);
          break;
        case "auth/weak-password":
          console.log(
            "Password is not strong enough. Add additional characters including special characters and numbers."
          );
          break;
        default:
          console.log(error.message);
          break;
      }
    }
  };

  return (
    <>
      <h1 className="text-white text-[30px] font-bold text-center my-10">
        Đăng ký!
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-5 w-[400px]"
      >
        {isSuccess && (
          <p className="w-full bg-[#07bc0c]/80 text-center text-sm text-white px-5 py-3 rounded-md">
            Đăng ký thành công
          </p>
        )}

        {[
          { id: "username", label: "Tài khoản", type: "text" },
          { id: "password", label: "Mật khẩu", type: "password" },
          {
            id: "confirmPassword",
            label: "Nhập lại Mật khẩu",
            type: "password",
          },
          { id: "email", label: "Email", type: "email" },
        ].map((item) => (
          <label key={item.id} htmlFor={item.id} className="w-full">
            {errors[item.id as keyof RegisterValues] && (
              <div className="text-red-500 ml-2 mt-2 text-xs">
                {errors[item.id as keyof RegisterValues]?.message}
              </div>
            )}
            <input
              required
              type={item.type}
              id={item.id}
              placeholder={item.label}
              className="text-white text-sm border-b border-solid border-[#3f4a50] shadow-none w-full h-11 font-semibold bg-transparent focus:outline-none pl-6"
              {...register(item.id as keyof RegisterValues)}
            />
          </label>
        ))}
        <div className="w-full flex justify-end">
          <Button
            className="!bg-accent-yellow !text-black !font-semibold !uppercase"
            type="submit"
          >
            Đăng ký
          </Button>
        </div>

        <p className="text-xs text-[#999] font-semibold w-full text-start py-5">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            className="bg-[#d8d8d8] uppercase text-black text-xs font-semibold rounded-full py-2 px-4"
          >
            đăng nhập
          </Link>{" "}
          ngay!
        </p>
      </form>
    </>
  );
};

export default Register;
