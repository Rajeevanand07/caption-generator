// AuthContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/verify", { withCredentials: true })
      .then(res => setIsAuthenticated(res.data.valid))
      .catch(() => setIsAuthenticated(false));
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };


