import React from 'react';
import './Cadastro.css';
import imgMulherCadastro from '../../images/image-mulher-cadastro.png';

function Cadastro() {
    return(
        <div className='container'>
            <h1>Página de Cadastro</h1>
            <p className='logo-seren'>Seren</p>
            <p>Cadastre-se para gerenciar sua vida profissional de forma prática e rápida</p>
            <img src={imgMulherCadastro} alt="Ilustração de mulher mexendo no notebook" />
        </div>
    );
}

export default Cadastro;