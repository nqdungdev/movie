"use client";

import React from "react";
import AuthProvider from "@/context/AuthContext";
import Header from "@/components/header/Header";
import Container from "@/components/common/container/Container";
import Aside from "@/components/aside/Aside";
import Footer from "@/components/footer/Footer";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default Template;
