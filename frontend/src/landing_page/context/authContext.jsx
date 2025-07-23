import {  useState, useEffect } from "react";
import { useContext, createContext } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    async function checkAuth() {
    
      const res = await axios.get("http://localhost:3002/auth/status", {
        withCredentials: true, // This ensures cookies are sent with the request
      });

      const data = res.data;

      if(data.loggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setAuthChecked(true);
      
    }

    checkAuth();

  }, []);

  if (!authChecked) return null;

  const login = () => setIsLoggedIn(true);   // simulate successful login
  const logout = async () => {
    
    await axios.post('http://localhost:3002/logout', {}, {
      withCredentials: true
    });

    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};