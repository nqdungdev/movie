import Button from "@/components/common/button/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";
import { Dispatch, useContext, useEffect, useState } from "react";
import { User, updateProfile } from "firebase/auth";
import { AuthContext } from "@/context/AuthContext";

type Props = {
  onChangePassword: [boolean, Dispatch<boolean>];
};

export interface InfoValues {
  email: string;
  username: string;
  avatar: string;
  file?: FileList;
}

const ChangeInfo = ({ onChangePassword }: Props) => {
  const user = useContext<User | null>(AuthContext);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [, setIsChangePassword] = onChangePassword;

  const validationSchema = yup.object().shape(
    {
      email: yup
        .string()
        .required("Email is required")
        .email("Email is invalid"),
      username: yup.string().required("User name is required"),
      // password: yup
      //   .string()
      //   .required("Password is required")
      //   .min(6, "Password is too short."),
      avatar: yup.string().required("Avatar is required"),
      file: yup.mixed<FileList>().when("file", {
        is: (file?: FileList) => file && file.length > 0,
        then: (rule) =>
          rule.test(
            "fileFormat",
            "Unsupported File Format",
            (file?: FileList) => {
              console.log(file);
              return (
                file &&
                file.length > 0 &&
                ["image/jpg", "image/jpeg", "image/png"].includes(file[0].type)
              );
            }
          ),
      }),
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
    // defaultValues: {
    //   email: user?.email || "",
    //   username: user?.displayName || "",
    //   password: "",
    //   avatar: user?.photoURL || "images/user-image.webp",
    // },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("email", user.email as string);
      setValue("username", user.displayName || "");
      setValue("avatar", user.photoURL || "Không có tệp nào được chọn");
    }
  }, [setValue, user]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!user) return;

    const storageRef =
      data.file[0] && ref(storage, `images/${user?.uid + data.file[0].name}`);

    data.file[0] && (await uploadBytes(storageRef, data.file[0]));

    const photoURL = data.file[0] && (await getDownloadURL(storageRef));
    updateProfile(user, {
      displayName: data.username,
      photoURL: photoURL || user.photoURL,
    }).then(() => setIsSuccess(true));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => setIsSuccess(false)}
      className="flex flex-col gap-5 w-[400px]"
    >
      {isSuccess && (
        <p className="w-full bg-[#07bc0c]/80 text-center text-sm text-white px-5 py-3 rounded-md">
          Cập nhật thông tin thành công
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
          {errors.username && (
            <div className="text-red-500 mt-2 text-xs">
              {errors.username?.message as string}
            </div>
          )}
        </div>
        <label
          className="col-span-3 text-[#999] font-semibold"
          htmlFor="username"
        >
          Họ tên
        </label>

        <div className="col-span-9">
          <input
            type="text"
            id="username"
            defaultValue={user?.displayName || ""}
            className="text-white text-sm border-b border-solid border-[#3f4a50] shadow-none w-full h-11 font-semibold bg-transparent focus:outline-none pl-6"
            {...register("username")}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 mb-4 items-center">
        <div className="col-span-12">
          {errors.file && (
            <div className="text-red-500 mt-2 text-xs">
              {errors.file?.message as string}
            </div>
          )}
        </div>
        <label
          className="col-span-3 text-[#999] font-semibold"
          htmlFor="avatar"
        >
          Avatar
        </label>
        <div className="relative col-span-9">
          <input
            type="text"
            id="avatar"
            className="text-white text-sm border-b border-solid border-[#3f4a50] shadow-none w-full h-11 font-semibold bg-transparent focus:outline-none pl-6"
            {...register("avatar")}
          />

          <label
            htmlFor="file"
            className="absolute right-0 top-0 flex items-center bg-[#d8d8d8] uppercase text-black text-xs font-semibold h-full px-4"
          >
            Chọn tệp
          </label>

          <input
            className="hidden"
            type="file"
            id="file"
            {...register("file", {
              onChange: (e) => {
                setValue("avatar", e.target.value);
              },
            })}
          />
        </div>
      </div>

      <div className="w-full flex justify-between mt-5">
        <Button
          className="!bg-[#999] !text-black !font-semibold !uppercase"
          type="button"
          onClick={() => setIsChangePassword(true)}
        >
          Đổi mật khẩu
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

export default ChangeInfo;
