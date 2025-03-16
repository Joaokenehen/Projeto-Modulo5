import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Servicos from "./pages/Servicos";
import NossosPets from "./pages/NossosPets";
import Agendamentos from "./pages/Agendamentos";
import { useEffect } from "react";

const ManuseioDeBodyClass = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace("/", ""); // Transforma "/about" em "about"
    document.body.className = path || "login"; // Define a classe do body

    return () => {
      document.body.className = ""; // Remove ao sair
    };
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <ManuseioDeBodyClass />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/nossos-pets" element={<NossosPets />} />
      </Routes>
    </Router>
  );
}

export default App;
