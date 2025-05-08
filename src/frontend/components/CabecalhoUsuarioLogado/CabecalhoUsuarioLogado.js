import React, { useEffect, useState } from "react";
import './CabecalhoUsuarioLogado.css';
import { RiSearchLine } from "react-icons/ri";
import useUsuarios from '../../hooks/useUsuarios';
function CabecalhoUsuarioLogado() {
    // const [usuario, setUsuario] = useState(null);
    const { usuario } = useUsuarios();

    if (!usuario) {
        return <div>Carregando usuário...</div>;
    }

    return (
        <div className='container-cabecalho-usuario-logado'>
            <div className="container-barra-pesquisa-usuario-logado">
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
