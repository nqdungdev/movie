"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/common/button/Button";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export interface LoginValues {
  email: string;
  password: string;
}

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is too short."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginValues> = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider).then(() =>
        setTimeout(() => router.push("/"), 1000)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-white text-[30px] font-bold text-center mb-10">
        Đăng nhập!
      </h1>

      <Button
        className="!bg-[#d04226] !text-white !text-xs !font-semibold uppercase flex items-center gap-2 !py-3 mb-5"
        onClick={handleGoogleLogin}
      >
        <FaGoogle />
        <p className="pl-2 border-l border-solid border-[#3f4a50]">
          Đăng nhập bằng google
        </p>
      </Button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-5 w-[400px]"
      >
        {[
          { id: "email", label: "Email", type: "email" },
          { id: "password", label: "Mật khẩu", type: "password" },
        ].map((item) => (
          <label key={item.id} htmlFor={item.id} className="w-full">
            {errors[item.id as keyof LoginValues] && (
              <div className="text-red-500 ml-2 mt-2 text-xs">
                {errors[item.id as keyof LoginValues]?.message}
              </div>
            )}
            <input
              required
              type={item.type}
              id={item.id}
              placeholder={item.label}
              className="text-white text-sm border-b border-solid border-[#3f4a50] shadow-none w-full h-11 font-semibold bg-transparent focus:outline-none pl-6"
              {...register(item.id as keyof LoginValues)}
            />
          </label>
        ))}

        <Link
          href="/forgot-password"
          className="text-xs text-[#999] font-semibold w-full text-end"
        >
          Quên mật khẩu?
        </Link>

        <div className="w-full flex justify-end">
          <Button
            className="!bg-[#d8d8d8] !text-black !font-semibold !uppercase"
            type="submit"
          >
            Đăng nhập
          </Button>
        </div>

        <p className="text-xs text-[#999] font-semibold w-full text-start py-5">
          Đã có tài khoản?{" "}
          <Link
            href="/register"
            className="bg-accent-yellow uppercase text-black text-xs font-semibold rounded-full py-2 px-4"
          >
            đăng ký
          </Link>{" "}
          ngay!
        </p>
      </form>
    </>
  );
};

export default Login;
