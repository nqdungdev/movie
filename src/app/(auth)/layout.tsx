import ProtectedRoute from "@/components/protected/ProtectedRoute";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "", absolute: "%s" },
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
