import React, { ReactNode, createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

// User data type interface
interface UserType {
  email: string | null;
  uid: string | null;
}

// Create auth context
export const AuthContext = createContext<any>({});

// Make auth context available across the app by exporting it
// export const useAuth = () => useContext<any>(AuthContext);
type Props = {
  children: ReactNode;
};
// Create the auth context provider
const AuthProvider = ({ children }: Props) => {
  // Define the constants for the user and loading state
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<Boolean>(true);

  // Update the state depending on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user;
        setUser({
          email,
          uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  // Wrap the children with the context provider
  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
