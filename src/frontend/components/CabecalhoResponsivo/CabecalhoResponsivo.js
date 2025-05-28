import React, { useEffect, useState } from "react";
import './CabecalhoResponsivo.css';
import { FaUser } from "react-icons/fa";
import useUsuarios from '../../hooks/useUsuarios';
import MenuResponsivo from "../MenuResponsivo/MenuResponsivo";
import FotoPerfil from "../../features/PaginaPerfil/FotoPerfil";

function CabecalhoResponsivo() {
    // const [usuario, setUsuario] = useState(null);
    const { usuario } = useUsuarios();

    if (!usuario) {
        return <div>Carregando usuário...</div>;
    }

    return (
        <div className='container-cabecalho-responsivo'>
            <div className="container-cabecalho-responsivo-navbar">
                <MenuResponsivo />
            </div>

            <div className='container-cabecalho-responsivo-perfil'>
                <div className='cabecalho-responsivo-foto-perfil'>
                    <FotoPerfil userId={usuario._id} />
                </div>
                <div className='cabecalho-responsivo-infos-usuario'>
                    <p className="cabecalho-responsivo-nome-usuario">{usuario.username?.split(' ')[0]}</p>
                    <p>{usuario.email}</p>
                </div>
            </div>
        </div>
    );
}

export default CabecalhoResponsivo;
