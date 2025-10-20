// AuthContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [caption, setCaption] = useState(null);
  

  const handleVerify = async (data) => {
    setIsAuthenticated(data.valid);
    setUser(data.user);
  };

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/api/auth/verify", { withCredentials: true })
        .then((res) => handleVerify(res.data))
        .catch(() => setIsAuthenticated(false));
    } catch (error) {
      console.log(error);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{caption, setCaption, user, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
