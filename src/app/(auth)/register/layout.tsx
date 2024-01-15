import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Đăng ký" },
  description: "",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
