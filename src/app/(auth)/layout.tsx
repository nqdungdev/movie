import ProtectedRoute from "@/components/protected/ProtectedRoute";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Film", template: "Film | %s" },
  description: "",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#263238] flex flex-col items-center p-5">
      <ProtectedRoute>{children}</ProtectedRoute>
    </div>
  );
}
