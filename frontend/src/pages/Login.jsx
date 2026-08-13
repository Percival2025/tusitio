import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      await login({
        email: correo,
        password: password
      });

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.mensaje ||
        "No se pudo iniciar sesión"
      );

    }
  };

  return (
    <>
      <Navbar />

      <div className="login-container">

        <div className="login-card">

          <h1>Iniciar Sesión</h1>

          <p>
            Accede a tu cuenta de TuSitio.com
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">
              Iniciar Sesión
            </button>

          </form>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <p className="registro-link">
            ¿No tienes cuenta? Regístrate
          </p>

        </div>

      </div>
    </>
  );
}

export default Login;