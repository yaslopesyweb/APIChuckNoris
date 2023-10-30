import "./styles.css";
import React, { useState, useEffect } from "react";

function App() {
  const [piada, setPiada] = useState("");
  const [favoritos, setFavoritos] = useState([]);
  const [confirmacaoDeletar, setConfirmacaoDeletar] = useState(false);

  useEffect(() => {
    // Função para buscar uma piada
    const buscarPiada = async () => {
      try {
        const resposta = await fetch("https://api.chucknorris.io/jokes/random");
        const dados = await resposta.json();
        setPiada(dados.value);
      } catch (erro) {
        console.error("Erro ao buscar piada:", erro);
      }
    };

    buscarPiada();
  }, []);

  const adicionarAosFavoritos = () => {
    if (piada) {
      setFavoritos([...favoritos, piada]);
    }
  };

  const deletarPiada = (index) => {
    setConfirmacaoDeletar(true);
    if (window.confirm("Tem certeza que quer deletar?")) {
      const novosFavoritos = [...favoritos];
      novosFavoritos.splice(index, 1);
      setFavoritos(novosFavoritos);
      setConfirmacaoDeletar(false);
    } else {
      setConfirmacaoDeletar(false);
    }
  };

  // Armazenar no Local Storage sempre que a lista de favoritos for atualizada
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  return (
    <div className="App">
      <h1>Piadas do Chuck Norris</h1>
      <p>{piada}</p>
      <button onClick={adicionarAosFavoritos}>Curtir</button>
      <h2>Favoritos</h2>
      <ul>
        {favoritos.map((favPiada, index) => (
          <li key={index}>
            {favPiada}
            <button onClick={() => deletarPiada(index)}>Deletar</button>
          </li>
        ))}
      </ul>
      {confirmacaoDeletar && <p>Confirmação de exclusão</p>}
    </div>
  );
}

export default App;
