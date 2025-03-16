import "../styles/Home.css";
import cachorroImg from "../assets/cachorro.png";
import petWorking from "../assets/PetWorking.png";
import useBodyClass from "../hooks/useBodyClass";
import { useNavigate } from "react-router-dom";

function Home() {
  useBodyClass("home-page");

  const navigation = useNavigate();

  return (
    <>
      <header className="header-home">
        <div className="conteiner-logo"></div>
        <div className="logo">
          <img src={petWorking} alt="Logo" />
        </div>

        <nav>
          <ul className="menu-navegacao">
            <li>
              <a className="itens-navegacao" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="itens-navegacao" href="#">
                Agendamento
              </a>
            </li>
            <li>
              <a className="itens-navegacao" href="#">
                Serviços
              </a>
            </li>
            <li>
              <a className="itens-navegacao" href="#">
                Nossos Pets
              </a>
            </li>
            <li>
              <button
                className="botoes-navegacao-login"
                onClick={() => navigation("/")}
              >
                Login
              </button>
            </li>
            <li>
              <button
                className="botoes-navegacao-cadastro"
                onClick={() => navigation("/cadastro")}
              >
                Cadastro
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="conteudo-home">
        <section className="home-intro">
          <div className="cachorro-img">
            <img src={cachorroImg} alt="arte" />
          </div>
          <h2>Seu pet merece o melhor! 💛</h2>
          <p>
            Amor, cuidado e carinho. Esse é o lugar onde seu pet encontrará tudo
            isso!
          </p>
          <button className="BtnSobreNos">Sobre nós!</button>
        </section>
      </main>
    </>
  );
}

export default Home;
