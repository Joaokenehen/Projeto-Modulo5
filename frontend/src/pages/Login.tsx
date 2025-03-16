import { useState, FormEvent } from "react";
import Card from "../components/Card";
import "../styles/Login.css";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import useBodyClass from "../hooks/useBodyClass";

function Login() {
  useBodyClass("login-page");

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      window.location.href = "/home";
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Ocorreu um erro durante o login";
      setErro(errorMessage);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <div className="wrapper-login">
        <form onSubmit={handleSubmit}>
          <Card loginLogo="Login"></Card>

          <div className="input-box">
            <Input
              {...{
                type: "email",
                name: "email",
                value: formData.email,
                placeholder: "Digite seu email",
                onChange: handleChange,
              }}
            />
          </div>

          <div className="input-box">
            <Input
              {...{
                type: "password",
                name: "senha",
                value: formData.senha,
                placeholder: "Digite sua senha",
                onChange: handleChange,
              }}
            />
          </div>

          <div className="lembrar-esqueceu-acesso">
            <label>
              <input type="checkbox" />
              Lembrar-me
            </label>
            <a href="#"> Esqueceu a senha?</a>
          </div>
          {erro && <div className="erro-mensagem">{erro}</div>}

          <button type="submit" className="button" disabled={carregando}>
            <Link to="/home" />
            {carregando ? "Entrando..." : "Login"}
          </button>

          <div className="link-registro">
            <p>
              Não tem uma conta? <Link to="/cadastro">Registre-se aqui!</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
