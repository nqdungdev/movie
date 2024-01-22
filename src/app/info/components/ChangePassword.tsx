import Button from "@/components/common/button/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dispatch, useContext, useEffect, useState } from "react";
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { AuthContext } from "@/context/AuthContext";

type Props = { onChangePassword: [boolean, Dispatch<boolean>] };

export interface InfoValues {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = ({ onChangePassword }: Props) => {
  const user = useContext<User | null>(AuthContext);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [, setIsChangePassword] = onChangePassword;

  const validationSchema = yup.object().shape(
    {
      email: yup
        .string()
        .required("Email is required")
        .email("Email is invalid"),
      currentPassword: yup
        .string()
        .required("Current password is required")
        .min(6, "Current password is too short."),
      newPassword: yup
        .string()
        .required("New password is required")
        .min(6, "New password is too short."),
      confirmPassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("newPassword")], "Passwords do not match."),
    },
    [["file", "file"]]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InfoValues>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("email", user.email as string);
    }
  }, [setValue, user]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!user) return;
    const credential = EmailAuthProvider.credential(
      user.email as string,
      data.currentPassword
    );
    reauthenticateWithCredential(user, credential)
      .then(() => updatePassword(user, data.password))
      .then(() => setIsSuccess(true))
      .catch((error) => {
        setIsError(true);
        console.log(error);
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        setIsSuccess(false);
        setIsError(false);
      }}
      className="flex flex-col gap-5 w-[400px]"
    >
      {isSuccess && (
        <p className="w-full bg-[#07bc0c]/80 text-center text-sm text-white px-5 py-3 rounded-md">
          Cập nhật mật khẩu thành công
        </p>
      )}

      {isError && (
        <p className="w-full bg-[#e62117]/80 text-center text-sm text-white px-5 py-3 rounded-md">
          Có lỗi xảy ra. Xác nhận không thành công
        </p>
      )}
      <div className="grid grid-cols-12 mb-4 items-center">
        <label className="col-span-3 text-[#999] font-semibold" htmlFor="email">
          Email
        </label>
        <div className="col-span-9">
          <input
            type="email"
            id="email"
            className="border-b border-solid border-[#3f4a50] px-6 h-11 w-full font-semibold rounded-md"
            placeholder="Email đăng nhập"
            disabled
            {...register("email")}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 mb-4 items-center">
        <div className="col-span-12">
          {errors.currentPassword && (
            <div className="text-red-500 mt-2 text-xs">
              {errors.currentPassword?.message as string}
            </div>
          )}
        </div>
        <label
          className="col-span-3 text-[#999] font-semibold"
          htmlFor="password"
        >
          Mật khẩu hiện tại
        </label>
        <div className="col-span-9">
          <input
            type="password"
            id="currentPassword"
            className="text-white text-sm border-b border-solid border-[#3f4a50] shadow-none w-full h-11 font-semibold bg-transparent focus:outline-none pl-6"
            {...register("currentPassword")}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 mb-4 items-center">
        <div className="col-span-12">
          {errors.newPassword && (
            <div className="text-red-500 mt-2 text-xs">
              {errors.newPassword?.message as string}
            </div>
          )}
        </div>
        <label
          className="col-span-3 text-[#999] font-semibold"
          htmlFor="password"
        >
          Mật khẩu mới
        </label>
        <div className="col-span-9">
          <input
            type="password"
            id="newPassword"
            className="text-white text-sm border-b border-solid border-[#3f4a50] shadow-none w-full h-11 font-semibold bg-transparent focus:outline-none pl-6"
            {...register("newPassword")}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 mb-4 items-center">
        <div className="col-span-12">
          {errors.confirmPassword && (
            <div className="text-red-500 mt-2 text-xs">
              {errors.confirmPassword?.message as string}
            </div>
          )}
        </div>
        <label
          className="col-span-3 text-[#999] font-semibold"
          htmlFor="password"
        >
          Xác nhận mật khẩu mới
        </label>
        <div className="col-span-9">
          <input
            type="password"
            id="confirmPassword"
            className="text-white text-sm border-b border-solid border-[#3f4a50] shadow-none w-full h-11 font-semibold bg-transparent focus:outline-none pl-6"
            {...register("confirmPassword")}
          />
        </div>
      </div>

      <div className="w-full flex justify-between mt-5">
        <Button
          className="!bg-[#999] !text-black !font-semibold !uppercase"
          type="button"
          onClick={() => setIsChangePassword(false)}
        >
          Đổi thông tin
        </Button>
        <Button
          className="!bg-accent-yellow !text-black !font-semibold !uppercase"
          type="submit"
        >
          Cập nhật
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
