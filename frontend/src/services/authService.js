import api from "./api";

export const registrarUsuario = async (datos) => {
  const respuesta = await api.post("/auth/registro", datos);
  return respuesta.data;
};

export const iniciarSesion = async (datos) => {
  const respuesta = await api.post("/auth/login", datos);
  return respuesta.data;
};