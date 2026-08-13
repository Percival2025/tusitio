import { createContext, useContext, useState } from "react";
import {
  iniciarSesion,
  registrarUsuario
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  // LOGIN
  const login = async (datos) => {

    const respuesta = await iniciarSesion(datos);

    localStorage.setItem(
      "token",
      respuesta.token
    );

    localStorage.setItem(
      "usuario",
      JSON.stringify(respuesta)
    );

    setToken(respuesta.token);
    setUsuario(respuesta);

    return respuesta;
  };

  // REGISTRO
  const registro = async (datos) => {

    const respuesta = await registrarUsuario(datos);

    return respuesta;
  };

  // CERRAR SESIÓN
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        login,
        registro,
        logout,
        autenticado: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};