import React from "react";
import './CabecalhoUsuarioLogado.css';
import { RiSearchLine } from "react-icons/ri";

function CabecalhoUsuarioLogado() {
    const nomeUsuario = 'Ianara Holanda';
    const emailUsuario = 'email@email.com';

    return(
        <div className='container-cabecalho'>
            <div className='container-logo'>
                Seren
            </div>

            <div className="container-barra-pesquisa">
                <RiSearchLine className="icon-lupa" alt="Ícone de lupa"/>
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
                    <p className="nome-usuario">{nomeUsuario}</p>
                    <p>{emailUsuario}</p>
                </div>
            </div>
        </div>
    );
}

export default CabecalhoUsuarioLogado;