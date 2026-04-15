import type { User as FirebaseUser } from "firebase/auth"

export interface AuthContextValue {
  user: FirebaseUser | null
  loading: boolean
  /** True when the logged-in user's UID matches VITE_ADMIN_UID */
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}
