import React, { useContext, createContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider = () => {
  return <div>AuthContextProvider</div>;
};

export default AuthContextProvider;
