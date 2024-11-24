import { useEffect, useState } from "react";
import { createContext } from "react";

export const authContext = createContext();

const AuthContextprovider = ({ children }) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("tkn") !== null) {
      setToken(localStorage.getItem("tkn"));
    }
  });

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
};


export default AuthContextprovider;
