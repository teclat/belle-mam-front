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
      // const response = await fetch('http://192.168.25.200:5000/user/login', {
      //     method : 'POST',
      //     headers : { "Content-Type" : "application/json" },
      //     body : JSON.stringify(body)
      // })

      console.log(body);
      const response = await api.post("users/login", body);
      if (response.data) {
        const user = response.data;
        await localStorage.setItem("user", JSON.stringify(user));

        // if (user.role === "parent") {
        //   this.props.history.push("/parents/home");
        // } else if (user.role === "admin") {
        //   this.props.history.push("/admin/products");
        // } else if (user.role === "guest") {
        //   this.props.history.push("/guest/personal");
        // } else {
        //   alert("Erro de efetuar login.");
        //   //   console.log("error");
        // }
        console.log(user);
        setIsAuth(true);
        //console.log(token);
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
