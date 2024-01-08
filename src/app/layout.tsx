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
        <main className="bg-[#263238] h-max">
          <Header />
          <Container>
            <div className="bg-black/60 p-5 lg:table lg:rounded-md w-full">
              <main className="lg:pr-5 pb-5 lg:pb-0 w-full lg:table-cell align-top">
                {children}
              </main>
              <aside className="lg:max-w-[300px] lg:w-[300px] lg:table-cell align-top">
                <Aside />
              </aside>
            </div>
          </Container>
          <Footer />
        </main>
      </body>
    </html>
  );
}
