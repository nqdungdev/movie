import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Thông tin tài khoản" },
  description: "",
};

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#263238] flex flex-col items-center p-5">
      {children}
    </main>
  );
}
