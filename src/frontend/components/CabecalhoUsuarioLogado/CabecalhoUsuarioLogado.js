import React, { useEffect, useState } from "react";
import './CabecalhoUsuarioLogado.css';
import { RiSearchLine } from "react-icons/ri";

function CabecalhoUsuarioLogado() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function buscarUsuario() {
      try {
        const userID = localStorage.getItem("userID");
  
        if (!userID) {
          console.error("userID não encontrado no localStorage.");
          return;
        }
  
        const response = await fetch("http://localhost:4000/pagina-inicial", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userID }) 
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setUsuario(data.usuario);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }
  
    buscarUsuario();
  }, []);
  

  if (!usuario) {
    return <div>Carregando usuário...</div>;
  }

  return (
    <div className='container-cabecalho'>
      <div className='container-logo'>
        Seren
      </div>

      <div className="container-barra-pesquisa">
        <RiSearchLine className="icon-lupa" alt="Ícone de lupa" />
        <input 
          id="pesquisa-input" 
          maxLength="800" 
          autoCorrect="off" 
          autoCapitalize="off" 
          spellCheck="false"
          placeholder="Pesquisar paciente"
        />
      </div>

      <div className='container-perfil'>
        <div className='foto-perfil'></div>
        <div className='infos-usuario'>
          <p className="nome-usuario">{usuario.username}</p>
          <p>{usuario.email}</p>
        </div>
      </div>
    </div>
  );
}

export default CabecalhoUsuarioLogado;
