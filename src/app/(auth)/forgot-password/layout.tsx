import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Quên mật khẩu" },
  description: "",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
