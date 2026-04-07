import { createContext, useState } from "react";
import { decodeToken, isTokenExpired } from "../lib/auth";

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
        };
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    return null;
  });

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = decodeToken(token);
    if (decoded) {
      const userInfo = {
        user_id: decoded.user_id,
        email: decoded.email,
      };
      setUser(userInfo);
      return userInfo;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;