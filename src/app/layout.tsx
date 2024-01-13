import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Aside from "@/components/aside/Aside";
import Footer from "@/components/footer/Footer";
import Container from "@/components/common/container/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Film", template: "Film | %s" },
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
