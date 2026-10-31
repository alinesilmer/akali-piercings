import { useEffect, useMemo, useState, type ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";

import { auth } from "../../lib/firebase";
import { AuthContext, type AuthValue } from "./auth";

const ADMIN_UID = import.meta.env.VITE_ADMIN_UID as string;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (current) => {
        setUser(current);
        setLoading(false);
      }),
    [],
  );

  const value = useMemo<AuthValue>(
    () => ({
      user,
      loading,
      isAdmin: Boolean(user) && user?.uid === ADMIN_UID,
      login: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
      },
      logout: () => signOut(auth),
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
