import React, { useEffect, useState } from "react";
import './CabecalhoUsuarioLogado.css';
import { RiSearchLine } from "react-icons/ri";
import useUsuarios from '../../hooks/useUsuarios';
import FotoPerfil from '../../features/PaginaPerfil/FotoPerfil'

function CabecalhoUsuarioLogado({ nomePacienteBusca, setNomePacienteBusca }) {
    const { usuario } = useUsuarios();
    const [fotoPerfilUrl, setFotoPerfilUrl] = useState(null);

    // useEffect(() => {
    //     if (usuario && usuario._id) {
    //         setFotoPerfilUrl(`/foto/${usuario._id}`);
    //     }
    // }, [usuario]);

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
                    value={nomePacienteBusca}
                    onChange={(e) => setNomePacienteBusca(e.target.value)}
                />
            </div>

            <div className='container-perfil'>
                <div className='foto-perfil'>
                     <FotoPerfil userId={usuario._id} />
                </div>
                <div className='infos-usuario'>
                    <p className="nome-usuario">{usuario.username}</p>
                    <p>{usuario.email}</p>
                </div>
            </div>
        </div>
    );
}

export default CabecalhoUsuarioLogado;
