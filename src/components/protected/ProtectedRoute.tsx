"use client";

import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user?.uid) {
      router.push("/");
    }
  }, [router, user]);

  return <>{user?.uid ? null : children}</>;
};

export default ProtectedRoute;
