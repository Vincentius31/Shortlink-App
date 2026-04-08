import { createContext, useState, useCallback, useEffect } from "react";
import { decodeToken, isTokenExpired } from "../lib/auth";
import http from "../lib/http";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      const decoded = decodeToken(token);
      if (decoded) {
        return {
          user_id: decoded.user_id,
          email: decoded.email,
          full_name: "",
          bio: "",
          profile_picture: ""
        };
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    return null;
  });

  const updateUser = useCallback((newData) => {
    setUser((prev) => {
      if (!prev) return null;
      return { ...prev, ...newData };
    });
  }, []);

  const refreshProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await http("/api/me");
      if (response.success && response.results) {
        updateUser(response.results);
      }
    } catch (err) {
      console.error("Failed to auto-refresh profile:", err);
    }
  }, [updateUser]);

  // SOLUSI ERROR: Gunakan pola internal async function
  useEffect(() => {
    let isMounted = true;

    const autoFetch = async () => {
      // Kita hanya fetch jika user ada (isLoggedIn) tapi data full_name masih kosong
      if (user && !user.full_name && isMounted) {
        await refreshProfile();
      }
    };

    autoFetch();

    return () => {
      isMounted = false; // Cleanup untuk mencegah memory leak
    };
  }, [user, refreshProfile]); // Linter sekarang akan tenang karena pemanggilan dibungkus async internal

  const login = useCallback(async (token) => {
    localStorage.setItem("token", token);
    const decoded = decodeToken(token);
    if (decoded) {
      const userInfo = {
        user_id: decoded.user_id,
        email: decoded.email,
      };
      setUser(userInfo);
      await refreshProfile();
      return userInfo;
    }
    return null;
  }, [refreshProfile]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;