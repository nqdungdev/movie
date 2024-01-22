import React, { ReactNode, createContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

// Create auth context
export const AuthContext = createContext<User | null>(null);

// Make auth context available across the app by exporting it

type Props = {
  children: ReactNode;
};
// Create the auth context provider
const AuthProvider = ({ children }: Props) => {
  // Define the constants for the user and loading state
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  // Update the state depending on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  // Wrap the children with the context provider
  return (
    <AuthContext.Provider value={user}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
