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
      <body className={inter.className}>
        <main className="bg-[#263238]">
          <Header />
          <Container>
            <div className="bg-black/60 p-5 table rounded-md w-full">
              <main className="pr-5 w-full table-cell align-top">
                {children}
              </main>
              <Aside />
            </div>
          </Container>
          <Footer />
        </main>
      </body>
    </html>
  );
}
