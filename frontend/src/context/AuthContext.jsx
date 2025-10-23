// AuthContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const backendURL = "https://caption-generator-swmp.onrender.com"
  // const backendURL = "http://localhost:3000"  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [caption, setCaption] = useState(null);
  const handleVerify = (data) => {
    setIsAuthenticated(data.valid);
    setUser(data.user);
  };

  useEffect(() => {
    async function getData(){
      try {
      await axios
        .get(`${backendURL}/api/auth/verify`, { withCredentials: true })
        .then((res) => handleVerify(res.data)
        )
        .catch(() => setIsAuthenticated(false));
    } catch (error) {
      console.log(error);
    }
    }
    getData()
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{caption, setCaption,backendURL, user, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
// https://caption-generator-swmp.onrender.com