import React, { useContext, createContext, useState, useEffect } from "react";
import { userObserver } from "../utils/firebaseConfig";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userObserver(setCurrentUser);
    setLoading(false);
    console.log(currentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ setCurrentUser, currentUser, loading }}>
      {" "}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
