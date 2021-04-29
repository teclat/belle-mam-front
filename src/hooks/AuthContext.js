import React, { useState } from "react";
import { createContext } from "react";

import api from "../services/api";

const AuthContext = createContext({
  isAuth: false,
  //userName: "",
  //userCpf: "",
  //token: "",
  isLoading: false,
  setIsLoading: () => {},
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function signIn(email, password) {
    try {
      const body = { email: email, password: password };
      console.log(body);
      const response = await api.post("users/login", body);
      if (response.data) {
        const user = response.data;
        await localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        setIsAuth(true);
      }

      // else {
      //     alert("Ocorreu um erro ao logar, tente novamente!");
      // }
    } catch (err) {
      //throw new Error("Verifique seus dados e tente novamente.");
      console.error(err.message);
    }
  }

  async function signOut() {
    await localStorage.removeItem("user");

    setIsAuth(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        //userName: userName,
        //userCpf: userCpf,
        //token: token,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        signIn: signIn,
        signOut: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
